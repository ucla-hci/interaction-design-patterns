# Exemplar systems review, `data/` (9/22)

> **Superseded in part.** The candidate tables below are the first pass. The current language is
> in `pattern-language-mvp.md`, at the levels workflow, subtask, and component. The per-system
> summaries stay current.
>
> Task (journal 9/22): review the papers in `data/`. They are the first exemplar set for a
> pattern language that abstracts the design of interactive systems. Each paper was read to the
> references. The appendices were not read. All four are anonymous submissions, so this file
> records no bibliographic metadata.
>
> Text follows ASD-STE100 Simplified Technical English. See `.agent/decisions.md`.

| Short name | File | Pages | Task | Study |
|---|---|---|---|---|
| HALO | `data/halo.pdf` | 20 | Ligand optimization, a form of hypothesis generation | within-subjects, 10 medicinal chemists, 30-minute tasks |
| HAPPIER | `data/happier.pdf` | 27 | Drug target identification, protein-protein interactions | between-subjects, 10 medicinal chemists, 5 per arm, 30-minute task |
| PerspectEvolver | `data/perspectevolver.pdf` | 31 | Research ideation, through multi-agent deliberation | within-subjects, 10 researchers, 30 minutes per condition |
| THESEUS | `data/theseus.pdf` | 43 | Hypothesis validation: decompose, test, replan | within-subjects, 16 in the lab, 10 in a one-week study |

**What the set is.** All four are human-AI tools for scientific hypothesis work. They share one
paper template: formative study, three challenges, three design goals, three components, a study
against a baseline, and three design implications. They cover adjacent stages of one research
pipeline: ideate (PerspectEvolver), generate (HAPPIER, HALO), and validate (THESEUS). The set is
coherent, and it is narrow. See Caveats.

---

## Per-system summaries

### HALO: co-abductive reasoning for ligand optimization
- **Theory and stages.** Abduction: observation, pattern identification, hypothesis. Three
  components. **MolCluster** clusters generated molecules by the properties that improved and
  worsened, in green and red. **MolStrategy** gives a per-cluster overview, a sortable candidates
  table, and strategies that correct a worsened property. **MolSynthesis** applies a strategy to
  the molecule in the editor, shows the property deltas live, and saves the result as a node.
- **Structure.** A trajectory map holds the state: a tree of molecules, with a generation edge
  and an edit edge. The three components are views on that tree.
- **Findings to keep.** Quality: 3.16 improved properties against 2.25. Diversity: pairwise
  similarity 46% against 58%, so the output was more diverse. Participants marked "aha" moments
  with an **Insight** button. After the first mark, generation requests fell from a mean of 9.11
  to 1.44, and manual edits rose. Late in a session, the strategy list became too long.
- **Design implication to lift.** Initiative depends on the phase. Before the insight the system
  offers divergent options. After it, the system answers and does not push.

### HAPPIER: one graph for three criteria in target identification
- **Theory and stages.** Divergent and convergent cycles, from Klahr and Dunbar, and Sawyer.
  Three criteria, C1 to C3, that lived in three separate tools: STRING, Google, SwissTarget.
- **Structure.** One **PPI-Graph Panel** encodes all three criteria at the same time: edge
  thickness is C1, edge color is C2, node color is C3. A slider per criterion turns it on and
  off. The graph is split into ranked **subgraphs**; formative participants asked for 50 to 60
  proteins each. A **Detail Panel** opens on click, with the explanation, the reference papers,
  and several 3D docking poses. A **bookmark** adds an interaction to a personal graph, which is
  the output.
- **Findings to keep.** Participants submitted more hypotheses, 9.4 against 2.0, at higher
  self-rated confidence. Confidence was highest for items that a participant visited in both a
  divergent and a convergent move, by linkography. Participants credited the overview-first
  design. They asked for traceability to the passage, and for a way to add their own knowledge.

