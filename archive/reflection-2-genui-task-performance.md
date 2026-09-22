# Reflection: Users Prefer GenUI — But For What?

*7/13/2026. Companion to `literature/_synthesis-genui-vs-text-evidence.md`. Part 1 is critical analysis; Part 2 grounds the measurement question in adjacent literatures.*

---

## Part 1 — Critical analysis of the push-back

### 1.1 Decompose the "task" hiding inside an LLM response

A response is an artifact the user consumes for some downstream purpose. The purposes are distinct, and UI's plausible benefit differs sharply across them:

| Downstream purpose | What the user does | Plausible UI benefit over rich markdown | Mechanism |
|---|---|---|---|
| **Comprehend** | Read once, understand a finding | **Marginal or negative** — fragmenting prose into cards/panels can hurt linear reading; classic InfoVis result: graphs were 13.5% *less accurate* than text | Prose carries argument structure; layout doesn't |
| **Locate** | Find one fact inside the response | **Strong** — visual hierarchy, grouping, badges support visual search | Layout topology = pre-attentive scanning |
| **Compare / decide** | Choose among options | **Moderate** — tables help, but markdown *has* tables; interactive sort/filter only pays off at larger N | Value grows with option-set size |
| **Act** | Execute steps, submit input, trigger next action | **Categorical** — forms/buttons are impossible in markdown; not a marginal difference but a capability difference | Affordances, not presentation |
| **Monitor / reference** | Return repeatedly to check state | **Strong** — aggregates, status badges, at-a-glance layout (exactly the `monitor` intent) | Repeated glanceability amortizes layout cost |
| **Communicate** | Share with someone else | Unclear | — |

The honest conclusion: **UI's advantage is task-contingent, and the pure-comprehension case — plausibly the majority of chat responses — may show zero or negative gain.** Preference studies average across all these purposes, which is precisely why they can show a large aggregate effect while telling us nothing about mechanism.

### 1.2 Why the preference numbers are inflated (four confounds)

1. **Aesthetics–usability effect.** Attractive interfaces are rated more usable regardless of actual performance (Tractinsky; Norman; NN/g). Documented *dissociations* exist: studies where aesthetic appeal raised perceived usability while *lowering* objective performance. GenUI outputs are visually richer by construction — preference ratings absorb this halo.

2. **Spectator vs. user.** In both anchor studies (Leviathan 2026; Generative Interfaces 2026), raters judged side-by-side renderings largely *without performing a task with them*. A spectator's preference systematically favors visual richness; a user under time pressure may not. The "before and after actual use" literature shows satisfaction with pretty-but-hard-to-use sites collapses after real use while perceived aesthetics stays constant.

3. **The baseline strawman.** GenUI vs. *plain text* (97% preference) is meaningless — nobody ships plain text. Vs. markdown (82–90%) is fairer, but markdown already provides tables, headings, and lists. The true marginal delta of GenUI = **interactivity + spatial layout + widgets beyond markdown's reach**, and no study isolates that delta. A fair three-arm comparison (plain text / *well-formatted* markdown / GenUI) doesn't exist.

4. **Preference is heterogeneous, not universal.** Luera et al. 2025 (~1000 MTurk respondents): for data questions, tables win overall (41.7%) over charts (36.3%) and text (22%) — and the ordering flips by role (decision-makers prefer tables 51.9%; analysts prefer charts), age, and expertise. Combined with Peng 2026's κ = 0.25 among designers, "users prefer GenUI" is a population average over strongly divergent individuals.

### 1.3 Steelman: why preference still matters, and why performance gains are likely real

- Preference is not epiphenomenal — it drives adoption, engagement, and willingness to return. A product argument survives even if the performance argument is pending.
- The InfoVis literature (Part 2) shows format effects on speed and accuracy are *real and reliably measurable* — just task-dependent. There is every reason to expect genuine performance effects for the right task types (locate, monitor, act); they simply haven't been measured in the GenUI setting.
- For the **act** category the difference is categorical, not gradable — no measurement dispute exists there.

