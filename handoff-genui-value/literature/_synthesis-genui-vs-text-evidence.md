# Literature Synthesis: Empirical Evidence for GenUI vs. Text

## Problem
Does UI-as-output from LLMs produce non-marginal benefits over text-only (or markdown) responses? Has this been empirically established, and do evaluations of tools like OpenUI and A2UI confirm the assumption? How should PatternGenUI's premise be framed given what the literature says?

---

## Verdict

```
VERDICT: Partially addressed

CORE FINDING: GenUI produces large, consistent benefits in human preference studies (82–97%
preference over text/markdown). There is essentially NO controlled task-performance evidence
(completion rate, accuracy, time, error rate) for the "GenUI > text" claim. The preference
advantage is real but the mechanism (utility vs. novelty/aesthetics) is unconfirmed.

CLOSEST EMPIRICAL EVIDENCE:
1. Leviathan et al. (Google, 2026) — 5-condition pairwise preference study: GenUI preferred
   over plain text 97%, over markdown 82.8–90.5%, over Search results 90%; matches expert
   websites ~50% of the time. Two raters per prompt across 92 (LMArena) + 100 (custom)
   information-seeking prompts. No task-performance data; speed excluded from evaluation.

2. "Generative Interfaces for Language Models" (ACL Findings 2026) — 84.0% win rate for
   GenUI vs. ConvUI (Claude 3.7), 11% for ConvUI, 6% ties. 100-query UIX benchmark (10
   domains, 3 raters each) + real-user study with 76 participants on their own queries.
   Moderate inter-rater agreement (Fleiss' κ = 0.525). Limitation: no backend logic, HTML/JS
   only, latency of several minutes.

WHAT IS NOT ESTABLISHED:
- No paper compares GenUI vs. text on task completion rate, accuracy, time-on-task, or
  error rate in a controlled experiment.
- No paper distinguishes preference (aesthetic/novelty response) from utility (outcome).
- Peng et al. (2026) find inter-designer agreement on GenUI quality is only κ = 0.25,
  suggesting preference results may be partly noise.

OPENUI/A2UI SPECIFICALLY:
- OpenUI (openui.com) is a practitioner protocol/standard with no published peer-reviewed
  evaluation study.
- A2UI/Macaron (Kong et al., 2026) evaluates on A2UI-Bench (protocol validity + LLM-judge
  quality + visual rendering), scoring 75.6. No user study; no head-to-head text comparison.
  A2UI targets personal agent tasks (confirmation, preference refinement), not information
  delivery.

RECOMMENDED NEXT STEPS FOR PATERNGENUI:
1. The "GenUI > text" premise is empirically well-supported at the preference level — enough
   to proceed without needing to re-establish it. Cite Leviathan 2026 and Generative
   Interfaces 2026 as the empirical anchor.
2. Reframe PatternGenUI's claim more precisely: not "GenUI > text" (established) but
   "patterned GenUI > unpatterned GenUI" (unaddressed) and "patterns enable controllable
   GenUI" (also unaddressed). The literature gap is one level finer than the existing claim.
3. The κ = 0.25 disagreement finding (Peng 2026) is a possible secondary motivation:
   patterns could reduce designer disagreement by anchoring generation to shared conventions.
4. Add a one-sentence acknowledgment in the paper that the preference-vs-performance
   distinction is an open issue in the field (cite the CHI 2026 workshop, Cifliku 2026).
```

---

## Literature Matrix

