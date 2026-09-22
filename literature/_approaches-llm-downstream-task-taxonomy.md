# Approach Synthesis: A Taxonomy of LLM Downstream Tasks for Format Evaluation

## Problem
How has prior work taxonomized the tasks users perform with LLM responses (or information artifacts generally)? Goal: a defensible building-block task taxonomy to serve as the task battery for measuring performance across response formats (text-only vs. rich markdown vs. GenUI). Provisional taxonomy under test: comprehend / locate / compare-decide / act / monitor / communicate (from `.agent/drafts/reflection-2-genui-task-performance.md`).

---

## Approach Taxonomy

| Approach type | Representative papers | Core mechanism | Strengths | Limitations |
|---|---|---|---|---|
| Log-mined LLM usage taxonomies | Chatterji et al. 2025 (NBER); Anthropic Economic Index 2026; Counts et al. 2026 (M365, screened but thin) | LLM-classified conversation logs at 1M+ scale | Ecological validity; frequency weights | Classifies the *request*, not what the user does with the response |
| Expert LLM intent taxonomies | Bodonhelyi et al. 2024 | Constructed categories validated by user study | Fine-grained (8×3); satisfaction linkage | Same request-side unit; informational skew |
| Information-seeking activity taxonomies | Marchionini 2006; Athukorala 2016; Tang & Yang 2022 | Depth of search (lookup/learn/investigate); dimensional re-classification | Behaviorally validated categories; iteration as dimension | Consumption only; pre-LLM assumptions about episode structure |
| Episode-structure taxonomies (LLM-era) | Iannelli & Ai 2026 | Cross-surface behavioral episodes | What actually happens *after* the answer; 59.5% collapse finding | Shapes, not operations — says episodes end, not what the user did with the artifact |
| Sensemaking process models | Pirolli & Card 2005 | Cognitive task analysis → staged loops | Explains *why* representation matters; tasks chain | Expert-analyst scope; 16 steps too heavy for a battery |
| Cognitive-process taxonomies | Anderson & Krathwohl 2001 (Bloom revised) | Assessment-oriented operation levels | Item-writing discipline; 6 verbs ≈ operations | No monitor; education framing |
| InfoVis task taxonomies | Amar & Stasko 2005; Brehmer & Munzner 2013 | Low-level primitives; multi-level why/how/what | Validated probe types; consume/produce top split; task chaining | Read-only scope (no act/produce/monitor); data displays, not prose |

---

## Dimension Map

| Paper | Unit of analysis | Granularity | Derivation | Covers consume | Covers produce/act | Covers monitor | Usable as eval instrument |
|---|---|---|---|:---:|:---:|:---:|:---:|
| Chatterji 2025 | request intent | 3 + 24 topics | empirical (logs) | ✓ (Asking) | ✓ (Doing) | ✗ | ✗ (descriptive) |
| Anthropic EI 2026 | conversation dims | 5 dims + 630 cats | empirical (logs) | ✓ | ✓ (autonomy) | ✗ | partial |
| Bodonhelyi 2024 | request intent | 8 × 3 | expert + study | ✓ | ✓ (transactional) | ✗ | ✗ |
| Marchionini 2006 | search activity | 3 | theoretical | ✓ | ✗ | ✗ | ✓ (widely used) |
| Tang & Yang 2022 | task dimensions | dims | theoretical | ✓ | ✗ | ✗ | partial |
| Iannelli & Ai 2026 | episode shape | 4 + workbench | empirical (panel) | ✓ | ✓ (workbench) | ✗ | ✗ |
| Pirolli & Card 2005 | process stage | 2 loops / 16 steps | CTA | ✓ | ✓ (act/report) | partial (re-forage) | ✗ (too heavy) |
| Bloom revised 2001 | cognitive operation | 6 × 4 | expert consensus | ✓ | ✓ (apply/create) | ✗ | ✓ (item-writing) |
| Amar & Stasko 2005 | analytic primitive | 10 | empirical (questions) | ✓ | ✗ | ✗ | ✓ (standard battery) |
| Brehmer & Munzner 2013 | why/how/what triple | 3 levels | synthesis | ✓ | ✓ (produce) | ✗ | ✓ (descriptive spec) |

**Skew note**: no single venue/method dominates; the set spans IR, InfoVis, education, cognitive science, and industrial log analysis — deliberately.

---

## Key Convergences

1. **Consume vs. produce is the universal first cut.** Brehmer & Munzner (InfoVis synthesis, 2013) and Chatterji et al. (1.1M ChatGPT logs, 2025) arrive at the same top split — consume/Asking vs. produce/Doing — by completely different methods. Bloom's apply/create vs. remember/understand/analyze/evaluate is the same divide. Iannelli & Ai's workbench layer (41%) confirms it behaviorally.

2. **The consumption side decomposes consistently into ~4 operations.** Locate (Marchionini lookup; Amar & Stasko retrieve/filter/extremum; Bloom remember; B&M lookup/locate), comprehend (learn; Bloom understand), compare/decide (Bloom analyze+evaluate; A&S sort/correlate; Bodonhelyi decision-support), synthesize/investigate (Marchionini investigate; Pirolli & Card sensemaking loop).

3. **Monitor appears in NO prior taxonomy.** Not in Bloom, not in Amar & Stasko, not in any LLM usage taxonomy. It exists implicitly in dashboard practice and Pirolli & Card's re-foraging, but as a *temporal* property (repeated return to the same artifact) rather than an operation. It is a real usage mode (the delivery-tracker scenario) that the literature treats as out of frame because most studies are single-session.

