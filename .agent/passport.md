# Research Passport

*Text follows ASD-STE100 Simplified Technical English. See `.agent/decisions.md`.*

## Topic
A pattern language that abstracts the design of interactive systems, at three levels: workflow,
subtask, and component. The language is built from exemplar systems.

## Stages
| Stage | Status |
|-------|--------|
| 0 · Intake | done |
| 1 · Novelty verification | done, for the earlier topic |
| 2 · Pattern language MVP | in progress, started 9/22/2026 |

## Notes
- 9/22/2026: the project pivoted. The earlier topic was design patterns as a conditioning layer
  for LM-based UI generation. See `.agent/decisions.md`.
- The first exemplar set is the four papers in `data/`: HALO, HAPPIER, PerspectEvolver, and
  THESEUS. All four are human-AI systems for scientific hypothesis work.
- The MVP has three workflow patterns, 15 subtask patterns, and 16 component patterns.
- The language states each pattern in domain-neutral terms, and assumes no AI.
- A component pattern carries a spec that compiles to A2UI.
- Target venues: CHI and UIST.
- Open: each of WF-B and WF-C rests on one system. A system outside `data/` must confirm them.

## Superseded, from the earlier topic
- The claim was empirical: patterns improve the quality and the controllability of generated UI.
- The plan was an ablation (pattern against no pattern, same model) and a designer study.
- The novelty check found the nearest work in the structured-intermediate cluster. Notes are in
  `literature/_synthesis-patterns-genui-novelty.md`.
- The system (PatternMCP and PatternGenUI) was not built. The work is in `archive/genui/`.
