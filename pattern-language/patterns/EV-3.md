---
id: "EV-3"
name: "Collect Evidence for Each Part"
level: "subtask"
role: "Evaluate"
status: "single-system"
context: ["WF-C"]
situation: "With the claim split into parts, the user must collect an outcome for each part."
problem: "The procedure does not fit the setting of the user, and the outcome loses the conditions that produced it."
systems: ["THESEUS"]
references: ["C-10"]
aliases: ["C2"]
---

## Solution

1. (no component)
   - *User:* —
   - *System:* attaches a procedure to each part that it checks. States in advance which
     outcome supports, weakens, or leaves the part open.
2. (no component)
   - *User:* edits any field of the procedure, before and after a run.
   - *System:* supports variants for different settings.
3. C-10 Proposal Set
   - *User:* selects one procedure.
   - *System:* when more than one procedure fits, shows the options.
4. (no component)
   - *User:* reports outcomes in a template tied to the procedure.
   - *System:* checks that the report covers every part.
5. (no component)
   - *User:* —
   - *System:* attaches each outcome to one procedure. A variant does not inherit it.

## Examples

- *THESEUS.* THESEUS creates an experiment family for each leaf: one base experiment, and
  variants that differ by one factor, such as a dose (§4.2). The researcher opens a member to
  read its protocol, controls, and expected patterns, and edits it to fit the lab (§4.2).
  After the run, the researcher fills the CSV template of that member and uploads it. THESEUS
  checks that the file matches the experiment and covers every linked hypothesis (§4.2). The
  result stays with that member only (§4.2).