### PerspectEvolver: literature-grounded perspectives that evolve
- **Theory and stages.** Data-frame sensemaking, from Klein. Divergent and convergent thinking.
  Moves that advance against moves that ground. Three phases. **Perspective Formation** maps
  clustered literature into candidate perspectives. Each perspective has six inspectable fields:
  framing, position, scope, explanation, approach, significance. Evidence backs every field.
  **Perspective-Guided Deliberation** runs one thread per question, and *Synthesize* condenses a
  thread into a **Working Synthesis**: hypothesis, agreements, disagreements, open questions.
  **Perspective Evolution** turns the synthesis into field-level revisions, shown as before and
  after with "why this changed". Brief edits arrive as Accept, Edit, or Reject. Unresolved points
  become **Suggested Threads**.
- **Structure.** A persistent **Investigation Brief**, and a **Canvas** of threads that branch
  from the research question.
- **Findings to keep.** Novelty improved by 1.60 against −0.07, by an LLM judge. Mental demand
  and effort were lower. Prompts moved from grounding to advancing: comparison and knowledge fell
  from 37.7% to 8.6%. The system proposed 91 revisions: participants accepted 70% as drafted,
  edited 28%, and rejected 2%. Evidence support improved less than in the baseline, which is a
  tension between novelty and evidence.
- **Design implications to lift.** Externalize the grounding, and leave the judgment to the
  researcher. Give friction an outlet: a disagreement becomes the next thread. Extend an ensemble
  by evolution, not by addition.

### THESEUS: branch-structured hypothesis validation
- **Theory and stages.** Hierarchy of hypotheses. Multiple working hypotheses. Three
  capabilities. **Decomposition** builds a graph of hypothesis, sub-hypotheses, and experiment
  families. **Traceable rationale** puts literature evidence and a confidence score on the edges.
  **Interpretation and replanning** takes uploaded CSV results, runs a vote of three reviewers
  per experiment and hypothesis pair, and offers "replace hypothesis" or "further experiment"
  with three candidates each. Only an adopted candidate changes the graph.
- **Structure.** The directed graph is the validation state. A node-scoped discussion drawer
  drafts edits, which stay pending until the user applies them. A suggestion that changes the
  topology stays advisory. A draft is rejected when the graph changed under it.
- **Findings to keep.** Every paired difference favored THESEUS, for organization, traceability,
  control, and confidence. Blinded experts rated traceability 6.98 against 4.85. The benefit is
  smaller for a simple one-time task. The node and edge vocabulary cost onboarding time. Users
  asked for version history, which the system does not have.
- **Design implications to lift.** Move from AI responses to a structured state. Use locality to
  coordinate revision: the branch is the scope of a system action. Separate a proposal from a
  commitment.

---

## First-pass candidates (superseded)

These tables are the first pass, at the levels system, workspace, and component. The current
language is in `pattern-language-mvp.md`. A candidate here needed two instances or more.

### Level 1: whole-system patterns

| # | Candidate | Problem | Solution | Instances |
|---|---|---|---|---|
| S1 | **Theory-Staged Workflow** | The real process of an expert is iterative and tacit. A tool for one step fragments it | Name the cognitive theory. Map its stages to system components. Let the user move between them | all 4 |
| S2 | **Diverge-Converge Loop** | To expand the space and to narrow it need opposite affordances. Confidence comes from both, on the same item | Put exploration and verification on the same object, in one view. Make the loop cheap to repeat | HAPPIER, PerspectEvolver, HALO |
| S3 | **Unresolved Seeds Next Round** | A disagreement or a failed outcome stalls the user, or is lost | Turn each open item into a proposed next unit of work, linked to its origin | PerspectEvolver, THESEUS, HALO |
| S4 | **Phase-Dependent Initiative** | Suggestions help early and interfere late | Detect the phase change, or let the user declare it. Reduce the number of suggestions after it | HALO; PerspectEvolver, weaker |

### Level 2: workspace patterns

