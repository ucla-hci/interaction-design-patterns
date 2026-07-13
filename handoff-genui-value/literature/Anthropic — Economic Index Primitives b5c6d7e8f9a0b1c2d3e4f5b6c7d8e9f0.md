# Anthropic — Economic Index: Economic Primitives

```
@techreport{anthropic2026primitives,
  title={Anthropic Economic Index report: Economic Primitives},
  author={{Anthropic}},
  institution={Anthropic},
  year={2026},
  url={https://www.anthropic.com/research/economic-index-primitives}
}
```

**Quality grade**: C — 2M conversations (1M Claude.ai + 1M API), but self-published industry report analyzing own product; no peer review.
**Survey** → **Approach type**: empirical log-mined LLM usage taxonomy (dimensional primitives + O*NET mapping)

# One Sentence
Proposes five "economic primitives" — task complexity, skill level, purpose, AI autonomy, task success — as building-block dimensions for characterizing any LLM conversation, complementing a bottom-up 630-category task taxonomy and O*NET occupational mapping.

---

# More Sentences
Claude itself scored 2M conversations against the five primitives. Key findings: top ten work tasks comprise 24% of usage despite 3,000 unique tasks; Claude skews to higher-skill task components (14.4 yrs education vs. 13.2 economy-wide); complexity correlates with speedup (12x for college-level vs. 9x high-school-level tasks). The related Index reports distinguish automation (AI produces work with minimal input) from augmentation (collaborative iteration).

---

# Key Points

### Dimensions, not categories
Unlike categorical taxonomies (OpenAI's 24 topics), the primitives are orthogonal *dimensions* scored per conversation — closer in spirit to a measurement instrument than a classification.

### Automation vs. augmentation
Maps directly onto the act/produce split: automation ≈ delegate the act; augmentation ≈ iterate on an artifact. Different response formats plausibly serve these differently (a form serves delegation; an editable artifact serves iteration).

# Other Notes
O*NET's limits acknowledged: general-purpose model usage includes tasks absent from occupational taxonomies — hence the bottom-up supplement. Same lesson applies to any fixed task battery.

# Take-Away
- The dimensional (not categorical) approach suggests the format study should treat task properties (complexity, iteration, delegation) as covariates, not just task categories as conditions