So the push-back doesn't kill the premise; it says the premise is **underspecified**: "GenUI is better" must become "GenUI is better *for these downstream purposes, by these mechanisms*."

---

## Part 2 — How to measure task-performance gain (grounded in adjacent literatures)

### 2.1 The measurement toolkit already exists — in InfoVis and risk communication

The question "does presentation format change task outcomes?" is decades old outside GenUI:

- **Text vs. table vs. graph** (classic comprehension studies): graphs ~25% faster than text, ~46% faster than tables, but *less accurate* than text — speed/accuracy trade-offs are format- and task-dependent. Metric pattern: **accuracy + response time per task type**.
- **Fact boxes** (risk communication, registered RCT): tabular presentation beat text on comprehension *and on recall six weeks later*. Metric pattern: **immediate comprehension quiz + delayed recall**.
- **Interactive vs. static visualization**: mixed results — static was sometimes *faster* but with higher error rates; interactivity raised engagement and guideline adherence. Metric pattern: **speed/accuracy decomposition; engagement as a separate axis**.
- **Task taxonomies**: Amar & Stasko's 10 low-level analytic tasks (retrieve value, filter, find extremum, sort, compare, characterize distribution, …) and Brehmer & Munzner's multi-level why/how/what typology are validated instruments for constructing task batteries.

### 2.2 A measurement design for GenUI

**Conditions** (same underlying content, independent generations):
A. plain text · B. well-formatted markdown (tables, headings — the fair baseline) · C. GenUI.

**Task battery**, crossed with the downstream-purpose taxonomy from §1.1:

| Purpose | Task instrument | Primary metric |
|---|---|---|
| Comprehend | Post-exposure multiple-choice quiz on content | Accuracy |
| Locate | "Find X" probes | Time-to-fact, error rate |
| Compare/decide | Multi-attribute choice with a normatively correct answer | Decision quality, time |
| Act | Complete the follow-up action | Completion rate, steps |
| Monitor | Repeated "is everything on track?" probes across state changes | Glance accuracy, latency |
| (All) | NASA-TLX; delayed recall at 1 week | Workload; retention |

**Predictions this design can falsify:** GenUI wins on locate/monitor/act, ties or loses on comprehend, and the preference–performance correlation is weak (i.e., the halo is real).

### 2.3 The strategic insight for PatternGenUI

**The pattern taxonomy's intent categories are already a task taxonomy.** Each pattern declares what the screen is *for* — `monitor`, `search`, `detail`, `compare`, `transact` — and that intent predicts exactly which task metric the screen should improve:

- `monitor/grouped-items` → glance accuracy + latency on "is everything on track?"
- `search/results` → time-to-target
- `detail/*` → comprehension accuracy
- `transact/*` → action completion rate

This reframes the contribution: **intent-typed patterns don't just improve generation — they make GenUI evaluation tractable**, because every generated screen arrives with a declaration of which downstream task it serves, hence which instrument measures it. Unpatterned GenUI has no such declaration; evaluating it forces the vague "overall preference" measures the field is currently stuck with.

Concretely, the planned three-arm ablation (no-pattern / wrong-pattern / right-pattern) can use **intent-matched task performance** as its primary metric instead of (or alongside) preference — a methodological step past both anchor papers. The wrong-pattern arm becomes especially sharp: condition C (DoorDash pattern on a monitor task) should measurably *hurt* glance accuracy, not merely be dispreferred.

### 2.4 What this means for the paper's framing

1. Premise sentence: cite Leviathan 2026 + Generative Interfaces 2026 for preference-level evidence, then note the open preference/performance gap in one sentence.
2. Position PatternGenUI's evaluation as the first *task-performance* (not preference-only) evaluation in the GenUI-vs-text line — enabled by the intent taxonomy.
3. The heterogeneity findings (Luera 2025, Peng 2026) support patterns as an *anchoring* mechanism — a shared vocabulary that reduces the subjectivity currently drowning GenUI evaluation.
