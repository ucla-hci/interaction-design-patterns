---
id: "FR-2"
name: "State the Claim"
level: "subtask"
role: "Frame"
status: "active"
context: ["WF-2", "WF-3", "WF-4"]
situation: "At the start of a round, the user has a claim to develop or to check."
problem: "The claim stays in the mind of the user, so later work drifts and cannot be checked against it."
systems: ["PerspectEvolver", "THESEUS", "IdeaSynth"]
references: ["C-1", "C-11"]
aliases: ["S1"]
---

## Solution

1. State the claim — C-1 Inquiry Frame
   - *User:* fills one field of the [inquiry frame](C-1) per aspect of the claim. Can request a
     draft of a field, and edits the draft.
   - *System:* shows the fields. Drafts a field on request. Keeps the frame visible in every
     later subtask, and gives it to each subtask as input.
2. Review changes to the claim — C-11 Reviewable Revision
   - *User:* accepts, edits, or rejects each [reviewable revision](C-11) of the claim.
   - *System:* when later work implies a change to the claim, shows the revision: before, after,
     and the reason. Changes the frame only when the user accepts.

## Examples

- *PerspectEvolver.* A researcher starts with an Investigation Brief of five sections:
  Problem, Framing, Previous Work, Methodology, and Expected Results (§4.1.1). The brief stays
  visible and editable in the Document view for the whole investigation (§4.1.1, Fig. 4).
  Discovery reads the brief to write its literature queries (§4.1.2). After a discussion, the
  system proposes revisions to the affected sections; the researcher accepts, edits, or
  rejects each one (§4.3.2).
- *THESEUS.* A researcher enters a broad hypothesis on the landing page and sets the initial
  decomposition depth (§4.1). The hypothesis becomes the root of the map, and stays visible
  with its sub-hypotheses (§4.1). Each sub-hypothesis keeps the conditions that it inherits
  from its parent (§4.1).
- *IdeaSynth.* A researcher creates a "Problem Description and RQ" node, and enters the
  research question (§4.1.2, Fig. 4 ①). The facet type is chosen from a drop-down, and the
  researcher can start with any type (§4.2). "Get AI Suggestions" asks a clarifying question, and
  "Regenerate Current Research Component" rewrites the node (§4.1.3, Fig. 5 ③ ④). Every
  generation reads the nodes on the canvas (§4.2, §4.3). The paper shows no before and after
  for a rewrite.
