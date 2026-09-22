# A pattern language to abstract the design of interactive systems

## back-log
<!-- what we will work on some time in the future -->
- We should develop a agentic framework for extractively defining such language given a set of papers
- Add division of labor to workflow

## next-up
<!-- what we should work on next time -->
- self-finetune CP rendering: for a CP, extract corresponding screen from the example papers -> compare the current rendering with the real examples to evaluate how the former can abstractly represent the latter -> identify areas for improvement and repeat
- continue to review mvp
- add some other groups' papers (e.g., AI2's)

## 9/22/2026
```
- [fyi] we are pivoting this project into "A pattern language to abstract the design of interactive systems', which goes beyond the scope of individual UI screens
- [x] review the papers in data/; those are our starter exemplar systems as a small training set to develop our pattern language
- [x] review the summary of "Borchers — A pattern approach to interaction design" and translate the paper into specific ideas we can adopt in developing our pattern language, e.g., the hierarchical nature of patterns and the list of key attributes based on an example in architecture

```

### Review Exemplar Systems in `data/`

**Approach.** Read all four papers end to end up to References; appendices and figures not read. Full review: `pattern-language/refs/exemplar-systems-review.md`.

**What the set is.** HALO, HAPPIER, PerspectEvolver, and THESEUS are human–AI tools for scientific hypothesis work. They cover adjacent stages of one pipeline: ideate → generate → validate. All four follow the same paper template: formative study → 3 challenges → 3 design goals → 3 components → study against a baseline with the same model.

**Candidate patterns (17, three levels).**
- *System*: Theory-Staged Workflow, Diverge–Converge Loop, Unresolved Seeds Next Round, Phase-Dependent Initiative.
- *Workspace*: Externalized Evolving State, Cluster the Generated Space, All Criteria One View, Overview then Detail, Structured Unit of Viewpoint.
- *Component*: Rationale Attached at the Link, Propose Then Commit, Before/After Revision Card, Scoped AI Action, Live Consequence Preview, Personal Shortlist, Confidence Cue, Mark-the-Moment.

**Key observations.** The formative "challenges" in each paper are ready-made problem statements (forces) for patterns. Each baseline keeps the same AI model and removes the structure, which amounts to a pattern ablation at system scale. The load-bearing ideas (persistent state, AI-proposes / human-commits, scoped AI action) are about state and authority over time. A screen-level spec can't express them.

**Caveats.** All four are from one domain and may come from one lab, so some patterns may just be genre conventions. The studies are small (N = 10–16). No study tests a single pattern on its own.

### Borchers → Ideas to Adopt

**Approach.** Worked from the summary in `literature/`, not the paper. The summary doesn't cover Borchers's formal pattern definition. Full note: `pattern-language/refs/borchers-translation.md`.

**Adopt.**
1. *Hierarchy*: typed `context` (up) and `references` (down) links. Three levels: system → workspace → component; screen patterns sit at the bottom.
<xac: how about "workflow-subtask-components": workflow is the sequence of subtasks a user performs using the system to achieve the high-level task; a subtask (e.g., filter generated ideas) is supported by a collection of UI components>
  - Adopted. The MVP uses workflow → subtask → component (see "Pattern Language MVP" below).
2. *Attributes*: Borchers's core is name, context, problem, solution, examples, diagram, and references. v5 lacked **forces**, **diagram**, **ranking**, and up/down links. <xac: v5 is obsolete artifact from the previous focus; ignore it>
  - Done. The MVP uses its own Markdown template; the v5 comparison is removed from the Borchers note.
3. *Forces* written as "X, but Y" are the core of each pattern. They also give an LLM something better to match on than `use_when` features.
<xac: does force means why choosing this pattern but not other patterns? or what this pattern is good vs. bad for? perhaps need a better descriptive name for this>
  - Neither. Forces are the competing demands that make the problem hard, which the solution must balance (e.g. speed of AI edits vs. user control). "Why this pattern" is *Context*; "good vs. bad for" would be *consequences*. Renamed to **Tradeoff**, written "X vs. Y" (your call).
4. *Ranking* from evidence: `**` needs ≥3 exemplars plus a study that tests the pattern on its own; `*` needs ≥2 exemplars. Every candidate is `*` at most today.
5. *Name as shared vocabulary* (verbal recoding). Tag each pattern by domain: interaction, AI/system behavior, or domain workflow.

