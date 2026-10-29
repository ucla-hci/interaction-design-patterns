---
id: "FR-3"
name: "Collect the Sources"
level: "subtask"
role: "Frame"
role_also: "Expand"
status: "single-system"
context: ["WF-4"]
situation: "Before the system proposes anything, the user chooses the sources that it can use."
problem: "Proposals cite sources that the user does not know or trust, or sources that do not exist."
systems: ["IdeaSynth"]
references: ["C-10"]
aliases: []
---

## Example

- `figures/FR-3/1-ideasynth.png` IdeaSynth Fig. 3, callouts 1 and 2: paper search, and the collection

1. Add sources. The user searches for sources (Search Papers, 1), and adds them to the collection
   (Collected Papers: 5 papers collected, 2). Each source shows its metadata and a summary (TLDR).
2. Get recommended sources. The user requests more sources (Recommend Papers). The system proposes
   sources like the ones in the collection (§4.3; not in the figure).

## Solution

1. Add sources — (no component)
   - *User:* searches for sources, and adds them to the collection.
   - *System:* shows the collection. In later subtasks, uses and cites only the sources in it.
2. Get recommended sources — C-10 Proposal Set
   - *User:* requests more sources, and adds some from the [proposal set](C-10) to the
     collection.
   - *System:* proposes sources that are like the sources in the collection.

## Examples

- *IdeaSynth.* A researcher searches Semantic Scholar from a search bar, and adds papers to the
  collection tray (§4.1.2, §4.3, Fig. 3 ①). "Recommend papers" suggests more papers, with the
  collection as positive examples (§4.3, Fig. 3 ②). IdeaSynth extracts the full text of each
  paper and summarizes its facets (§4.3). It never cites a paper outside the collection, to
  prevent false sources (§4.3).
