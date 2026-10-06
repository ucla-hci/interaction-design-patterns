# Subtask taxonomy — brainstorm (10/6)

*Status: for discussion. Nothing in the MVP changes until the author picks an option.*

All 15 subtasks stay. The question: how do we sort them, so that the reader sees how they
relate across workflows? Today they are sorted by workflow (A, B, C, S) and by generality (MVP or
single-system). Neither sort shows that two subtasks in different workflows do the same job.

## Option 1 — By role in the loop (recommended as the main axis)

Each subtask does one job in a loop that all three workflows share.

| Role | What the subtask does | WF-A | WF-B | WF-C |
|---|---|---|---|---|
| **Frame** | states the goal and the criteria | A1 | S1 | S1 |
| **Expand** | adds new items to the work | A2 | B1 | C1 |
| **Organize** | gives the items a structure | A3 | — | C1 |
| **Evaluate** | tests items against criteria or evidence | A4 | B2 | C2, C3 |
| **Synthesize** | makes one item from several | A5 | B3 | — |
| **Commit** | decides what the work keeps | A6 | S2 | S2 |
| **Continue** | starts the next round from what is open | A6 | S3 | S3 |

What it shows:
- A1 and S1 do the same job. They can merge into one shared subtask, "State the Goal and the
  Criteria". Then WF-A also starts with a shared subtask.
- A6 does two jobs, Commit and Continue. S2 and S3 split those two jobs. That suggests A6 also
  splits, or that S2/S3 merge.
- Each single-system subtask has a role with MVP subtasks in it. B1 and C1 are both Expand. A
  more abstract subtask can cover both and enter the MVP under the two-system rule. This is a
  promotion path, like the one in the component rules.
- C1 is in two roles. A subtask in two roles can be too large.

## Option 2 — By who acts (division of labor)

This links to the backlog item "Add division of labor to workflow".

| Who acts | Subtasks |
|---|---|
| The user acts; the system holds the result | A1, S1, C2 |
| The system proposes; the user disposes | A2, B1, C1, S2, S3, A5 |
| The system acts; the user reads | A3, B3, C3 |
| Both act in turn | A4, B2, A6 |

What it shows: most subtasks are "the system proposes, the user disposes". This axis is
fragile: it describes the four exemplars, and a system with no generator changes it. It
conflicts with "No assumption of AI" if the reader takes "system" to mean a model.

## Option 3 — By operation on the working set

| Operation | Subtasks |
|---|---|
| Create items | A2, B1, C1 |
| Reduce items | A3, A4, A6 |
| Transform items | A5, S2 |
| Relate items | B2, C3 |
| Record | B3, C2 |
| Frame or reframe | A1, S1, S3 |

What it shows: close to Option 1, but it ignores order. It does not explain why a subtask comes
where it does in a workflow.

## Proposal

- Use Option 1 as the main axis and keep generality (MVP or single-system) as the second axis. A
  roles × workflows table, like the one above, goes near the top of the MVP. Single-system
  subtasks show in it, marked, and do not need their own sections in the MVP.
- Keep Option 2 for the division-of-labor backlog item. Do not use it as the taxonomy.

## Questions for the author

1. Is the role axis correct? Are seven roles too many? Organize and Synthesize could merge.
2. Do we act on what the table shows (merge A1 into S1, split A6), or only show it?
3. Does the roles table replace the "Shared subtasks" / "Subtasks — WF-A" sections, or go on
   top of them?

---

## Decision (10/6)

Option 1, role in the loop, tentatively. The roles can change when more papers are added.

## Subtask IDs — proposal (10/6)

*Status: Scheme 1 adopted 10/6, with C1 → Expand and A6 → Commit. Applied to the MVP, `single-system-patterns.md`, and the C-4 and C-6 cards. The table below is the was → now list.*

The current IDs give the workflow (A, B, C, S). They do not give the role. When a subtask
becomes shared, its ID must change (S1 was a B and a C subtask before). The taxonomy is
tentative, so an ID that holds the role can also change. Three schemes:

### Scheme 1 — Role code + number (recommended)

Two letters for the role, then a number in the order of first use (WF-A, then WF-B, then WF-C).
A subtask in two roles takes its main role.

| Role | New ID | Was | Name |
|---|---|---|---|
| Frame | FR-1 | A1 | State the Start and the Criteria |
| Frame | FR-2 | S1 | State the Claim |
| Expand | EX-1 | A2 | Generate Candidates |
| Expand | EX-2 | B1 | Build Contrasting Viewpoints |
| Expand | EX-3 | C1 | Split the Claim into Checkable Parts (also Organize) |
| Organize | OR-1 | A3 | Group Candidates by Criteria |
| Evaluate | EV-1 | A4 | Check Candidates Against Every Criterion |
| Evaluate | EV-2 | B2 | Discuss One Question Across Viewpoints |
| Evaluate | EV-3 | C2 | Collect Evidence for Each Part |
| Evaluate | EV-4 | C3 | Judge Each Part Against Its Evidence |
| Synthesize | SY-1 | A5 | Combine Partial Candidates |
| Synthesize | SY-2 | B3 | Summarize the Discussion |
| Commit | CM-1 | A6 | Keep Candidates and Start the Next Round (also Continue) |
| Commit | CM-2 | S2 | Accept or Reject Proposed Revisions |
| Continue | CN-1 | S3 | Propose Next Steps from Open Items |

The workflows then read as role sequences:

- WF-A: FR-1 → EX-1 → OR-1 → EV-1 → SY-1 → CM-1
- WF-B: FR-2 → EX-2 → EV-2 → SY-2 → CM-2 → CN-1
- WF-C: FR-2 → EX-3 → EV-3 → EV-4 → CM-2 → CN-1

Gains: the role is visible in every diagram, step, and CP Context column. The three workflows
can be compared position by position. A shared subtask keeps its ID.
Costs: the ID does not give the workflow; the Context field gives it. When a role changes, the
ID changes. Keep an alias list (was → now), and do not use a retired ID again, as for CPs.

### Scheme 2 — Role code + workflow letter

`FR-A`, `FR-S`, `EX-A`, `EX-B`, `EX-C`, `EV-C1`, `EV-C2`, … Gives the role and the workflow.
The ID changes when the role changes *or* when the subtask becomes shared. It also needs a
number when one workflow has two subtasks in one role (C2, C3).

### Scheme 3 — Keep the IDs, add a Role field

A1…S3 stay. Each subtask gets a **Role** field, and the diagrams show it in each node. The
IDs never change with the taxonomy, but the ID itself shows nothing about the role.
