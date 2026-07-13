# Generative Interfaces for Language Models

```
@misc{generativeinterfaces2025,
  title={Generative Interfaces for Language Models},
  year={2025},
  eprint={2508.19227},
  archivePrefix={arXiv}
}
```

**Quality grade**: B — user preference study with real users; two-stage evaluation (benchmark + real-user); arXiv / ACL Findings 2026.
**Stance on claim**: not addressed (novelty), supports (UI vs. text evidence)

# One Sentence
Proposes a paradigm in which LLMs proactively generate task-specific UIs for their own outputs (rather than text responses), with a user study showing 84.0% win rate for GenUI over ConvUI on a 100-query benchmark across 10 domains.

---

# More Sentences
The structured intermediates are high-level interaction flows (user trajectories) and low-level FSMs (component behavior). Evaluation used 100 queries in UIX-Bench (10 domains, 3 raters each, Fleiss' κ = 0.525) and a real-user study with 76 participants using their own queries. GenUI win rate: 84.0% vs. ConvUI (Claude 3.7), 11% ConvUI wins, 6% ties. Limitations: system lacks backend logic (HTML/JS only), iterative refinement causes multi-minute latency, evaluation uses controlled benchmarks not open-ended tasks.

---

# Key Points

### Evaluation details (updated)
- 100-query UIX benchmark, 10 domains, 3 crowd raters per comparison (Fleiss' κ = 0.525 — moderate agreement)
- Real-user study: 76 participants, using their own queries
- Three conditions: GenUI vs. ConvUI (Claude 3.7), GenUI vs. ConvUI (GPT-4o), GenUI vs. IUI (instructed)
- Seven evaluation dimensions + overall preference; pairwise rating
- The "72% improvement" reported elsewhere = ~84% win rate when properly counted

### What is NOT measured
All comparisons are pairwise preference; no task completion, accuracy, or time-on-task metrics. System lacks backend logic — evaluations are simulated/static interactions only.

# Take-Away
- Use case: LLM-as-UI-generator for conversational outputs. Not a designer tool. Not a prior art risk for PatternGenUI's claim.
- **Relevant as empirical justification**: this paper and Leviathan 2026 are the two papers that most directly support the premise that GenUI is worth pursuing (not marginal).
- Moderate inter-rater agreement (κ = 0.525) suggests the preference signal is real but not overwhelming.
