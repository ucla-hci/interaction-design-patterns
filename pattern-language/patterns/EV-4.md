---
id: "EV-4"
name: "Judge Each Part Against Its Evidence"
level: "subtask"
role: "Evaluate"
status: "single-system"
context: ["WF-C"]
situation: "When an outcome arrives for a part, the user must learn what it means for that part."
problem: "A weak or negative outcome does not state what it means, or which parts it touches."
systems: ["THESEUS"]
references: ["C-6", "C-7", "C-8"]
aliases: ["C3"]
---

## Solution

1. (no component)
   - *User:* —
   - *System:* judges the outcome against the part that its procedure checked. Reports one
     verdict: supported, not supported, or open.
2. C-7 Attached Evidence
   - *User:* —
   - *System:* keeps the reasoning beside the verdict.
3. C-8 Confidence Cue
   - *User:* —
   - *System:* shows how far the verdict can be trusted.
4. C-6 Detail on Demand
   - *User:* opens the reasoning, and contests the verdict.
   - *System:* —
5. (no component)
   - *User:* —
   - *System:* changes nothing else. CM-2 applies the consequences.

## Examples

- *THESEUS.* For each experiment and hypothesis pair, three reviewers assess the result: an
  Evidence Analyst, an Experimental Validity Reviewer, and a Hypothesis Inference Reviewer
  (§4.3). Each returns a vote with a short rationale. A majority vote gives one label:
  approved or not approved by the result (§4.3). The label applies only to the submitted
  evidence. It is a review aid for the researcher (§4.3).