<xac: today's goal is to develop a minimal viable version of the pattern language to abstract the four system papers. stay focused. don't overreach or worry about things beyond today's scope>
  - Understood. Dropped ranking, domain tags, other-domain exemplars, and LLM matching from today's scope; the MVP is below.

**Decision (see `.agent/decisions.md`).** Generation is archived: v5, the reflection, and the delivery-tracker experiment moved to `archive/genui/`.

### Pattern Language MVP

**Approach.** Abstracted the four systems on workflow → subtask → component. Each pattern uses the template Name · Level · Context · Problem · Tradeoff · Solution · Examples · References. Solution is written as instructions for turning the pattern into a concrete design. Single-system patterns are kept and marked. Full language: `pattern-language/pattern-language-mvp.md`.

**Result (revised twice after your comments in the MVP file).**
- *3 workflows*:
  - **WF-A Guided Candidate Search** (HALO, HAPPIER): narrow a *population* of alternatives. A1 Set Targets → A2 Populate → A3 Group by Criteria Profile → A4 Screen Against All Criteria → [A5 Distill & Recombine, HALO only] → A6 Keep & Restart.
  - **WF-B Multi-Viewpoint Refinement** (PerspectEvolver): S1 Frame the Root → B1 Construct Contrasting Viewpoints → B2 Confront on One Question → B3 Consolidate the Exchange → S2 Revise Under Review → S3 Open Follow-ups.
  - **WF-C Decompose and Verify** (THESEUS): S1 → C1 Decompose into Checkable Parts → C2 Gather Evidence per Part → C3 Interpret Evidence Against the Part → S2 → S3.
- Level-of-abstraction rule added: a pattern's name, problem and solution use no term from one exemplar or its domain; that vocabulary lives in Examples. WF-B and WF-C were rewritten to meet it.
- The language is AI-neutral: patterns say "the system", so they hold whether the content comes from a model, a solver, or a person. AI appears only in Examples.
- Each subtask's Solution is a numbered sequence of steps naming the components (CP-n) the user works with, so it can be built from rather than read.
- Component solutions carry an abstract spec: a component tree with data bindings and events, in the maui pattern mini-language (`~/dev/maui/.agent/compilation-rules.md` §2), which compiles to A2UI. Three written (CP-1, CP-6, CP-11) in `pattern-language/refs/component-specs.md`, linked from a Spec column. The earlier styleless-HTML sketches are deleted. Writing them exposed two gaps in CP-11's prose: batch apply, and a stale proposal.
- All pattern text follows ASD-STE100 Simplified Technical English, document mode, per https://github.com/AminBlg/SimpleEnglish: 20-word instructions, condition before command, active voice, no should/would/may/might, one word per meaning, fact not importance. Two deviations are stated in the file.
- The style now covers the active docs of the repository: README, passport, decisions, and the three drafts. Three groups keep their text, by your call: `literature/`, journal entries before 9/22, and paper prose.

### Test Render of CP-1 Through A2UI

**Approach.** Compiled the CP-1 spec with the maui implementation, `lib/agent/pattern-compiler.ts`, and rendered it with `components/a2ui-renderer.tsx`. A scratch script ran in `~/dev/maui` and was deleted; maui is unchanged. No API key was needed, so none was copied. Result recorded in `pattern-language/refs/component-specs.md`.

**Findings.**
- The spec compiled without a change. The repeat expanded to `criterion-0` and `criterion-1`, `@./name` and `@./value` resolved per item, `?setup` and `?running` produced separate surfaces, and each button carried its event.
- The `running` surface rendered completely.
- The `setup` surface reported `Unsupported component: TextField` three times. The catalog holds Card, Column, Row, Text, LineChart, NumberField, and Button. It has no text input, and the maui pattern library records the same gap.
- **Correction after your comment.** A component spec is independent of any renderer; A2UI is for visualization only. So the missing text input is a limit of that renderer, not a constraint on CP-1. CP-1 keeps its text input. `needs:` now lists element kinds in design terms, not catalog component names.
- WF-B and WF-C share three subtasks (S1, S2, S3) and nine components; the earlier pairing of them into one "Evolving Working Artifact" workflow didn't hold.
- Each workflow's Solution leads with a mermaid flowchart (branches and loops), then one line per subtask.
- *16 components*, 10 used by more than one workflow (e.g. Attached Evidence, Proposal Set, Provenance Link).
- Tradeoff is deferred, alongside diagram, picture and ranking.

**Open.**
- HALO vs. HAPPIER may be *optimization* vs. *screening* variants of WF-A; the difference is A5 Distill & Recombine.
- "Bring Input to a Part" covers AI deliberation (PerspectEvolver) and real data (THESEUS); it may split into two subtasks.

