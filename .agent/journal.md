# A pattern language to abstract the design of interactive systems

## back-log
<!-- what we will work on some time in the future -->
- We should develop a agentic framework for extractively defining such language given a set of papers
- Add division of labor to workflow

## next-up
<!-- what we should work on next time -->
- continue to review mvp--create a more structured list of reviewable samples
- (once stablized after add a few more papers) derive a set of rules for extracting patterns given a set of papers (or new papers added to a set of existing papers)

## 10/22/2026
- [xac] review the PR #1 preview (IdeaSynth): WF-4, EX-3, EX-4 pages, and the WF-4 diagram layout; then merge
- [xac] check the IdeaSynth partials recorded only (EX-1, CM-1, CM-2, CN-1, C-1, C-9, C-12) in `refs/analysis-ideasynth.md`
- [xac] pick the next exemplar paper and run `/add-paper` on it

## 10/20/2026
- [x] add some other groups' papers (e.g., AI2's)
- [x] "The user checks a claim with evidence that arrives one piece at a time." => improve the wording to emphasize "decompose", e.g., "The user decomposes a claim into smaller sub-claims and check them one at a time after collecting evidence."

### WF-3 Situation
- `patterns/WF-3.md` Situation now reads "The user splits a claim into parts, collects evidence for each part, and checks the parts one at a time." It uses "part" (glossary), not "sub-claim". One sentence, 20 words.
- `npm run build` and `npm run check` pass. Committed on branch `paper/ideasynth`, so it joins PR #1.

