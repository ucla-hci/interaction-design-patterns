Add one new exemplar paper to the pattern library: ingest it, analyze it against the current patterns, propose changes, apply the approved ones, and update the website.

---

## Input

`$ARGUMENTS`: the path to the paper PDF, and optionally a short name (`/add-paper ~/Downloads/foo.pdf foo`). When the name is missing, propose one from the system name in the paper and confirm it. One paper per run.

## Before you start

Read, in this order:
1. `.agent/decisions.md` — the settled rules. Never reverse one silently.
2. `.agent/journal.md` — the newest entry, and its **Open** items.
3. `pattern-language/pattern-language-mvp.md` — Structure, Pattern Attributes, Subtask roles, Component rules, Writing style.
4. `pattern-language/glossary.md`.
5. The pattern files: `pattern-language/patterns/<ID>.md` (or, until the split, `pattern-language-mvp.md` and `single-system-patterns.md`).

Say how big the run is before Phase 2: the page count of the paper, and an estimate of the time.

## Phase 1 — Ingest

1. Copy the PDF to `data/<name>.pdf`. `data/` is not in git.
2. Make `data-text/<name>.txt` with the recipe in `data-text/README.md`. Add the paper to the table there.
3. Find the system section (the section that describes the interface, usually §3–§5). Record its line range in the text file.
4. **Check:** the text file holds the system section, and the § numbers in it are readable. If the extraction is broken (a scanned PDF, two columns mixed), stop and tell the author.

## Phase 2 — Analyze

Read the system section in full, and the study section for findings about the interface. Every claim cites a § number from the text file. Never fill a fact from memory.

Write `pattern-language/refs/analysis-<name>.md` with four parts:

1. **Summary.** The high-level task, the user, and the interface, in five lines.
2. **Workflow.** The sequence of user steps, as the paper describes them, with § numbers.
3. **Match table.** One row per existing pattern at every level (workflows, subtasks, components):
   - *Instance:* yes / partial / no.
   - *Where:* § number and figure.
   - *Fit:* what matches, and what differs from the pattern text.
4. **Unmatched.** Steps or UI in the paper that no pattern covers. For each one, give the role it would take (Frame, Expand, Organize, Evaluate, Synthesize, Commit, Continue), or say that no role fits.

**Check:** every row has a § number or says "not shown". Then show the author the match table, and the counts: instances yes / partial / no, and unmatched items.

## Phase 3 — Propose changes

Apply the rules in this order. Each rule comes from `decisions.md` or from the Structure section of the MVP; cite it.

1. **New instance.** For each "yes": add an Examples narrative for the new system (3 to 5 sentences, tool name, § numbers). Add the system to the instance count.
2. **Promotion.** A single-system pattern with a "yes" now has two systems. It moves from `single-system-patterns.md` (or status `single-system`) into the MVP (status `active`).
3. **Partial.** For each "partial": propose a change to the pattern text that covers the new instance, or record the difference only. The author chooses.
4. **Workflow.** Does the paper follow an existing workflow? If not, propose a new workflow (it can rest on one system, for now).
5. **Unmatched → new patterns.** A new subtask gets a role code and the next free number of that role. A new component gets the next free `C-n`. A retired ID is never used again. A new single-system pattern starts with status `single-system`.
6. **Component rules.** Re-run reuse, extend, merge, demote, promote. Count the uses from the Solution steps.
7. **Roles.** If an unmatched step fits no role, propose a change to the role list. The role taxonomy is tentative (decisions, 10/6).
8. **Glossary.** A new term gets a definition in `glossary.md` before a pattern uses it.

Write the proposals into the analysis file, under **Proposed changes**, each with its rule, and the files it touches.

**Gate.** Put the proposals to the author with AskUserQuestion. Batch them; give a recommendation for each. Apply nothing before the answer. A change to a settled decision must quote the decision.

## Phase 4 — Apply

1. Make the approved changes in the pattern files. Keep the Pattern Attributes order and the writing rules: Situation and Problem are one sentence each; steps have *User:* and *System:*; Problem does not name the solution.
2. Update the "Check: does the language abstract all … systems?" table in the MVP, and the system count in its title and Goal line.
3. When a component gains a figure instance, add it to `pattern-language/refs/cp-figures.yaml` and run `tools/crop_cp.py`. Copy the crop into `pattern-language/figures/C-<n>/` (tracked), and add a line to the `## Figures` list of the pattern file: `` - `figures/C-<n>/<file>.png` <System> Fig. <k>, callout <x>: <what it shows> ``.
3a. When a workflow is new or its graph changed, write or update its layout in `pattern-language/diagrams/<ID>.reladraw` (see the existing three, and the reladraw skill). Every node of the mermaid graph needs a node with `url: "/p/<ID>/?via=<WF>"`; the site check fails when the two node sets differ.
4. **Check:**
   - Every ID in the pattern text resolves to a pattern or a recorded alias.
   - 0 old IDs (A1…, S1…, CP-n) in pattern text.
   - Every Situation and every Problem is one sentence.
   - Every subtask step has a *User:* line and a *System:* line.
   Report each check as a count.

## Phase 5 — Update the website

1. Build the site: `cd website && npx @11ty/eleventy` (see `website/SPEC.md`).
2. Run the acceptance checks of `website/SPEC.md` §11. Report each as a count: cards, broken links, output files that refer to `data/`.
3. Commit the changes on a branch `paper/<name>`, push it, and open a pull request. Vercel builds a preview from the pull request. Give the author the preview link.
4. Do not merge. The author merges after reading the preview.

Ask before the push: it publishes to GitHub.

## Phase 6 — Record

- Journal: a `### Add paper: <name>` section under today's entry, in the journal format: **Approach**, findings (the counts from Phases 2 and 4), **Decisions settled**, **Open**.
- Decisions: one line for each settled change to the language.
- Stop. Do not start a second paper in the same run.
