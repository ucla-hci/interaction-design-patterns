# Study Design: Stand-Alone Subtasks vs. Compositional Tasks

*7/13/2026. Answers the question: for the format study (text-only vs. rich markdown vs. GenUI), should the task battery use C1–C4/P1–P2 as stand-alone subtasks, or compositional higher-level tasks that each cover a subset? Builds on `literature/_approaches-llm-downstream-task-taxonomy.md`.*

---

## Recommendation

**Compositional scenarios as the experimental carrier, atomic subtask probes as the measurement instrument.** Neither pure option survives scrutiny; the layered design keeps both the ecological validity of composites and the attribution of atomics. This mirrors how InfoVis resolved the same debate: benchmark-task vs. insight evaluation (North et al.) ended in hybrids (Gomez et al.'s LITE — Layered Insight- and Task-based Evaluation).

---

## Why not pure stand-alone subtasks

**1. The claim under test is about bundles, not atoms.** GenUI's value proposition (and a pattern's, even more explicitly) is that one artifact serves a *set* of downstream needs — a monitor screen supports locating, comparing, and acting in one topology. A study of isolated probes tests a claim nobody makes ("GenUI helps you retrieve one value").

**2. The format × atomicity confound — the decisive argument.** In real use, the LLM generates the response *before* knowing which operation the user will perform on it; the artifact must support a distribution of possible subtasks. That is precisely what layout topology is *for*. An atomic design inverts this: if the response is generated per-probe, the text condition can always be a perfectly targeted one-sentence answer, and all formats converge. Under atomic probes, text is unbeatable by construction; under a shared multi-purpose artifact, the formats genuinely diverge. The composite structure isn't just more realistic — it is the only structure under which the manipulation exists.

**3. Transitions carry part of the effect.** Pirolli & Card: subtasks chain (locate → compare → decide → act), and interactive artifacts hold state across links (your place in a list, an applied filter, a selection). Atomic probes zero out exactly the mechanism where interactivity should pay.

**4. The monitor dimension requires composites.** Repeated return to the *same* artifact under changing state cannot be operationalized as a stand-alone probe at all.

## Why not pure high-level tasks

**1. Attribution.** If GenUI wins a holistic scenario, nothing says which operation drove it — the study reproduces the field's current problem (aggregate preference, no mechanism) one level down.

**2. Scenario–cell confounding.** Each composite covers a subset of cells; if each cell lives in only one scenario, cell effects are confounded with scenario content (domain, difficulty, data shape).

**3. Power and standardization.** Few long trials, high variance, and no validated instruments — whereas the atomic level is exactly where validated probes exist (Amar & Stasko for C1/C3, Bloom item-writing for C2).

## The layered design

**Scenario = carrier.** A realistic narrative with one response artifact per format, generated once by independent LLM calls (per the 7/8 contamination lesson), frozen, and shared across participants. Generation variance can be studied separately by sampling k generations (connects to the regeneration-variance metric from 7/8).

**Probe = instrument.** Each scenario embeds a scripted sequence of subtask probes, individually timed and scored, in fixed order across formats (so transition effects are constant and comparable, not noise). Post-scenario: comprehension quiz with artifact removed (C2), NASA-TLX.

**Coverage matrix — every cell in ≥2 scenarios** to de-confound cell from scenario content:

| Scenario (intent) | C1 locate | C2 comprehend | C3 compare | C4 synthesize | P1 act | P2 produce | ⊥ monitor |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| S1 Delivery tracker (`monitor`) — *artifacts already exist* | ✓ | | ✓ | | ✓ | | ✓ (revisit ×2 with state changes) |
| S2 Choose among options (`compare/decide`) | ✓ | | ✓ | ✓ | | ✓ (justify choice in a message) | |
| S3 Learn a topic (`detail`/explain) | | ✓ | | ✓ | | ✓ (summary for a friend) | |
| S4 Plan & execute (`transact`/plan) | ✓ | ✓ | | | ✓ | | ✓ (plan changes; revisit) |

Coverage: C1×3, C2×2, C3×2, C4×2, P1×2, P2×2, monitor×2. Four scenarios × 3 formats, scenario order counterbalanced, format between- or within-subjects (within needs format-order counterbalancing and distinct-but-matched content variants — decide at power-analysis time).

**Example probe chain (S1, delivery tracker):**
1. "Which package arrives today?" → C1, time-to-fact
2. "Is anything running later than expected?" → C3, glance accuracy
3. "Reschedule the delayed one." → P1, completion rate (text/markdown condition must state the action; GenUI affords it)
4. *[state change: one package flips to 'exception']* "Anything need your attention now?" → monitor, glance accuracy + latency
5. Post: 3 Bloom-level comprehension items, artifact removed

## Why this also fits the pattern argument

The scenario unit **is** the screen-intent unit. A pattern claims to serve an intent — an intent is a subtask bundle (`monitor/grouped-items` ≈ {C1, C3, P1} under repetition). Scenarios instantiate intent bundles, so the format study's task structure is *the same structure* the pattern taxonomy already declares. Consequences:

- S1 can reuse the existing delivery-tracker artifacts; the three-arm pattern ablation (no-pattern / wrong-pattern / right-pattern) drops into the same scenario+probe machinery with format held at GenUI.
- Sharp falsifiable prediction: the wrong-pattern arm (condition C, DoorDash topology) should selectively degrade the probes its topology can't serve — C3 glance accuracy and the monitor probes — while leaving C1 roughly intact. A selective, probe-level deficit is far stronger evidence than "raters liked it less."
- Each pattern's `expects` + intent could eventually *declare* its probe profile — patterns as self-describing evaluation targets.

## Risks and mitigations

- **Order effects within probe chains** (probe 2 benefits from exploration during probe 1): fixed order across formats makes this constant; analyze position as a covariate.
- **Scripted probes miss unanticipated uses** (the insight-method critique of benchmark tasks): add a short free-use window + think-aloud at the end of one scenario, coded qualitatively — the LITE move.
- **C2-only-in-composites may disadvantage prose formats**: S3 is deliberately comprehension-heavy with minimal interactive probes — the "honest test" scenario where GenUI may lose; keep it.
- **Artifact quality variance across formats**: pilot-rate artifacts for content parity (same facts present in all three formats) before running participants; only format varies, never information.