| # | Candidate | Problem | Solution | Instances |
|---|---|---|---|---|
| W1 | **Externalized Evolving State** | A transcript is linear. The reasoning of the user is a graph. To rebuild it is the main cost | A persistent structured artifact is the state. Output lands in it, not beside it | THESEUS, PerspectEvolver, HALO, HAPPIER |
| W2 | **Cluster the Generated Space** | Too many candidates to inspect one by one. A flat list hides the structure | Group candidates by a signature, and treat each group as a unit | HALO, HAPPIER, PerspectEvolver |
| W3 | **All Criteria, One View** | Each criterion lives in a separate tool. To compare across them is manual work | Give each criterion one visual channel on one view, with a toggle | HAPPIER, HALO |
| W4 | **Overview, then Detail on Demand** | Mixed evidence at once overloads the user | Show a summary in the main view. On click, open a panel with the full evidence | HAPPIER, THESEUS, HALO |
| W5 | **Structured Unit of Viewpoint** | "Think like these papers" produces agents that read alike | Give each viewpoint the same typed, inspectable fields | PerspectEvolver, THESEUS |

### Level 3: component patterns

| # | Candidate | Problem | Solution | Instances |
|---|---|---|---|---|
| C1 | **Rationale Attached at the Link** | An explanation apart from what it justifies is hard to find and to check | Store the rationale and the evidence on the node or edge that they justify | THESEUS, PerspectEvolver, HAPPIER |
| C2 | **Propose, Then Commit** | An edit that applies itself costs the user control. Full manual work is slow | Output enters as a proposal. The user accepts, edits, or rejects. Only that action changes the state | THESEUS, PerspectEvolver, HAPPIER |
| C3 | **Before/After Revision Card** | The user cannot tell what a revision changed, or why | Show a field-level diff, the reason, and the discussion that prompted it | PerspectEvolver; THESEUS, in part |
| C4 | **Scoped Action** | A global regeneration overwrites accepted content | The selected node or branch is the scope. The rest is read-only context | THESEUS, PerspectEvolver, HALO |
| C5 | **Live Consequence Preview** | The user cannot judge a change without its effect | Apply the change and show the effect on every criterion at once | HALO |
| C6 | **Personal Shortlist** | The output of exploration is scattered | A keep action feeds a separate view, which is the deliverable | HAPPIER; HALO, weaker |
| C7 | **Confidence Cue** | The user checks too much, or too little | Show a confidence score per link, to direct the attention of the user | THESEUS, HAPPIER |
| C8 | **Mark-the-Moment** | The system cannot see an insight | One control records an insight. The system uses it as a phase signal | HALO |

---

## Observations for the project

1. **The set supplies problem statements.** The formative study of each paper states three
   challenges, with quotes. A pattern can cite them instead of inventing a problem.
2. **Each paper runs a pattern ablation.** Every baseline keeps the same model and removes the
   structure. HALO removes its three components. THESEUS moves the same functions into a linear
   document. This is the pattern-present against pattern-absent design, at system scale.
3. **A screen-level pattern cannot hold the main ideas.** W1, C2, C4, and S3 state where the
   state lives and who changes it, over time. They do not state a layout.
4. **Some candidates can be the paper template.** S1 and the "three challenges, three goals"
   structure can come from the writing template of one lab. A system from outside must confirm
   S1.

## Caveats

- **One domain, and maybe one lab.** The set covers scientific hypothesis work only. Three of the
  four papers cite overlapping design literature, and all four share a template. A pattern from
  this set can be a convention of the genre. Add exemplars from other domains before any claim of
  generality.
- **Small, short studies.** N is 10 to 16. Most sessions ran 30 minutes. Each HAPPIER arm had 5
  participants. The PerspectEvolver quality measure is an LLM judge. The evidence for a pattern
  is suggestive.
- **Figures not inspected.** Text extraction loses the UI figures. A picture per pattern must
  come from the PDFs.
