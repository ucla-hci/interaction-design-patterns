---
id: "EV-4"
name: "Judge Each Part Against Its Evidence"
level: "subtask"
role: "Evaluate"
status: "single-system"
context: ["WF-3"]
situation: "When an outcome arrives for a part, the user must learn what it means for that part."
problem: "A weak or negative outcome does not state what it means, or which parts it touches."
systems: ["THESEUS"]
references: ["C-6", "C-7", "C-8"]
aliases: ["C3"]
---

## Solution

1. Get a verdict — C-7 Attached Evidence, C-8 Confidence Cue
   - *User:* —
   - *System:* judges the outcome against the part that its procedure checked. Reports one
     verdict: supported, not supported, or open. Keeps the reasoning beside the verdict as
     [attached evidence](C-7). Shows how far the verdict can be trusted with a [confidence
     cue](C-8). Changes nothing else. CM-2 applies the consequences.
2. Contest the verdict — C-6 Detail on Demand
   - *User:* opens the reasoning in a [detail](C-6) view, and contests the verdict.
   - *System:* —

## Examples

- *THESEUS.* For each experiment and hypothesis pair, three reviewers assess the result: an
  Evidence Analyst, an Experimental Validity Reviewer, and a Hypothesis Inference Reviewer
  (§4.3). Each returns a vote with a short rationale. A majority vote gives one label:
  approved or not approved by the result (§4.3). The label applies only to the submitted
  evidence. It is a review aid for the researcher (§4.3).
