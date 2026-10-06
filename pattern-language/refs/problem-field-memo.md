# What does "Problem" mean in a pattern? (10/6)

*Status: decided 10/6. Context = Parents + Situation (the old Goal). Problem = one standalone failure statement. Applied at all three levels. See "Discussion (10/6)".*

## What the sources say

Read from the notes in `literature/`. The primary sources for Alexander (1977) and the Gang of
Four (1994) are not in the library. Nothing below states their definitions; that is a gap.

| Source | What "problem" means | Where |
|---|---|---|
| Borchers 2000 | "a short *problem statement* summarizes the competing 'forces', or design tradeoffs, and a more extensive *problem description* gives empirical background information, and shows existing solutions" | `literature/Borchers — …md`, Key Points |
| Folmer | "what problem does this design pattern facilitate solving?" It is separate from *Use when* and from *Principle* | `literature/Folmer — …md` |
| Tidwell | No Problem field. "Use when" and "Why" take its place | `literature/Tidwell — …md` |
| van Welie | context/problem/solution, in the Alexander form | `literature/vanWelie — …md` |
| Dearden | Templates vary. Some have forces or rationale, some only name/problem/solution. No standard | `literature/Dearden — …md` |

## What we do now, and where it differs

Our Problem has *Goal* (what the user sets out to achieve) and *Failure* (what goes wrong without
the pattern). Borchers's problem is the **forces**: the competing demands that make the design
hard. We moved the forces to a **Tradeoff** field, and deferred it (decisions, 9/22).

So our "Problem" is not the problem in the sense of the source we follow. Two effects show in FR-2:

- *Goal* restates the name. "State the Claim" → "The user states the claim that the later work
  serves." The Role field now carries the same job.
- *Failure* says what goes wrong, but not why the design is hard. Without the forces, the
  Solution looks obvious.

## Options

1. **Problem = Forces + Failure (recommended).** *Forces:* two demands that pull against each
   other, written "X vs. Y", with one sentence each. *Failure:* what goes wrong when one demand
   wins. Goal is dropped; the name and the Role state it. Tradeoff returns as part of Problem,
   not as a separate field. This is the Borchers problem statement.
2. **Borchers in full.** Problem statement (the forces) and problem description (the empirical
   background: the formative-study challenges in the exemplar papers, and the earlier solutions).
   More faithful, and longer. The papers give the background directly.
3. **Keep Goal + Failure, rename the field.** Call it *Need* or *Use when*, like Tidwell and
   Folmer. Add the forces later. Least work, and it stops claiming to be the Alexander problem.

  <xac: how about rename it as "Goal", which means replacing it with only the goal attribute. does it lose something important that a designer needs to know to decide whether to use a pattern>
  - Yes. Goal alone loses the reason to use the pattern. Read across the 15 subtasks (one reader):
    - *Goal says what the user wants.* In about 8 of 15 it restates the name (FR-1, FR-2, EX-1,
      EV-1, CM-1, SY-1, EX-3, EV-3). Every tool in the domain has the same goal, so the goal
      cannot tell a designer whether this pattern fits their tool.
    - *Failure says what goes wrong with the obvious design.* That is the test a designer runs:
      "Does my tool have this failure?" Each Failure clause also explains why a Solution step
      exists. EV-1: "a separate tool per criterion" → C-5 one view; "a generated score can be
      wrong" → C-8 and C-7. EV-2: "the viewpoints blur" → C-9 attribution. EV-4: "a global
      reinterpretation changes other parts" → step 5. Without the Failure, these steps have no
      reason, and a designer cannot tell when a simpler design is enough.
    - If Problem has one part only, keep Failure, not Goal. Goal is close to the name plus the
      Role. Failure is the information that only this field gives.

## FR-2 under Option 1 (sketch)

- **Problem:**
  - *Forces:* A quick start vs. a precise claim. The user wants to begin before the claim is
    exact. Every later subtask checks its work against the claim.
  - *Failure:* When the claim stays in the mind of the user, later work drifts. No contribution
    can be checked against the claim.

## Discussion (10/6): Goal into Context, Failure without a reference design

The author's proposal: the goal moves to Context, and Failure stands alone: "what goes wrong
without this pattern", with no reference to an "obvious design".

**Goal into Context: agree.** Borchers's context "explains which larger patterns it helps to
implement" and indicates when and where a pattern is used (local notes, Key Points). Our Context
lists the parent IDs only, so the *when* is missing. The goal of a subtask is that *when*: the
point in the parent workflow where the user needs this subtask. Context then has two parts:

- *Parents:* the parent patterns, as now.
- *Situation:* one sentence. In the parent workflow, what the user is trying to do at this point.

A workflow has no parent. Its Situation states the high-level task.

**Failure without this pattern: agree, with one rule.** "Without this pattern" can give an empty
statement: "Without State the Claim, the claim is not stated." Rule: state a consequence that the
user meets, and do not name the solution or its absence. Test: a reader who does not know the
Solution understands the Failure.

**The field name.** With the goal gone, the field holds the failure only. "Problem" fits again:
Folmer's sense, "what problem does this pattern facilitate solving". The forces stay deferred.

## Sketch: FR-2 and EV-1 under the proposal

### FR-2 · State the Claim
- **Role:** Frame
- **Context:**
  - *Parents:* WF-B, WF-C
  - *Situation:* At the start of a round, the user has a claim to develop or to check.
- **Problem:** The claim stays in the mind of the user. Later work drifts from it, and no
  contribution can be checked against it.

### EV-1 · Check Candidates Against Every Criterion
- **Role:** Evaluate
- **Context:**
  - *Parents:* WF-A
  - *Situation:* The user has groups of candidates, and must find the ones that pass every
    criterion.
- **Problem:** The user checks each criterion in a separate tool, one candidate at a time. A
  generated score can be wrong, and the user cannot tell.
