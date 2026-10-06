# Decisions

*Text follows ASD-STE100 Simplified Technical English, document mode. See "Writing" below.*

## Scope
- 9/22/2026 — The project is now "a pattern language to abstract the design of interactive systems". It goes beyond one UI screen.
- 9/22/2026 — UI generation (the v5 retrieve, bind, render pipeline) is not the focus. It is in `archive/genui/`. It can return later as an application of the language.
- 9/22/2026 — v5 is obsolete. Do not use it as a reference point for the new language.
- 9/22/2026 — Goal for 9/22: an MVP pattern language that abstracts the four systems in `data/`. Nothing more.

## Pattern language structure
- 9/22/2026 — The hierarchy is workflow, subtask, component. A workflow is the sequence of subtasks that a user performs to achieve the high-level task. Components support a subtask.
- 9/22/2026 — The four exemplar systems do not have to share one pattern. They can share a pattern at one level and differ at another.
- 9/22/2026 — PerspectEvolver and THESEUS are separate workflow patterns. They share three subtasks.
- 9/22/2026 — Level of abstraction: the name, problem, and solution of a pattern use no term that belongs to one exemplar system or its domain. Domain terms appear in Examples only. WF-A sets the level.
- 9/22/2026 — The language assumes no AI. A pattern states what the system does. AI appears in Examples only.

## Pattern fields
- 9/22/2026 — **Solution** states, in general terms, how to build the pattern into a specific design.
- 9/29/2026 — **Problem** has two labelled parts. **Goal**: what the user sets out to achieve. **Failure**: what goes wrong without the pattern.
- 9/29/2026 — The Solution of each level uses the patterns of the next level down as its building blocks. In a subtask, every step starts with the component that it uses: "CP-n Name: what the user or the system does with it." A step with no component is marked "(no component)", which shows a gap in the language.
- 9/29/2026 — A component serves two or more subtasks. A need that occurs in one subtask only is a step that states the action, marked "(no component)"; the UI stays open. The B1 and C1 fixed fields became CP-17 Typed Item.
- 9/29/2026 — Component rules, in order: reuse (two or more subtasks, counted from the Solution steps), extend (add the step where an exemplar shows the same UI), merge (a narrower case becomes a variation of another component), demote (a step with no component), promote (a need in two or more subtasks becomes a component). Stated in `pattern-language-mvp.md`, Structure.
- 9/29/2026 — Applied: CP-5 extends to A3. CP-13 merges into CP-10. CP-2, CP-15, CP-16 are demoted. A retired ID is not used again.
- 9/29/2026 — The MVP shows a subtask or a component only when it applies to two or more systems. A single-system pattern moves to `pattern-language/single-system-patterns.md`. It can return when a new system shows it.
- 9/29/2026 — A workflow does not have to apply to two or more systems, for now. WF-B and WF-C stay in the MVP; their diagrams mark the subtasks that moved.
- 9/29/2026 — Component counts (subtasks and systems) include the moved subtasks. Moving a pattern out changes what the MVP shows, not whether the pattern exists.
- 9/29/2026 — A subtask name states a precise action that holds across tools: a verb and its object, with no metaphor. IDs stay. The 15 subtasks are renamed (journal, 9/29).
- 10/6/2026 — Tentative: subtasks are sorted by their role in the loop: Frame, Expand, Organize, Evaluate, Synthesize, Commit, Continue. Generality (MVP or single-system) is the second axis. The roles can change when more papers are added. No subtask is removed. See `pattern-language/refs/subtask-taxonomy-brainstorm.md`.
- 10/6/2026 — A subtask ID is a role code and a number: FR, EX, OR, EV, SY, CM, CN, then the order of first use (WF-A, WF-B, WF-C). A subtask in two roles takes its main role: EX-3 (was C1) is Expand, CM-1 (was A6) is Commit. This replaces "IDs stay" (9/29). When a role changes, the ID changes. The was→now list is in the brainstorm doc. A retired ID is not used again.
- 10/6/2026 — Workflow diagrams show single-system subtasks like every other subtask: no dashed style, no "moved" label. This replaces "their diagrams mark the subtasks that moved" (9/29). The subtask sections stay in `single-system-patterns.md`.
- 10/6/2026 — A subtask has a **Role** field, first after the name. A subtask in two roles notes the second one: "Expand (also Organize)".
- 10/6/2026 — Components are `C-n`, not `CP-n`. The number stays. Crop folders (`data/figures/cp/CP-n/`), `refs/cp-figures.yaml`, `tools/crop_cp.py`, and the card file names keep "cp". Journal entries before 10/6 keep `CP-n`.
- 10/6/2026 — Each subtask step names its component, then two labelled parts: *User:* what the user does, *System:* what the system shows or does. "—" marks a side that does nothing.
- 10/6/2026 — Examples: one narrative per exemplar system that has the pattern. It names the tool and tells, in 3 to 5 sentences with § numbers, how a user performs the pattern. Facts come from `data-text/`, not from memory.
- 10/6/2026 — Terms with one meaning in the whole library are defined in `pattern-language/glossary.md` (draft).
- 10/6/2026 — **Context** has two parts: *Parents* (the parent patterns) and *Situation* (one sentence: what the user is trying to do at this point of the parent; for a workflow, the high-level task). The old Goal moves here. This follows Borchers: context states when and where a pattern is used.
- 10/6/2026 — **Problem** is one statement: what goes wrong for the user without this pattern. It states a consequence that the user meets, and does not name the solution or its absence. It replaces Goal + Failure (9/29). Forces stay deferred. See `pattern-language/refs/problem-field-memo.md`.
- 10/6/2026 — The Template is renamed **Pattern Attributes**. Situation is its own attribute, after Context, and Context holds the parent patterns only. Role is defined in the table. Situation and Problem are one sentence each. This refines the Context entry above.
- 9/22/2026 — A workflow Solution is a sequence of subtasks. Each item is one subtask. Systems that share a workflow are abstracted as one chain.
- 9/22/2026 — A workflow can branch and loop. Each workflow Solution starts with a mermaid flowchart.
- 9/22/2026 — A subtask Solution is a sequence of steps. In each step the user works with named components.
- 9/22/2026 — A component Solution carries a spec: an element tree, data bindings, variations, events, and a fallback. Style is out of scope. The spec replaces the styleless-HTML sketches, which are deleted. The notation follows the form of the maui pattern mini-language (`~/dev/maui/.agent/compilation-rules.md` §2).
- 9/22/2026 — A component spec is independent of any renderer. It states what the design needs. A2UI and other rendering libraries are for visualization, and they constrain no pattern. When a renderer cannot draw an element, that is a limit of the renderer.
- 9/22/2026 — A component spec states `needs:`, the kinds of element the design requires, in design terms and not in the component names of a catalog.
- 9/22/2026 — Borchers's "forces" field is named **Tradeoff**, and is written "X vs. Y".
- 9/22/2026 — **Tradeoff** is deferred. It is not wanted on a first read of a pattern.

