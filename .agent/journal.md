# Augmenting GenUI with Design Patterns

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