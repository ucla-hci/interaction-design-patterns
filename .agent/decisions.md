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
- 9/22/2026 — A workflow Solution is a sequence of subtasks. Each item is one subtask. Systems that share a workflow are abstracted as one chain.
- 9/22/2026 — A workflow can branch and loop. Each workflow Solution starts with a mermaid flowchart.
- 9/22/2026 — A subtask Solution is a sequence of steps. In each step the user works with named components.
- 9/22/2026 — A component Solution carries a spec: an element tree, data bindings, variations, events, and a fallback. Style is out of scope. The spec replaces the styleless-HTML sketches, which are deleted. The notation follows the form of the maui pattern mini-language (`~/dev/maui/.agent/compilation-rules.md` §2).
- 9/22/2026 — A component spec is independent of any renderer. It states what the design needs. A2UI and other rendering libraries are for visualization, and they constrain no pattern. When a renderer cannot draw an element, that is a limit of the renderer.
- 9/22/2026 — A component spec states `needs:`, the kinds of element the design requires, in design terms and not in the component names of a catalog.
- 9/22/2026 — Borchers's "forces" field is named **Tradeoff**, and is written "X vs. Y".
- 9/22/2026 — **Tradeoff** is deferred. It is not wanted on a first read of a pattern.

## Writing
- 9/22/2026 — All text in this repository follows ASD-STE100 Simplified Technical English, document mode: https://github.com/AminBlg/SimpleEnglish. Rules: 20 words maximum per instruction, 25 per description; condition before command; active voice; *can*, *will*, and *must* only; one word for one meaning; the fact, not its importance.
- 9/22/2026 — Two deviations: field labels stay bold, and a step keeps the CP number of a component.
- 9/22/2026 — Three groups keep their current text: the notes in `literature/`, journal entries before 9/22, and the paper prose in `research-paper/`. Paper prose follows the conventions of the venue, not STE.
