# Single-system patterns

Patterns that apply to one exemplar system only. They can be idiosyncratic, or they can become
patterns when a new system shows them. When a second system shows one, it moves back to
[pattern-language-mvp.md](pattern-language-mvp.md). Moved 9/29. The text is unchanged from the MVP.

Workflows: WF-A, WF-B, and WF-C are in the MVP. Components: none. Every active component applies
to two or more systems.

---

## WF-A · Guided Candidate Search

### A5 · Combine Partial Candidates **(1 system)**
- **Context:** WF-A
- **Problem:**
  - *Goal:* The user makes new candidates from groups that pass only some criteria.
  - *Failure:* The user must find why each group fails, and must combine partial successes by
    hand.
- **Solution:**
  1. CP-10 Proposal Set: for each group, report what its candidates share, and what corrects the
     failed criteria. Show options within one group and across groups.
  2. (no component): when the user applies an option, edit the candidate. Show the gain and the
     loss on every criterion at once.
  3. CP-10 Proposal Set: when the user has a direction, reduce the number of open options.
  4. CP-14 Provenance Link: on save, create a candidate linked to its source.
- **Examples:** HALO MolStrategy gives strategies within a cluster. MolSynthesis gives strategies
  across clusters. Property scores update live, and a save adds a node with an edit edge
  (§4.2–4.3). Participants called the late-session strategy list too long (§5.2.3).
- **References:** CP-10 Proposal Set, CP-14 Provenance Link.

---

## Subtasks — WF-B · Multi-Viewpoint Refinement

### B1 · Build Contrasting Viewpoints
- **Context:** WF-B
- **Problem:**
  - *Goal:* The user gets a set of viewpoints that differ, each one with a stated basis.
  - *Failure:* A viewpoint requested in one sentence reads like every other viewpoint. The user
    cannot tell what each viewpoint contributes.
- **Solution:**
  1. CP-3 Candidate Groups: retrieve source material for the claim, and group it.
  2. CP-17 Typed Item: build one viewpoint per group. Give every viewpoint the same fields.
  3. CP-7 Attached Evidence: attach evidence to each field. Link it to its source passage.
  4. CP-12 Shortlist: the user compares viewpoints field by field, then keeps a working set.
  5. CP-4 Persistent Structure Map: show the working set on the map.
- **Examples:** PerspectEvolver maps about 1,370 retrieved papers into regions. It builds one
  Perspective Card per region, with six fields. The user selects 2 or 3 (§4.1.2–4.1.3).
- **References:** CP-3 Candidate Groups, CP-4 Persistent Structure Map, CP-7 Attached Evidence,
  CP-12 Shortlist, CP-17 Typed Item.

### B2 · Discuss One Question Across Viewpoints
- **Context:** WF-B
- **Problem:**
  - *Goal:* The user compares how the viewpoints answer one question.
  - *Failure:* In one long conversation the viewpoints blur. The user cannot tell which viewpoint
    produced a conclusion.
- **Solution:**
  1. CP-9 Scoped Conversation: the user opens one conversation per question, and names the
     participants.
  2. CP-9 Scoped Conversation: attribute each contribution to its viewpoint, and to the
     contribution it answers.
  3. CP-7 Attached Evidence: attach evidence to each empirical claim.
  4. CP-9 Scoped Conversation: the user addresses one participant, adds a participant,
     challenges a passage, or requests more turns.
- **Examples:** PerspectEvolver Deliberative Threads: attribution per contribution, @-mention,
  Quote response, Challenge, Expand, and 1 to 6 turns per request (§4.2.2).
- **References:** CP-7 Attached Evidence, CP-9 Scoped Conversation.

### B3 · Summarize the Discussion
- **Context:** WF-B
- **Problem:**
  - *Goal:* The user knows what a discussion settled, and what stays open.
  - *Failure:* A finished discussion is long. The user must read it again to find what it
    settled.
