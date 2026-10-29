---
id: "CN-1"
name: "Propose Next Steps from Open Items"
level: "subtask"
role: "Continue"
status: "active"
context: ["WF-2", "WF-3"]
situation: "A round ends, and some items stay open."
problem: "A round ends with a disagreement or an inconclusive outcome, and the user stops or loses the open item."
systems: ["PerspectEvolver", "THESEUS"]
references: ["C-10", "C-14"]
aliases: ["S3"]
---

## Example

- `figures/CN-1/1-theseus.png` THESEUS Fig. 3, callout I: follow-up paths from a rejected hypothesis, and three candidates

1. See the open items. For an open item (the hypothesis H3, not approved), the system shows options
   (follow-up paths: Replacement hypothesis, Further experiment). Each option links to the items
   that raised it (2 source experiments).
2. Open an option. The user opens one option (choose). The system starts the work that it needs
   (three replacement candidates, pending).

## Solution

1. See the open items — C-10 Proposal Set, C-14 Provenance Link
   - *User:* —
   - *System:* collects the open items of the round. Shows each one as an unopened option in a
     [proposal set](C-10), with a [provenance link](C-14) to the item that raised it.
2. Open an option — C-10 Proposal Set
   - *User:* opens one option in the [proposal set](C-10), or leaves it for later.
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
