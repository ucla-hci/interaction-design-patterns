# Subtask steps: draft rewrite to 3 steps or fewer (10/13/2026)

Applied to `patterns/*.md` on 10/13/2026, after the author asked for similar steps to merge (journal, 10/13).

Rule (decisions, 10/13): a subtask has 3 steps or fewer. A subtask with more is split, or its
steps merge. Where possible, a step pairs a user action with the system response.

**Summary.** 64 steps become 36. Every subtask fits in 3 steps by merging, so this draft splits
none. Each subtask keeps every component that it used before, so the component counts do not
change. A merged step names all of its components. Text marked *[new]* is not in the current
file; all other text is the current wording, merged.

Steps that stay one-sided (the other side does nothing): EX-2 1, OR-1 1, EV-1 3, EV-4 1 and 2,
CM-1 2 and 3, CN-1 1.

Possible splits, if you prefer splitting to merging:
- EX-3: "Propose Parts" (step 1) and "Refine Parts" (steps 2 and 3).
- EV-3: "Set Up a Procedure" (steps 1 and 2) and "Report Outcomes" (step 3).

---

## FR-1 State the Start and the Criteria (2 → 1)

1. C-1 Inquiry Frame
   - *User:* enters the starting point, and one value per criterion, each in the format of the
     domain.
   - *System:* shows one field for the starting point and one per criterion. Flags a field that
     a later subtask requires. Keeps the fields visible. EX-1, OR-1, and EV-1 read them.

## FR-2 State the Claim (3 → 2)

1. C-1 Inquiry Frame
   - *User:* fills one field per aspect of the claim. Can request a draft of a field, and edits
     the draft.
   - *System:* shows the fields. Drafts a field on request. Keeps the frame visible in every
     later subtask, and gives it to each subtask as input.
2. C-11 Reviewable Revision
   - *User:* accepts, edits, or rejects each change to the claim.
   - *System:* when later work implies a change to the claim, shows before, after, and the
     reason. Changes the frame only when the user accepts.

## EX-1 Generate Candidates (5 → 2)

1. C-1 Inquiry Frame, C-4 Persistent Structure Map, C-14 Provenance Link
   - *User:* requests candidates from the current starting point and criteria.
   - *System:* returns a batch, not one answer. Sizes it so that the groups in OR-1 stay
     legible. Puts each candidate on the map, and links it to the request that produced it.
2. C-1 Inquiry Frame
   - *User:* edits the criteria, and requests another batch.
   - *System:* *[new]* returns the next batch in the same way.

## EX-2 Build Contrasting Viewpoints (5 → 3)

1. C-3 Candidate Groups, C-17 Typed Item
   - *User:* —
   - *System:* retrieves source material for the claim, and groups it. Builds one viewpoint per
     group. Gives every viewpoint the same fields.
2. C-7 Attached Evidence
   - *User:* opens the sources of a field.
   - *System:* attaches evidence to each field. Links it to its source passage.
3. C-12 Shortlist, C-4 Persistent Structure Map
   - *User:* compares the viewpoints field by field, then keeps a working set.
   - *System:* shows the working set on the map.

## EX-3 Split the Claim into Checkable Parts (6 → 3)

1. C-4 Persistent Structure Map, C-17 Typed Item, C-7 Attached Evidence, C-8 Confidence Cue
   - *User:* opens the rationale of a link.
   - *System:* proposes a hierarchy of parts from the claim. States what a node and a link
     mean. Gives each part the same fields: what varies, what is measured, and what is assumed.
     Attaches the rationale, the sources, and a score to each parent-child link.
2. C-9 Scoped Conversation
   - *User:* selects a part, and opens a conversation about it.
   - *System:* answers about that part and its neighbors.
3. C-4 Persistent Structure Map
   - *User:* edits parts, adds parts, and requests a further split of one part.
   - *System:* adds the new parts to the map.

## OR-1 Group Candidates by Criteria (4 → 2)

1. C-3 Candidate Groups, C-5 Multi-Criteria Encoding, C-4 Persistent Structure Map
   - *User:* —
   - *System:* groups the candidates by a signature from the criteria, not by generation order.
     Labels and summarizes each group, marks it by its result on each criterion, and shows it
     on the map.
2. C-6 Detail on Demand
   - *User:* selects a group.
   - *System:* lists the candidates of the group.

## EV-1 Check Candidates Against Every Criterion (5 → 3)

1. C-5 Multi-Criteria Encoding, C-8 Confidence Cue
   - *User:* turns criteria on and off.
   - *System:* shows every criterion on one view. Gives each criterion one visual channel and
     one toggle. When the system generated a score, shows the cue beside it.
