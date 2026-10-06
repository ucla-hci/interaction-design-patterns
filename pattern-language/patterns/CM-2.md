---
id: "CM-2"
name: "Accept or Reject Proposed Revisions"
level: "subtask"
role: "Commit"
status: "active"
context: ["WF-B", "WF-C"]
situation: "The previous subtask implies changes to the work, and the user must decide which ones to take."
problem: "The user either cannot see what the system changed in the work, or must make every change by hand."
systems: ["PerspectEvolver", "THESEUS"]
references: ["C-10", "C-11", "C-14"]
aliases: ["S2"]
---

## Solution

1. C-11 Reviewable Revision
   - *User:* —
   - *System:* when the previous subtask implies one change, drafts it. Shows before, after,
     and the reason. Applies nothing.
2. C-10 Proposal Set
   - *User:* compares the options and selects one.
   - *System:* when several directions are open, shows each option with a label and its
     rationale.
3. C-11 Reviewable Revision
   - *User:* accepts, edits, or rejects each change.
   - *System:* changes the work only when the user accepts or edits.
4. C-14 Provenance Link
   - *User:* —
   - *System:* keeps the replaced content, and links it to its successor.
5. C-11 Reviewable Revision
   - *User:* —
   - *System:* when the item changed after the draft, rejects the draft.

## Examples

- *PerspectEvolver.* After a discussion, Reflection changes only the Perspective fields that
  the discussion affected. Revision cards show the previous and the revised text of each
  field (§4.3.1). History keeps the previous text, "Why this changed", and the thread that
  prompted it (§4.3.1). For the Investigation Brief, each proposal shows its additions and
  deletions with a reason. The researcher accepts, edits, or rejects each one, then confirms
  with Apply decisions (§4.3.2). In the study, participants accepted 70% of revisions as
  drafted, edited 28%, and rejected 2% (§6.2.2).
- *THESEUS.* After the researcher picks a follow-up direction, THESEUS shows three preview
  candidates. The validation state changes only when the researcher submits one (§4.3). A
  replacement hypothesis keeps the earlier experiments as history (§4.3). In the discussion
  drawer, drafted edits stay pending until the researcher applies or discards them. A draft is
  rejected when the graph changed after the discussion began (§4.4).
