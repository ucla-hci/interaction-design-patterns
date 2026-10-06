# Pattern library website — spec

*Approved by the author, 10/6. Version 1 built 10/6 (`website/README.md`). Source: `.agent/scratch-pad.md`, "website". Decisions D1–D3 are settled. Text
follows the writing rules of the repository (ASD-STE100, document mode).*

## 1. Goal

An interactive, wiki-like reference. A designer uses it to browse, study, and deploy the patterns
at all three levels: workflow, subtask, and component.

The site shows the language. It does not change it. The pattern files in `pattern-language/` stay
the source of truth.

## 1a. Design principles

From the scratch pad. They decide every open layout question below.

- **Start scarce.** Version 1 shows the least that does the job. A feature is added when a
  designer needs it, not before. When in doubt, leave it out, or show it collapsed.
- **Visual over text.** Where a picture can carry an attribute, the picture comes first and the
  text supports it: diagrams for workflows, a strip of component pictures for subtask steps, the
  eigen-UI for components. Text appears only for what a picture cannot say: Situation and Problem.

## 2. Users and tasks

The user of the site is a **designer**. Four tasks:

| Task | Example | Main entry |
|---|---|---|
| T1 Browse | "Which subtasks does the library have for evaluation?" | Catalog, role filter |
| T2 Study | "How does FR-2 work, and where does it occur?" | Card |
| T3 Follow a link in context | "WF-B uses EV-2. What is EV-2? What is C-9 in its step 1?" | Link on a card |
| T4 Learn the format | "What does Situation mean? What is a claim?" | Meta pages, popovers |

"Deploy" (the designer, or a language model, applies a pattern to a new design) is out of scope
for this version. Section 9 states what the site must not block.

## 3. Content model

The build reads the pattern files, and makes one record per pattern.

| Entity | ID | Attributes (from "Pattern Attributes") | Links |
|---|---|---|---|
| Workflow | `WF-A`… | Name, Level, Context, Situation, Problem, Solution (diagram + list), Examples, References | children: subtasks |
| Subtask | `FR-1`… | Name, Level, Role, Context, Situation, Problem, Solution (steps: component, User, System), Examples, References | parents: workflows; children: components |
| Component | `C-1`… | Name, Level, Context, Situation, Problem, Solution, eigen-UI (when it has a card), Examples | parents: subtasks; contained components |

Other records:

- **Status** of a pattern: *active*, *single-system* (in `single-system-patterns.md`), or
  *retired* (an old ID). A retired ID redirects to its successor, or shows a "retired" note.
- **Aliases**: the old IDs (A1…, S1…, CP-n). A URL with an old ID redirects to the pattern.
- **Glossary terms** from `glossary.md`.
- **Meta pages**: Structure, Pattern Attributes, Subtask roles, Writing style, from
  `pattern-language-mvp.md`.

**The links form a graph, not a tree.** FR-2 has two parents (WF-B, WF-C). C-7 has six parents.
Navigation (section 6) must handle more than one parent.

## 4. Pages

| Page | URL | Holds |
|---|---|---|
| Home = Catalog | `/` | One line on the library, then three tabs: Workflows (default; each with its diagram), Subtasks (role filter; each with its step strip), Components (each with its eigen-UI). `/catalog/` redirects here. No search in version 1 |
| Card | `/p/<ID>` | One pattern as a card (section 5) |
| Meta | `/about/<topic>` | What a pattern is, the levels, the attributes, the roles, the glossary |

## 5. The card

The card is the main unit. One layout for all three levels. The attributes appear in the order of
"Pattern Attributes".

- **Header:** ID, name, level, role (subtasks), status badge.
- **Context:** the parents, as links.
- **Situation** and **Problem:** one sentence each, at the top. A designer decides from these two
  whether the pattern applies.
- **Solution, as a picture first:**
  - *Workflow:* the diagram, laid out in two dimensions with reladraw
    (`pattern-language/diagrams/<ID>.reladraw`). Each node is a link to its subtask card. The
    mermaid block in the pattern file stays the graph; the check compares the two.
  - *Subtask:* a row of steps joined by arrows (a column on a phone), labelled "Steps, in order". Each step is a thumbnail of its component (its eigen-UI), with
    the User line and the System line under it. A thumbnail is a link to the component card.
  - *Component:* the eigen-UI.
- **Collapsed by default** (start scarce): Examples (one block per exemplar system, § numbers as
  plain text), References, and Used in (every parent of the pattern). A component with figure
  crops opens Examples by default and shows the crops first.

**Gap.** 2 of 13 components have an eigen-UI (C-4, C-6). Until the others have one, a component
shows a placeholder tile with its name. The step strip works with placeholders, but the
principle "visual over text" is met only when the eigen-UIs exist.

