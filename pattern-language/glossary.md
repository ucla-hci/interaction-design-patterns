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
| **step** | One numbered line of a subtask Solution. Its name states what the user does, as a verb and its object. It names the components that it uses, what the user does, and what the system shows |
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
| **claim** | A statement that the user wants to develop or to check |
| **criterion** | A condition that an item must satisfy. A criterion can be measured or judged |
| **item** | Any unit of the work that the user can select: a candidate, a part, a viewpoint, a group, or a record |
| **candidate** | An item that can satisfy the criteria. The user keeps it or rejects it |
| **part** | An item that comes from the split of a claim. The user can check it or develop it alone |
| **viewpoint** | An item that argues from one position, with its sources |
| **group** | A set of items that share a signature. It has a label and a summary |
| **source** | Material outside the work that the system reads: a paper, a page, or a dataset |
| **collection** | The sources that the user adds. The system cites no source outside it |
| **alternative** | An item of the same kind as another item, that the system proposes beside it |
| **composition** | A document that the system writes from parts that the user selects. It keeps a link to each part |
| **evidence** | Material that supports or contradicts an item: a source, a score, or an outcome |
| **outcome** | The result of a check that the user ran |
| **record** | A stored summary of what a subtask found: what holds, what conflicts, and what stays open |
| **open item** | A question, a conflict, or an outcome that a round did not resolve |
| **proposal** | A change or an option that the system shows and does not apply |
| **link** | A stored relation between two items, or between an item and its origin |
| **field** | One named slot of an item or of the frame. It holds one value |
| **batch** | The set of candidates that the system returns for one request |
| **signature** | The results of an item on all criteria, together. Items with the same signature form a group |
| **score** | A value that the system gives to an item on one criterion, or to a link |
| **working set** | The viewpoints that the user keeps for the discussion |
| **participant** | A viewpoint that takes part in a conversation |
| **contribution** | One turn of a participant in a conversation |
| **entry** | One line of a record: a point that holds, a conflict, or a point that stays open |
| **procedure** | The method that checks one part. It states in advance which outcome supports the part, weakens it, or leaves it open |
| **variant** | A copy of a procedure, changed for a different setting. It does not inherit the outcomes of the procedure |
| **verdict** | The judgement of a part against its outcome: supported, not supported, or open |
| **draft** | Content that the system writes for the user to edit. It changes nothing until the user accepts it |
| **option** | One of two or more proposals. The user selects one |
| **direction** | A way in which the work can change next. Each option follows one direction, and choosing a direction closes the options that do not follow it |

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
