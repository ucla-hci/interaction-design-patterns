# Leviathan et al. — Generative UI: LLMs are Effective UI Generators

```
@misc{leviathan2026genui,
  title={Generative {UI}: {LLM}s are Effective {UI} Generators},
  author={Leviathan, Yaniv and Valevski, Dani and Kalman, Matan and Lumen, Danny and Segalis, Eyal and Molad, Eyal and Pasternak, Shlomi and Natchu, Vishnu and Nygaard, Valerie and Venkatachary, Srinivasan and Manyika, James and Matias, Yossi},
  year={2026},
  eprint={2604.09577},
  archivePrefix={arXiv}
}
```

**Quality grade**: B — large preference study (5 conditions, 100+ prompts, 2 raters each); arXiv preprint; Google Research provenance.
**Survey** → **Approach type**: positive empirical evidence — UI vs. text preference comparison

# One Sentence
A large-scale pairwise preference study demonstrating that LLM-generated UIs are overwhelmingly preferred over markdown and plain-text responses, and are competitive with expert-designed websites in approximately 50% of cases.

---

# More Sentences
The study compared five conditions (expert-designed websites, GenUI, Google Search results, standard markdown, plain-text LLM output) using human raters on 92 LMArena prompts and a custom 100-prompt information-seeking set. GenUI achieved ELO 1736.2 vs. expert-site ELO 1800.3. Across both prompt sets, GenUI was preferred over markdown 82.8–90.5% of the time and over plain text 97% of the time. The capability is shown to be emergent: Gemini 3/2.5 Pro achieve near-zero generation errors, while Gemini 2.0 Flash has 29% error rate and Flash-Lite 60%.

---

# Key Points

### Preference evidence
GenUI preferred over plain-text LLM 97%; over markdown 82.8–90.5%; over Google Search results 90%. Expert websites preferred over GenUI only ~50–55%, suggesting near-parity.

### What is NOT measured
All comparisons are pairwise *preference*, not task completion, accuracy, time-on-task, or learning outcomes. No controlled task with objective outcome metrics.

### Limitations acknowledged
Generation speed (1–2 minutes, reduced ~50% with streaming); occasional JS/CSS/HTML errors. Speed concern was excluded from the preference evaluation.

### Emergent capability
Capability is strongly model-tier dependent: top-tier models (Gemini 3, 2.5 Pro) generate near-flawless UIs; smaller models fail at high rates. The "GenUI is good" finding is only true for state-of-the-art model sizes as of 2026.

# Other Notes
This is the strongest empirical paper supporting the "GenUI is worthwhile" premise. But preference ≠ task performance — a user can prefer an interactive UI while completing a task at the same rate or slower.

# Take-Away
- Strong evidence that GenUI is non-marginally preferred over text/markdown (not a close call — 82–97% preference gaps)
- But the evidence is preference-only; no task performance data exists to confirm the preference translates to better outcomes
- The emergent-capability finding matters for the research context: at the time of PatternGenUI experiments, model capability for GenUI is sufficient but not universal
