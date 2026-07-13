# HAND-OFF: The Fundamental Value of Generative UI

*Written 7/13/2026, for a new standalone project. Self-contained — no PatternGenUI context required. The work summarized here was originally done inside the PatternGenUI repo (`patterns-genui`) and was flagged as biased by that project's interests; §2 audits those biases explicitly and corrects the framing. This directory is the portable hand-off bundle: copy it wholesale into the new repo — this file is its founding document, and `literature/` contains the 18 relevant paper notes plus the two synthesis reports.*

---

## 1. The research question

**Does presenting an LLM response as a generated UI produce non-marginal benefits over textual formats — for what tasks, by what mechanisms, and at what cost?**

State of the evidence (as of July 2026):

- **Preference is established, large, and replicated.** Leviathan et al. (Google, 2026, arXiv:2604.09577): 5-condition pairwise study, GenUI preferred over plain text 97%, over markdown 82.8–90.5%, near-parity with expert-built websites. "Generative Interfaces for Language Models" (ACL Findings 2026, arXiv:2508.19227): 84% win rate over conversational UI, 76 real users, Fleiss κ = 0.525.
- **Task performance is unmeasured.** No study compares formats on completion rate, accuracy, time-on-task, or retention. The closest (GenerativeGUI, CHI EA 2025, DOI 10.1145/3706599.3719743) found a *tradeoff*, not a win.
- **Preference may be inflated.** Aesthetics–usability halo (documented dissociations where aesthetics raise perceived usability while lowering objective performance); raters were spectators, not task-doers; and preference is heterogeneous — Luera et al. (arXiv:2411.07451, ~1000 respondents): tables 41.7% > charts 36.3% > text 22%, ordering flips by role/age/expertise; Peng et al. (arXiv:2604.09876): designer agreement on generated-UI quality is only κ = 0.25.
- **Practitioner tools are unevaluated.** OpenUI (openui.com) has no peer-reviewed evaluation; A2UI/Macaron (arXiv:2605.24830) is benchmark-scored (LLM-judge), no user study, no text comparison.

So the field has a preference result in search of a mechanism. The open contribution: the first controlled **format × task-type performance study** — and "GenUI confers no fundamental advantage over well-formatted markdown plus conversation" must be treated as a live, publishable outcome, not a threat. Equipoise is the point of separating this project.

---

## 2. Bias audit — where the prior reasoning was contaminated, and the corrections

The analysis below was produced inside PatternGenUI, whose thesis needs GenUI to be valuable and pattern-shaped. Five specific distortions to undo:

**(a) The "terminal artifact" reading was directional.** Iannelli & Ai (arXiv:2607.04282) found 59.5% of information-seeking episodes end at the AI answer, with ~1% verification. I read this as "the response is the user's final interface, so format is the whole game." The equally valid reading: **episodes collapse because text was sufficient.** Collapse rates were statistically indistinguishable across lookup/learning/comparison tasks — if format hunger were real, harder tasks should collapse less. This datum is ambiguous and should be framed as such; better, the new study can discriminate the readings (if text-sufficiency explains collapse, GenUI gains should be null on collapsed-episode-type tasks).

**(b) "Act is categorical" used the wrong baseline.** I claimed buttons/forms are impossible in markdown, making GenUI's advantage categorical for action tasks. But the real-world alternative isn't static markdown — it's **the conversation itself**. A user can type "reschedule the delayed one" as easily as clicking a button; chat *is* an interactive medium. The honest condition set must include conversational follow-up as the text-world's interactivity. This dissolves the one "no measurement needed" claim I made; everything now needs measuring.

**(c) "Monitor" was elevated because the flagship has monitor patterns.** I promoted repeated-glance monitoring to a first-class dimension partly because PatternGenUI's catalog and existing experiment (a delivery tracker) live there. Neutrally: monitoring is real but its ecological share in LLM usage is unknown (no usage study measures return-to-artifact rates), and chat products currently regenerate rather than persist artifacts — the monitor scenario presumes a product form (persistent, updating artifacts) that barely exists. It belongs in the battery, but as one cell among equals, flagged as *forward-looking*, not as the centerpiece.

**(d) Scenario selection was convenience-driven.** The proposed battery's first scenario was the delivery tracker — chosen to reuse PatternGenUI artifacts. That seeds the battery with the domain where structured UI looks best. The new project should draw scenarios from *measured usage distributions* (see §3: OpenAI's topic shares) — which puts writing help, practical guidance, and information seeking at the top, none of which is dashboard-shaped.

**(e) Predictions were framed as "where GenUI should win."** Prioritizing "C1/C3/P1/monitor (where GenUI wins)" with C2 as a token "honest test" is advocacy, not science. The new project should pre-register symmetric hypotheses, including: *H0-friendly*: format effects are null once content is held constant; *anti-GenUI*: fragmented layouts hurt comprehension and retention relative to prose (consistent with classic findings that text beats graphs on accuracy); *cost side*: GenUI's latency (1–2 min generation, per Leviathan) and error rates wipe out per-task gains in realistic sessions.

---

## 3. Assets that survive de-biasing

### 3.1 The task taxonomy (validated against five literatures)

Downstream operations a user performs *with* a response — synthesized from Bloom's revised taxonomy (Anderson & Krathwohl 2001), Marchionini's search activities (CACM 2006), Amar/Eagan/Stasko's low-level analytic tasks (InfoVis 2005), Brehmer & Munzner's typology (TVCG 2013), Pirolli & Card's sensemaking model (2005):

