# Component specs (MVP)

> 9/29: an eigen-UI card in `pattern-language/cards/` replaces the YAML spec of a component. C-6
> has a card; its YAML spec below is kept as a record only. C-1 and C-11 have no card yet.

Abstract representation of a component pattern, for `pattern-language-mvp.md`. A spec states the
element tree, the data it binds, its variations, and the events it emits. It states no style.

**A spec is independent of any renderer.** It states what the design needs. A rendering library
is a way to look at a spec, and it constrains nothing. When a renderer cannot draw an element,
that is a limit of the renderer.

Notation, in the form of the maui pattern mini-language
(`~/dev/maui/.agent/compilation-rules.md` §2): `Element #id` names an element · `@/path` binds
data · `{@/path}` interpolates · `?state` marks a conditional subtree · `*@/path` repeats a
subtree per list item, with `@./field` inside it · `-> event name` declares the event a control
emits · `fallback:` is the prose rendering · `needs:` lists the element kinds the design
requires.

Paths and labels are domain-neutral. A designer replaces the paths, not the structure.

**`states:` are moments, not alternatives.** A component draws differently at different points
of the work, and each name is one of those moments. A user passes through them. C-1 has
`setup` before the work starts and `running` beside the work. They are not two candidate designs
for a reader to choose between. Two candidate designs are two patterns.

## Visualization check, 9/22

C-1 was compiled and drawn with the maui implementation, to see the spec as a UI:
`lib/agent/pattern-compiler.ts` and `components/a2ui-renderer.tsx`. No API key was needed, so
none was copied. The scratch script ran in `~/dev/maui` and was deleted. `npx tsx` installed
`tsx@4.23.15` on first run.

Results:

- The notation held. The compiler expanded `*@/root/criteria` into `criterion-0` and
  `criterion-1`, resolved `@./name` and `@./value` against each item, emitted `?setup` and
  `?running` as separate surfaces, and attached an event to each button.
- The `running` variation drew completely: interpolated text, one row per criterion, and the
  Edit button.
- The `setup` variation drew three notices: `Unsupported component: TextField`. That renderer
  draws Card, Column, Row, Text, LineChart, NumberField, and Button. It has no text input.
- C-1 keeps its text input. The design needs one. A renderer that lacks it draws less of the
  spec, and the spec does not change.

---

## C-1 · Inquiry Frame

```yaml
- id: inquiry-frame
  desc: the goal and the criteria of the work, in typed fields
  purpose: |
    Holds what the user works toward, and the criteria that judge it, in one place that every
    later step reads. The user fills it in before the work starts. It stays visible beside the
    work, and a proposed change to it arrives here for a decision.
  context: A1 Set Targets (WF-A) · S1 Frame the Root (WF-B, WF-C)
  states: [setup, running]        # setup: before the work starts. running: beside the work
  transitions:                    # what moves the user from one state to the next
    - {from: setup, to: running, when: "start_work"}
    - {from: running, to: running, when: "accept_revision"}
  binds: [/root/label, /root/start, /root/criteria, /root/proposal]
  needs: [container, heading, text input, list of fields, button, revision card]
  describes:                        # what a reader of the UI expects at each path
    /root/label: what the user works toward
    /root/start: the object the work starts from
    /root/criteria/name: name of one criterion
    /root/criteria/value: value the user gives that criterion
    /root/proposal/field: the field a proposed change affects
    /root/proposal/before: the current content of that field
    /root/proposal/after: the proposed content
    /root/proposal/reason: why the change is proposed
  layout: |
    Card #root:
      Column:
        Text #title: "{@/root/label}"
        ?setup Column #entry:
          TextField #start: value=@/root/start, label="starting point"
          *@/root/criteria TextField #criterion: value=@./value, label="{@./name}"
          Button #add: "Add criterion" -> event add_criterion
          Button #begin: "Start" -> event start_work
        ?running Column #summary:
          Text #startval: "starting point: {@/root/start}"
          *@/root/criteria Text #crit: "{@./name}: {@./value}"
          Button #edit: "Edit" -> event edit_frame
        ?running Card #proposal:            # a C-11 revision arrives here
          Column:
            Text #field: "{@/root/proposal/field}"
            Text #before: "before: {@/root/proposal/before}"
            Text #after: "after: {@/root/proposal/after}"
            Text #why: "reason: {@/root/proposal/reason}"
            Row #decide:
              Button #accept: "Accept" -> event accept_revision
              Button #reject: "Reject" -> event reject_revision
  events:
    - add_criterion
    - start_work(start=@/root/start)
    - edit_frame
    - accept_revision(field=@/root/proposal/field)
    - reject_revision(field=@/root/proposal/field)
  fallback: "{@/root/label}. starting point: {@/root/start}. one field per criterion."
```

<xac: we don't need to render these references /root/* on the ui; for input fields, add place holder to indicate what is expected as input; for output fields, add "alt-text" like description of what's expected as output; scale the overall UI appropriately based on its constituent components >

