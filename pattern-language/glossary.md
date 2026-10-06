# Glossary

*Draft, 10/6. These terms have one meaning in the whole library. A pattern uses a term only in
this meaning. When a pattern needs a new term, add it here first.*

## Structure of the language

| Term | Meaning |
|---|---|
| **pattern** | A named, reusable solution to a problem that occurs in a context. It has one level |
| **workflow** | A pattern at the top level: the sequence of subtasks that a user performs to achieve a high-level task. It can branch and loop |
| **subtask** | A pattern at the middle level: one step in a workflow. Its solution is a sequence of steps that use components |
| **component** | A pattern at the bottom level: a UI element or an interaction that supports two or more subtasks |
| **role** | The job that a subtask does in the loop: Frame, Expand, Organize, Evaluate, Synthesize, Commit, or Continue |
| **step** | One numbered line of a subtask Solution. It names one component, what the user does, and what the system shows |
| **exemplar** | A published system from which the language is abstracted. The exemplars are in `data/` |
| **round** | One pass through a workflow, from the frame to the decision on what to keep |

## Actors

| Term | Meaning |
|---|---|
| **user** | The person who performs the workflow |
| **system** | The software that the user works with. It can use a model, a solver, a database, or a person to produce content |

## Objects of the work

| Term | Meaning |
|---|---|
| **work** | Everything the user builds in a workflow: the frame, the items, and their links |
| **frame** | The statement of the goal and the criteria that every later subtask reads. The user owns it |
| **claim** | A statement that the user wants to develop or to check. In WF-B and WF-C, the frame holds a claim |
| **criterion** | A condition that an item must satisfy. A criterion can be measured or judged |
| **item** | Any unit of the work that the user can select: a candidate, a part, a viewpoint, a group, or a record |
| **candidate** | An item that can satisfy the criteria. The user keeps it or rejects it |
| **part** | An item that comes from the split of a claim. One check can test it |
| **viewpoint** | An item that argues from one position, with its sources |
| **group** | A set of items that share a signature. It has a label and a summary |
| **evidence** | Material that supports or contradicts an item: a source, a score, or an outcome |
| **outcome** | The result of a check that the user ran |
| **record** | A stored summary of what a subtask found: what holds, what conflicts, and what stays open |
| **open item** | A question, a conflict, or an outcome that a round did not resolve |
| **proposal** | A change or an option that the system shows and does not apply |
| **link** | A stored relation between two items, or between an item and its origin |

## Actions

| Term | Meaning |
|---|---|
| **show** | The system makes something visible |
| **open** | The system shows the full content of an item that was shown as a summary |
| **select** | The user picks one item. Selection changes nothing in the work |
| **propose** | The system shows a proposal |
| **accept** | The user applies a proposal to the work |
| **reject** | The user discards a proposal or a candidate |
| **keep** | The user adds an item to the set that the round delivers |
