# Pattern Language — MVP (9/22)

> Goal: a minimal pattern language that abstracts the four exemplar systems in `data/` (HALO,
> HAPPIER, PerspectEvolver, THESEUS). Nothing beyond that scope. Source readings:
> `exemplar-systems-review.md`; structure from Borchers (`borchers-translation.md`).
> § numbers refer to each paper's system section.

## Overview

<!-- Three levels, linked by Borchers's context (up) and references (down): -->

A pattern specifies a reusable design of an interactive system across three levels:

- **Workflow**: the sequence of subtasks a user performs with the system to achieve the high-level task.
- **Subtask**: a meaningful chunk of interactions that advance a stage in a workflow.
- **Component**: an individual or group UI element(s) that supports a subtask.

<!-- Every pattern lists its instances. The four papers do not have to share every level.

**Two systems or more.** The MVP shows a subtask or a component only when it applies to two or
more systems. A single-system pattern is in [single-system-patterns.md](single-system-patterns.md)
until a new system shows it. A workflow can rest on one system, for now. Component counts include
the moved subtasks. -->

**Level of abstraction.** The name, problem, and solution of a pattern use no term that belongs
to one exemplar system or its domain. Domain terms appear in Examples only. Test: put a system
from another domain in the pattern. Only the Examples change.

**No assumption of AI.** A pattern states what the system does. The four exemplars use AI models
to generate, to score, and to interpret. A pattern also holds when a solver, a database, or a
person produces the content. AI appears in Examples only.

**Writing style.** Pattern text follows ASD-STE100 Simplified Technical English, in the
document-mode form of https://github.com/AminBlg/SimpleEnglish:

- 20 words maximum per instruction. 25 words maximum per description.
- State the condition before the command.
- Use active voice and simple tenses.
- Use *can*, *will*, and *must*. Do not use *should*, *would*, *may*, or *might*.
- Use one word for one meaning in the whole document. The fixed terms are: system, user, item,
  candidate, criterion, group, part, viewpoint, evidence, outcome, record, claim, show, open,
  select, keep, accept, reject, propose, link. Their definitions are in [glossary.md](glossary.md).
- State the fact, not its importance.
- Two deviations, both deliberate. Field labels (**Problem:**, **Solution:**) stay bold, because
  they are the schema of a pattern and not decoration. A component name keeps its C number in a
  step, so that a reader can follow the reference.

**Component rules** (9/29). Apply them in this order when a component is added or checked:

1. *Reuse.* A component serves two or more subtasks. Count the uses from the subtask Solution
   steps, not by hand.
2. *Extend.* When a component serves one subtask, look at the Examples of the other subtasks.
   When an exemplar shows the same UI there, add the step to that subtask.
3. *Merge.* When the component is a narrower case of another component, merge it. State the
   narrower case as a variation of the other component.
4. *Demote.* When neither applies, remove the component. The step states the action and says
   "(no component)". The UI stays open.
5. *Promote.* When a "(no component)" need occurs in two or more subtasks, make it a component.

A retired ID is not used again.

IDs: workflows `WF-A/B/C` · subtasks `FR-1…` by role (see Subtask roles) · components `C-1…`.

**Subtask roles** (10/6, tentative). A subtask ID states its role in the loop that all
workflows share. The roles can change when more papers are added.

| Code | Role | The subtask… |
|---|---|---|
| FR | Frame | states the goal and the criteria |
| EX | Expand | adds new items to the work |
| OR | Organize | gives the items a structure |
| EV | Evaluate | tests items against criteria or evidence |
| SY | Synthesize | makes one item from several |
| CM | Commit | decides what the work keeps |
| CN | Continue | starts the next round from what is open |

A subtask in two roles takes its main role. The number gives the order of first use. Old IDs
(A1…, B1…, C1…, S1…) are in `refs/subtask-taxonomy-brainstorm.md`.

## Pattern Attributes

| Attribute | Holds |
|---|---|
| **Name** | A short noun phrase. It is the shared vocabulary item |
| **Level** | workflow, subtask, or component |
| **Role** | Subtask only, the first attribute after the name. The job that the subtask does in the loop that all workflows share: Frame, Expand, Organize, Evaluate, Synthesize, Commit, or Continue. The ID starts with its code (see Subtask roles). A subtask in two roles names the second one in brackets |
| **Context** | The parent patterns that this pattern helps to implement. A workflow has none: "— (top level)" |
| **Situation** | One sentence: what the user is trying to do at this point of the parent pattern. For a workflow, the high-level task. It tells the designer when the pattern applies |
| **Problem** | One sentence: what goes wrong for the user without this pattern. State a consequence that the user meets. Do not name the solution or its absence. Test: a reader who does not know the Solution understands it |
| **Solution** | How to build the pattern into a design, in terms that hold in any domain. It uses the patterns of the next level down as building blocks. Workflow: a diagram of the subtasks, then one line per subtask. Subtask: numbered steps. Each step starts with the component used, "C-n Name", or "(no component)". Under it, *User:* what the user does, and *System:* what the system shows or does. Write "—" when one side does nothing in the step. Component: an eigen-UI card (see Components) |
| **Examples** | One narrative per exemplar system that has the pattern. Name the tool, then tell how a user performs the pattern in it, step by step, in 3 to 5 sentences, with § numbers. Domain terms are permitted here only |
| **References** | The child patterns that implement this pattern |

