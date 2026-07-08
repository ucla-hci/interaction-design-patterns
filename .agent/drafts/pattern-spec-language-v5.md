# Pattern Specification Language — v5

> Standalone spec. Supersedes `pattern-spec-language-brainstorm-v4.md`.
> v1–v4 were driven by *description* tests (can the language describe an existing screen?).
> v5 is the first revision driven by a *generation* test (`experiments/2026-07-08-delivery-tracker/`)
> and its reflection (`pattern-spec-reflection-1-genui-experiment.md`).

---

## Changes from v4

| # | Change | Motivation (reflection issue) |
|---|---|---|
| 1 | **`expects` block** — explicit data-shape contract per pattern | The central v4 gap: domain→slot binding was implicit and unguided |
| 2 | **Bind → render pipeline** — generation is two visible stages | Binding is the designer-reviewable control point |
| 3 | **`content_coverage` enum** — `complete \| curated_subset \| ranked` | The machine-readable monitor/discover divide; hard retrieval filter |
| 4 | **Typed `use_when` / `not_when`** with `alternative_id` | Fit was knowable but not computable (condition C) |
| 5 | **Attribute types** in `expects` (`media`, `numeric_series`, …) | Slot preconditions — `hero_image` must not get emoji fill |
| 6 | **Group `key` with candidates** in `expects` | Grouping axis was guessed, not specified |
| 7 | **Cardinality-driven empty state** — `0..n` ⇒ empty state required | `empty_state: not applicable` was exemplar-true, pattern-false |
| 8 | **Category-level inherited constraints** (one level) | Pattern-local constraints can't protect intents from foreign patterns |
| 9 | **`resolve: per_instance`** on interactions | "Archive delivered" chip is an effect; v4 typed all chips navigate |
| 10 | **`slots_source: app_context`** on app-scoped components | Patterns shouldn't invent app scaffolding (nav tabs) |
| 11 | **Style declared out of scope** | Visual style comes from an orthogonal channel, not the pattern |
| 12 | **Mock-up declared as the render target** | The pipeline communicates a design for evaluation; it does not (necessarily) implement it |

Unchanged from v4: `[]` repetition + `count_range`, `role: action | filter` on chip rows,
typed `interactions` schema, `rationale`/`variants`/`examples` as designer-facing-only,
YAML frontmatter + Markdown body, one screen per pattern, category enum.

---

## Design Principles

The founding principles are already established — synthesized from the literature survey
(Borchers's Alexandrian template, Tidwell/Neil's screen-level catalogs, Sinnig's
over-formalization lesson) and codified through the v1–v4 application tests. They are stated
once, in the 6/24 journal entry and v4, and are not repeated here: pattern = intent ×
topology; domain-neutral layout vocabulary; selection conditions distinct from design
reasoning; typed rather than freeform machine-facing fields.

v5 adds three commitments at the same altitude, from the first generation test:

1. **A pattern is a renderer for a declared data shape.** Alexander's "solution" half is
   generative only if its inputs are explicit; instantiation = *bind* the domain onto the
   shape, then *render*. Whatever the generator needs but the shape doesn't state is a spec
   bug, not designer freedom.
2. **Patterns constrain topology, never visual style.** Style is an orthogonal channel; two
   instantiations of one pattern may look entirely different and both be correct.
3. **A pattern's authority ends at its screen.** App-scoped content (nav tabs) is declared,
   not invented; composition across screens belongs to a future app-level spec.
4. **The render target is a mock-up, not production code.** The pipeline's job is to
   *communicate a design* well enough to evaluate and iterate on it. This relaxes
   implementation concerns (working data plumbing, full event handling) but *raises* the bar
   on what mock-ups live or die by: realistic, shape-exercising sample content and legible
   structure. It must stay possible to swap the render stage for a production-code generator
   later without touching the pattern language — nothing in a pattern may assume mock-up-ness.

Everything else in this document is format, not principle.

---

## The Generation Pipeline

```
prompt ──► RETRIEVE ──► BIND ──► RENDER ──► screen mock-up
              │           │
              │           └── binding artifact (designer reviews/edits here)
              └── pattern (designer can swap here)
```