### Add paper: IdeaSynth
**Approach** First run of `/add-paper`, and the first paper from another group (AI2; the 10/20 item asks for more than one). Source: `data/ideasynth.pdf` (CHI '25, 31 pages, published with author names), text in `data-text/ideasynth.txt`; system section §4, lines 507–1036. Analysis and proposals: `pattern-language/refs/analysis-ideasynth.md`.
- Match against 31 patterns: 5 yes (C-4, C-7, C-8, C-10, C-14), 12 partial, 14 no. 5 unmatched steps, each with a role.
- Applied: WF-4 Decompose, Vary, and Compose (new). New single-system subtasks FR-3, EX-4, EV-5, OR-2, SY-3. EX-3 is now "Split the Claim into Parts", active with THESEUS and IdeaSynth. IdeaSynth added to FR-2, C-4, C-6, C-7, C-8, C-10, C-14, C-17; C-6 and C-17 gain one variation each. Four glossary terms: source, collection, alternative, composition. "part" no longer requires a check.
- EX-4 is "Generate Alternatives to a Part", not "Branch a Part" as proposed: with EX-3 generalized, the split into other kinds belongs to EX-3, and EX-4 keeps the same-kind alternatives.
- Figures: `tools/extract_figures.py` now includes ideasynth (8 figures; the other 35 index entries are unchanged). New crops: `figures/C-4/5-ideasynth.png` (Fig. 4), `figures/C-6/5-ideasynth.png` (Fig. 5, callout 6).
- Checks: 0 unresolved IDs, 0 old IDs, 0 Situation or Problem with more than one sentence, 49 steps with 0 missing *User:* or *System:*. Site: 37/37 cards, 1086 links with 0 broken, 25 diagram nodes with 0 mismatched, 0 files that refer to `data/`, check 8 passes on 49 steps.
- The text recipe removes lines that hold only a number, so top-level section numbers ("4") are lost; subsection numbers stay. The analysis maps them from the raw `pdftotext` output.

**Decisions settled**
- WF-4, the five subtasks, and the instances, as above. EX-3 generalized and promoted. Frame widened to include the material that later subtasks can use.

**Open**
- Author review of the WF-4 diagram: SY-3 sits a little right of FR-3, and the loop label is close to EX-3.
- Partials recorded only (no text change): EX-1, CM-1, CM-2, CN-1, C-1, C-9, C-12. A second paper of this kind can turn some into instances.
- WF-4 rests on one system, like WF-2 and WF-3.

## 10/15/2026
- [x] when hovering over an inline citation of a component pattern, the popup tooltip can show a thumbnail preview
- [x] instead of listing the components upfront, refer to them inline, e.g., user opens xxx [Cxx] ...
- [x] for the steps in the Solution part of a subtask, try referring to the components when describing user input and system output. hide the previews for now as i don't feel they are useful.
- [x] wf-a/b/c is not scalable once there are more than 26 workflow patterns
- [x] definition of claim: shouldn't have "patches" saying special cases with wf-b or wf-c. just describe a general definition

### Thumbnail in the component popup
**Approach** The link popup shows the eigen-UI of a component above its name, Situation, and Problem. A component without an eigen-UI (11 of 13; only C-4 and C-6 have one) shows the popup as before, with no empty placeholder. This applies to every link to a component, not only the links in steps.
- `library.js` adds `svg` to the preview index (about 8 KB per page); `site.js` puts it in the popup with the `.thumb` style; `site.css` adds `.pv-thumb`.
- `npm run check` passes all 7 checks. Checked by eye: hover screenshots on EX-3 of C-4 (thumbnail shown) and C-9 (no thumbnail), in headless Chrome with a synthetic `mouseenter`.

### Workflow IDs
**Approach** The author chose numbers in the order of first use: WF-A → WF-1, WF-B → WF-2, WF-C → WF-3. This is the same form as the subtask and component IDs.
- Renamed `patterns/WF-*.md` and `diagrams/WF-*.reladraw` with `git mv`. The IDs are replaced in the pattern files, the diagrams, `pattern-language-mvp.md`, `single-system-patterns.md`, `glossary.md`, `website/SPEC.md`, and `passport.md`. In `library.js`, `ID_RE` now matches `WF-\d+`.
- Each workflow keeps its old ID in `aliases`, so `/p/WF-A/` redirects to `/p/WF-1/`. `npm run check` passes all 6 checks: 849 links, 0 broken; 35 aliases, 0 unresolved.
- Not renamed: journal entries, earlier decisions, `refs/`, and `renders/`. They are records of their date.

### Definition of claim
- `glossary.md` now reads "A statement that the user wants to develop or to check". The sentence about WF-2 and WF-3 is removed. No other glossary entry names a pattern ID.

### Components in step text
**Approach** The author chose the component name, in lower case, as a link: "opens one [scoped conversation](C-9) per question". The author asked to apply the rewrites directly, without a draft first. "Previews" means the eigen-UI thumbnails on the step cards.
- 33 of the 36 steps in `patterns/*.md` rewritten; the other 3 have no component. In every step, the text links each component in its heading, and no other component. Checked by script.
- `library.js`: `stepInline` turns a `(C-n)` link into a pattern link with a hover preview. `markTerms` no longer marks a glossary term inside a link: 23 were nested, for example "link" in "provenance link". Tooltips on the pages: 104, from 116.
- `p.njk`: the step cards have no thumbnails. The catalog tiles on the home page keep theirs.
- Rule added to the Solution row of `pattern-language-mvp.md` and to `decisions.md`. `npm run check` passes all 6 checks: 899 links, 0 broken.

**Open**
- Some wording changed to fit a component in: "sorts it into candidate groups", "opens the detail of the group". The author reviews the diff.

### Components inline, not listed
**Approach** The step card no longer lists the components under the step name. The text shows each one where it is named, as one link: "scoped conversation [C-9]". This is a display change only: the step heading in `patterns/*.md` keeps "— C-n Name", because the catalog tiles, the component counts, and the checks read it.
- `p.njk` drops the component list; `stepInline` in `library.js` adds the ID after the name; the unused `.step-c` and `.step-label` rules are removed from `site.css`.
- `npm run check` passes all 6 checks. Links: 849, from 899 (the 50 listed links are gone; the 50 inline links stay). Checked by eye on an EX-3 screenshot.

- The component IDs are in two places in the source: the step heading and the text. The author chose a check over one source: SPEC §11 criterion 8, check 8 in `scripts/check.mjs`. It passes on 36 steps, and fails with exit 1 on a planted mismatch (EV-3 step 2: -C-10 +C-12).

**Open**
- Author review: the wording of the 33 rewritten steps, and whether the popup thumbnail is useful at its size (the C-4 drawing is faint).
- From 10/13, still open: the three WF-3 edge conditions are guesses; the diagram layout issues; the step-strip momentum fix is untested on a real trackpad.
- `npm run serve` writes to `_site` as well. With the dev server running, run `npm run build` just before `npm run check`, or check 2 counts the wrong links.

**Next**
- Push `main` so that Vercel deploys 10/13 and 10/15. The live site still shows WF-A/B/C and the old step cards.
- Rewrite the pattern prose against `writing-blacklist.md` (2 examples now) once the author adds more.


## 10/13/2026
- [x] "After a discussion, the user needs to know what it settled and what stays open." How open is defined here seems wrong
- [x] you didn't fix this: "Component: an individual or group UI element(s) that supports a subtask."
- [x] "A workflow has none: "— (top level)" this is okay to show on the about page but doesn't need to appear on tooltips
- [x] add a naming convention for the steps in a subtask: it should describes user's action
- [x] below Solution on a subtask page, add a summary of the steps as a sequence of things users do
- [x] tooltip-define "claim" like how I can hover and see what "viewpoints" mean
- [x] if a subtask solution introduces new terms, e.g., SY-2 introduces "record", those new terms need to be defined
- [x] horizontally scrolling the subtasks also causes the page to scroll
- [x] EV-2 step 1 and 2 can be combined as they are both scoped conversation with one being a user only and the other system only. Similar steps can be merged as well.
- [x] font sizes across WF charts are inconsistent 
- [x] "an individual or group UI element(s) " → an individual or group of UI element(s) 
- [x] wf-a flowchart font size is appropriate; the other workflows' are too large
- [x] subtask needs to be more atomic (currently too many steps)
- [x] when possible, each step in the subtask should contain both what user does and what the system responds (or vice versa)
- [x] workflow chart visual: use less saturation on the color (color differentiation isn't important at the workflow level); de-empahsize the subtask tag (e.g., FR-2) which are now bolded and centered, too attention-grabbing
- [x] needs to be more explicitly defined: when something should be labeled on the edge and what'd that label be in what format and carry what meaning

### Workflow chart visual
**Approach** Role colors in `pattern-language/diagrams/*.reladraw` cut to 35% saturation, with lighter borders. `website/src/_data/library.js` moves each node's subtask ID from the centered bold first line to the node's top-left corner as 12px gray mono text (`text.tag` in `site.css`).
- Build: 18/18 diagram nodes carry the tag; `npm run check` passes all 6 checks. Checked by eye on a WF-B screenshot only.

### Edge labels
**Approach** The author's rule: no label on the main path (the order of the Solution lines) or on a two-way edge between neighbors. Every other edge (loop back, skip, fork branch) gets "condition → what is passed". Written into the Solution row of `pattern-language-mvp.md` and into `decisions.md`.
- All 8 labeled edges were relabeled in the mermaid blocks and in the `.reladraw` layouts. The author approved the draft labels. One edge is new: WF-A EV-1 → CM-1 ("no candidates to combine → checked candidates").
- The CN-1 → EV-2 and CN-1 → EV-3 edges now leave from CN-1's right side, so their labels no longer overlap the CN-1 → EX label. `npm run check` passes all 6 checks.

**Open**
- Three WF-C conditions are guesses, because the Solution text does not say when each path is taken: "part stays open", "part cannot hold", "part too broad to check".
- Layout: the CN-1 → EV edge starts at the same point where the CM-2 → CN-1 arrow ends. In WF-C, the self-loop label sits on its small loop. The EV-1 → CM-1 label in WF-A widens the gap between EX-1 and OR-1.

### Workflow chart font size
**Approach** Each diagram was stretched to the full card width, so the narrower WF-B (1050 units) and WF-C (1085) came out about 40% larger than WF-A (1496). `website/src/_data/library.js` now gives every diagram one scale, `DIAGRAM_SCALE = 0.65` px per unit (WF-A's size at full card width), capped at the card width and centered. Also fixed: the diagram's `aria-label` printed a literal `${r.id} ${r.name}`.
- Rendered widths: WF-A 972px, WF-B 683px, WF-C 705px. `npm run check` passes all 6 checks. Checked by eye on a WF-B screenshot.

### Atomic subtasks and paired steps
**Approach** The author's rule: a subtask has 3 steps or fewer. A subtask with more is split, or its steps merge. A step pairs a user action with the system response where it can, and "—" stays for a side that does nothing. Written into the Solution row of `pattern-language-mvp.md` and into `decisions.md`. The author then asked for EV-2 steps 1 and 2, and similar steps, to merge.
- Applied to the 15 subtasks in `patterns/*.md` from `pattern-language/refs/subtask-steps-draft.md`: 64 steps became 36, all by merging, so no subtask is split. The 42 component–subtask pairs are unchanged (checked against HEAD), so the component counts are unchanged.
- A step can now name several components. `library.js` parses them all, the step strip in `p.njk` shows each one, and the catalog tiles in `index.njk` show each one. `npm run check` passes all 6 checks.

**Open**
- A step with many components is a tall card: EX-3 step 1 has four.
- EX-1 step 2 has one added phrase, "returns the next batch in the same way".
- Optional splits that were not made: EX-3 and EV-3 (see the draft).

### Font sizes across charts, and the Component definition
- Font sizes: already fixed by "Workflow chart font size" above, in the local build. Screenshots of the home catalog and of WF-A, B and C show the same text size in every chart. The deployed site keeps the old scaling until `main` is pushed.
- `pattern-language-mvp.md` line 16 now reads "an individual or group of UI element(s)". The About page shows it; `npm run check` passes all 6 checks.

### Step strip scroll
**Approach** The author's choice: the strip absorbs momentum. In `website/src/assets/site.js`, the strip keeps the wheel until the wheel events pause for 300 ms. Momentum that reaches the end of the strip stops there. A new gesture after the pause scrolls the page.
- Test: wheel events sent to headless Chrome over its debugging protocol, at 800px wide on EX-3. Old script: one continuous stream moved the page from 416 to 845. New script: the page stays at 416 during the stream, and a fresh event after the pause scrolls it normally. A synthetic stream only; not yet tried on a real trackpad.
- With 3 steps or fewer, a strip overflows only between the 760px breakpoint and about 850px wide. On a wider screen there is nothing to scroll.

### Step names, step summary, and terms in steps
**Approach** The author's choices: a step name is a verb and its object, with the user implied. When the user does nothing, the name states what the user gets. New terms are added to the glossary now, and the author reviews them after.
- Names: all 36 steps in `patterns/*.md` now read "1. Name — C-n Component". Rule in the Solution row of `pattern-language-mvp.md`; the glossary "step" entry was updated to match.
- Summary: a subtask page shows the step names in order under Solution ("User: Apply an option → Choose a direction → Save the candidate"). Each step card leads with its name.
- Terms: hover definitions were in Situation and Problem only, so "claim" and "record" had none in the steps. `markTerms` now also runs on the User and System text. In steps it marks nouns only, because the Actions verbs caught other senses ("keeps a conflict as a conflict").
- 14 terms added to `glossary.md` (Objects of the work): field, batch, signature, score, working set, participant, contribution, entry, procedure, variant, verdict, draft, option, direction. Written from how the steps use them. `npm run check` passes all 6 checks.

**Open**
- The author reviews the 36 step names and the 14 definitions. "direction" is the least certain: SY-1 and CM-2 use it but do not define it.
- Shortlist, map, and conversation are not glossary terms. They name components, and the step card already links each component.

### Tooltip fixes: "open" and the Context note
- "stays open" got the definition of the action "open" (the system shows full content). Of the 5 action-verb tooltips in Situation and Problem, 3 were in the wrong sense (SY-2 and CN-1 "open", C-4 "keep arriving"). `markTerms` in `library.js` now marks glossary nouns only, everywhere. The 2 correct "keep" tooltips (C-12, C-9) are lost as well.
- Attribute tooltips use a `tip` text without "A workflow has none: — (top level)". The About page keeps the full text. `npm run check` passes all 6 checks.
- Component definition: the source and the build already had "group of UI element(s)". The dev server on port 8080 (`npm run serve`) also serves the fixed text, so the author most likely saw a page that was loaded before the fix or cached by the browser.

**Open**
- Author review: the 36 step names, and the 14 new glossary terms ("direction" is the least certain). The three WF-C edge conditions are guesses. EX-1 step 2 has one added phrase.
- Diagram layout: in WF-B and WF-C, the CN-1 → EV edge starts where the CM-2 arrow ends. The WF-C self-loop label sits on its small loop. The new label in WF-A widens the gap between EX-1 and OR-1.
- The step-strip momentum fix was tested with synthetic wheel events only, not on a real trackpad.
- `.agent/writing-blacklist.md` holds the start of a list of banned prose; WF-B's Problem is its first example and is not yet rewritten.

**Next**
- Push `main` so that Vercel deploys today's changes; the live site is still on 10/6.
- Rewrite the pattern prose against the writing blacklist, once the author has added more examples.

## 10/6/2026
- [x] more issues with the website
  - use faded font color for the pattern ID next to the pattern name
  - on component card's examples, a list of examples as text is not necessary
- [x] create a website to access the patterns
- [x] more issues with the website
  - increase font size in workflow flowcharts
  - "Steps, in order." is not necessary
  - when hovering the steps under solution in subtask, allow for scrolling to go horizontally
  - "↑ Up u" seems unnecessary
  - use a tabular view for examples in workflow; allow a designer to choose a different system via a drop down to see a diff example. show one system as example at a time
  - the about page should also contain definitions of the pattern's attributes
  - remove the following from the about page: "Every pattern lists its instances. The four papers do not have to share every level. Two systems or more. The MVP shows a subtask or a component only when it applies to two or more systems. A single-system pattern is in single-system-patterns.md until a new system shows it. A workflow can rest on one system, for now. Component counts include the moved subtasks."
  - see the updated overview section of the mvp doc to update the about page's part on defining patterns across three levels
- [x] issues with the website:
  - use the same font throughout
  - consider using /beautiful-mermaid or other libraries to improve the visual quality of workflow flowchart---the problem with mermaid is that it either goes horizontally or vertically, making the entire chart thin and difficult to view
  - - we can add more descriptive text than "Home › WF-A › EX-1"---the width afford some additional info
  - we can include the cropped figures as examples for component patterns
  - for solution in subtask, need to indicate that its constituents are steps (sequential relationship)
  - catalog should separate worflows/subtasks/components into three tabs and the default view can be catalog
  - the header Interaction Pattern Library is redundant because the top menu bar also has Interaction Pattern Library
- [x] update the mvp doc to only include the latest version of subtasks
- [xac] Review the subtask renames and the card format.

### Latest Version of Subtasks in the MVP

**Approach.** Two readings, and the author chose both: (a) remove the revision history; (b) remove the single-system subtasks. (a) is done in `pattern-language/pattern-language-mvp.md`: 14 resolved `<xac:>` threads removed, with their replies. One thread with no reply stays (Components, the wireframe request). No old subtask names remain in the doc.

**Decisions settled.** (b) is not done. No subtask is removed. The author asked for a taxonomy of the subtasks, to discuss. Draft: `pattern-language/refs/subtask-taxonomy-brainstorm.md`. Main axis: role in the loop (Frame, Expand, Organize, Evaluate, Synthesize, Commit, Continue). Second axis: generality.

**Open.**
- The taxonomy waits for discussion. The draft shows that A1 and S1 do the same job, and that A6 does two jobs.
- Prose with dates (Component rules, Retired, Card) is still in the doc. It is current text, not a comment thread.

### Subtask IDs by Role

**Decisions settled.** Option 1 of the taxonomy, tentatively. IDs: role code and number (Scheme 1). EX-3 (was C1) takes Expand, and CM-1 (was A6) takes Commit.

**Approach.** Replaced all 15 IDs in `pattern-language-mvp.md`, `single-system-patterns.md`, `cards/cp-4.html`, and `cards/cp-6.html`. 0 old IDs remain in those four files. The MVP has a new "Subtask roles" key under Structure. Mermaid node IDs drop the hyphen (`FR1`); labels keep it (`FR-1`).

**Open.**
- Not updated, because they are already stale: `refs/component-specs.md` and `renders/*.html` use the names from before 9/29. `refs/exemplar-systems-review.md` uses a different, older ID set.
- Brainstorm questions 2 and 3 are still open: act on the overlaps (FR-1 and FR-2 do the same job), and where the roles table goes.
- Follow-up, done: the workflow diagrams no longer mark single-system subtasks (dashed style and "moved" label removed). Logged in decisions.

### Feedback on FR-2, applied to every subtask

**Decisions settled (see `.agent/decisions.md`).** The author asked for changes that generalize. Role is the first field of a subtask. Components are `C-n`. Steps have *User:* and *System:* parts. Examples are one narrative per system.

**Approach.** Template updated in `pattern-language-mvp.md`. All 15 subtasks rewritten in the MVP and `single-system-patterns.md`: 15 Role fields; 64 steps, each with a User line and a System line. Every narrative comes from the system sections of the papers in `data-text/`. `CP-n` → `C-n` in the MVP, the single-system doc, the cards, `refs/component-specs.md`, and the brainstorm doc. New: `pattern-language/glossary.md` (draft, 32 terms), `pattern-language/refs/problem-field-memo.md`.

**Findings.**
- Borchers defines the problem statement as a summary of the competing forces (local notes). Our Goal + Failure is not that. The memo gives three options. The Problem fields are unchanged.
- Corrections from the papers. PerspectEvolver revision rates are in §6.2.2, not §4.3. "1,370 papers" is a study mean (the walkthrough shows 674). The SY-2 record holds findings, limitations, disagreements, and open questions. THESEUS edge confidence is in the §4 intro. HAPPIER's "50 to 60 proteins" is a formative-study goal, so it is dropped.
- HALO has no form for the criteria. The study task set the four properties (§5.1.1). FR-1 marks the HALO instance as weak.

**Open.**
- Decide the Problem field (memo, Options 1–3). Decided, see the next section.
- Review the glossary. Its terms come from the Writing-style list, and from the subtask text.
- Some Solution steps have no source in the papers: SY-2 step 4 ("keeps both records"), EX-2 step 5 (the working set on the map). They were there before 10/6.

### Problem Field

**Decisions settled.** The author asked whether Goal alone is enough. Reply in `refs/problem-field-memo.md`: Goal restates the name in about 8 of 15 subtasks. Failure is the reason for the Solution steps. The author's proposal, adopted: the goal moves into Context as *Situation*, and Problem is one standalone failure, "what goes wrong without this pattern".

**Approach.** Template updated. Rewritten: 3 workflows, 15 subtasks, 13 component rows, and the CP-4 and CP-6 cards. 0 Goal or Failure labels remain in pattern text. Six failures named a design or the solution, and are rewritten: OR-1, EX-2, EV-2, EX-3, EV-3, EV-4. In the component table: C-4, C-10, C-17.

**Open.**
- The Situation sentences are new text from one writer. They need the author's read.
- Follow-up, done: "Template" renamed "Pattern Attributes". Role and Situation have their own rows. Situation is a separate attribute in all 18 patterns. 18 of 18 Problems and 18 of 18 Situations are one sentence; the 13 component Problems already were.

### Website Spec

**Approach.** Spec from the "website" notes in `.agent/scratch-pad.md`: `website/SPEC.md`. It covers the users and tasks, the content model, the pages, the card, navigation, meta on demand, constraints, and acceptance criteria. Nothing is built.

**Decisions settled (see `.agent/decisions.md`).** Public, full content. One file per pattern. Host on Vercel from GitHub, built with Eleventy.

**Findings.** The pattern links form a graph, not a tree: FR-2 has 2 parents, C-7 has 6. So the breadcrumb follows the path that the designer took, and the URL holds it (spec §6).

**Open.**
- The split into one file per pattern is a separate task, before the build.

### Website Principles and the Add-Paper Routine

**Decisions settled.** The author approved the spec, and added two principles: start scarce, and visual over text. The spec now has §1a. Version 1 has no search, one filter (role), no level rail, and collapsed Examples, References, and Used in. Subtask steps show as a strip of component pictures.

**Approach.** New command `.claude/commands/add-paper.md`, in six phases: ingest, analyze (a match table against every pattern, with § numbers), propose (the language rules in order, then one approval gate), apply (with count checks), website (build, spec §11 checks, a pull request with a Vercel preview), record.

**Open.**
- 2 of 13 components have an eigen-UI. "Visual over text" needs the other 11.
- `/add-paper` Phases 4–5 assume the per-pattern files and the site. They work after the split and the build.

### Split and Website Version 1

**Approach.** Split the patterns into `pattern-language/patterns/<ID>.md`: 3 workflows, 15 subtasks, 13 components, 4 retired. The two eigen-UIs moved to `pattern-language/eigen-ui/C-4.svg` and `C-6.svg`. The MVP doc and the single-system doc are now indexes. Built the site in `website/` with Eleventy 3: home (three workflow diagrams), catalog (role filter), 31 cards, 4 retired pages, 32 alias redirects, 4 about pages, one JSON record per pattern. Navigation: path breadcrumb from `?via=`, Up (key `u`), the parent workflow chain, link previews, definitions on hover. `vercel.json` at the repository root.

**Findings.**
- `npm run check`: 31/31 cards, 894 internal links with 0 broken, 32/32 aliases, 18/18 diagram nodes linked, 0 labels without a definition, 0 references to `data/`.
- Checked by screenshot: home, catalog, FR-2, C-6, WF-C, and FR-2 and C-6 at 375 px. The DOM after the script shows the path trail and the `via` links.
- Fixed during the build: glossary marks broke the HTML; two diagrams on one page shared node IDs; the Up menu showed when hidden.
- The C-6 card and the table had different Problems. The split uses the card's version.

**Open.**
- Not tested in a browser by hand: link previews on hover, the Up menu with two parents, the role filter, the `u` key.
- 11 of 13 components show a placeholder tile, not an eigen-UI.
- The workflow Examples are still the old form (a table, or one paragraph), not narratives.
- `pattern-language/cards/` is now redundant with the site. It is not deleted.
- Vercel: connect the GitHub repository to a Vercel project (needs the author's account).

### Website Issues (7)

**Decisions settled (see `.agent/decisions.md`).** The crops ship, in git (reverses 9/29). The workflow diagrams use reladraw. The home is the catalog.

**Approach.** All 7 items:
1. One font: the monospace face is gone, in the SVGs too.
2. Workflow diagrams: `pattern-language/diagrams/WF-*.reladraw`, two rows each, drawn at build. beautiful-mermaid was not used: it styles a diagram, and Mermaid's layout stays one direction.
3. Breadcrumb: ID and name for each step of the path.
4. Crops: 8 images in `pattern-language/figures/C-4/` and `C-6/` (4.6 MB). They show first under Examples on the C-4 and C-6 cards.
5. Steps: a row joined by arrows, "Steps, in order"; a column with ↓ on a phone. The catalog tiles have arrows too.
6. Catalog: the home page, with three tabs (Workflows default). `/catalog/` redirects.
7. The repeated title is gone.

**Findings.** `npm run check`: 6 of 6 pass, 844 links with 0 broken, 18 diagram nodes with 0 unmatched. Screenshots: home, the Subtasks tab, EX-1, C-4 with crops, phone width.

**Open.**
- The diagrams need a horizontal scroll on a phone (minimum width 560 px).
- The reladraw layouts are drawn by hand. A new workflow needs a new layout file; `/add-paper` says so (Phase 4, step 3a).

### More Website Issues (8)

**Approach.** All 8 items:
1. Diagram text: `size: large` in the layouts, normal gaps, and a CSS rule for the eigen-UIs no longer overrides it. Text on screen: about 14–16 px, was about 10 px.
2. "Steps, in order." removed.
3. Over the row of steps, the mouse wheel scrolls sideways until the row ends.
4. "Up" removed (button and key). The breadcrumb remains.
5. Workflow examples: a table, a row per subtask, the subtask's narrative for one system; a dropdown picks the system. Built from the subtask files, so the workflow's own Examples text is not shown.
6. About: "What a pattern is" holds the attribute definitions; the separate tab is gone.
7–8. About takes the Overview of the MVP doc (heading renamed from Structure); HTML comments are left out, so the "Two systems or more" text no longer shows.

**Findings.** `npm run check`: 6 of 6 pass. Screenshots: home, WF-A with its examples table, About. The DOM shows one table per system with the second hidden.

**Open.**
- Not tested in a browser by hand: the wheel scroll on the step row.
- Done after the author's answer: the old Examples text of `WF-A.md`, `WF-B.md`, `WF-C.md` is deleted (it is in git history). Each now says the table is built from the subtask Examples.

### Website Issues, Third Round (2)

**Approach.**
1. A pattern ID beside its name is in the muted color: links, breadcrumb, step labels, workflow headings (class `.pidn`). The subtask chips in the catalog keep their role color.
2. Component Examples: a component with crops shows the crops only (C-4, C-6). The 11 without crops keep their text list, since it is all they have. Confirmed by the author: text stays until crops exist.

**Findings.** `npm run check`: 6 of 6 pass. Also fixed: with a workflow on the path, "In the workflow" showed every parent workflow; a CSS rule overrode `hidden`. Now it shows the one on the path.

### Wrap-up

**Where things stand.** The language is now one file per pattern (`pattern-language/patterns/`), with role-based subtask IDs, `C-n` components, and the attributes Role / Context / Situation / Problem (one sentence each). Version 1 of the website is built (`website/`, Eleventy, reladraw diagrams) and passes `npm run check` 6 of 6. `/add-paper` is the routine for new papers. Entries before September moved to `archive/journal-2026-06-to-07.md` (obsolete focus). Committed, not pushed.

**Open.**
- Nothing is deployed. Vercel needs the repo pushed and imported with Root Directory left blank; `vercel.json` at the root sets the build.
  - Done, later on 10/6: deployed on Vercel. The first build failed at `cd website` because the project's Root Directory was set; clearing it fixed the build. Keep Root Directory blank.
- 11 of 13 components have no eigen-UI and no crops.
- Taxonomy questions 2 and 3 (merge FR-1 into FR-2? where the roles table goes) are open.
- The glossary draft, the Situation lines, and the card format wait for the author's read.

**Next.** Push, then import the repo in Vercel. Then draw eigen-UIs for the 11 components, starting with C-1 and C-7 (4 systems each).
- Later on 10/6, the author deferred the eigen-UIs until more papers are added (see decisions). The next step is to add papers with `/add-paper`.


## 9/29/2026
- [x] not very happy about the CP rendering. think about and assess the feasibility of this approach: for each CP, extract and collect targeted screenshots from example papers as references, then distill a prototypical representation ("eigen-UI") that can represent the CP grounded in those examples
  - [x] follow-up: i like the rendering and feel CP spec should be primarily centered on eigen-UIs, i.e., each CP is a like a baseball card that contains the eigen-UI that brief descriptions of the usual attributes consistent with other levels of patterns
- [x] address my comments in pattern-language-mvp.md
- [x] For subtasks that only apply to one system, we want to buffer/hide them for now. They might be idiosyncratic and lack generalizability, or they might turn out to be a real pattern when new systems are added to consideration. But for now, we only want to show subtasks patterns that apply to more than one system.
  - [x] follow-up: the same generalizability rule goes for CP
- [x] move non-generalizable subtasks and component patterns out of the mvp .md to a separate doc

### Eigen-UI Feasibility

**Approach.** Read the system pages of two PDFs: HALO pp. 5–9 and THESEUS pp. 6–12. HAPPIER and PerspectEvolver are not examined. Full assessment: `pattern-language/refs/eigen-ui-feasibility.md`.

**Findings.**
- Feasible, with limits. The figures are annotated screenshots with lettered callouts, and the text cites each callout. A CP instance can be found from its § number.
- A callout is a feature, not a CP. One crop often holds two or three CPs. Small CPs (CP-8, CP-14) are details inside other crops.
- Each CP has 1 to 4 instances. An average is not possible. The eigen-UI is a manual abstraction that cites its crops.
- The four systems share one genre and one visual style. An eigen-UI must drop that style.
- Crops stay in `data/` (anonymous submissions). The eigen-UI can be committed.

**Decisions settled (see `.agent/decisions.md`).** The figures are a dataset: pages to images, crop the figures, index them, and locate each CP. An eigen-UI is a greyscale wireframe. The spec wins over an eigen-UI; differences are recorded. Pilot: CP-4 and CP-6.

### Eigen-UI Pilot: CP-4 and CP-6

**Approach.** `tools/extract_figures.py` renders the 121 pages and crops the 35 figures from their captions (400 dpi, index in `data/figures/index.yaml`). `pattern-language/refs/cp-figures.yaml` gives the box of each CP instance. `tools/crop_cp.py` crops them. Wireframes and findings: `pattern-language/eigen-ui/`.

**Findings.**
- All 35 captions produce a crop. Every crop was checked by eye on a contact sheet. Small text is legible at 400 dpi.
- CP-4 (no spec): a node is a card with a label and a summary (4 of 4). Other features: a status line, a score on a link, a second node type, map controls. 3 of 4 are trees from a root; HAPPIER is a network.
- CP-6 differs from its spec at five points. The largest: the selected item is marked in the overview (2 of 3), and the overview is a map, not rows (2 of 3). Also: evidence that is not a source, sections that collapse, a keep toggle.

**Open.**
- The five CP-6 differences wait for your review. The spec is unchanged.
- The counts come from one reader and one or two figures per system.

### Eigen-UI Cards (follow-up)

**Decisions settled (see `.agent/decisions.md`).** At the component level the spec is an eigen-UI card, one HTML page per CP. It replaces the YAML spec, and the earlier line "the spec wins over an eigen-UI". A card holds the eigen-UI and short template fields: Level, Context, Problem, Solution, States, References. For a component, References lists the CPs it contains. Crops show when they exist locally. First cards: CP-4 and CP-6.

**Approach.** `pattern-language/cards/`: `cp-4.html`, `cp-6.html`, `index.html` (all 16 CPs, 2 with cards), and `card.css`, one stylesheet for every card. The drawings moved from `eigen-ui/` into the cards. The MVP CP table links the two cards. `refs/component-specs.md` notes that a card replaces the YAML.

**Findings.**
- The five CP-6 differences from the pilot are now in the card's Solution, so they need no separate review.
- Both cards render at desktop width and in a 400 px frame. The crops load from `data/figures/cp/`.

**Open.**
- Review the card format. The other 14 CPs wait for it: about 30 minutes each, to locate the instances, draw them, and write the fields.
- CP-1 and CP-11 have a YAML spec and a render but no card. `tools/render_specs.py` still draws them.

### Address Comments in `pattern-language-mvp.md`

**Approach.** Three open comments: Solution, subtask names, Problem. Each one is answered in place, inside the comment block.

**Decisions settled (see `.agent/decisions.md`).**
- *Problem* has two labelled parts: **Goal** and **Failure**. Applied to 3 workflows, 15 subtasks, the 16-row CP table, and both cards.
- *Solution*: each subtask step starts with its component, "CP-n Name: action".
- *Names*: a verb and its object, no metaphor. IDs stay. Renamed: A1 State the Start and the Criteria · A2 Generate Candidates · A3 Group Candidates by Criteria · A4 Check Candidates Against Every Criterion · A5 Combine Partial Candidates · A6 Keep Candidates and Start the Next Round · S1 State the Claim · S2 Accept or Reject Proposed Revisions · S3 Propose Next Steps from Open Items · B1 Build Contrasting Viewpoints · B2 Discuss One Question Across Viewpoints · B3 Summarize the Discussion · C1 Split the Claim into Checkable Parts · C2 Collect Evidence for Each Part · C3 Judge Each Part Against Its Evidence.

**Findings.**
- Four subtask steps fit no component. They are marked "(no component)": a viewpoint with fixed fields (B1), a record of a discussion (B3), an editable procedure (C2), and a verdict (C3). Each one is a candidate component.
- The CP table's Context column is now computed from the subtask steps. CP-1 gains A2 and A6. CP-6 gains A3. CP-10 loses S3, because S3's Solution never used it.
- "Root" is replaced by "claim", which is now a fixed term. Workflow names are unchanged.

**Components (settled after the gaps).** A component must serve two or more subtasks. Five rules follow, in order: reuse, extend, merge, demote, promote. They are in the MVP under Structure.
- The fixed fields of B1 and C1 became CP-17 Typed Item. The needs of B3, C2, and C3 stay as steps with no component.
- CP-5 extends to A3. CP-13 merges into CP-10 as a variation. CP-2, CP-15, and CP-16 become steps. Their IDs are retired.
- Result: 13 active components, none used by one subtask only. The per-system Components column is now computed from the subtasks.

**Open.**
- 11 of the 13 active components still have no card.

### Move Single-System Patterns Out of the MVP

**Decisions settled (see `.agent/decisions.md`).** The MVP shows a subtask or a component only when it applies to two or more systems. A workflow can rest on one system, for now. Component counts include the moved subtasks.

**Approach.** Seven subtasks moved, text unchanged, to `pattern-language/single-system-patterns.md`: A5 (HALO), B1–B3 (PerspectEvolver), and C1–C3 (THESEUS). The MVP keeps WF-A, WF-B, WF-C, S1–S3, A1–A4, and A6. The three diagrams show the moved subtasks as dashed boxes marked "moved". The rule is stated under Structure.

**Findings.**
- No component moved. All 13 active components apply to two or more systems. CP-15 and CP-16 were single-system, and they were already retired.
- CP-9 Scoped Conversation and CP-17 Typed Item are used only by moved subtasks. They stay, because each one applies to two systems. A note under the CP table says so.
- The three diagrams render in mermaid 11, checked in headless Chrome.

**Open.**
- WF-B and WF-C now show three MVP subtasks each (S1–S3). Their middle steps are all in the separate doc.

### Wrap-up

**Where things stand.** The figure dataset (`tools/extract_figures.py`, `tools/crop_cp.py`, `refs/cp-figures.yaml`) and the card format (`pattern-language/cards/`) are in place. The MVP uses Goal/Failure, CP-led steps, the new subtask names, the component rules, and the 2-system display rule. Crops and page images stay local in `data/`.

**Open.**
- 11 of the 13 active components have no card. Only CP-4 and CP-6 have instances in `refs/cp-figures.yaml`.
- The per-system Components column is computed from the subtasks, so it can credit a system with a component its paper does not show.
- `renders/detail-on-demand.html` still draws the old CP-6 YAML spec.
- `next-up`: "continue to review mvp" and "add some other groups' papers" are not started.

**Next.** After the author reviews the renames and the card format: locate the instances of the next component in `refs/cp-figures.yaml`, run `tools/crop_cp.py`, and draw its card from the sheet. Start with the 4-system components, CP-1 and CP-7.

## 9/22/2026
```
- [fyi] we are pivoting this project into "A pattern language to abstract the design of interactive systems', which goes beyond the scope of individual UI screens
- [x] review the papers in data/; those are our starter exemplar systems as a small training set to develop our pattern language
- [x] review the summary of "Borchers — A pattern approach to interaction design" and translate the paper into specific ideas we can adopt in developing our pattern language, e.g., the hierarchical nature of patterns and the list of key attributes based on an example in architecture

```

### Review Exemplar Systems in `data/`

**Approach.** Read all four papers end to end up to References; appendices and figures not read. Full review: `pattern-language/refs/exemplar-systems-review.md`.

**What the set is.** HALO, HAPPIER, PerspectEvolver, and THESEUS are human–AI tools for scientific hypothesis work. They cover adjacent stages of one pipeline: ideate → generate → validate. All four follow the same paper template: formative study → 3 challenges → 3 design goals → 3 components → study against a baseline with the same model.

**Candidate patterns (17, three levels).**
- *System*: Theory-Staged Workflow, Diverge–Converge Loop, Unresolved Seeds Next Round, Phase-Dependent Initiative.
- *Workspace*: Externalized Evolving State, Cluster the Generated Space, All Criteria One View, Overview then Detail, Structured Unit of Viewpoint.
- *Component*: Rationale Attached at the Link, Propose Then Commit, Before/After Revision Card, Scoped AI Action, Live Consequence Preview, Personal Shortlist, Confidence Cue, Mark-the-Moment.

**Key observations.** The formative "challenges" in each paper are ready-made problem statements (forces) for patterns. Each baseline keeps the same AI model and removes the structure, which amounts to a pattern ablation at system scale. The load-bearing ideas (persistent state, AI-proposes / human-commits, scoped AI action) are about state and authority over time. A screen-level spec can't express them.

**Caveats.** All four are from one domain and may come from one lab, so some patterns may just be genre conventions. The studies are small (N = 10–16). No study tests a single pattern on its own.

### Borchers → Ideas to Adopt

**Approach.** Worked from the summary in `literature/`, not the paper. The summary doesn't cover Borchers's formal pattern definition. Full note: `pattern-language/refs/borchers-translation.md`.

**Adopt.**
1. *Hierarchy*: typed `context` (up) and `references` (down) links. Three levels: system → workspace → component; screen patterns sit at the bottom.
<xac: how about "workflow-subtask-components": workflow is the sequence of subtasks a user performs using the system to achieve the high-level task; a subtask (e.g., filter generated ideas) is supported by a collection of UI components>
  - Adopted. The MVP uses workflow → subtask → component (see "Pattern Language MVP" below).
2. *Attributes*: Borchers's core is name, context, problem, solution, examples, diagram, and references. v5 lacked **forces**, **diagram**, **ranking**, and up/down links. <xac: v5 is obsolete artifact from the previous focus; ignore it>
  - Done. The MVP uses its own Markdown template; the v5 comparison is removed from the Borchers note.
3. *Forces* written as "X, but Y" are the core of each pattern. They also give an LLM something better to match on than `use_when` features.
<xac: does force means why choosing this pattern but not other patterns? or what this pattern is good vs. bad for? perhaps need a better descriptive name for this>
  - Neither. Forces are the competing demands that make the problem hard, which the solution must balance (e.g. speed of AI edits vs. user control). "Why this pattern" is *Context*; "good vs. bad for" would be *consequences*. Renamed to **Tradeoff**, written "X vs. Y" (your call).
4. *Ranking* from evidence: `**` needs ≥3 exemplars plus a study that tests the pattern on its own; `*` needs ≥2 exemplars. Every candidate is `*` at most today.
5. *Name as shared vocabulary* (verbal recoding). Tag each pattern by domain: interaction, AI/system behavior, or domain workflow.

<xac: today's goal is to develop a minimal viable version of the pattern language to abstract the four system papers. stay focused. don't overreach or worry about things beyond today's scope>
  - Understood. Dropped ranking, domain tags, other-domain exemplars, and LLM matching from today's scope; the MVP is below.

**Decision (see `.agent/decisions.md`).** Generation is archived: v5, the reflection, and the delivery-tracker experiment moved to `archive/genui/`.

### Pattern Language MVP

**Approach.** Abstracted the four systems on workflow → subtask → component. Each pattern uses the template Name · Level · Context · Problem · Tradeoff · Solution · Examples · References. Solution is written as instructions for turning the pattern into a concrete design. Single-system patterns are kept and marked. Full language: `pattern-language/pattern-language-mvp.md`.

**Result (revised twice after your comments in the MVP file).**
- *3 workflows*:
  - **WF-A Guided Candidate Search** (HALO, HAPPIER): narrow a *population* of alternatives. A1 Set Targets → A2 Populate → A3 Group by Criteria Profile → A4 Screen Against All Criteria → [A5 Distill & Recombine, HALO only] → A6 Keep & Restart.
  - **WF-B Multi-Viewpoint Refinement** (PerspectEvolver): S1 Frame the Root → B1 Construct Contrasting Viewpoints → B2 Confront on One Question → B3 Consolidate the Exchange → S2 Revise Under Review → S3 Open Follow-ups.
  - **WF-C Decompose and Verify** (THESEUS): S1 → C1 Decompose into Checkable Parts → C2 Gather Evidence per Part → C3 Interpret Evidence Against the Part → S2 → S3.
- Level-of-abstraction rule added: a pattern's name, problem and solution use no term from one exemplar or its domain; that vocabulary lives in Examples. WF-B and WF-C were rewritten to meet it.
- The language is AI-neutral: patterns say "the system", so they hold whether the content comes from a model, a solver, or a person. AI appears only in Examples.
- Each subtask's Solution is a numbered sequence of steps naming the components (CP-n) the user works with, so it can be built from rather than read.
- Component solutions carry an abstract spec: a component tree with data bindings and events, in the maui pattern mini-language (`~/dev/maui/.agent/compilation-rules.md` §2), which compiles to A2UI. Three written (CP-1, CP-6, CP-11) in `pattern-language/refs/component-specs.md`, linked from a Spec column. The earlier styleless-HTML sketches are deleted. Writing them exposed two gaps in CP-11's prose: batch apply, and a stale proposal.
- All pattern text follows ASD-STE100 Simplified Technical English, document mode, per https://github.com/AminBlg/SimpleEnglish: 20-word instructions, condition before command, active voice, no should/would/may/might, one word per meaning, fact not importance. Two deviations are stated in the file.
- The style now covers the active docs of the repository: README, passport, decisions, and the three drafts. Three groups keep their text, by your call: `literature/`, journal entries before 9/22, and paper prose.

### Test Render of CP-1 Through A2UI

**Approach.** Compiled the CP-1 spec with the maui implementation, `lib/agent/pattern-compiler.ts`, and rendered it with `components/a2ui-renderer.tsx`. A scratch script ran in `~/dev/maui` and was deleted; maui is unchanged. No API key was needed, so none was copied. Result recorded in `pattern-language/refs/component-specs.md`.

**Findings.**
- The spec compiled without a change. The repeat expanded to `criterion-0` and `criterion-1`, `@./name` and `@./value` resolved per item, `?setup` and `?running` produced separate surfaces, and each button carried its event.
- The `running` surface rendered completely.
- The `setup` surface reported `Unsupported component: TextField` three times. The catalog holds Card, Column, Row, Text, LineChart, NumberField, and Button. It has no text input, and the maui pattern library records the same gap.
- **Correction after your comment.** A component spec is independent of any renderer; A2UI is for visualization only. So the missing text input is a limit of that renderer, not a constraint on CP-1. CP-1 keeps its text input. `needs:` now lists element kinds in design terms, not catalog component names.
- WF-B and WF-C share three subtasks (S1, S2, S3) and nine components; the earlier pairing of them into one "Evolving Working Artifact" workflow didn't hold.
- Each workflow's Solution leads with a mermaid flowchart (branches and loops), then one line per subtask.
- *16 components*, 10 used by more than one workflow (e.g. Attached Evidence, Proposal Set, Provenance Link).
- Tradeoff is deferred, alongside diagram, picture and ranking.

**Open.**
- HALO vs. HAPPIER may be *optimization* vs. *screening* variants of WF-A; the difference is A5 Distill & Recombine.
- "Bring Input to a Part" covers AI deliberation (PerspectEvolver) and real data (THESEUS); it may split into two subtasks.

### Component Previews

**Approach.** `tools/render_specs.py` reads `pattern-language/refs/component-specs.md` and writes one plain HTML page per component into `pattern-language/renders/`. It maps each element to a plain HTML tag, and draws an unmapped element as a dashed box, so a spec always draws and no renderer constrains a pattern. Run: `python3 tools/render_specs.py`.

**What a preview shows.** Purpose and context at the top. One framed screen per state, in the order a user meets them, with the trigger on the arrow between them. Bound data reads as what it means, never as a path: an input gets a placeholder, an output reads as alt text. Transitions that do not join neighbors are listed under the strip.

**Three spec fields were added to make this possible.** `purpose` and `context`; `describes`, one phrase per bound path; `transitions`, `{from, to, when}`. Note for YAML: a bare `on:` key parses as boolean true, so the key is `when`.

**Open.**
- A repeat draws two identical rows, because one description serves every item. Sample data per spec would fix it, and it is not in the MVP.
- 13 of the 16 components have no spec yet.

### Wrap-up

**Where things stand.** The MVP language, the three component specs, their previews, and the preview tool are in `pattern-language/` and `tools/`. Reorganized today into `pattern-language/{pattern-language-mvp.md, refs/, renders/}`; the screen-era drafts and the GenUI work are in `archive/`.

**Open.**
- `data/` is in `.gitignore`: 46 MB of PDFs, and they are anonymous submissions. The papers stay local. `resources/` (the mobile UI taxonomy, 109 MB with its own `.git`) was deleted. The 6/24 entry still refers to it.
- The four papers are in the repository as text, in `data-text/` (464 KB), with the method in its README. The text holds no figure, and a table loses its columns.
- The three `literature/` notes, the journal entries before 9/22, and paper prose keep their old style, by your call.

**Next.** See `next-up` at the top of this file.