- **Solution:**
  1. (no component): when the user requests a record, record what holds, what conflicts, and
     what stays open. Keep a conflict as a conflict.
  2. CP-7 Attached Evidence: link each entry to its contributions and evidence.
  3. CP-6 Detail on Demand: the user selects an entry to open its contributions.
  4. (no component): when the user continues and requests another record, keep both records.
- **Examples:** PerspectEvolver Working Synthesis records the hypothesis, insights, agreements,
  disagreements, and open questions, with literature links. The user can synthesize the thread
  again (§4.2.3).
- **References:** CP-6 Detail on Demand, CP-7 Attached Evidence.

---

---

## Subtasks — WF-C · Decompose and Verify

### C1 · Split the Claim into Checkable Parts
- **Context:** WF-C
- **Problem:**
  - *Goal:* The user splits a broad claim into parts that one check each can test.
  - *Failure:* A broad claim cannot be checked in one step. A flat list of parts hides which part
    a check applies to.
- **Solution:**
  1. CP-4 Persistent Structure Map: propose a hierarchy of parts from the claim. State what a
     node and a link mean.
  2. CP-17 Typed Item: give each part the same fields: what varies, what is measured, and what
     is assumed.
  3. CP-7 Attached Evidence: attach the rationale and the sources to each parent-child link.
  4. CP-8 Confidence Cue: show a score on each proposed link.
  5. CP-9 Scoped Conversation: when the user selects a part, open a conversation about it.
  6. CP-4 Persistent Structure Map: the user edits parts, adds parts, and requests a further split
     of one part.
- **Examples:** THESEUS builds a sub-hypothesis graph with typed fields, a decomposition
  rationale with literature, and a confidence score per edge. It decomposes an approved leaf
  further on request (§4.1).
- **References:** CP-4 Persistent Structure Map, CP-7 Attached Evidence, CP-8 Confidence Cue,
  CP-9 Scoped Conversation, CP-17 Typed Item.

### C2 · Collect Evidence for Each Part
- **Context:** WF-C
- **Problem:**
  - *Goal:* The user collects an outcome for each part, under known conditions.
  - *Failure:* A drafted procedure does not match the setting of the user. A free-text outcome
    loses the conditions that produced it.
- **Solution:**
  1. (no component): attach a procedure to each part that it checks. State in advance which
     outcome supports, weakens, or leaves the part open.
  2. (no component): keep every field of the procedure editable, before and after a run. Support
     variants for different settings.
  3. CP-10 Proposal Set: when more than one procedure fits, show the options.
  4. (no component): the user reports outcomes in a template tied to the procedure. Check that the
     report covers every part.
  5. (no component): attach each outcome to one procedure. A variant does not inherit it.
- **Examples:** THESEUS creates experiment families with variants, editable step-by-step
  protocols, and expected patterns. It verifies the CSV upload against the experiment package
  (§4.2).
- **References:** CP-10 Proposal Set.

### C3 · Judge Each Part Against Its Evidence
- **Context:** WF-C
- **Problem:**
  - *Goal:* The user learns what an outcome means for the part that it checked.
  - *Failure:* A weak or negative outcome does not state its meaning. A global reinterpretation
    changes parts that the outcome did not touch.
- **Solution:**
  1. (no component): judge the outcome against the part that its procedure checked. Report one
     verdict: supported, not supported, or open.
  2. CP-7 Attached Evidence: keep the reasoning beside the verdict.
  3. CP-8 Confidence Cue: show how far the verdict can be trusted.
  4. CP-6 Detail on Demand: the user opens the reasoning, and contests the verdict.
  5. Change nothing else here. S2 applies the consequences.
- **Examples:** THESEUS runs three reviewers, for evidence, validity, and scope. Their votes
  produce one approved or not-approved label with a rationale, for that experiment and
  hypothesis pair (§4.3).
- **References:** CP-6 Detail on Demand, CP-7 Attached Evidence, CP-8 Confidence Cue.

---