### Component Previews

**Approach.** `tools/render_specs.py` reads `pattern-language/refs/component-specs.md` and writes one plain HTML page per component into `pattern-language/renders/`. It maps each element to a plain HTML tag, and draws an unmapped element as a dashed box, so a spec always draws and no renderer constrains a pattern. Run: `python3 tools/render_specs.py`.

**What a preview shows.** Purpose and context at the top. One framed screen per state, in the order a user meets them, with the trigger on the arrow between them. Bound data reads as what it means, never as a path: an input gets a placeholder, an output reads as alt text. Transitions that do not join neighbors are listed under the strip.

**Three spec fields were added to make this possible.** `purpose` and `context`; `describes`, one phrase per bound path; `transitions`, `{from, to, when}`. Note for YAML: a bare `on:` key parses as boolean true, so the key is `when`.

**Open.**
- A repeat draws two identical rows, because one description serves every item. Sample data per spec would fix it, and it is not in the MVP.
- 13 of the 16 components have no spec yet.

### Wrap-up

**Where things stand.** The MVP language, the three component specs, their previews, and the preview tool are in `pattern-language/` and `tools/`. Reorganized today into `pattern-language/{pattern-language-mvp.md, refs/, renders/}`; the screen-era drafts and the GenUI work are in `archive/`.

**Open.**
- `data/` is in `.gitignore`: 46 MB of PDFs, and they are anonymous submissions. The papers stay local. `resources/` (the mobile UI taxonomy, 109 MB with its own `.git`) was deleted. The 6/24 entry still refers to it.
- The plain-text extractions of the four papers are not in the repository. They were written to a session scratchpad and are lost when it clears. To keep them, extract them again into a tracked directory.
- The three `literature/` notes, the journal entries before 9/22, and paper prose keep their old style, by your call.

**Next.** See `next-up` at the top of this file.

## 7/8/2026

```
- [x] try to use the patterns to gen ui code
    - the design prompt: a user has deliveries from multiple sources and carriers, e.g., Amazon, eBay, UPS, USPS, FedEx, etc. and want to have a centralized place to see the statuses of these deliveries.
    generate two designs:
    - first, generate a ui screen based on this prompt alone
    - second, adopt the chase design pattern and use it to instantiate a ui screen
- [] experimental plan to compare ui quality w/ vs. w/o patterns
- [] write a simple web page that displays pairs of generated ui screens side by side
```

### HAND-OFF (end of 7/8 session)

**Where things stand.** First generation experiment done (3 conditions: baseline / Chase pattern / DoorDash pattern, all in `experiments/2026-07-08-delivery-tracker/`, screens open in a browser), reflection written, and the spec rewritten as **v5** — a substantial revision, formalized but **not yet user-reviewed and not yet validated by use**.

**For your review: `.agent/drafts/pattern-spec-language-v5.md`.** The load-bearing decisions to accept/reject, roughly in order of consequence:
1. **`expects` + bind→render pipeline** — every pattern declares the data shape it renders; generation emits a ~10-line binding artifact the designer reviews before code. This is the biggest conceptual change and the concrete form of the designer-control claim. Is binding the right control point, or too heavyweight for the tool's flow?
2. **`content_coverage: complete | curated_subset | ranked`** — hard retrieval filter; the one field that would have blocked the mismatched condition C. Is the 3-value enum right?
3. **Category-level inherited constraints** (`categories/*.yaml`, one level) — governance question flagged in Open Questions: risks becoming a shadow pattern language.
4. **Render policies for mock-ups** (your consideration, folded in as principle 4) — sample data must exercise the bound shape; interactions demonstrate-or-annotate; states become frames. Check the invariant: nothing in a *pattern* may assume mock-up output.
5. **Design principles section** — trimmed to 4 v5-only commitments per your feedback; verify the altitude is now right.

Supporting reads, in order: experiment `README.md` (10 min, incl. the worked binding rationale) → `pattern-spec-reflection-1-genui-experiment.md` (the "why" behind every v5 change) → the three HTML screens.

