---
id: "EV-3"
name: "Collect Evidence for Each Part"
level: "subtask"
role: "Evaluate"
status: "single-system"
context: ["WF-3"]
situation: "With the claim split into parts, the user must collect an outcome for each part."
problem: "The procedure does not fit the setting of the user, and the outcome loses the conditions that produced it."
systems: ["THESEUS"]
references: ["C-10"]
aliases: ["C2"]
---

## Example

- `figures/EV-3/1-theseus.png` THESEUS Fig. 3, callouts F to H: experiment selector, details, and result upload

1. Edit the procedure. The system attaches a procedure to the part (an experiment: protocol steps,
   variables, measurements, materials, G). The user can edit any field (§4.2).
2. Choose a procedure. The user selects one procedure from the options (the base experiment or a
   variant, F).
3. Report outcomes. The user reports outcomes in a template tied to the procedure (Download
   template, Upload CSV result, H). The system attaches the outcome to that procedure (Saved
   analysis: completed).

## Solution

1. Edit the procedure — (no component)
   - *User:* edits any field of the procedure, before and after a run.
   - *System:* attaches a procedure to each part that it checks. States in advance which
     outcome supports, weakens, or leaves the part open. Supports variants for different
     settings.
2. Choose a procedure — C-10 Proposal Set
   - *User:* selects one procedure from the [proposal set](C-10).
   - *System:* when more than one procedure fits, shows the options.
3. Report outcomes — (no component)
   - *User:* reports outcomes in a template tied to the procedure.
   - *System:* checks that the report covers every part. Attaches each outcome to one
     procedure. A variant does not inherit it.

## Examples

- *THESEUS.* THESEUS creates an experiment family for each leaf: one base experiment, and
  variants that differ by one factor, such as a dose (§4.2). The researcher opens a member to
  read its protocol, controls, and expected patterns, and edits it to fit the lab (§4.2).
  After the run, the researcher fills the CSV template of that member and uploads it. THESEUS
  checks that the file matches the experiment and covers every linked hypothesis (§4.2). The
  result stays with that member only (§4.2).
