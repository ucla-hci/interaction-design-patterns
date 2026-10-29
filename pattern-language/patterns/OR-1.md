---
id: "OR-1"
name: "Group Candidates by Criteria"
level: "subtask"
role: "Organize"
status: "active"
context: ["WF-1"]
situation: "The user has a large batch of candidates, and needs to see which ones behave alike."
problem: "Among hundreds of candidates, the user cannot see which ones behave alike, and reads them one by one."
systems: ["HALO", "HAPPIER"]
references: ["C-3", "C-4", "C-5", "C-6"]
aliases: ["A3"]
---

## Example

- `figures/OR-1/1-halo.png` HALO Fig. 2, callouts A to C: clusters of the generated molecules; one cluster open

1. Get grouped candidates. The system sorts the candidates on the map (generated molecules, A) into
   groups by the criteria (clusters by the properties that improved, B). Each group shows its
   result on each criterion (a check per property: DRD2, DILI, PLOGP, QED), and its size.
2. Open a group. The user selects a group (Cluster 3). The system opens its detail (MolStrategy,
   C): a summary, and tabs for the overview, the candidates, and the strategies.

## Solution

1. Get grouped candidates — C-3 Candidate Groups, C-5 Multi-Criteria Encoding, C-4 Persistent Structure Map
   - *User:* —
   - *System:* sorts the candidates into [candidate groups](C-3) by a signature from the
     criteria, not by generation order. Labels and summarizes each group. Marks each group by
     its result on each criterion, in a [multi-criteria encoding](C-5). Shows the groups on the
     [persistent structure map](C-4).
2. Open a group — C-6 Detail on Demand
   - *User:* selects a group.
   - *System:* opens the [detail](C-6) of the group: a list of its candidates.

## Examples

- *HALO.* MolCluster groups the generated molecules into clusters, by which properties
  improved (green) and which worsened (red) (§4.1). The chemist reads the clusters to see the
  landscape, and the properties that still fail (§4.1). Selecting a cluster opens
  MolStrategy. Its overview tab summarizes the strengths and weaknesses of the cluster, and its
  candidates tab lists the members (§4.2).
- *HAPPIER.* The system ranks the subgraphs by interaction potential (§5.1.1). The chemist
  moves through them one at a time with the Sub-graph slider (§5.1).
