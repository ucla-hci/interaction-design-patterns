# Kong et al. — Macaron-A2UI: A Model for Generative UI in Personal Agents

```
@misc{kong2026macaron,
  title={Macaron-{A2UI}: A Model for Generative {UI} in Personal Agents},
  author={Kong, Fancy and Zheng, Congjie and Zhuang, Murphy and Yang, Rio and Zhang, Sueky and Fu, Hao and Jin, Gene and Cao, Song and Chen, Kaijie and Chen, Andrew and Ma, Pony},
  year={2026},
  eprint={2605.24830},
  archivePrefix={arXiv}
}
```

**Quality grade**: B — large-scale model evaluation on A2UI-Bench; no user study; arXiv preprint.
**Survey** → **Approach type**: A2UI protocol — declarative lightweight UI actions embedded in agent responses

# One Sentence
Frames generative UI for personal agents as a learning problem in which models generate natural language + lightweight executable UI actions (A2UI protocol), introducing A2UI-Bench and training Macaron-A2UI models up to 754B parameters.

---

# More Sentences
A2UI is a declarative UI protocol allowing agents to emit structured UI actions (forms, preference selections, multi-goal coordination) alongside natural language. The approach treats GenUI generation as supervised fine-tuning + RLHF on a 30B–754B model family. A2UI-Bench evaluates protocol validity, interaction quality, and visual rendering; the best model scores 75.6 overall without explicit schema hints, outperforming baselines that had full schema information.

---

# Key Points

### A2UI protocol
Lightweight declarative UI actions embedded in conversational responses — a middle ground between pure text and full HTML generation. Targeted at personal agent tasks: information gathering, preference refinement, multi-objective organization.

### Evaluation methodology
A2UI-Bench uses three layers: protocol validity (structural correctness), LLM-judge-based interaction quality, and visual rendering quality. No human user study; no comparison of task outcomes vs. pure text responses.

### Training approach
LoRA-based SFT followed by reward-driven RL. Corpus built from heterogeneous dialogue sources at scale (30B, 235B, 754B parameters).

# Other Notes
This is the paper behind "A2UI" as a specific protocol/product. OpenUI (openui.com) is a separate practitioner standard with no published peer-reviewed evaluation study.

# Take-Away
- A2UI addresses a different use case from PatternGenUI (agent-embedded actions vs. designer-tool UI code generation)
- Evaluation is benchmark-based (automated), not a human user study comparing UI vs. text task performance
- The paper asserts text is a "bottleneck" for complex agent tasks but does not provide a controlled study quantifying the bottleneck