**Unclaimed tasks (both shaped by today's findings):**
- *Experimental plan*: condition C motivates a **three-arm design** — no-pattern / wrong-pattern / right-pattern — so pattern-presence and pattern-fit are measured separately. Also: hold style constant across arms (principle: patterns constrain topology, not style); candidate metric: regeneration variance. Validity note from today: conditions must be independent LLM calls, not one contaminated session.
- *Side-by-side viewer page*: the three screens are ready content; consider designing it to also handle the multi-frame output (empty-state frames) from the v5 render policies — same viewer could serve both.

**Suggested first move next session (after spec review):** validate v5 by re-running today's experiment through the actual two-stage pipeline (Stage 1 bind → review → Stage 2 render) instead of single-shot, and/or author one pattern natively in v5 — a `detail/*` screen would stress the multi-entity `expects` open question.

### Patterns → GenUI Code (Delivery Tracker)

**Approach.** Two self-contained HTML mobile screens for the delivery-tracking prompt: `experiments/2026-07-08-delivery-tracker/` — `baseline.html` (prompt only) vs. `pattern.html` (prompt + `monitor/grouped-items` conditioning block, per v4 format). Method + exact conditioning block in the experiment `README.md`.

**Key deltas (baseline → pattern):**
1. Flat chronological card list → source-grouped rows with per-group aggregates ("Amazon (3) · 2 arriving today")
2. Header chips: `role: filter` (status tabs — the LLM default) → `role: action` (Add tracking, Scan inbox); status moved to inline `status_badge`s
3. Density: ~5 tall cards/viewport → ~8 rows + 3 group aggregates — better fit for monitor intent
4. Lone CTA → `bottom_nav` with active indicator (screen situated in an app)
5. Pattern's typed `interactions` fully specify tap behavior; baseline leaves it undefined

**Spec observations:**
- The conditioning block format ported cleanly from `search/results` to `monitor/grouped-items` — first evidence the v4 block generalizes across categories.
- Delivery tracking is a sixth domain row for the cross-product table (pattern = topology confirmed again).
- Grouping-axis ambiguity: the pattern says "organized by category" but doesn't say which axis (source vs. carrier vs. arrival timeframe). Chose source; a `grouping_axis` hint in `content` may be worth adding.

**Validity caveat.** Same agent generated both conditions in one session — baseline is plausibly contaminated by pattern knowledge. The real ablation (next task) needs independent LLM calls per condition, ideally multiple samples.

**v5 addendum: mock-ups are the render target** (not necessarily production code). Folded in as principle 4 + "render policies" in the pipeline section: (1) sample data must exercise the bound shape — every enum value, optionals present/absent, truncation case; this is where mock-up quality is won, and a second independent justification for `expects`; (2) interactions demonstrate-or-annotate, never silently drop (cheap effects live, navigations as affordance + annotation); (3) non-default states become frames, not reachable states. Key invariant: mock-up-ness is a render-stage property — patterns must stay swappable to a production-code generator. New open questions: fidelity level (affects designer study), multi-frame output format.

**Spec v5 formalized** → `.agent/drafts/pattern-spec-language-v5.md` (standalone; supersedes v4). Centerpiece: `expects` data-shape contract per pattern + a three-stage pipeline (retrieve → **bind** → render) where the bind stage emits a ~10-line designer-reviewable binding artifact — the concrete designer-control claim for PatternGenUI. Other fixes folded in: `content_coverage: complete|curated_subset|ranked` (hard retrieval filter), typed `use_when`/`not_when` + `alternative_id` (rejection-with-redirect), attribute types as slot preconditions (no emoji hero images — omit unmet optional slots), cardinality-derived empty state, one-level category constraint inheritance (`categories/monitor.yaml` + `_common.yaml`), `resolve: per_instance` interactions, `slots_source: app_context` on bottom_nav, style declared out of scope (principle 9). Full worked example: `monitor/grouped-items` in v5 + the delivery-tracker binding + two-stage conditioning blocks. Design principles not restated (established in 6/24 journal + v4, from the lit synthesis); v5 adds only 3 new principle-level commitments: pattern = renderer for a declared data shape · topology not style · authority ends at the screen.

**Reflection, high-level.** Is a pattern enough to instantiate a screen? Yes for topology — generation never required a structural decision. But instantiation drew on four layers (topology · domain→slot binding · visual style · app context) and the pattern only carries the first. The real gap: no **data-model contract** — each pattern implicitly presumes a data shape ("items with one scalar primary value, in 2–6 groups"); v5 should make it explicit as an `expects` block, turning generation into bind (inspectable, designer-reviewable) → render. Most detailed issues below are symptoms of this one gap. Visual style is out of scope *by design* — must be stated, and the ablation must hold style constant. Proposed sufficiency metric: regeneration variance (load-bearing dimension varies → spec gap; cosmetic varies → designer freedom).

**Reflection → spec issues.** Full analysis in `.agent/drafts/pattern-spec-reflection-1-genui-experiment.md`: 9 issues found generating (vs. describing) with v4, with proposed v5 changes. Top three: (1) `use_when`/`not_when` are opaque strings — fit was knowable but not computable; type them + add `alternative_id`; (2) add `content_coverage: complete | curated_subset | ranked` — the real machine-readable monitor/discover divide; (3) `item_group[]` never says which axis to group by — add a `grouping` block (also a designer-control point). Also: slot content preconditions (`hero_image: requires rich_media`), category-level inherited constraints (flat catalog can't protect intents), exemplar-contaminated fields (`empty_state: not applicable` was Chase-true but pattern-false), per-instance interaction resolution ("Archive delivered" chip is an effect, spec said navigate).

**Condition C (added later same day): DoorDash pattern, intent-mismatched.** `pattern-doordash.html` applies `discover/curated-sections` to the same prompt. The topology transfers mechanically (every slot fills: status-filter tabs, curated sections like "Needs attention", media cards, persistent search footer) but fit is worse for the monitor task: horizontal card rows show ~1.5 items/section (can't answer "is everything on track?"), hero images waste area on low-media items, no `aggregate_value` slot, and section themes duplicate the filter-tab axis. **Key insight: pattern presence ≠ pattern fit — B and C are equally pattern-faithful but C loses to B, validating the retrieval step (`use_when`/`not_when`) and suggesting a wrong-pattern arm in the ablation.**



## 6/24/2026
```
- [x] survey papers on design patterns similar to Borchers's and Folmer's
- [x] grounded in the found literature, brainstorm a specification language to define UX/UI design pattern--using mobile app as a starting point, each pattern can focus on a mobile screen: start by selecting a specific example mobile screen and try to describe it using a pattern language.
```

### THOUGHTS
- a pattern atomically specifies the design of a screen
- a designer might try to generate all screens for an app at once; then it's the LLM's job to decide what patterns of screens to use
- maybe: a pattern can contain knowledge about which other types of screens it can navigate to

### Survey Papers on Design Patterns

**Approach.** Two-pass search (dry-run → full). 14 papers across 7 approach types. 12 new note files written. Synthesis report: `literature/_approaches-design-pattern-catalogs.md`.

**Approach taxonomy (7 types):**
1. **Foundational pattern language** — Borchers 2000; van Welie 2003 — Alexander template imported to HCI; hierarchical structure
2. **Practitioner catalog — general** — Tidwell 2005/2019; van Duyne 2002 — expert-curated, visual, not peer-reviewed
3. **Practitioner catalog — mobile** — Neil 2014; Nilsson 2009 — mobile-specific, 90+ patterns (Neil), screen-level
4. **Domain-specific catalog** — Landay & Borriello 2003; Chung 2004; Folmer 2015 — ubicomp, game/accessibility
5. **Critical review / SLR** — Dearden & Finlay 2006; Punchoojit 2017; Seffah 2010 — maps field, identifies eval gap
6. **Formal/computational representation** — Sinnig 2010 — XPLML schema, widget-level, no eval
7. **Empirically-derived** — Nguyen 2018 — deep learning on RICO (72k screens), implicit patterns

**Key findings for PatternGenUI:**
- Every catalog is expert-curated except Nguyen (ML-induced). No one mines named patterns from data and makes them designer-facing.
- Only one controlled evaluation study exists: Chung et al. (2004, DIS) — patterns help process (design space coverage) but not output quality. Never replicated.
- Mobile is the most under-standardized domain: Neil (2014) is the closest anchor but a practitioner book, not peer-reviewed.
- The untried combination PatternGenUI occupies: mobile-first + structured machine-readable spec + designer-facing retrieval + generation conditioning.
- Sinnig (2010) XPLML is the closest formalization work — differentiate: screen-level (ours) vs. widget-level (XPLML); LLM-conditioned (ours) vs. template-matched (XPLML).

**Anchor papers (must cite):** Borchers 2000 · Dearden & Finlay 2006 · Neil 2014 · Chung 2004 · Sinnig 2010 · Nguyen 2018 · Tidwell 2019

### Pattern Specification Language

**Approach.** Four drafts (v1→v4) driven by two application tests: DoorDash (discover) and Chase (monitor). Final spec: `.agent/drafts/pattern-spec-language-brainstorm-v4.md`.

**Format.** YAML frontmatter (machine-readable, injected into LLM prompt) + Markdown body (designer-facing, shown in UI only). No custom tooling required.

**Unit.** One screen per pattern, named by user intent. Category enum from mobile-ui-taxonomy: onboard · configure · browse · search · discover · detail · create · transact · monitor.

**Six design principles codified:**
1. Pattern = intent × layout topology — same pattern applies across product domains (Chase, Robinhood, Apple Health, Asana all instantiate `monitor/grouped-items`)
2. `layout` uses domain-neutral component names; domain-specific terms belong in `content` + `examples`
3. `[]` suffix marks repeating structural units (e.g., `item_group[]`, `result_card[]`)
4. `use_when`/`not_when` = selection conditions (machine-readable); `rationale` = design reasoning (designer UI only) — distinct purposes
5. `role: action | filter` required on header chip rows — semantically critical for LLM event handler generation
6. `interactions` is a typed schema `{component, on, action: navigate|effect, target_label, target_id?, effect?}` — enables navigation graph queries

**Open questions:** typed `target_id` references (needs catalog first); `role` required vs optional; variant storage (inline vs sibling files).

**Application test files:** `.agent/drafts/pattern-spec-application-test.md` (DoorDash) · `.agent/drafts/pattern-spec-application-test-2-chase.md` (Chase)


## 6/22/2026

```
[x] familiarize yourself with this project
[x] verify the novelty of this project
```

### Familiarize Yourself With This Project

**What it is.** "Augmenting GenUI with Design Patterns" proposes using interaction design patterns as a mid-generation conditioning layer to improve transparency and control in LM-based UI generation.

**Core claim.** Empirical: patterns improve GenUI quality and controllability. The system artifact (PatternMCP + PatternGenUI front-end) is not yet built.

**Positioning.** Complements two existing camps: (1) pre-generation intent conveyance and (2) post-generation slot-based iteration. This approach operates during generation.

**Evaluation plan.** Ablative study (pattern vs. no-pattern, same LM) + designer study vs. a state-of-the-art tool.

**Existing literature.** Covers interaction design pattern theory (Borchers 2000; Folmer 2015). The LM/GenUI side is not yet seeded — novelty verification is the next step.

**Target venues.** CHI, UIST; NLP/AI venues (ACL, EMNLP, NeurIPS) also in scope.

### Verify the Novelty of This Project

**Verdict.** Partially addressed — the structured-intermediate mechanism for LLM UI controllability is well-established, but the specific combination (named design pattern library → retrieval → designer-visible conditioning) has not been done.

**Nearest neighbors (the structured-IR cluster):**
- **Lu et al. (2023) — UI Grammar** (ICML workshop): grammar encodes parent-child layout structure; no library, no retrieval, no named screen types. Grade: C.
- **Cao et al. (CHI 2025) — Jelly**: uses "predefined UI patterns and rules" as composition constraints alongside a task-driven data model. Highest argument risk — must be explicitly differentiated in related work. Grade: A.
- **Chen et al. (2025) — SpecifyUI**: SPEC as a visual-parameter IR extracted from UI screenshots; 16-designer user study sets the evaluation bar. Grade: B.
- **Jiang et al. (IUI 2025) — Athena**: storyboard + data model + GUI skeletons for iterative app generation; developer-scaffold focus. Grade: B.
- **Kolthoff et al. (ICSE 2025) — GUIDE**: two-stage decomposition + RAG over Material Design component library; components ≠ screen-level patterns. Grade: B.
- **GameUIAgent (2026)**: Design Spec JSON + 3 game UI templates; domain-specific, no retrievable library. Grade: B.

**Other relevant work:**
- **Li et al. (TOCHI 2025) — PrototypeFlow**: strongest prior work in the pre+post camps; multi-method study; cite as the representative of the two intro camps. Grade: A.
- **Deng et al. (ICSE 2025)**: LLMs fail to apply design patterns without external conditioning — motivates explicit pattern intermediates. Grade: B.

**What's novel (unoccupied combination):** curated named pattern library + retrieval step + designer-facing inspection/edit before generation + ablative × designer evaluation vs. SOTA tool.

**Key risk.** Jelly's "predefined UI patterns" wording at CHI 2025 is the sharpest argument risk. Differentiator: Jelly's patterns are hardcoded composition rules; PatternGenUI's are named interaction design patterns (Borchers/Alexander) retrieved per-prompt.

**Files written.** 12 note files + `_synthesis-patterns-genui-novelty.md` in `literature/`.