## Grounding in the exemplar figures
- 9/29/2026 — The figures of the exemplar papers are a dataset. The pipeline converts each PDF to page images, crops each figure, indexes the figures, and locates each CP instance in a figure.
- 9/29/2026 — An eigen-UI is a greyscale wireframe. It shows the elements that the instances share and marks each variation. It holds no style and no domain content.
- 9/29/2026 — The spec is the pattern. When an eigen-UI differs from its spec, record the difference. The author edits the spec.
- 9/29/2026 — Pilot: CP-4 and CP-6.
- 9/29/2026 (later) — At the component level, the spec is an eigen-UI card: one HTML page per CP, a visual spec. It replaces the YAML spec and the line above that makes the spec the pattern. Workflows and subtasks stay in `pattern-language-mvp.md`.
- 9/29/2026 — A card holds the eigen-UI and short forms of the template fields: Name, Level, Context, Problem, Solution, Examples, References. For a component, References lists the CPs that it contains.
- 9/29/2026 — A card shows the crops of its instances from `data/figures/cp/` when they exist on the machine, and cites them otherwise. The crops stay out of git.
- 9/29/2026 — First cards: CP-4 and CP-6. The other 14 follow after the author reviews the format.

## Writing
- 9/22/2026 — All text in this repository follows ASD-STE100 Simplified Technical English, document mode: https://github.com/AminBlg/SimpleEnglish. Rules: 20 words maximum per instruction, 25 per description; condition before command; active voice; *can*, *will*, and *must* only; one word for one meaning; the fact, not its importance.
- 9/22/2026 — Two deviations: field labels stay bold, and a step keeps the CP number of a component.
- 9/22/2026 — Three groups keep their current text: the notes in `literature/`, journal entries before 9/22, and the paper prose in `research-paper/`. Paper prose follows the conventions of the venue, not STE.

## Website
- 10/6/2026 — The pattern library gets a website: a wiki-like reference of cards at all three levels. Spec: `website/SPEC.md`. Spec first; no build until the author approves the spec.
- 10/6/2026 — The site is public, with full content. The author accepts the risk to the anonymity of the exemplar papers.
- 10/6/2026 — Source: one file per pattern, `pattern-language/patterns/<ID>.md`, with front matter. The split comes before the build.
- 10/6/2026 — Hosting: Vercel, built from the GitHub repository on each push to `main`. The build tool is Eleventy (spec D3).
- 10/6/2026 — Two design principles for the site: start scarce (version 1 shows the least that does the job), and visual over text. Version 1 drops search, all filters but role, and the level rail.
- 10/6/2026 — The spec is approved. A new paper enters through `/add-paper` (`.claude/commands/add-paper.md`): ingest, analyze, propose, apply, rebuild, pull request. Each change to the language goes to the author before it applies. The author merges.
- 10/6/2026 — The patterns are split: one file per pattern in `pattern-language/patterns/` (35 files: 31 live, 4 retired). `pattern-language-mvp.md` keeps the meta sections and an index; `single-system-patterns.md` is an index. Eigen-UI drawings are `pattern-language/eigen-ui/C-<n>.svg`.
- 10/6/2026 — `vercel.json` sits at the repository root (the build reads `pattern-language/`). The build runs the §11 checks; a failure stops the deploy.
- 10/6/2026 — Reverses 9/29 ("The crops stay out of git") and spec §8: the crops of component instances ship. They are in `pattern-language/figures/C-<n>/`, tracked, and the site shows them under Examples. Other files in `data/` stay out of git.
- 10/6/2026 — Workflow diagrams on the site are drawn with reladraw from `pattern-language/diagrams/<ID>.reladraw` (a hand-placed 2D layout). The mermaid block in the pattern file stays the graph; the site check compares the node sets.
- 10/6/2026 — The site home is the catalog, with tabs for the three levels. One font throughout.
- 10/6/2026 — No "Up" control on the site; the path breadcrumb does the job. Workflow examples are a table of the subtask narratives, one system at a time. The About page takes the Overview of the MVP doc (HTML comments left out) and the attribute definitions.
- 10/6/2026 — A component card's Examples show crops when they exist, and no text list. A component without crops keeps its text list until crops are added.
- 10/6/2026 — Deferred: eigen-UIs for the 11 components without one wait until more papers are added. Today each has 2 to 4 systems, but only C-4 and C-6 have located figure instances; more papers give more instances to draw from.