| Source | Compares UI vs. text | Task perf. metric | Preference metric | User study | Grade |
|--------|:---:|:---:|:---:|:---:|:---:|
| Leviathan et al. (2026) — Google GenUI | ✓ (5 conditions) | ✗ | ✓ ELO + win-rate | ✓ (crowd raters) | B |
| Generative Interfaces (2026, ACL) | ✓ (vs. ConvUI) | ✗ | ✓ win-rate, 7 dims | ✓ (76 real users) | B |
| GenerativeGUI (CHI EA 2025) | ✓ (vs. text chat) | ✓ (partial — time, mental demand) | ✓ | ✓ | B |
| Macaron-A2UI (2026) | ✗ | ✓ (A2UI-Bench) | ✗ | ✗ | B |
| The GenUI Study (DIS 2025) | ✗ | ✗ | ✗ | ✓ (37 practitioners) | B |
| Bridging Gulfs (2026) | ✗ | ✗ | ✓ (perceived control) | ✓ | B |
| Efficient Personalization (2026) | ✗ | ✗ | ✓ (κ = 0.25) | ✓ (20 designers) | B |
| Hidden Technical Debt (CHI 2026 ws) | ✗ | ✗ | ✗ (position paper) | ✗ | D |

**Convergence**: Moderate — consistent strong preference advantage for GenUI; absent task-performance evidence; no contradictions.

---

## Contradictions & Tensions

| Paper A | Paper B | Assessment | Status |
|---------|---------|------------|--------|
| Leviathan 2026: 82–97% preference for GenUI | Peng 2026: κ = 0.25 inter-designer agreement | conditional_difference — two different question types (UI > text preference vs. within-GenUI quality rating); not a direct contradiction | resolved |
| GenerativeGUI: GenUI reduces mental demand and task time | GenerativeGUI: clarifying-question generation increases demand and time | conditional_difference — UI per se helps, but the clarification step hurts; net effect depends on design | unresolved |
| "GenUI is overwhelmingly preferred" | No task-performance study exists | knowledge gap — preference and performance may diverge; novelty effects possible | unresolved (open research question) |

---

## Knowledge Gaps

| Gap | Type | Why it matters |
|-----|------|----------------|
| No controlled task-performance study comparing GenUI vs. text | Empirical | Preference ≠ utility; the most important gap in the justification for GenUI |
| No study comparing GenUI vs. well-formatted markdown with tables and charts | Methodological | Markdown can be rich; comparison against bare text may inflate GenUI advantage |
| No study on whether patterns reduce inter-designer GenUI disagreement (κ = 0.25) | Empirical | Patterns could solve a known problem, not just improve topology |
| No evaluation of OpenUI or A2UI with a user outcome study | Empirical | Tool-level claims are unverified against controlled baselines |
| No study distinguishing novelty effects from utility in GenUI preference | Methodological | κ = 0.25 within-GenUI disagreement raises the possibility that "preference" is partly noise |

---

## Approach Taxonomy

| Approach type | Representative papers | Core mechanism | Strengths | Limitations |
|---|---|---|---|---|
| UI vs. text preference comparison | Leviathan 2026, Generative Interfaces 2026 | Pairwise human preference with crowd raters | Large-scale, consistent across studies | Preference ≠ task performance; novelty bias possible |
| Task-performance comparison | GenerativeGUI (CHI 2025) | Task completion time + mental demand + GUI presence | Closest to utility measurement | Single study; mixed results (tradeoff) |
| Protocol/benchmark evaluation | Macaron-A2UI 2026 | LLM-judge + visual quality metrics | Scalable, reproducible | No human subjects; no text baseline |
| Practitioner experience study | The GenUI Study (DIS 2025) | Qualitative diary + interview | Ecological validity | No controlled comparison; no quantitative outcome |
| Critical/barriers analysis | Hidden Technical Debt (CHI 2026) | Position paper | Identifies deployment risks | No data |

---

## Anchor Papers

1. **Leviathan et al. (2026)** — strongest empirical evidence for "GenUI > text" premise; cite as the primary justification for the research premise.
2. **"Generative Interfaces for Language Models" (ACL 2026)** — already in library; second pillar of the preference evidence; the real-user study (76 participants) strengthens generalizability.
3. **Peng et al. (2026) — Efficient Personalization** — the κ = 0.25 finding is the most important caveat to the preference story, and a potential secondary motivation for patterns.
4. **Cifliku (CHI 2026 workshop)** — signals that the field itself recognizes the empirical case is incomplete; useful to cite when acknowledging the gap.