Notes. One field per criterion, not one text box: A4 encodes each criterion as its own channel.
The `running` state keeps the frame beside the work, which S1 step 3 requires. The proposal
subtree is the point where S1 step 4 refuses a silent rewrite.

---

## C-6 · Detail on Demand

```yaml
- id: detail-on-demand
  desc: a summary of every item, and the full evidence for one selected item
  purpose: |
    Lets the user scan many items and examine one of them without losing the others. The list
    carries only what can be read at a glance. The evidence behind one item opens beside it, so
    a claim can be checked instead of trusted.
  context: A4 Screen Against All Criteria · B3 Consolidate the Exchange · C1 Decompose into Checkable Parts · C3 Interpret Evidence Against the Part
  states: [closed, open]
  transitions:
    - {from: closed, to: open, when: "select_item"}
    - {from: open, to: closed, when: "close_detail"}
  needs: [container, list of items, selectable row, side panel, list of sources, button]
  describes:
    /items/label: name of one item
    /items/standing: how that item stands, at a glance
    /detail/label: name of the selected item
    /detail/claim: what the system says about the selected item
    /detail/confidence: how far the claim can be trusted, and on what basis
    /detail/evidence/label: one source behind the claim
    /detail/action_label: the action this item allows
  layout: |
    Row #root:
      Column #overview:
        *@/items Row #item:
          Button #label: "{@./label}" -> event select_item
          Text #standing: "{@./standing}"
      ?open Card #detail:
        Column:
          Text #title: "{@/detail/label}"
          Text #claim: "{@/detail/claim}"
          Text #confidence: "confidence: {@/detail/confidence}"   # C-8
          *@/detail/evidence Row #source:
            Text #srclabel: "{@./label}"
            Button #opensrc: "open source" -> event open_source
          Button #act: "{@/detail/action_label}" -> event act_on_item
          Button #close: "Close" -> event close_detail
  events:
    - select_item(item_id=@./id)
    - open_source(source_id=@./id)
    - act_on_item(item_id=@/detail/id)
    - close_detail
  fallback: "{@/detail/label}: {@/detail/claim}. evidence listed under the item."
```

Notes. The overview stays in the tree when the detail opens, so the user keeps the context.
Evidence repeats from the item's own list, which is C-7.

---

## C-11 · Reviewable Revision

```yaml
- id: reviewable-revision
  desc: proposed changes to one item, each with before, after, and a reason
  purpose: |
    Shows what a proposed change does to an item before anything changes. The user accepts,
    edits, or rejects each change, one field at a time, and applies the decisions together.
    Nothing enters the work without that action, and what a change replaced stays readable.
  context: S1 Frame the Root · S2 Revise Under Review
  states: [empty, pending, stale]
  transitions:
    - {from: empty, to: pending, when: "the system drafts a revision"}
    - {from: pending, to: empty, when: "apply_decisions"}
    - {from: pending, to: stale, when: "the item changes under the draft"}
  binds: [/target, /revisions, /counts, /history]
  needs: [container, card per change, before/after text, reason text, button, history list]
  describes:
    /target/label: the item the changes apply to
    /revisions/field: the field this change affects
    /revisions/before: the current content of that field
    /revisions/after: the proposed content
    /revisions/reason: why the change is proposed
    /revisions/origin_label: where the change came from
    /counts/accepted: number accepted
    /counts/edited: number edited
    /counts/rejected: number rejected
    /counts/pending: number waiting for a decision
    /history/field: the field an earlier change affected
    /history/before: its content before
    /history/after: its content after
    /history/reason: why it changed
  layout: |
    Card #root:
      Column:
        Text #title: "proposed changes to {@/target/label}"
        ?empty Text #none: "no proposed changes"
        ?stale Text #warn: "{@/target/label} changed after these drafts. redraft them."
        ?pending Column #list:
          *@/revisions Card #rev:
            Column:
              Text #field: "{@./field}"
              Text #before: "before: {@./before}"
              Text #after: "after: {@./after}"
              Text #why: "reason: {@./reason}"
              Button #origin: "origin: {@./origin_label}" -> event open_origin
              Row #decide:
                Button #accept: "Accept" -> event accept_revision
                Button #edit: "Edit, then accept" -> event edit_revision
                Button #reject: "Reject" -> event reject_revision
          Row #batch:
            Text #counts: "{@/counts/accepted} accepted, {@/counts/edited} edited, {@/counts/rejected} rejected"
            Button #apply: "Apply decisions" -> event apply_decisions
        Column #record:
          Text #histtitle: "history"
          *@/history Text #entry: "{@./field}: {@./before} to {@./after}. {@./reason}"
  events:
    - open_origin(origin_id=@./origin_id)
    - accept_revision(revision_id=@./id)
    - edit_revision(revision_id=@./id)
    - reject_revision(revision_id=@./id)
    - apply_decisions
  fallback: "{@/counts/pending} proposed changes to {@/target/label}, each with before, after, and a reason."
```

Notes. Decisions are per revision, and one control applies them together. The `stale` state is
S2 step 6: THESEUS rejects a pending draft when the graph changed under it. The history column
holds what a revision replaced, which is C-14.