**Retrieve.** Match the request's intent to `category` (hard filter), check `use_when.conditions`,
and reject on `content_coverage` mismatch (a monitor request must not receive `curated_subset`).
Score remaining candidates by attribute availability: for each required attribute in `expects`,
can the domain plausibly supply it? (`media` required + media-poor domain ⇒ penalty.)
On rejection via `not_when`, surface the matched condition and its `alternative_id` to the
designer: *"not this pattern because X → consider Y."*

**Bind.** The LLM fills the pattern's `expects` shape from the prompt: what entity is the item,
what attribute is the primary value, which axis is the group key, realistic cardinalities.
Output is a ~10-line **binding artifact** (schema in Section Reference §4) — small, inspectable, and the
highest-leverage point for designer control: reviewing a binding beats editing generated code.

**Render.** Binding + `layout` + `interactions` + merged constraints (pattern + category) +
`content` hints → screen mock-up. The style channel (if any) is injected here, separately
from the pattern.

### Render policies for mock-ups

The mock-up target is a property of the *render stage*, never of a pattern (principle 4).
Three policies govern how pattern fields translate:

- **Sample data must exercise the bound shape.** This is where mock-up quality is won or
  lost — placeholder lorem-ipsum kills a design review. Synthesize realistic instances that
  cover: every `enum` value at least once (e.g., all three `status` types), optional
  attributes both present and absent, at least one truncation-length text value, and
  cardinalities within `count_range`. The `expects` binding is the recipe for this data;
  that is a second reason the contract exists, independent of production code.
- **Interactions demonstrate or annotate — never silently drop.** In-screen `effect`s that
  are cheap to fake (expand/collapse, filter pivot) are implemented live; `navigate` actions
  render as visual affordances with the `target_label` as an annotation (the mock-up is one
  screen, not a flow prototype). Either way the `interactions` block is fully consumed: what
  isn't demonstrated is annotated, because communicated behavior is part of the design.
- **Non-default states become frames, not reachable states.** If `cardinality` includes 0,
  the empty state is rendered as a second frame (or annotated variant) rather than wired-up
  logic. Loading/error states: annotate only. Runtime-only `should`s (pull-to-refresh, live
  updates) render as annotations.

Out of scope at render time: data fetching, state management, responsive breakpoints, and
performance — production concerns a later code generator would own.

---

## Section Map

Each section of a pattern exists to close a specific generation failure. The reference below
walks the same rows in the same order, with format and examples.

| Section | Why a pattern needs it | Reader | Used in |
|---|---|---|---|
| `name`, `id`, `category` | Makes the pattern *addressable*: retrievable by intent, referenceable by other patterns (`target_id`, `alternative_id`), and nameable in a conversation with a designer | System | Retrieve |
| `content_coverage` | Declares the deepest structural commitment a screen makes — show *everything*, a *curated sample*, or a *ranked list*. Without it, a topology can be faithfully applied to a task it structurally cannot serve (experiment condition C) | System + LLM | Retrieve (hard filter) + Render |
| `use_when`, `not_when`, `app_genres` | Makes fit *computable before generation*: checkable conditions instead of prose, so the system can score, reject, and explain. `alternative_id` turns a rejection into a redirect | System + Designer | Retrieve |
| `expects` | Declares the data shape the layout renders. Closes the binding gap: without it, domain→slot mapping (which value is primary? which axis groups?) is silent LLM guesswork; with it, binding is an explicit, designer-reviewable step | System + LLM + Designer | Retrieve (scoring) + **Bind** |
| `layout` | The generative skeleton — the topology the pattern exists to convey: what components exist, how they nest, what repeats, where things sit. The one section that *is* the pattern | LLM | Render |
| `interactions` | A skeleton alone yields a dead mockup. Typed flows tell the generator what each component *does* (event handlers, navigation targets) and give the future catalog its navigation graph | LLM | Render |
| `content` | Treatment knowledge that is neither shape (→ `expects`) nor structure (→ `layout`): ordering, emphasis, state handling — how to fill the slots *well* | LLM | Render |
| `constraints` | States the pattern's hard-won rules checkably, to override LLM priors that would otherwise violate them (e.g., defaulting to filter chips, or horizontal item rows). Category-level rules are inherited, not repeated per pattern | LLM | Render |
| `rationale` | Preserves the Alexandrian problem–forces–resolution reasoning, so a designer can *judge and challenge* the pattern rather than just apply it | Designer | UI only |
| `variants` | Adjacent topologies for near-miss requests — an escape hatch that keeps the catalog small instead of spawning one pattern per nuance | Designer + System | UI only |
| `examples` | Grounds the abstraction in recognizable products, and doubles as the authoring-lint corpus: every `expects` hint must hold across ≥2 examples | Designer | UI only |

