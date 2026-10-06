---
id: "OR-1"
name: "Group Candidates by Criteria"
level: "subtask"
role: "Organize"
status: "active"
context: ["WF-A"]
situation: "The user has a large batch of candidates, and needs to see which ones behave alike."
problem: "Among hundreds of candidates, the user cannot see which ones behave alike, and reads them one by one."
systems: ["HALO", "HAPPIER"]
references: ["C-3", "C-4", "C-5", "C-6"]
aliases: ["A3"]
---

## Solution

1. C-3 Candidate Groups
   - *User:* —
   - *System:* groups the candidates by a signature from the criteria, not by generation
     order. Labels and summarizes each group.
2. C-5 Multi-Criteria Encoding
   - *User:* —
   - *System:* marks each group by its result on each criterion.
3. C-4 Persistent Structure Map
   - *User:* —
   - *System:* shows the groups on the map.
4. C-6 Detail on Demand
   - *User:* selects a group.
   - *System:* lists the candidates of the group.

## Examples

- *HALO.* MolCluster groups the generated molecules into clusters, by which properties
  improved (green) and which worsened (red) (§4.1). The chemist reads the clusters to see the
  landscape, and the properties that still fail (§4.1). Selecting a cluster opens
  MolStrategy. Its overview tab summarizes the strengths and weaknesses of the cluster, and its
  candidates tab lists the members (§4.2).
- *HAPPIER.* The system ranks the subgraphs by interaction potential (§5.1.1). The chemist
  moves through them one at a time with the Sub-graph slider (§5.1).