2. C-6 Detail on Demand, C-7 Attached Evidence
   - *User:* selects a candidate, and reads the evidence for each score.
   - *System:* opens the detail of the candidate, with the evidence.
3. C-5 Multi-Criteria Encoding
   - *User:* rejects candidates, then goes back to OR-1 for the next group.
   - *System:* —

## EV-2 Discuss One Question Across Viewpoints (4 → 2)

1. C-9 Scoped Conversation, C-7 Attached Evidence
   - *User:* opens one conversation per question, and names the participants.
   - *System:* attributes each contribution to its viewpoint, and to the contribution it
     answers. Attaches evidence to each empirical claim.
2. C-9 Scoped Conversation
   - *User:* addresses one participant, adds a participant, challenges a passage, or requests
     more turns.
   - *System:* answers within the same conversation.

## EV-3 Collect Evidence for Each Part (5 → 3)

1. (no component)
   - *User:* edits any field of the procedure, before and after a run.
   - *System:* attaches a procedure to each part that it checks. States in advance which
     outcome supports, weakens, or leaves the part open. Supports variants for different
     settings.
2. C-10 Proposal Set
   - *User:* selects one procedure.
   - *System:* when more than one procedure fits, shows the options.
3. (no component)
   - *User:* reports outcomes in a template tied to the procedure.
   - *System:* checks that the report covers every part. Attaches each outcome to one
     procedure. A variant does not inherit it.

## EV-4 Judge Each Part Against Its Evidence (5 → 2)

1. C-7 Attached Evidence, C-8 Confidence Cue
   - *User:* —
   - *System:* judges the outcome against the part that its procedure checked. Reports one
     verdict: supported, not supported, or open. Keeps the reasoning beside the verdict, and
     shows how far the verdict can be trusted. Changes nothing else. CM-2 applies the
     consequences.
2. C-6 Detail on Demand
   - *User:* opens the reasoning, and contests the verdict.
   - *System:* —

## SY-1 Combine Partial Candidates (4 → 3)

1. C-10 Proposal Set
   - *User:* applies an option.
   - *System:* for each group, reports what its candidates share, and what corrects the failed
     criteria. Shows options within one group and across groups. When the user applies one,
     edits the candidate, and shows the gain and the loss on every criterion at once.
2. C-10 Proposal Set
   - *User:* chooses a direction.
   - *System:* reduces the number of open options.
3. C-14 Provenance Link
   - *User:* saves the candidate.
   - *System:* creates a candidate linked to its source.

## SY-2 Summarize the Discussion (4 → 3)

1. C-7 Attached Evidence
   - *User:* requests a record.
   - *System:* records what holds, what conflicts, and what stays open. Keeps a conflict as a
     conflict. Links each entry to its contributions and evidence.
2. C-6 Detail on Demand
   - *User:* selects an entry.
   - *System:* opens the contributions of the entry.
3. (no component)
   - *User:* continues the discussion, and requests another record.
   - *System:* keeps both records.

## CM-1 Keep Candidates and Start the Next Round (4 → 3)

1. C-12 Shortlist, C-14 Provenance Link
   - *User:* keeps a candidate.
   - *System:* gives every candidate a keep action. Shows the shortlist as its own view. It is
     the deliverable. Keeps the link on each kept candidate.
2. C-12 Shortlist
   - *User:* filters the shortlist by group.
   - *System:* —
3. C-1 Inquiry Frame
   - *User:* sends a kept candidate to EX-1 as the next starting point.
   - *System:* —

## CM-2 Accept or Reject Proposed Revisions (5 → 2)

1. C-11 Reviewable Revision, C-10 Proposal Set
   - *User:* compares the options and selects one.
   - *System:* when the previous subtask implies one change, drafts it. Shows before, after,
     and the reason. Applies nothing. When several directions are open, shows each option with
     a label and its rationale.
2. C-11 Reviewable Revision, C-14 Provenance Link
   - *User:* accepts, edits, or rejects each change.
   - *System:* changes the work only when the user accepts or edits. Keeps the replaced
     content, and links it to its successor. When the item changed after the draft, rejects
     the draft.

## CN-1 Propose Next Steps from Open Items (3 → 2)

1. C-10 Proposal Set, C-14 Provenance Link
   - *User:* —
   - *System:* collects the open items of the round. Shows each one as an option, unopened, and
     links it to the item that raised it.
2. C-10 Proposal Set
   - *User:* opens one option, or leaves it for later.
   - *System:* when the user opens an option, starts the subtask that the option needs.
