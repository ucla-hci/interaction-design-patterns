# Park et al. — Bridging Gulfs in UI Generation through Semantic Guidance

```
@misc{park2026gulfs,
  title={Bridging Gulfs in {UI} Generation through Semantic Guidance},
  author={Park, Seokhyeon and Lee, Soohyun and Choi, Eugene and Kim, Hyunwoo and Kweon, Minkyu and Song, Yumin and Seo, Jinwook},
  year={2026},
  eprint={2601.19171},
  archivePrefix={arXiv}
}
```

**Quality grade**: B — user study on perceived control and iterative refinement; arXiv preprint.
**Survey** → **Approach type**: semantic intermediate representation — hierarchical design semantics for user-controlled UI generation

# One Sentence
Identifies two "gulfs" in AI-driven UI design (expressing intent and evaluating results) and proposes semantic design guidance — a hierarchical interdependent representation — as an intermediate that improves users' perceived control and predictability of iterative refinement.

---

# More Sentences
The authors conducted thematic analysis of UI prompting guidelines to identify design semantics, then built a system enabling users to specify these semantics and visualize relationships before generation. A user study found that explicit semantic representation enhanced perceived control over intent expression and outcome interpretation, and facilitated more systematic iterative refinement.

---

# Key Points

### Two gulfs addressed
Gulf of execution (users struggle to specify design intent clearly) + Gulf of evaluation (users struggle to assess/refine generated results). These are the same control/transparency problems PatternGenUI addresses.

### Semantic representation as intermediate
Design semantics are hierarchical and interdependent — structural choice A constrains semantic choices B and C. This is analogous to PatternGenUI's `expects` data-shape + layout slot structure.

### What is measured
Perceived control and predictability of refinement, not task completion or UI quality vs. text baseline.

# Other Notes
This paper is conceptually the closest neighbor to PatternGenUI among the 2026 papers. Both use semantic knowledge as an intermediate to improve user control over AI-generated UIs. Differentiator: PatternGenUI uses named interaction design patterns from a curated library (screen-level, intent-typed); Park et al. use design semantics extracted from prompting guidelines (structural/visual, not screen-typed).

# Take-Away
- Validates the premise that semantic intermediates address the control problem in AI-driven UI generation
- Does not compare UI output vs. text output directly — the semantic guidance is applied within the GenUI paradigm
- Strong neighboring paper for PatternGenUI's related work section
