# Pattern Spec — Reflection 1 (after the first generation experiment)

> What the delivery-tracker experiment (`experiments/2026-07-08-delivery-tracker/`) revealed
> about the v4 pattern language. Companion to the two application tests: those stress-tested
> the language for *describing* existing screens; this is the first stress test of the
> language for *generating* new ones. Different failures surfaced.

---

## High-level: does a pattern carry enough, and clear enough, information to instantiate a screen?

*(Scoping note: this considers only the machine-readable, prompt-injected part — `layout` +
`interactions` + `content` + `constraints`. Selection metadata (`use_when`/`rationale`) is set
aside for now.)*

**Verdict: yes for structure — the topology was fully determined.** Generating B and C, I never
faced a structural decision: what components exist, how they nest, what repeats, what's sticky,
what's in header vs. body vs. footer all came straight from `layout`. The interesting finding is
where the pattern's authority *ends*. Instantiation drew on four information sources, and the
pattern supplied only the first:

| Layer | Source during the experiment | In pattern scope? |
|---|---|---|
| **Topology** — component tree, repetition, placement | the pattern, fully | Yes — works today |
| **Domain→slot binding** — what *is* `primary_value` for a delivery? group by what? | LLM judgment, unguided | **Should be — the real gap** |
| **Visual style** — color, type, spacing, radius, elevation | LLM priors entirely | No — by design (make explicit) |
| **App context** — what other tabs/screens exist | LLM invention | No — needs multi-screen story (issue 9) |