A link to a pattern shows a **preview** on hover or on focus: ID, name, Situation, and Problem. The
designer can read a linked pattern without leaving the current card.

## 6. Navigation: the designer must not get lost

The scratch pad names this as the main design challenge. API documentation is the model. Three
mechanisms (a fifth, a level rail, is left out under "start scarce": the breadcrumb and the mini
diagram carry the same information):

1. **Path breadcrumb.** It replaces an "Up" control (removed 10/6). The breadcrumb shows the path that the designer took, with ID and name, not a fixed
   hierarchy, because a pattern can have more than one parent. Example: `WF-C › FR-2 › C-11`. The
   URL holds the path (`/p/C-11?via=WF-C,FR-2`), so the back button, a shared link, and a reload
   keep it.
3. **Where am I.** On a subtask card, a small copy of the parent workflow diagram marks the
   current subtask. On a component card, a list shows the subtask steps that use the component.
4. **Previews** (section 5) cut the number of page changes.

The browser back button must work on every page.

## 7. Meta information on demand

- Every attribute label on a card (Situation, Problem, Role…) has an info control. It shows the
  definition from "Pattern Attributes" in a popover, with a link to the full meta page.
- A glossary term in pattern text shows its definition on hover or on focus. Mark each term once
  per card, at its first use, so that the text stays readable.
- A role code (FR, EX…) shows the role name and its definition.

## 8. Constraints

- **The crops ship** (10/6, reversing 9/29). The crops of component instances are in
  `pattern-language/figures/C-<n>/`, tracked in git, and show under Examples. Nothing else from
  `data/` ships: the build fails when an output file refers to `data/`.
- **Public, full content** (D1). The site is public, and the Examples stay in full. The author
  accepts the risk to the anonymity of the four exemplar papers.
- **Static.** No server and no database. The build makes HTML, CSS, and a small amount of
  JavaScript. Every card must be readable with JavaScript off; previews and popovers are extras.
- **Accessible.** Keyboard access for every link, preview, and popover. Visible focus. Diagram
  nodes are real links with text labels.
- **Phone width.** Readable at 375 px. The two-column step layout becomes one column.
- **One font.** The site uses one sans-serif face throughout, in the diagrams too.
- **One stylesheet.** Extend `pattern-language/cards/card.css`. The existing C-4 and C-6 cards
  become pages of the site.

## 9. What the site must not block (later versions)

- **Deploy and language-model use** (scratch pad: "match → instantiate", MCP). The build writes
  each pattern as JSON beside the HTML (`/p/<ID>.json`). A later MCP server can read the same
  records.
- **Front demo** (scratch pad: "visualize the pattern … what a UI might look like"). The card has
  one slot for a visual: eigen-UI now, a generated rendering later.

## 10. Out of scope for version 1

Editing on the site, comments, user accounts, the MCP server, the experiments, generated UIs.

## 11. Acceptance criteria

1. Every active and single-system pattern has a card: 3 workflows, 15 subtasks, 13 components.
2. 0 broken links. Every ID in the text (workflow, subtask, component, old alias) resolves.
3. From any card, the root workflow of the current path is one click away: a breadcrumb item.
4. Every workflow diagram node opens its subtask card.
5. Every attribute label and every role code has a definition on demand.
6. 0 output files refer to `data/`.
7. A rebuild after an edit to a pattern file changes the site with no manual step.

## 12. Hosting

- The repository is on GitHub (`ucla-hci/patterns-genui`). Vercel builds the site from it on
  every push to `main`, and serves the output. A pull request gets a preview URL.
- The build reads only `pattern-language/` and `website/`. `data/` is not in git, so Vercel
  never sees the crops. `data-text/` is in git, but the site does not read it.
- Vercel settings live in `vercel.json` at the repository root, not in `website/`: the build
  reads `pattern-language/`, which is outside `website/`. The build runs the §11 checks, and a
  failed check stops the deploy.

- **Updates.** A new exemplar paper reaches the site through `/add-paper`
  (`.claude/commands/add-paper.md`): ingest, analyze, propose, apply, rebuild, pull request
  with a Vercel preview. The author merges.

## 13. Decisions

- **D1: Public or private? Settled, 10/6: public, full content.** The author accepts the risk to
  the anonymity of the exemplar papers.
- **D2: Source format. Settled, 10/6: one file per pattern.** Each pattern is
  `pattern-language/patterns/<ID>.md`: front matter for the short attributes (ID, name, level,
  role, context, situation, problem, status, aliases), and Markdown for Solution and Examples.
  `pattern-language-mvp.md` keeps the meta sections (Structure, Pattern Attributes, roles,
  writing style) and links to the pattern files. The split is a separate task, before the build.
- **D3: Build tool. Settled, 10/6: Eleventy.** A small Node static-site generator. Vercel runs it
  with no setup. It reads Markdown with front matter, and its output is plain HTML.