---

## Section Reference

One subsection per row of the map, same order: format, rules, example.

### 1 · Identity — `name`, `id`, `category`

```yaml
name: "Grouped Item Monitor Screen"   # noun phrase naming the screen's role, designer-facing
id: monitor/grouped-items             # category/slug — THE reference target for target_id / alternative_id
category: monitor                     # intent-taxonomy enum — the hard retrieval key
```

- `category` comes from the mobile-ui-taxonomy intent dimension:
  `onboard | configure | browse | search | discover | detail | create | transact | monitor`.
- `id` is load-bearing: `interactions.target_id`, `not_when.alternative_id`, and the future
  navigation graph all resolve against it. Never rename an `id` without a catalog-wide check.

### 2 · `content_coverage`

```yaml
content_coverage: complete            # complete | curated_subset | ranked
```

| Value | The screen commits to | Typical categories |
|---|---|---|
| `complete` | Every tracked item reachable on this screen (vertical scroll only) | monitor, configure |
| `curated_subset` | An editorial sample; completeness is a non-goal | discover, onboard |
| `ranked` | Items ordered by relevance to an explicit query | search, browse |

Rule: the request's intent implies a coverage; a mismatch is a **hard rejection** at retrieve —
this single field is what would have stopped experiment condition C.

### 3 · Selection — `use_when`, `not_when`, `app_genres`

```yaml
app_genres: [finance, health, productivity, portfolio, logistics]   # soft prior, not a filter
use_when:
  intent: monitor                # must equal the request's category; hard filter
  conditions:                    # each independently checkable against the prompt
    - "items are user-owned or user-tracked"
    - "current state matters more than discovering new items"
not_when:
  - condition: "user seeks history or detail for one item"
    alternative_id: detail/item          # typed, resolvable → rejection-with-redirect
  - condition: "items belong to a single category"
    alternative_id: monitor/single-category
```

- Write each `condition` so it can be judged true/false from the design prompt alone.
- Every `not_when` entry should name an `alternative_id` — a rejection without a redirect
  leaves the designer stranded; the pair powers the "not X because → consider Y" explanation.

### 4 · `expects` — the data-shape contract

```yaml
expects:
  <entity>:                      # an entity a repeating layout unit renders
    cardinality: 0..n            # min..max; min 0 ⇒ empty state REQUIRED
    attributes:
      <attr>:
        type: scalar | text | id | enum | media | numeric_series | geo | time
        required: true | false
        hint: "one-line meaning, written at intent level (not exemplar level)"
  <grouping-entity>:
    cardinality: 2..6
    key:
      hint: "the dimension the user's mental model organizes items by"
      candidates: [<axis>, <axis>, ...]   # bind step picks ONE; designer can override
    attributes: { ... }
```

Rules:
- **Attribute types are slot preconditions.** A slot rendering a `media` attribute is only
  satisfiable if the domain supplies real media; retrieval penalizes patterns whose required
  types the domain can't fill. Never decorative fill (gradients, emoji) for unmet
  `media`/`numeric_series` — omit the slot instead (it must be marked `?` in `layout`).
- **`cardinality` min of 0 requires an empty state.** `content.empty_state` describes the
  *treatment*; the *necessity* is derived from cardinality, never asserted absolutely.
