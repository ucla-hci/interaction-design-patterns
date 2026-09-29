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
