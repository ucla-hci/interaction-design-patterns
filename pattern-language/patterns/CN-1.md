---
id: "CN-1"
name: "Propose Next Steps from Open Items"
level: "subtask"
role: "Continue"
status: "active"
context: ["WF-B", "WF-C"]
situation: "A round ends, and some items stay open."
problem: "A round ends with a disagreement or an inconclusive outcome, and the user stops or loses the open item."
systems: ["PerspectEvolver", "THESEUS"]
references: ["C-10", "C-14"]
aliases: ["S3"]
---

## Solution

1. C-10 Proposal Set
   - *User:* —
   - *System:* collects the open items of the round. Shows each one as an option, unopened.
2. C-14 Provenance Link
   - *User:* —
   - *System:* links each option to the item that raised it.
3. C-10 Proposal Set
   - *User:* opens one option, or leaves it for later.
   - *System:* when the user opens an option, starts the subtask that the option needs.

## Examples

- *PerspectEvolver.* From the Working Synthesis and the current brief, the system proposes
  follow-up questions. They come from unresolved disagreements, limitations, and open
  questions (§4.3.3). They appear under Suggested Threads, and as prospective branches on the
  Canvas (§4.3.3, Fig. 4). The researcher reviews them first. Selecting one opens a new
  Deliberative Thread, linked to the discussion it came from (§4.3.3).
- *THESEUS.* When every experiment on a hypothesis has a current analysis, THESEUS reads the
  labels (§4.3). When all are approved, it suggests no corrective follow-up. Otherwise it
  offers two directions: replace the hypothesis, or run further experiments. The researcher
  picks one, and THESEUS generates three candidates for it (§4.3).