**A component serves two or more subtasks.** When a need occurs in one subtask only, the step
states the action and says "(no component)". The step leaves the UI open. Three needs are like
this: a record of a discussion (SY-2), an editable procedure (EV-3), and a verdict (EV-4).

(Deferred for the MVP: Borchers's tradeoff/forces, diagram, picture, and ranking.)

---

## How the four systems divide

Three workflow patterns. WF-B and WF-C share half of their subtasks. WF-A stands apart.

| | WF-A Guided Candidate Search | WF-B Multi-Viewpoint Refinement | WF-C Decompose and Verify |
|---|---|---|---|
| Systems | HALO, HAPPIER | PerspectEvolver | THESEUS |
| The user works on | a population of candidates | one position, against contrasting viewpoints | one claim, in checkable parts |
| New input comes from | generated candidates and their scores | viewpoints that argue from source material | evidence the user collects outside the system |
| Progress is | fewer candidates, each one stronger | a sharper position, or a named disagreement | evidence per part, and a revised structure |

**Alternatives considered.** One workflow for all four systems puts two different activities in
one shape: to screen a population, and to revise a claim. Two workflows, with PerspectEvolver
and THESEUS together, fail at two subtasks. To form contrasting viewpoints is not to decompose
a claim into parts. A generated argument is not evidence from the world. The split below states
the shared part as three shared subtasks: FR-2, CM-2, and CN-1.

---

## Patterns

Each pattern is one file, `patterns/<ID>.md` (10/6). Front matter holds the short attributes;
the body holds Solution and Examples. The files are the source of truth for the website.
*Status* `single-system` marks a pattern that applies to one system (see "Two systems or more").

| ID | Name | Level | Role | Status | Systems |
|---|---|---|---|---|---|
| [WF-A](patterns/WF-A.md) | Guided Candidate Search | workflow | — | active | HALO, HAPPIER |
| [WF-B](patterns/WF-B.md) | Multi-Viewpoint Refinement | workflow | — | active | PerspectEvolver |
| [WF-C](patterns/WF-C.md) | Decompose and Verify | workflow | — | active | THESEUS |
| [FR-1](patterns/FR-1.md) | State the Start and the Criteria | subtask | Frame | active | HALO, HAPPIER |
| [FR-2](patterns/FR-2.md) | State the Claim | subtask | Frame | active | PerspectEvolver, THESEUS |
| [EX-1](patterns/EX-1.md) | Generate Candidates | subtask | Expand | active | HALO, HAPPIER |
| [OR-1](patterns/OR-1.md) | Group Candidates by Criteria | subtask | Organize | active | HALO, HAPPIER |
| [EV-1](patterns/EV-1.md) | Check Candidates Against Every Criterion | subtask | Evaluate | active | HALO, HAPPIER |
| [CM-1](patterns/CM-1.md) | Keep Candidates and Start the Next Round | subtask | Commit | active | HALO, HAPPIER |
| [CM-2](patterns/CM-2.md) | Accept or Reject Proposed Revisions | subtask | Commit | active | PerspectEvolver, THESEUS |
| [CN-1](patterns/CN-1.md) | Propose Next Steps from Open Items | subtask | Continue | active | PerspectEvolver, THESEUS |
| [EX-2](patterns/EX-2.md) | Build Contrasting Viewpoints | subtask | Expand | single-system | PerspectEvolver |
| [EX-3](patterns/EX-3.md) | Split the Claim into Checkable Parts | subtask | Expand | single-system | THESEUS |
| [EV-2](patterns/EV-2.md) | Discuss One Question Across Viewpoints | subtask | Evaluate | single-system | PerspectEvolver |
| [EV-3](patterns/EV-3.md) | Collect Evidence for Each Part | subtask | Evaluate | single-system | THESEUS |
| [EV-4](patterns/EV-4.md) | Judge Each Part Against Its Evidence | subtask | Evaluate | single-system | THESEUS |
| [SY-1](patterns/SY-1.md) | Combine Partial Candidates | subtask | Synthesize | single-system | HALO |
| [SY-2](patterns/SY-2.md) | Summarize the Discussion | subtask | Synthesize | single-system | PerspectEvolver |
| [C-1](patterns/C-1.md) | Inquiry Frame | component | — | active | HALO, HAPPIER, PerspectEvolver, THESEUS |
| [C-3](patterns/C-3.md) | Candidate Groups | component | — | active | HALO, HAPPIER, PerspectEvolver |
| [C-4](patterns/C-4.md) | Persistent Structure Map | component | — | active | HALO, HAPPIER, PerspectEvolver, THESEUS |
| [C-5](patterns/C-5.md) | Multi-Criteria Encoding | component | — | active | HALO, HAPPIER |
| [C-6](patterns/C-6.md) | Detail on Demand | component | — | active | HALO, HAPPIER, THESEUS |
| [C-7](patterns/C-7.md) | Attached Evidence | component | — | active | HALO, HAPPIER, PerspectEvolver, THESEUS |
| [C-8](patterns/C-8.md) | Confidence Cue | component | — | active | HAPPIER, THESEUS |
| [C-9](patterns/C-9.md) | Scoped Conversation | component | — | active | PerspectEvolver, THESEUS |
| [C-10](patterns/C-10.md) | Proposal Set | component | — | active | HALO, PerspectEvolver, THESEUS |
| [C-11](patterns/C-11.md) | Reviewable Revision | component | — | active | PerspectEvolver, THESEUS |
| [C-12](patterns/C-12.md) | Shortlist | component | — | active | HAPPIER, PerspectEvolver |
| [C-14](patterns/C-14.md) | Provenance Link | component | — | active | HALO, PerspectEvolver, THESEUS |
| [C-17](patterns/C-17.md) | Typed Item | component | — | active | PerspectEvolver, THESEUS |

Retired IDs keep a short file with their successor: C-2, C-13 (→ C-10), C-15, C-16.

---

## Components

**Used by more than one workflow:** C-1, C-3, C-4, C-6, C-7, C-8, C-9, C-10, C-11, C-12, C-14, C-17.

**Retired, 9/29:** C-2 Candidate Batch, C-15 Live Consequence Preview, and C-16 Structured
Result Entry served one subtask each. They are now steps with no component. C-13 Suggested Next
Steps is merged into C-10 Proposal Set. A retired ID is not used again.

**Card** (9/29): at the component level the spec is an eigen-UI card, one HTML page per component
in `cards/`. It shows what the exemplar instances share, and the fields of the template. C-4 and
C-6 have cards. The other components keep the earlier YAML spec until they have a card. Since 10/6 the drawings are
`eigen-ui/C-<n>.svg`, and the website shows them on the card.

**Spec** links an abstract representation of the component: an element tree with data bindings,
variations, and events. A spec states what the design needs, and it states no style. It is
independent of any renderer: a rendering library is a way to look at a spec, and it constrains
nothing. Specs are in `refs/component-specs.md`.

<!-- <xac: the solution at this level of hierarchy can be an abstract representation of UI(s), e.g., a wireframe or styleless HTML. try linking 3 CPs to such representations> -->

The component patterns are in `patterns/C-<n>.md`, listed under Patterns above.

## Check: does the language abstract all four systems?

| System | Workflow | Subtasks | Components |
|---|---|---|---|
| HALO | WF-A | FR-1, EX-1, OR-1, EV-1, SY-1, CM-1 | C-1, C-3, C-4, C-5, C-6, C-7, C-8, C-10, C-12, C-14 |
| HAPPIER | WF-A | FR-1, EX-1, OR-1, EV-1, CM-1 (no SY-1) | C-1, C-3, C-4, C-5, C-6, C-7, C-8, C-12, C-14 |
| PerspectEvolver | WF-B | FR-2, EX-2, EV-2, SY-2, CM-2, CN-1 | C-1, C-3, C-4, C-6, C-7, C-9, C-10, C-11, C-12, C-14, C-17 |
| THESEUS | WF-C | FR-2, EX-3, EV-3, EV-4, CM-2, CN-1 | C-1, C-4, C-6, C-7, C-8, C-9, C-10, C-11, C-14, C-17 |

The Components column is computed from the subtask Solutions. It lists every component of the
subtasks that the system performs. A system can lack one of them in its paper.

**Open for your judgment.**
- HALO and HAPPIER differ at SY-1. The two can be an optimization variant and a screening variant
  of WF-A, and not one workflow.
- WF-B and WF-C each rest on one system. A system outside `data/` must confirm them.