- **Author `hint`s at intent level, checked against ≥2 `examples` products** — the lint that
  prevents exemplar contamination ("user always has accounts" was Chase-true, pattern-false).

At bind time, the LLM fills this shape from the design prompt, producing the **binding
artifact** — the designer-reviewable intermediate:

```yaml
binding:
  pattern: <id>
  <entity>: <domain concept>                  # e.g. item: package delivery
  <entity>.<attr>: <domain attribute>         # e.g. item.primary_value: estimated arrival (time)
  <grouping-entity>.key: <chosen axis>        # from candidates; flag if none fits
  unmet: [<entity>.<attr>, ...]               # required attributes the domain can't supply
```

`unmet` non-empty ⇒ warn the designer and suggest `not_when.alternative_id` patterns whose
`expects` fit better. (Full worked binding: see the delivery-tracker example below.)

### 5 · `layout` — the generative skeleton

Header / body / footer, built from domain-neutral components. Notation:

- `component[]` — repeating unit; optional `count_range: [min, max]` (must agree with the
  `expects` cardinality of the entity it renders)
- `renders: <entity>` — required on every repeating unit; ties it to `expects`, and its slots
  draw from that entity's attributes plus presentation-only slots
- `slot?` — optional slot; the render stage omits it when its bound attribute is absent
- `position: sticky top` etc. — placement notes as free-text values on the component

```yaml
layout:
  header:
    - app_bar:
        slots: [utility_icon[]?, brand_logo, profile_icon]
        position: sticky top
    - quick_action_chip[]:
        type: horizontal_scroll
        role: action             # action | filter — REQUIRED on all header chip rows;
                                 # decides whether generated handlers operate or pivot content
        slots: [icon?, label]
  body:
    - item_group[]:
        renders: group
        count_range: [2, 6]
        group_header:
          slots: [group_name, item_count?, aggregate_value?]
        item_row[]:
          renders: item
          slots: [item_name, item_id?, primary_value, primary_value_label, trend_indicator?, status_badge?]
  footer:
    - bottom_nav:
        type: bottom_nav | persistent_search | action_bar | combined
        active_indicator: required
        slots_source: app_context   # tab set is app-level state, not pattern knowledge
        placeholder_ok: true        # generation may stub plausible tabs pending an app spec
```

