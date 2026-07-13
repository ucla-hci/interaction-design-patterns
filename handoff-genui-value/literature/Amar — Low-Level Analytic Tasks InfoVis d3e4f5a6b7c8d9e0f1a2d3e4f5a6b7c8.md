# Amar, Eagan & Stasko — Low-Level Components of Analytic Activity in Information Visualization

```
@inproceedings{amar2005lowlevel,
  title={Low-level components of analytic activity in information visualization},
  author={Amar, Robert and Eagan, James and Stasko, John},
  booktitle={IEEE Symposium on Information Visualization (InfoVis)},
  pages={111--117},
  year={2005}
}
```

**Quality grade**: A — canonical InfoVis taxonomy, empirically derived from 196 student-generated questions; rigorous venue; the standard evaluation task set for two decades.
**Survey** → **Approach type**: low-level analytic task taxonomy (InfoVis, empirically derived)

# One Sentence
Derives ten low-level analytic tasks from a corpus of real analysis questions — retrieve value, filter, compute derived value, find extremum, sort, determine range, characterize distribution, find anomalies, cluster, correlate — the de facto standard task set for visualization evaluation.

---

# More Sentences
The tasks were induced bottom-up by affinity-diagramming 196 questions students asked of five datasets, not decreed top-down. They function as the "assembly language" of analysis: domain tasks compile down into sequences of these primitives. Virtually every controlled visualization evaluation since uses some subset as its task battery.

---

# Key Points

### Empirically induced primitives
The derivation method (mine real questions → cluster → name primitives) is itself a template: the same move could be run on LLM conversation logs to induce *post-response* task primitives.

### Consumption-only scope
All ten tasks are read-only operations on a data display. No acting, producing, or monitoring — the taxonomy covers the locate/compare/comprehend region only.

# Take-Away
- Supplies validated, instantly reusable probe types for the locate and compare/decide purposes (retrieve value, find extremum, sort, correlate)
- Its scope limit confirms the need to extend beyond InfoVis primitives for act/produce/monitor purposes