4. **Request-side vs. response-side is the structural gap.** Every LLM-era taxonomy classifies what the user *asked*; every classical taxonomy classifies operations on a *given* artifact. Nobody has taxonomized what users do with an LLM response — even though Iannelli & Ai show the response terminates ~60% of episodes and gets verified ~1% of the time. The response is the terminal interface, and its task space is unmapped.

---

## The Synthesized Taxonomy (v2 — validated and revised from the six-purpose draft)

**Top split** (Brehmer-Munzner / OpenAI convergence): **consume** vs. **produce**.

| # | Purpose | Grounding | Probe types (validated instruments) | Primary metrics |
|---|---|---|---|---|
| C1 | **Locate** — find a specific value/fact in the response | Marchionini lookup; A&S retrieve value, filter, find extremum; Bloom remember; B&M search quadrant | "Find X" probes; extremum probes | time-to-fact, error rate |
| C2 | **Comprehend** — build a correct mental model | Marchionini learn; Bloom understand | Bloom-style comprehension items (immediate + delayed recall) | accuracy, retention |
| C3 | **Compare & decide** — judge among alternatives | Bloom analyze/evaluate; A&S sort/correlate; Bodonhelyi decision support | multi-attribute choice with normative answer | decision quality, time |
| C4 | **Synthesize** — integrate across the response into a new conclusion | Marchionini investigate; Pirolli & Card sensemaking loop | chained probe (locate→compare→conclude) | conclusion quality |
| P1 | **Act** — execute a next step through/from the response | Bloom apply; OpenAI Doing; Anthropic autonomy; Bodonhelyi transactional | complete the follow-up action | completion rate, steps |
| P2 | **Produce** — create/refine an artifact from the response | B&M produce; OpenAI Writing (23.3%); workbench layer (41%) | edit/extend/reuse the delivered content | output quality, effort |
| ⊥ | **Monitor** — *temporal dimension, not a category*: any purpose repeated over changing state | dashboard practice; Pirolli & Card re-foraging; absent from all formal taxonomies | repeat C1/C3 probes across state changes | glance accuracy, latency |

**Revisions from the v1 draft:**
- *Communicate* dropped as a category — the literature locates it inside produce (writing/summarizing for others); no taxonomy treats it as a distinct operation on the artifact.
- *Synthesize* added — Marchionini's investigate and the sensemaking loop are too well-attested to fold into comprehend.
- *Monitor* reclassified from category to **orthogonal temporal dimension** — the honest reading of its absence from every prior taxonomy. This is also the theoretically cleaner claim for PatternGenUI: `monitor/*` patterns serve *repeated* consumption, which is exactly why static-prose formats fail there.
- Two more orthogonal dimensions carried from the literature: **iteration structure** (single-shot vs. multi-turn; Tang & Yang) and **delegation level** (augment vs. automate; Anthropic) — treat as covariates.

**Ecological weights** (from Chatterji 2025): consumption purposes ≈ 49–52% of usage (Asking), production ≈ 35–40% (Doing) — the battery should weight accordingly, and Writing alone (23.3%) justifies P2 investment.

---

## Evolution
Classical taxonomies (Bloom 1956/2001, Marchionini 2006, Amar & Stasko 2005, Pirolli & Card 2005) were built for *given* artifacts and validated instruments. The LLM era inverted the unit: 2024–2026 taxonomies (Bodonhelyi, Chatterji, Anthropic, M365) classify *requests* at log scale, because that's what platforms can see. Iannelli & Ai (2026) is the first to re-attach behavior after the answer — and finds the answer is usually terminal. The synthesis moment: bring the classical operation-on-artifact lens back, applied to the LLM response as the artifact.

## Tradeoffs
- **Log-scale ecological validity vs. operational specificity**: usage taxonomies know what millions asked but not what they did with the answer; classical batteries know exactly what the user did but in artificial single-session settings.
- **Categories vs. dimensions**: categorical taxonomies (Bloom, A&S) yield clean experimental conditions; dimensional ones (Anthropic, Tang & Yang) yield better covariates. The battery needs both: purposes as conditions, iteration/delegation/repetition as dimensions.
- **Battery weight vs. coverage**: seven cells × 3 formats is already 21 conditions; chaining (Pirolli & Card) and delayed recall multiply further. Prioritize by ecological weight + expected format sensitivity: C1, C3, P1, monitor-dimension first (where GenUI should win), C2 second (where it may lose — the honest test).

## Untried Combinations / Open Space
1. **A response-side task taxonomy induced from logs** — run Amar & Stasko's derivation method (mine real questions → cluster → primitives) on post-response user behavior. No one has done it.
2. **Monitor as a measured condition** — no format study has ever tested repeated-glance performance on LLM outputs; the `monitor` intent patterns predict exactly where GenUI's advantage is largest.
3. **Format × purpose interaction study** — the entire 3-format × 7-cell matrix is empty; even a partial fill would be the first evidence of *when* GenUI helps rather than *whether* users like it.

## Anchor Papers
1. **Brehmer & Munzner (2013)** — the structural template (multi-level, consume/produce, task chaining); the taxonomy's spine.
2. **Chatterji et al. (2025)** — ecological weights and the independent confirmation of the consume/produce split at 1.1M-conversation scale.
3. **Amar, Eagan & Stasko (2005)** — validated probe types for C1/C3, and the derivation method to replicate on LLM logs.
4. **Iannelli & Ai (2026)** — the 59.5%-collapse finding: the response is the terminal interface, which is why its format matters.
5. **Anderson & Krathwohl (2001)** — item-writing discipline for constructing probes at controlled cognitive levels.
6. **Marchionini (2006)** — the depth axis (lookup/learn/investigate) separating C1/C2/C4.