- `slots_source: app_context` marks components whose *content* the pattern cannot know
  (principle 3: a pattern's authority ends at its screen).
- Layout never carries style (colors, spacing, type) — at most structural emphasis notes
  like `style: prominent`.

### 6 · `interactions`

```yaml
interactions:
  - component: item_row
    on: tap                      # tap | swipe | long_press
    action: navigate             # navigate | effect
    target_label: Detail Screen
    target_id: detail/item       # optional until the catalog exists
  - component: quick_action_chip
    on: tap
    action: navigate | effect    # closed enum; generator resolves per chip instance
    resolve: per_instance
    note: "navigate chips get target '{chip.label} Screen'; effect chips get an in-place handler"
  - component: group_header
    on: tap
    action: effect
    effect: toggles group expand/collapse
```

- `action` is a closed enum so handlers are generatable; `resolve: per_instance` admits
  per-instance variation on repeating components without opening the enum (same philosophy
  as `[]` for structure, applied to behavior).
- Every component named here must exist in `layout`; every tappable component in `layout`
  should appear here — an unlisted component gets no handler, not an invented one.
- Interactions are specified as if for real code; how much gets *implemented* vs. *annotated*
  is decided by the render policies (see pipeline section), not by the pattern.

### 7 · `content`

Treatment guidance only — shape lives in `expects`, structure in `layout`:

```yaml
content:
  status_badge: inline on the relevant item_row; visual weight by type (alert > warning > success)
  empty_state: "if bound cardinality can be 0: prompt-to-add-first-item flow"
  group_ordering: most-attention-worthy group first (alerts, then time-critical)
```

- Author entries **conditionally, never as exemplar absolutes** ("if X: do Y", not
  "not applicable").
- If a field starts describing *what data exists*, it belongs in `expects`; if it starts
  describing *where a component sits*, it belongs in `layout`.

### 8 · `constraints` — pattern-local + inherited

```yaml
constraints:
  must:
    - "group_header visually separates groups; aggregate shown if meaningful"
  must_not:
    - "use horizontal scroll for item_row[] — completeness requires full-width vertical rows"
  should:
    - "support pull-to-refresh for live data"
```

Patterns state only their *local* rules. Two inherited layers are merged in at render time:

```yaml
# categories/monitor.yaml — every pattern applied to a monitor-intent request inherits these,
# including a foreign-category pattern forced onto the request (that is the point: a mismatch
# visibly violates constraints instead of silently degrading)
category: monitor
content_coverage: complete
inherited_constraints:
  must:
    - "the complete tracked set is reachable by vertical scroll alone"
    - "primary_value visible per item without any tap"
```

```yaml
# categories/_common.yaml — inherited by all patterns
inherited_constraints:
  must_not:
    - "encode one data axis in more than one filtering/navigation mechanism on the same screen"
```

One inheritance level only — a deeper hierarchy recreates XPLML-style complexity for
little gain.

### 9 · Designer-facing body — `rationale`, `variants`, `examples`

Markdown after the frontmatter; shown in the designer UI, **never injected into prompts**.

```markdown
## Rationale
**Problem:** [one sentence — the user need this topology addresses]
**Forces:** [the tensions that constrain the solution]
**Resolution:** [how the layout resolves those tensions]

## Variants
- **Variant name** — topology delta + when to prefer it (one line each)

## Examples
- Product — how it fills the groups/items (one line each; ≥2 required for the authoring lint)
```

- `rationale` follows the Alexandrian core: it argues *why*, where `use_when` states *when* —
  keep them from duplicating each other.
- A `variant` that changes the data shape (not just the topology) is a separate pattern, not
  a variant.

---

## Full Spec — "Grouped Item Monitor Screen" (v5)

```yaml
---
# ─── Identity ────────────────────────────────────────────────────────
name: "Grouped Item Monitor Screen"
id: monitor/grouped-items
category: monitor       # onboard | configure | browse | search | discover |
                        # detail | create | transact | monitor
content_coverage: complete

# ─── Selection ───────────────────────────────────────────────────────
app_genres: [finance, health, productivity, portfolio, logistics]
use_when:
  intent: monitor
  conditions:
    - "items are user-owned or user-tracked"
    - "current state matters more than discovering new items"
    - "items fall into more than one natural category"
not_when:
  - condition: "user seeks history or detail for one item"
    alternative_id: detail/item
  - condition: "user's primary goal is to act on items"
    alternative_id: transact/item-action
  - condition: "items belong to a single category"
    alternative_id: monitor/single-category

# ─── Data-shape contract ─────────────────────────────────────────────
expects:
  item:
    cardinality: 0..n            # 0 possible ⇒ empty state required
    attributes:
      name:          {type: text,   required: true,  hint: "what the user calls this item"}
      identifier:    {type: id,     required: false, hint: "disambiguates similar items; may be truncated"}
      primary_value: {type: scalar, required: true,  hint: "the ONE value the user logs in to check"}
      value_label:   {type: text,   required: true,  hint: "unit/context for primary_value"}
      trend:         {type: numeric_series, required: false, hint: "recent trajectory of primary_value"}
      status:        {type: enum,   required: false, hint: "state-dependent flag: success | warning | alert"}
  group:
    cardinality: 2..6
    key:
      hint: "the dimension the user's mental model organizes items by — pick ONE"
      candidates: [item type, item source, life-cycle stage, time bucket]
    attributes:
      name:       {type: text,   required: true}
      item_count: {type: scalar, required: false}
      aggregate:  {type: scalar, required: false, hint: "group-level rollup of primary_value, if summable/meaningful"}

# ─── Layout ──────────────────────────────────────────────────────────
layout:
  header:
    - app_bar:
        slots: [utility_icon[]?, brand_logo, profile_icon]
        position: sticky top
    - quick_action_chip[]:
        type: horizontal_scroll
        role: action
        slots: [icon?, label]
  body:
    - item_group[]:
        renders: group
        count_range: [2, 6]
        group_header:
          slots: [group_name, item_count?, aggregate_value?]
          style: prominent (visually separates groups)
        item_row[]:
          renders: item
          slots: [item_name, item_id?, primary_value, primary_value_label, trend_indicator?, status_badge?]
  footer:
    - bottom_nav:
        type: bottom_nav
        active_indicator: required
        slots_source: app_context
        placeholder_ok: true

# ─── Interactions ────────────────────────────────────────────────────
interactions:
  - component: item_row
    on: tap
    action: navigate
    target_label: Detail Screen
    target_id: detail/item
  - component: quick_action_chip
    on: tap
    action: navigate | effect
    resolve: per_instance
  - component: group_header
    on: tap
    action: effect
    effect: toggles group expand/collapse
  - component: bottom_nav_tab
    on: tap
    action: navigate
    target_label: "{tab.section} Screen"

# ─── Content (fill guidance; shape lives in expects) ─────────────────
content:
  status_badge: inline on the relevant item_row; visual weight by type (alert > warning > success)
  empty_state: "if bound cardinality can be 0: prompt-to-add-first-item flow (per expects rule)"
  group_ordering: most-attention-worthy group first (alerts, then time-critical)

# ─── Constraints (pattern-local; monitor + _common are inherited) ────
constraints:
  must:
    - "group_header visually separates groups; aggregate shown if meaningful"
    - "active bottom_nav tab is highlighted"
  must_not:
    - "use horizontal scroll for item_row[] — completeness requires full-width vertical rows"
  should:
    - "show trend_indicator per item_row when a numeric_series is bound"
    - "support pull-to-refresh for live data"
---

## Rationale
**Problem:** The user needs the current state of many owned items across categories without opening each one.
**Forces:** Completeness vs. scannability — all items at once risks overload; grouping lets the eye jump to the right section. Monitoring vs. acting — intent is read-only, but frequent operations must be reachable without mode-switching.
**Resolution:** Prominent group headers with aggregates expose category-level state instantly; dense vertical rows surface only the primary value needed to decide whether to drill in; action-role chips keep operations one tap away without contaminating the monitor view.

## Variants
- **Collapsed groups** — headers only, tap to expand; use at 5+ groups
- **Aggregate-first** — top-level total above all groups; use when the overall rollup is the primary signal
- **Alert-first** — items with active alerts float to the top of their group; use when status outranks value scanning

## Examples
- Chase — bank accounts + credit cards; per-group totals
- Robinhood — stocks/ETFs/crypto; group values
- Apple Health — activity/mindfulness/nutrition; daily totals
- Asana — projects by team; open-task counts
- Delivery tracker (experiment 2026-07-08) — packages by source; arriving-today counts
```

---

## Worked Binding — delivery tracker (from the experiment)

What the bind stage produces for the delivery prompt, before any code is generated:

```yaml
binding:
  pattern: monitor/grouped-items
  item: package delivery
  item.name: ordered item name
  item.identifier: carrier + truncated tracking number
  item.primary_value: estimated arrival (time)
  item.value_label: precision qualifier ("by 8:00 PM", "estimated")
  item.trend: shipment progress (ordered checkpoint series)
  item.status: {success: out for delivery/delivered, warning: signature required, alert: delayed}
  group.key: item source          # chosen from candidates [item type, item source, ...]
  group.name: merchant/platform (Amazon, eBay, ...)
  group.aggregate: count arriving today   # balances don't sum; counts do
  unmet: []
```

Ten lines a designer can scan and correct (e.g., flip `group.key` to `time bucket`) — versus
diffing two generated HTML files. This artifact is the core designer-control claim of
PatternGenUI made concrete.

---

## LLM Conditioning Blocks

### Stage 1 — bind

```
[PATTERN: Grouped Item Monitor Screen | id: monitor/grouped-items | monitor | coverage: complete]

Map the user's request onto this data shape. Output only the binding.

Shape:
  item (0..n): name (text, req) · identifier (id) · primary_value (scalar, req —
    "the ONE value the user checks") · value_label (text, req) ·
    trend (numeric_series) · status (enum: success|warning|alert)
  group (2..6): key — pick ONE axis from [item type, item source, life-cycle stage,
    time bucket]: the dimension the user's mental model organizes items by ·
    name (text, req) · item_count (scalar) · aggregate (scalar, if meaningful)

List any required attribute the domain cannot supply under `unmet`.
```

### Stage 2 — render

```
[PATTERN: Grouped Item Monitor Screen | id: monitor/grouped-items | monitor | coverage: complete]
[BINDING: <the reviewed binding artifact>]

Layout:
  header: app_bar [utility_icon[]?, brand_logo, profile_icon] (sticky)
          + quick_action_chip[] (role: action, horizontal scroll)
  body:   item_group[] (renders: group, 2–6):
            group_header [group_name, item_count?, aggregate_value?] (prominent)
            item_row[] (renders: item) [item_name, item_id?, primary_value,
                        primary_value_label, trend_indicator?, status_badge?]
  footer: bottom_nav (active indicator; tabs are app-context placeholders)

Interactions:
  item_row tap → navigate: Detail Screen
  quick_action_chip tap → navigate OR effect, decide per chip
  group_header tap → effect: toggle expand/collapse

Constraints (merged: pattern + monitor + common):
  - complete tracked set reachable by vertical scroll alone          [monitor]
  - primary_value visible per item without any tap                   [monitor]
  - no horizontal scroll for item_row[]                              [pattern]
  - group_header separates groups; aggregate shown if meaningful     [pattern]
  - active bottom_nav tab highlighted                                [pattern]
  - never encode one data axis in two filter/nav mechanisms          [common]
  - empty state required (item cardinality includes 0): prompt-to-add flow
  - omit optional slots whose bound attribute is absent — no decorative fill

Output: a mock-up, not production code.
  - sample data must exercise the binding: every status enum value ≥ once, optional
    attributes present AND absent, one truncation-length name, groups within 2–6
  - cheap in-screen effects live (expand/collapse); navigations as affordance + annotation
  - empty state as a second frame; runtime shoulds (pull-to-refresh) as annotations
```

`rationale`, `variants`, `examples` are never injected — designer UI only.

---

## Minimum Viable Pattern (v5)

```yaml
name: string
id: category/slug
category: enum
content_coverage: complete | curated_subset | ranked
use_when: {intent: enum, conditions: [string]}
expects:
  <entity>: {cardinality: min..max, attributes: {<attr>: {type: enum, required: bool}}}
layout:
  header: ...
  body: ...          # repeating units carry renders: <entity>
constraints:
  must: [...]
```

Optional (recommended): `not_when` (+`alternative_id`), `app_genres`, `interactions`,
`content`, `rationale`, `variants`, `examples`.

---

## Open Questions

| Question | Status | Notes |
|---|---|---|
| `target_id` typed references | Open — partially advanced | `alternative_id` in `not_when` uses the same mechanism; full navigation graph still needs the catalog |
| Binding artifact UI | Open — new | How does a designer edit a binding? Form? Annotated YAML? Direct-manipulation on a wireframe? |
| Attribute type vocabulary | Open — new | `scalar/text/id/enum/media/numeric_series/geo/time` covers two patterns; audit against browse/detail/create patterns |
| Multi-entity screens | Open — new | Detail screens render one item + sub-collections; does `expects` compose cleanly? |
| Category constraint governance | Open — new | Who authors `categories/*.yaml`? Must not become a second, shadow pattern language |
| Variant storage | Open — carried | Inline for now; sibling files when variants need independent retrieval |
| Mock-up fidelity level | Open — new | Wireframe vs. styled HTML vs. interactive prototype — per render call? per designer? Affects the designer study design |
| Multi-frame output format | Open — new | Empty/alert states as sibling frames: one HTML with a frame switcher, or separate files? |
| Style channel format | Out of scope | Orthogonal to patterns by v5 principle 2; needs its own spec eventually |