- **Consume** (≈50% of usage): **C1 locate** a fact · **C2 comprehend** / build a mental model · **C3 compare & decide** · **C4 synthesize** across the response
- **Produce** (≈35–40%): **P1 act** / execute a next step · **P2 produce** / create-refine an artifact
- **Orthogonal dimensions**: repetition (monitor mode — any operation repeated over changing state; see bias note 2c), iteration structure (single-shot vs. multi-turn; Tang & Yang, TOIS 2022), delegation level (Anthropic Economic Index 2026)

The consume/produce top split is independently confirmed by Brehmer & Munzner and by OpenAI's 1.1M-conversation study (Asking 49% / Doing 40%; Chatterji et al., NBER WP 34255, 2025). Ecological weights and scenario domains should come from Chatterji's topic shares: Practical Guidance 28.8%, Seeking Information 24.4%, Writing 23.3%.

**Epistemic status:** defensible synthesis, not yet empirically induced for LLM responses. A genuinely novel first study: run Amar & Stasko's derivation method (mine real questions → cluster → primitives) on *post-response user behavior* to induce the taxonomy bottom-up.

### 3.2 The measurement toolkit (from InfoVis + risk communication)

- Accuracy + response time per task type (text/table/graph tradition; note: graphs were *less accurate* than text in classic studies — format effects cut both ways)
- Immediate comprehension quiz + delayed recall (fact-boxes registered RCT, PMC7137953: format effects persisted at 6 weeks)
- Speed/accuracy decomposition for interactivity (mixed prior results: static sometimes faster with more errors)
- Bloom-style item-writing for probes at controlled cognitive levels; NASA-TLX for workload
- Benchmark-task vs. insight-method debate (North et al.; LITE hybrid, Gomez et al. 2014) → include a free-use/think-aloud window so scripted probes don't miss unanticipated uses

### 3.3 The study-design skeleton (corrected)

**Layered design: compositional scenarios as carrier, atomic probes as instrument.** The load-bearing argument survives de-biasing: in real use the response is generated *before* the user's next operation is known, so the artifact must serve a distribution of operations — per-probe generation would let every format collapse to a targeted one-liner, destroying the manipulation. Probes are individually timed/scored, fixed order across formats; every taxonomy cell appears in ≥2 scenarios to de-confound cell from scenario content.

**Corrected condition set** (per bias note 2b): 
1. plain text · 2. rich markdown (tables/headings — the fair static baseline) · 3. GenUI · 4. **text + conversational follow-up** (the ecological interactive baseline). Condition 4 is the study's most important addition: it tests whether interactivity must be *spatial* (UI) or whether *conversational* interactivity suffices.

**Corrected scenario sourcing** (per 2d): draw domains from Chatterji's top categories — e.g., a practical-guidance scenario (how-to with decision points), an information-seeking scenario (factual landscape), a writing scenario (P2-heavy), plus one forward-looking monitor scenario (flagged as such).

**Costs measured, not footnoted** (per 2e): generation latency, error/breakage rate, and input effort are outcome variables alongside accuracy/time.

### 3.4 Portable literature

Bundled in this directory's `literature/` (18 paper notes): Leviathan (Generative UI), Generative Interfaces, Kong (Macaron-A2UI), Peng (Personalization κ=0.25), Chen (GenUI Study DIS), Cifliku (Technical Debt), Park (Bridging Gulfs), Chatterji (NBER), Anthropic (Economic Primitives), Bodonhelyi (Intent), Marchionini, Tang & Yang, Athukorala, Iannelli & Ai (New Shape of Search), Pirolli & Card, Anderson & Krathwohl (Bloom), Amar & Stasko, Brehmer & Munzner. Plus the two syntheses: `literature/_synthesis-genui-vs-text-evidence.md`, `literature/_approaches-llm-downstream-task-taxonomy.md`.

**Caveat on all bundled notes:** they were written inside PatternGenUI — "Take-Away" sections frame findings relative to that project's claims, and both syntheses carry residual pro-GenUI framing. Read the facts (citations, methods, numbers) as-is; read the interpretations against §2. Some notes reference other note files by `[[name]]`-style mentions that may not be in this bundle.

---

## 4. Suggested research plan for the new project

1. **RQ formulation with symmetric hypotheses** (see 2e). Candidate title-level framing: "When does generative UI actually help? A task-performance account of LLM response formats."
2. **Pilot: the 4-condition × 3-scenario core** (drop monitor initially; ~12 cells). Primary outcomes: probe accuracy + time; secondary: TLX, preference (collected *after* performance, to measure the dissociation), delayed recall subset.
3. **The dissociation analysis is the headline**: correlate per-participant preference with per-participant performance. If preference ≫ performance (halo confirmed), that alone is a significant finding for the field. If they align, the preference literature is vindicated.
4. **Mechanism decomposition** (second study): vary GenUI properties independently — layout topology without interactivity (static render) vs. interactivity without layout (chat with widgets) — to attribute any gains.
5. **Optional bottom-up taxonomy study** (§3.1): instrument real post-response behavior; would be the first response-side task taxonomy and a standalone paper.

## 5. Relationship to PatternGenUI (one paragraph, for the record)

PatternGenUI conditions UI *generation* on design patterns and evaluates patterned vs. unpatterned GenUI — it presumes GenUI is worth generating. This project tests that presumption. The projects share the task taxonomy and probe instruments but must not share predictions or artifacts (see §2d). If this project finds format effects are null or negative outside narrow task types, that *bounds* PatternGenUI's claims rather than voiding them (patterns would then matter exactly within the task types where UI helps) — but that reading must be earned by data, not assumed.
