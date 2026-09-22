# Borchers (2000): ideas to adopt (9/22, revised after review)

> Source: the summary at `literature/Borchers — A pattern approach to interaction desig ….md`.
> The paper itself was not read. The summary does not cover the formal pattern definition of
> Borchers. Applied in: `pattern-language-mvp.md`.
> Text follows ASD-STE100 Simplified Technical English. See `.agent/decisions.md`.

## 1. Hierarchy through context and references

**Borchers.** The **context** of a pattern is the set of larger patterns that it helps to
implement. Its **references** are the smaller patterns that complete it. The hierarchy leads a
designer from large design issues to details.

**Adopted.** Three levels: **workflow, subtask, component**.

- *Workflow*: the sequence of subtasks that a user performs with the system to achieve the
  high-level task.
- *Subtask*: one step in that sequence, for example filter generated ideas. Components support
  it.
- *Component*: a UI element or interaction that supports a subtask.

Every pattern states its `Context` (parents) and its `References` (children).

## 2. Attributes

**Borchers.** The essentials are name, context, problem, solution, examples, diagram, and
cross-references. His list from architecture also has a ranking, a picture, and a long problem
description.

**Adopted for the MVP.** Name, Level, Context, Problem, Solution, Examples, References. The
diagram, the picture, the ranking, and the tradeoff are deferred.

## 3. Tradeoff (the "forces" of Borchers)

**Borchers.** The problem statement states the competing forces that the solution must balance.

**Meaning.** Forces are the competing demands that make the problem hard, for example the speed
of a generated edit against the control of the user. Forces are not "why this pattern and not
another one", which is *Context*. They are not "what the pattern is good for", which is
consequences.

**Adopted, then deferred.** The field is named **Tradeoff** and is written "X vs. Y". It is not
in the MVP: it is not wanted on a first read of a pattern. The formative-study challenges in the
exemplar papers are a direct source when the field returns.

## 4. The name as shared vocabulary

**Borchers.** Pattern names give an interdisciplinary team a shared vocabulary. A name helps
recall, through *verbal recoding*.

**Adopted.** A name is a short noun phrase. A reader must remember it and use it in
conversation, for example *Proposal Set* and *Provenance Link*.
