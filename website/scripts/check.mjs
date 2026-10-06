// Acceptance checks of website/SPEC.md §11, run on the built site in _site/.
// Exit code 1 when a check fails.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import library from "../src/_data/library.js";

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../_site");
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    fs.statSync(p).isDirectory() ? walk(p) : files.push(p);
  }
})(SITE);
const html = files.filter((f) => f.endsWith(".html"));
const rel = (f) => "/" + path.relative(SITE, f).split(path.sep).join("/");
const decode = (t) => t.replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const exists = (url) => {
  const clean = url.split(/[?#]/)[0];
  const p = path.join(SITE, clean);
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, "index.html")));
};

const results = [];
const check = (name, ok, detail) => results.push({ name, ok, detail });

// 1. Every active and single-system pattern has a card.
const want = library.live.map((r) => r.id);
const missingCards = want.filter((id) => !fs.existsSync(path.join(SITE, "p", id, "index.html")));
const levels = ["workflow", "subtask", "component"].map((l) => `${library.live.filter((r) => r.level === l).length} ${l}s`);
check("1 cards", missingCards.length === 0, `${want.length - missingCards.length}/${want.length} (${levels.join(", ")}); missing: ${missingCards.join(" ") || "none"}`);

// 2. No broken internal links. Every ID and alias resolves.
const broken = [];
let links = 0;
for (const f of html) {
  const t = fs.readFileSync(f, "utf8");
  for (const m of t.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    links++;
    if (!exists(m[1])) broken.push(`${rel(f)} -> ${m[1]}`);
  }
  for (const m of decode(t).matchAll(/click \w+ href "([^"]+)"/g)) {
    links++;
    if (!exists(m[1])) broken.push(`${rel(f)} -> ${m[1]} (diagram)`);
  }
}
const badAliases = library.aliases.filter((a) => !exists(`/p/${a.from}/`) || !library.recs[a.to]);
check("2 links", broken.length === 0 && badAliases.length === 0, `${links} internal links, ${broken.length} broken; ${library.aliases.length} aliases, ${badAliases.length} unresolved` + (broken.length ? "\n    " + broken.slice(0, 10).join("\n    ") : ""));

// 3. From any card, the root of the path is one click away: every card has the path trail.
const cardFiles = want.map((id) => path.join(SITE, "p", id, "index.html"));
const noNav = cardFiles.filter((f) => !fs.readFileSync(f, "utf8").includes('id="trail"'));
check("3 navigation", noNav.length === 0, `${cardFiles.length - noNav.length}/${cardFiles.length} cards have the path trail`);

// 4. Every workflow diagram node opens its subtask card, and the drawn nodes match the graph.
const nodeFail = [];
for (const w of library.workflows) {
  const t = fs.readFileSync(path.join(SITE, "p", w.id, "index.html"), "utf8");
  for (const n of w.nodes) if (!t.includes(`<a href="/p/${n}/?via=${w.id}" data-pid="${n}"`)) nodeFail.push(`${w.id}:${n}`);
  const drawn = [...(w.diagramNodes || [])].sort().join(" "), graph = [...w.nodes].sort().join(" ");
  if (drawn !== graph) nodeFail.push(`${w.id}: drawn [${drawn}] vs graph [${graph}]`);
}
const nodes = library.workflows.reduce((s, w) => s + w.nodes.length, 0);
check("4 diagram nodes", nodeFail.length === 0, `${nodes} nodes; ${nodeFail.length} missing or unmatched` + (nodeFail.length ? ": " + nodeFail.join("; ") : ""));

// 5. Every attribute label and role code has a definition on demand.
const undefinedAttrs = [];
for (const f of cardFiles) {
  const t = fs.readFileSync(f, "utf8");
  for (const m of t.matchAll(/class="(?:attr|role[^"]*) term" tabindex="0" data-def="([^"]*)"/g)) if (!m[1].trim()) undefinedAttrs.push(rel(f));
}
check("5 definitions", undefinedAttrs.length === 0, `${undefinedAttrs.length} labels without a definition`);

// 6. No output file refers to data/.
const dataRefs = files.filter((f) => /\.(html|json|css|js)$/.test(f) && /["'(\/]data\/(figures|[^"']*\.pdf)/.test(fs.readFileSync(f, "utf8")));
check("6 no data/", dataRefs.length === 0, `${dataRefs.length} files refer to data/` + (dataRefs.length ? ": " + dataRefs.map(rel).join(" ") : ""));

// 7 is a property of the build (no manual step); it is not checked here.
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}: ${r.detail}`);
process.exit(results.every((r) => r.ok) ? 0 : 1);
