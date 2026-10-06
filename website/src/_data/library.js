// Reads the pattern language from ../pattern-language and shapes it for the templates.
// Source of truth: pattern-language/patterns/<ID>.md (front matter + Markdown body).
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load as yamlLoad } from "js-yaml";
import MarkdownIt from "markdown-it";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LANG = path.resolve(HERE, "../../../pattern-language");
const RELADRAW = path.resolve(HERE, "../../node_modules/.bin/reladraw");
const md = new MarkdownIt({ html: false, linkify: false, typographer: false });

const ROLE_ORDER = ["FR", "EX", "OR", "EV", "SY", "CM", "CN"];
const LEVEL_ORDER = { workflow: 0, subtask: 1, component: 2 };
const ID_RE = /\b(WF-[A-Z]|[A-Z]{2}-\d+|C-\d+)\b/g;

function read(rel) {
  return fs.readFileSync(path.join(LANG, rel), "utf8");
}

// Split a Markdown body into its "## " sections.
function sections(body) {
  const out = {};
  const parts = body.split(/^## (.+)$/m);
  for (let i = 1; i < parts.length; i += 2) out[parts[i].trim()] = parts[i + 1].trim();
  return out;
}

// One pipe table under a heading of a Markdown file -> array of row arrays.
function table(text) {
  return text
    .split("\n")
    .filter((l) => l.startsWith("|") && !/^\|\s*-/.test(l))
    .slice(1)
    .map((l) => l.split("|").slice(1, -1).map((c) => c.trim()));
}

function sectionOf(text, heading) {
  const re = new RegExp(`^(#{2,3}) ${heading}[^\\n]*\\n([\\s\\S]*?)(?=^#{2,3} |^---$|(?![\\s\\S]))`, "m");
  const m = text.match(re);
  return m ? m[2] : "";
}

function stripMd(s) {
  return s.replace(/\*\*|\*|`/g, "");
}

// Subtask steps: "1. C-n Name" or "1. (no component)", then *User:* and *System:* lines.
function parseSteps(solution) {
  const steps = [];
  const blocks = solution.split(/^(?=\d+\. )/m).filter((b) => /^\d+\. /.test(b));
  for (const b of blocks) {
    const head = b.match(/^\d+\. (.+)$/m)[1].trim();
    const user = (b.match(/\*User:\*([\s\S]*?)(?=^\s*- \*System:\*|$(?![\s\S]))/m) || [, ""])[1];
    const system = (b.match(/\*System:\*([\s\S]*)$/m) || [, ""])[1];
    const comp = head.match(/^(C-\d+)\s+(.*)$/);
    steps.push({
      component: comp ? comp[1] : null,
      label: comp ? comp[2] : head,
      user: user.replace(/\s+/g, " ").trim(),
      system: system.replace(/\s+/g, " ").trim(),
    });
  }
  return steps;
}

// Workflow: the mermaid code, and the numbered list under it.
function parseWorkflow(solution) {
  const m = solution.match(/```mermaid\n([\s\S]*?)```/);
  const list = solution
    .slice(m ? m.index + m[0].length : 0)
    .split("\n")
    .filter((l) => /^\d+\. /.test(l))
    .map((l) => l.replace(/^\d+\. /, "").trim());
  return { mermaid: m ? m[1].trim() : "", list };
}

function loadPatterns() {
  const dir = path.join(LANG, "patterns");
  const recs = {};
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const text = fs.readFileSync(path.join(dir, f), "utf8");
    const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const fm = yamlLoad(m[1]);
    const body = m[2];
    const sec = sections(body);
    const rec = {
      ...fm,
      context: fm.context || [],
      references: fm.references || [],
      systems: fm.systems || [],
      aliases: fm.aliases || [],
      sections: sec,
      note: fm.status === "retired" ? body.trim() : "",
    };
    rec.roleCode = rec.level === "subtask" ? rec.id.slice(0, 2) : null;
    if (rec.level === "subtask" && sec.Solution) rec.steps = parseSteps(sec.Solution);
    if (rec.level === "workflow" && sec.Solution) Object.assign(rec, parseWorkflow(sec.Solution));
    if (rec.level === "component" && sec.Solution) rec.solutionList = sec.Solution;
    if (rec.eigen_ui) rec.svg = read(rec.eigen_ui).trim();
    if (sec.Figures)
      rec.figures = [...sec.Figures.matchAll(/^- `([^`]+)` (.+)$/gm)].map((m) => {
        const [where, what] = m[2].split(/:\s(.+)/);
        return { src: "/" + m[1], where, what: what || "" };
      });
    recs[rec.id] = rec;
  }
  return recs;
}

function sortKey(r) {
  const lv = LEVEL_ORDER[r.level];
  const num = parseInt(r.id.replace(/^\D+-/, ""), 10) || 0;
  if (r.level === "subtask") return [lv, r.status === "active" ? 0 : 1, ROLE_ORDER.indexOf(r.roleCode), num];
  if (r.level === "workflow") return [lv, 0, 0, r.id.charCodeAt(3)];
  return [lv, 0, 0, num];
}
function cmp(a, b) {
  const ka = sortKey(a), kb = sortKey(b);
  for (let i = 0; i < ka.length; i++) if (ka[i] !== kb[i]) return ka[i] - kb[i];
  return 0;
}

const recs = loadPatterns();
const live = Object.values(recs).filter((r) => r.status !== "retired").sort(cmp);

// Reverse links: who uses a pattern, and in which step.
for (const r of live) {
  r.usedIn = [];
  r.usedInSteps = [];
}
for (const r of live) {
  if (r.level === "subtask")
    (r.steps || []).forEach((s, i) => {
      if (s.component && recs[s.component]) recs[s.component].usedInSteps.push({ id: r.id, step: i + 1 });
    });
}
for (const r of live) {
  // Workflows that reach the pattern through a parent.
  const wf = new Set();
  for (const p of r.context) {
    if (p.startsWith("WF-")) wf.add(p);
    else for (const q of (recs[p] && recs[p].context) || []) if (q.startsWith("WF-")) wf.add(q);
  }
  r.workflows = [...wf].sort();
}

// Workflow diagrams: hand-placed layouts in pattern-language/diagrams/<ID>.reladraw, drawn to SVG.
// The mermaid block in the pattern file stays the graph; the check compares the two node sets.
for (const r of live.filter((r) => r.level === "workflow")) {
  r.nodes = [...new Set([...r.mermaid.matchAll(/\b([A-Z]{2}\d+)\["/g)].map((m) => m[1].replace(/^([A-Z]{2})(\d+)$/, "$1-$2")))];
  const src = path.join(LANG, "diagrams", `${r.id}.reladraw`);
  if (!fs.existsSync(src)) continue;
  r.diagram = execFileSync(RELADRAW, [src, "-o", "-"], { encoding: "utf8" })
    .replace(/ target="_blank" rel="noopener"/g, "")
    .replace(/<a href="\/p\/([^/]+)\/([^"]*)"/g, '<a href="/p/$1/$2" data-pid="$1"')
    .replace(/ font-family="[^"]*"/, "")
    .replace(/<svg ([^>]*?)width="(\d+)" height="(\d+)"/, '<svg $1role="img" aria-label="${r.id} ${r.name}"')
    .trim();
  r.diagramNodes = [...r.diagram.matchAll(/data-pid="([^"]+)"/g)].map((m) => m[1]);
}

// Glossary, attributes, roles, and meta text from the language documents.
const mvp = read("pattern-language-mvp.md");
const glossaryText = read("glossary.md");
const glossary = glossaryText
  .split(/^## /m)
  .slice(1)
  .flatMap((sec) => {
    const group = sec.split("\n")[0].trim();
    return table(sec).map(([term, meaning]) => ({ term: stripMd(term), meaning, group }));
  });
const attributes = table(sectionOf(mvp, "Pattern Attributes")).map(([a, h]) => ({ name: stripMd(a), holds: stripMd(h), holdsHtml: md.renderInline(h) }));
// The roles table sits under a bold paragraph, not a heading.
const rolesTable = mvp.match(/\*\*Subtask roles\*\*[\s\S]*?\n(\|[\s\S]*?)\n\n/);
const roles = (rolesTable ? table(rolesTable[1]) : []).map(([code, name, does]) => ({
  code,
  name,
  does: `The subtask ${does.replace(/^The subtask…?\s*/, "")}`,
}));
const roleByCode = Object.fromEntries(roles.map((r) => [r.code, r]));
const attrByName = Object.fromEntries(attributes.map((a) => [a.name, a]));

// Aliases: old IDs that redirect to the current ones.
const aliases = [];
for (const r of Object.values(recs)) for (const a of r.aliases) aliases.push({ from: a, to: r.id });

// Link every known ID in rendered HTML text (not inside tags).
function linkIds(html, viaIds = []) {
  return html
    .split(/(<[^>]+>)/)
    .map((part) =>
      part.startsWith("<")
        ? part
        : part.replace(ID_RE, (id) =>
            recs[id] && recs[id].status !== "retired"
              ? `<a class="pid" data-pid="${id}" href="/p/${id}/">${id}</a>`
              : id
          )
    )
    .join("");
}
function render(mdText) {
  return linkIds(md.render(mdText || ""));
}
function renderInline(mdText) {
  return linkIds(md.renderInline(mdText || ""));
}

// Glossary terms: mark the first use of each term in a sentence, for a hover definition.
const termList = glossary
  .map((g) => g.term)
  .filter((t) => t.length > 3 && !["user", "system"].includes(t)) // in every sentence: marking them adds noise
  .sort((a, b) => b.length - a.length);
function markTerms(text, seen) {
  let out = text;
  for (const t of termList) {
    if (seen.has(t)) continue;
    const re = new RegExp(`\\b(${t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}s?)\\b`, "i");
    // Only the text between tags: a definition already inserted must not be marked again.
    const parts = out.split(/(<[^>]+>[^<]*<\/span>)/);
    const i = parts.findIndex((p, k) => k % 2 === 0 && re.test(p));
    if (i < 0) continue;
    const def = glossary.find((g) => g.term === t).meaning.replace(/"/g, "&quot;");
    parts[i] = parts[i].replace(re, `<span class="term" tabindex="0" data-def="${def}">$1</span>`);
    out = parts.join("");
    seen.add(t);
  }
  return out;
}

// What a page needs for link previews: a small index of every live pattern.
const previewIndex = Object.fromEntries(
  live.map((r) => [r.id, { name: r.name, level: r.level, situation: r.situation, problem: r.problem }])
);

// Each subtask narrative, by system: "- *HALO.* text".
for (const r of live.filter((r) => r.level === "subtask")) {
  r.examplesBySystem = Object.fromEntries(
    [...(r.sections.Examples || "").matchAll(/^- \*([^*]+?)\.\* ([\s\S]*?)(?=^- \*|(?![\s\S]))/gm)].map((m) => [m[1], m[2].replace(/\s+/g, " ").trim()])
  );
}
// A workflow's examples: one table per system, a row per subtask, the subtask's narrative as the cell.
for (const r of live.filter((r) => r.level === "workflow")) {
  r.exampleTables = r.systems.map((sys) => ({
    system: sys,
    rows: r.nodes.map((id) => ({ id, name: recs[id].name, html: recs[id].examplesBySystem[sys] ? renderInline(recs[id].examplesBySystem[sys]) : "" })),
  }));
}

for (const r of live) {
  const seen = new Set();
  r.situationHtml = markTerms(r.situation || "", seen);
  r.problemHtml = markTerms(r.problem || "", seen);
  r.examplesHtml = render(r.sections.Examples);
  r.statesHtml = r.sections.States ? render(r.sections.States) : "";
  if (r.level === "component") r.solutionHtml = render(r.solutionList);
  if (r.steps) for (const s of r.steps) { s.userHtml = renderInline(s.user); s.systemHtml = renderInline(s.system); }
  if (r.list) r.listHtml = r.list.map((l) => renderInline(l));
  r.json = JSON.stringify(
    {
      id: r.id, name: r.name, level: r.level, role: r.role || null, role_also: r.role_also || null,
      status: r.status, context: r.context, situation: r.situation, problem: r.problem,
      systems: r.systems, references: r.references, aliases: r.aliases,
      solution: r.sections.Solution || "", examples: r.sections.Examples || "",
    },
    null,
    2
  );
}

const retired = Object.values(recs).filter((r) => r.status === "retired");

const meta = [
  // The Overview of the MVP doc, up to its rules; comments in it are the author's drafts, not text.
  {
    slug: "patterns",
    title: "What a pattern is",
    html: render(sectionOf(mvp, "Overview").replace(/<!--[\s\S]*?-->/g, "").split("**Level of abstraction.**")[0]),
    attributes,
  },
  { slug: "roles", title: "Subtask roles", roles },
  { slug: "glossary", title: "Glossary", glossary },
];

export default {
  recs,
  live,
  retired,
  workflows: live.filter((r) => r.level === "workflow"),
  subtasks: live.filter((r) => r.level === "subtask"),
  components: live.filter((r) => r.level === "component"),
  aliases,
  roles,
  roleByCode,
  attrByName,
  glossary,
  meta,
  previewJson: JSON.stringify(previewIndex),
};
