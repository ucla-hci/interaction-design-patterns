# Experiment 1 — Delivery Tracker: prompt-only vs. pattern-conditioned generation

**Date:** 2026-07-08
**Task (journal):** use the patterns to generate UI code; compare a screen generated from the design prompt alone against one conditioned on the Chase pattern (`monitor/grouped-items`).

## Design prompt (both conditions)

> A user has deliveries from multiple sources and carriers, e.g., Amazon, eBay, UPS, USPS, FedEx, etc. and wants to have a centralized place to see the statuses of these deliveries. Generate a mobile UI screen.

## Condition A — baseline (`baseline.html`)

Generated from the prompt alone, no pattern injected. Output reflects the default LLM prior for "tracking app":

- Large page title + subtitle, search bar, **status filter tabs** (All / In Transit / Out for Delivery / Delayed / Delivered)
- **Flat, ungrouped card list** — one rich card per delivery (logo, item, source·carrier·tracking, status pill, progress bar, ETA)
- Single bottom CTA button ("Track a new package"); **no bottom nav**

## Condition B — pattern-conditioned (`pattern.html`)

Same prompt, plus the conditioning block below (the `monitor/grouped-items` spec from `.agent/drafts/pattern-spec-application-test-2-chase.md`, rendered in the v4 LLM-conditioning-block format):

```
[PATTERN: Grouped Item Monitor Screen | id: monitor/grouped-items | category: monitor]

Use when: user wants to check the current state of a set of items they own or track,
organized by category

Layout:
  header: app_bar [utility_icon[]?, brand_logo, profile_icon] (sticky)
          + quick_action_chip[] (role: action, horizontal scroll) [icon?, label]
  body:   item_group[]:
            group_header [group_name, item_count?, aggregate_value?] (prominent, colored)
            item_row[] [item_name, item_id?, primary_value, primary_value_label,
                        trend_indicator?, status_badge?]
  footer: bottom_nav (active_indicator: required)

Interactions:
  item_row tap → navigate: Detail Screen
  quick_action_chip tap → navigate: {chip.label} Screen
  group_header tap → effect: toggles group expand/collapse
  bottom_nav_tab tap → navigate: {tab.section} Screen

Constraints (must):
  - each item_row shows primary_value without a tap
  - group_header visually separates groups; aggregate_value shown if meaningful
  - active bottom_nav tab is highlighted
Constraints (must_not):
  - no horizontal scroll for item_row[]
  - never hide primary_value behind a tap or toggle
Constraints (should):
  - trend_indicator per item_row; status_badge inline; pull-to-refresh

Content: item_row (item_name, item_id?, primary_value, primary_value_label),
         group (group_name, item_count?, aggregate_value?),
         status_badge (success | warning | alert)
```

Instantiation choices (domain fill for abstract slots):

| Abstract slot | Delivery-domain fill |
|---|---|
| `item_group[]` / `group_name` | Source: Amazon, eBay, Other retailers |
| `aggregate_value` | "2 arriving today", "1 delayed" |
| `item_row` / `item_name`, `item_id` | Package name; carrier + truncated tracking no. |
| `primary_value` + `label` | ETA ("Today" / "by 8:00 PM") |
| `trend_indicator` | 4-segment shipment-progress dots |
| `status_badge` | success: out for delivery/delivered · warning: signature required · alert: delayed |
| `quick_action_chip[]` (role: action) | Add tracking · Scan inbox · Archive delivered · Delivery instructions |
| `bottom_nav` | Deliveries (active) · Map · History · Settings |

This extends the cross-product table in the Chase application test with a sixth domain (package tracking) — further evidence the pattern is topology, not domain template.

## Condition C — DoorDash pattern (`pattern-doordash.html`)

Same prompt, conditioned on `discover/curated-sections` (from `.agent/drafts/pattern-spec-application-test.md`). **Deliberately intent-mismatched:** the delivery task is a *monitor* intent, and this pattern's `use_when` ("no specific intent, wants to be shown what's available") does not apply — a retrieval step would have rejected it. Applying it anyway tests what a forced pattern does to the output.

Instantiation choices:

| Abstract slot | Delivery-domain fill |
|---|---|
| `category_tabs` (role: filter) | All · Arriving today · In transit · Needs attention · Delivered |
| `section[]` / curatorial theme | Arriving today · Needs attention · On the way · Recently delivered |
| `section_header` | title + subtitle ("2 packages on the move near you") + see-all |
| `content_card[]` | hero image + status `badge` overlay, item name, metadata_row (source · carrier · ETA) |
| card schema override (promo → urgent) | "Needs attention" uses wider cards with prominent alert badges |
| `persistent_search` footer | "Search deliveries" + ✦ Ask AI button |

The topology transfers mechanically — every slot fills — but the fit is worse for the task:

- **Horizontal card rows hide inventory.** Only ~1.5 cards visible per section; the monitor pattern's `must_not: "horizontal scroll for item_row[]"` exists precisely because monitoring needs full-set visibility. A user cannot answer "is everything on track?" at a glance.
- **Status becomes editorial.** Sections work as curatorial themes ("Needs attention" is genuinely useful triage), but section membership duplicates what the filter tabs already encode — the same status axis appears twice.
- **Media-first cards inflate low-information items.** A package has no meaningful hero image; the layout spends ~60% of card area on decoration.
- **No aggregates.** The pattern has no `aggregate_value` slot, so group-level state ("1 delayed") can only live in prose subtitles.

## Observed deltas (A → B)

1. **Grouping.** Baseline is a flat chronological list; pattern version groups by source with per-group aggregates ("2 arriving today"), so category-level state is readable without scanning rows.
2. **Chip role.** Baseline header chips are `role: filter` (status tabs) — the LLM's default. Pattern forces `role: action` (operations), moving state distinctions into inline `status_badge`s instead of a filter mode.
3. **Information density.** Baseline: ~5 tall cards per viewport. Pattern: ~8 compact rows + 3 group aggregates — closer to the monitor intent (scan everything at a glance).
4. **Navigation scaffold.** Pattern's `bottom_nav` (must: active indicator) situates the screen in an app; baseline is a one-off screen with a lone CTA.
5. **Typed interactions for free.** The pattern's `interactions` block gives every component a defined tap target/effect; the baseline leaves interaction behavior unspecified.

**Caveat for the experimental plan:** both conditions here were generated by the same agent in one session, so the baseline may be contaminated by pattern knowledge. The real ablation (journal task 2) needs fresh, independent LLM calls per condition.

## Takeaway from Condition C

Pattern *presence* is not the variable — pattern *fit* is. B and C are both fully pattern-conditioned and structurally faithful, yet C is worse than B for the monitor task (and arguably worse than baseline A on inventory visibility). This supports the retrieval step in PatternGenUI: `use_when`/`not_when` matter as much as `layout`, and the ablation design should consider a third arm (wrong-pattern) alongside no-pattern and right-pattern.

## Files

- `baseline.html` — Condition A (open in browser)
- `pattern.html` — Condition B (open in browser)
- `pattern-doordash.html` — Condition C (open in browser)