**The one gap that matters: the pattern has no data-model contract.** Every pattern implicitly
presumes a data shape — `monitor/grouped-items` presumes "a set of items, each with one scalar
primary value, each belonging to exactly one of 2–6 groups, optionally carrying a status."
Instantiation is really a *binding* step: map the domain's entities and attributes onto that
presumed shape. v4 leaves the shape implicit and the binding entirely to the LLM. Notably, most
of the detailed issues below are symptoms of this one missing layer: the grouping-axis ambiguity
(#3) is an unbound group key; slot preconditions (#4) are unbindable slots; the empty-state bug
(#7) is an unstated cardinality (`items: 0..n` vs `1..n`); the navigate-vs-effect chip (#8) is a
binding that changed a slot's behavioral type.

**Proposed v5 direction — make the data shape explicit:**

```yaml
expects:                       # the data shape this pattern renders
  item:
    cardinality: 0..n          # 0 possible → empty_state required (fixes #7)
    attributes:
      primary_value: scalar, required     # "the one number/date the user checks"
      status: enum, optional
  group:
    cardinality: 2..6
    key: single axis — the dimension the user's mental model organizes items by  # fixes #3
```

Generation then becomes a visible two-step: **bind** (prompt → fill `expects` from the domain)
then **render** (bound data + `layout` → code). The binding is small, inspectable, and exactly
what a designer should review in PatternGenUI before code exists — a much better control point
than editing generated HTML. This also sharpens the Jelly/Athena differentiation: they attach a
data model to the *app*; we attach a data-shape contract to the *pattern*.

**Visual style is absent by design — say so.** Two spec-compliant runs could look wildly
different; pattern conditioning controls topology, not aesthetics. This is the right scope
(style belongs to a brand/design-system channel, orthogonal to patterns) but it must be stated
in the paper, and it has an evaluation consequence: raters conflate visual polish with
structural quality, so the ablation must hold style constant (same style instructions in both
arms) or measure structure-specific criteria.

**On clarity:** the remaining underdetermination inside components was benign — slot lists don't
specify visual arrangement (where `primary_value` sits in the row), `trend_indicator` doesn't
pick sparkline vs. progress dots, "prominent" is vague. These felt like designer freedom, not
spec gaps. A usable criterion to separate freedom from gap: **regeneration variance** — generate
N instantiations of the same pattern × prompt; dimensions that vary while staying spec-compliant
are the pattern's free dimensions. If a *load-bearing* dimension varies (e.g., grouping axis),
it's a gap; if a cosmetic one varies, it's freedom. Cheap to pilot, and doubles as a
sufficiency metric for the paper.

---

## What held up ✓

| v4 feature | Evidence from the experiment |
|---|---|
| `[]` repeating units | `item_group[]`/`item_row[]` and `section[]`/`content_card[]` both instantiated cleanly in a new domain |
| `role: action \| filter` | Directly produced the biggest B-vs-baseline delta — chips became operations, status moved to badges |
| Conditioning-block format | Ported from `search/results` to `monitor/grouped-items` with no format changes |
| `constraints.must_not` | "No horizontal scroll for item_row[]" is exactly the rule condition C violated — the knowledge was right |
| `status_badge` type enum | All three types (success/warning/alert) used naturally in B |
| Pattern = topology principle | Sixth domain (package tracking) filled both patterns' slots without touching `layout` |

---

## Issues found ✗ (ranked by severity)

### 1. Fit is knowable but not computable — `use_when`/`not_when` are opaque strings

Condition C is the headline result: a faithful instantiation of a poorly-fitting pattern is worse
than a well-fitting one, and arguably worse than no pattern on the core user question ("is
everything on track?"). The language *contains* the knowledge to reject C — the discover
pattern's `use_when` doesn't hold and the monitor pattern's does — but as freeform prose the
system can neither score fit nor explain a rejection.

**Fix (v5):** type the selection conditions.

```yaml
use_when:
  intent: monitor                      # must match taxonomy category of the request
  conditions:
    - "items are user-owned or user-tracked"
    - "current state matters more than discovery of new items"
not_when:
  - condition: "user seeks history/detail for one item"
    alternative_id: detail/item        # typed, resolvable — same mechanism as target_id
  - condition: "items belong to one category only"
    alternative_id: monitor/single-category
```

Typed `alternative_id` gives retrieval a rejection-with-redirect and the designer UI an
explanation ("not this pattern because X → consider Y"). It also seeds the navigation-graph
goal from the journal with a second edge type: *alternative-to*, alongside *navigates-to*.

### 2. Content-coverage semantics are the real monitor/discover divide — and unstated

The decisive difference between B and C is not layout aesthetics: monitor requires the
**complete set** visible (vertical, dense), discover shows a **curated sample** (horizontal,
rich). v4 encodes this only indirectly, via each pattern's scroll constraints. It should be a
first-class, machine-readable field:

```yaml
content_coverage: complete | curated_subset | ranked
```

`monitor/grouped-items: complete` · `discover/curated-sections: curated_subset` ·
`search/results: ranked`. One enum captures why horizontal card rows are fine for DoorDash and
disqualifying for Chase — and gives retrieval a hard filter (a monitor request must not receive
a `curated_subset` pattern).

### 3. Grouping axis is unspecified — the LLM guessed

`item_group[]` says *that* items are grouped, never *by what*. Deliveries could group by source
(chosen, arbitrarily), carrier, arrival timeframe, or status; each yields a different screen.
Chase never surfaced this because banking has one natural axis (account type).

**Fix (v5):** add a `grouping` block to `content`:

```yaml
grouping:
  axis: "the dimension the user's mental model organizes items by"
  candidates_hint: [item source, item category, time bucket, status]
  must_not_duplicate: filter mechanisms elsewhere on screen   # see issue 6
```

This is also a designer-control point for PatternGenUI: the grouping axis is exactly the kind
of parameter a designer should inspect/override before generation.

### 4. Slots have no content preconditions — `hero_image` got emoji

`discover/curated-sections` assumes rich media per item. Packages have none; the instantiation
filled `hero_image` with gradients and emoji — 60% of card area spent on decoration. The
language cannot express "this slot needs the domain to supply X."

**Fix (v5):** slot-level `requires`:

```yaml
content_card[]:
  slots: [hero_image, title, metadata_row, badge?]
  slot_requirements:
    hero_image: rich_media   # rich_media | numeric_series | geolocation | none
```

Unmet slot requirements become a second retrieval signal (soft penalty) complementing issue 1's
intent match (hard filter). Also fits `trend_indicator: numeric_series` (Chase sparklines) and
a future map pattern's `geolocation`.

### 5. Pattern-local constraints can't protect other intents — the language is flat

The rule that condemned C lives inside the *monitor* pattern; nothing warns when generating
with the *discover* pattern. Alexander/Borchers pattern languages are hierarchical; v4's
catalog is a flat list of screen patterns.

**Fix (v5, lightweight):** category-level constraint sets that patterns inherit:

```yaml
# categories/monitor.yaml
category: monitor
inherited_constraints:
  must: ["complete tracked set reachable by vertical scroll alone"]
```

A pattern applied to a request whose intent is `monitor` picks up monitor's inherited
constraints even if the pattern comes from another category — making a forced mismatch visibly
violate constraints instead of silently degrading. (Keep it to one level; a deep hierarchy
recreates XPLML's complexity for little gain.)

### 6. Nothing prevents encoding the same data axis twice

In C, delivery status appears three times: filter tabs, section themes, and card badges. Each
component is individually spec-compliant; the redundancy is emergent. B avoided it only because
`role: action` freed the chip row from the status axis.

**Fix (v5):** authoring guideline + generic constraint, not new structure:
`must_not: "encode one data axis in more than one filtering/navigation mechanism"`. Candidate
for the category-level inherited set (issue 5) or a global `constraints_common.yaml`.

### 7. Exemplar-contaminated fields: `empty_state: not applicable` was wrong

Chase authored `empty_state: not applicable — user always has tracked items after
authentication`. True for banking, false for a delivery tracker (zero packages is the normal
first-run state). The field described the exemplar, not the pattern — and the conditioning
block then licensed the LLM to skip a state the domain needs.

**Fix (v5):** author `content` fields conditionally rather than absolutely:

```yaml
empty_state: "if the tracked set can be empty: prompt-to-add flow; else omit"
```

**Process fix:** an authoring lint — any `content` field stating an absolute should be checked
against at least two `examples` products; the cross-product table already provides them.

### 8. `interactions` assumed navigate where domain fill produced effects

The Chase spec types `quick_action_chip tap → navigate: "{chip.label} Screen"`. B's fill
included "Archive delivered" — an in-place effect, not a navigation. The instantiation
silently violated the spec because the interaction was typed at the row level (all chips
navigate), not per-instance.

**Fix (v5):** for repeating components, allow the interaction to declare a *decision* rather
than a fixed action:

```yaml
- component: quick_action_chip
  on: tap
  action: navigate | effect      # LLM resolves per chip instance
  resolve: per_instance
```

This keeps the schema typed (the enum is closed) while admitting per-instance variation —
same philosophy as `[]` for structure, now applied to behavior.

### 9. App-scaffold slots force inventions the pattern can't justify

`bottom_nav` (must: active indicator) made B invent Map · History · Settings tabs from nothing.
Better than baseline's orphan screen, but the pattern is atomically screen-scoped while the
nav bar is app-scoped state — the journal's 6/24 THOUGHTS anticipated exactly this.

**Fix (defer to catalog phase):** mark app-scoped slots as deferred:

```yaml
bottom_nav:
  slots_source: app_context      # filled by app-level spec, not by this pattern
  placeholder_ok: true           # generation may stub tabs pending app context
```

Resolving this properly needs the multi-screen story (navigation graph / app-shell spec), so
park it with the `target_id` open question rather than solving it half-way now.

---

## Summary of proposed v5 changes

| # | Change | From (v4) | To (v5) | Priority |
|---|---|---|---|---|
| 1 | Typed selection conditions | freeform `use_when`/`not_when` strings | structured conditions + `alternative_id` | High |
| 2 | `content_coverage` enum | implicit in scroll constraints | `complete \| curated_subset \| ranked` | High |
| 3 | `grouping` block | unspecified grouping axis | axis description + candidates hint | High |
| 4 | Slot `requires` | none | `rich_media \| numeric_series \| geolocation` | Medium |
| 5 | Category-level inherited constraints | flat catalog | one-level inheritance per intent category | Medium |
| 6 | Axis-redundancy guideline | none | common `must_not` (encode axis once) | Medium |
| 7 | Conditional `content` fields + authoring lint | exemplar-absolute statements | condition-guarded statements, 2-example check | Medium |
| 8 | `resolve: per_instance` on interactions | one action per component | closed enum, per-instance resolution | Low |
| 9 | `slots_source: app_context` | pattern invents app scaffold | deferred slots (needs nav-graph work) | Deferred |

## Implication for the experimental plan

Issues 1, 2, 5 all converge on one claim: **the language's selection metadata is as
load-bearing as its generative skeleton.** The ablation should therefore separate three
conditions — no pattern, wrong pattern (retrieval disabled), right pattern (retrieval on) —
so pattern-fit and pattern-presence effects are measured independently. Condition C is the
pilot evidence that the wrong-pattern arm will produce measurably different (worse) outputs
rather than collapsing into the right-pattern arm.
