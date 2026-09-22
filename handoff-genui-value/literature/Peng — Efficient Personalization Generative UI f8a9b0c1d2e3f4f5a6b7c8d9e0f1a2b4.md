# Peng et al. — Efficient Personalization of Generative User Interfaces

```
@misc{peng2026personalization,
  title={Efficient Personalization of Generative User Interfaces},
  author={Peng, Yi-Hao and Das, Samarth and Bigham, Jeffrey P. and Wu, Jason},
  year={2026},
  eprint={2604.09876},
  archivePrefix={arXiv}
}
```

**Quality grade**: B — 20 designers, 600 generated UIs, preference study with kappa measurement; arXiv preprint.
**Survey** → **Approach type**: personalization — preference modeling to address inter-designer disagreement in GenUI evaluation

# One Sentence
Shows that designers have substantial disagreement on GenUI quality (average kappa = 0.25) and proposes a sample-efficient personalization method that represents new users through comparisons to prior designers, outperforming universal rubric approaches.

---

# More Sentences
A dataset of 600 LLM-generated UIs was evaluated by 20 designers; the resulting kappa of 0.25 indicates only slight-to-fair agreement, revealing that "good GenUI" is highly subjective. The personalization approach represents new users via pairwise comparisons to prior designers and outperforms both a pretrained UI evaluator and larger multimodal models.

---

# Key Points

### Disagreement finding (kappa = 0.25)
The key empirical result is that inter-designer agreement on GenUI quality is very low. This has two implications: (1) universal GenUI quality metrics are suspect; (2) user preference studies in GenUI research may be measuring something fuzzy.

### Personalization matters
One-size-fits-all GenUI is not optimal — personalization significantly improves perceived quality.

### No UI vs. text comparison
The paper studies quality within the GenUI space, not compared to text alternatives.

# Other Notes
The kappa = 0.25 finding is methodologically important for PatternGenUI: if designers strongly disagree on what makes a GenUI good, then preference-based evaluations of GenUI vs. text must be interpreted carefully — they may be capturing novelty or aesthetic bias rather than utility.

# Take-Away
- Complicates the "GenUI is better" story: preference studies may be inflated by novelty/aesthetic effects, not utility
- Patterns could be a mechanism that reduces disagreement by anchoring generation to shared design knowledge — this is a potential secondary contribution of PatternGenUI
