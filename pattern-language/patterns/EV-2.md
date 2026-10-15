---
id: "EV-2"
name: "Discuss One Question Across Viewpoints"
level: "subtask"
role: "Evaluate"
status: "single-system"
context: ["WF-2"]
situation: "The user has a set of viewpoints, and one question to put to them."
problem: "The viewpoints blur, and the user cannot tell which viewpoint produced a conclusion."
systems: ["PerspectEvolver"]
references: ["C-7", "C-9"]
aliases: ["B2"]
---

## Solution

1. Open a conversation — C-9 Scoped Conversation, C-7 Attached Evidence
   - *User:* opens one conversation per question, and names the participants.
   - *System:* attributes each contribution to its viewpoint, and to the contribution it
     answers. Attaches evidence to each empirical claim.
2. Steer the conversation — C-9 Scoped Conversation
   - *User:* addresses one participant, adds a participant, challenges a passage, or requests
     more turns.
   - *System:* answers within the same conversation.

## Examples

- *PerspectEvolver.* Each selected Perspective proposes a research question with a tentative
  hypothesis. The researcher keeps or skips each one, and each kept one becomes a Deliberative
  Thread (§4.2.1). In a thread, every contribution names its Perspective, and the contribution
  or passage it answers. Empirical claims carry numbered references (§4.2.2). The researcher
  requests 1 to 6 more turns with Discuss, @-mentions a Perspective, or selects text to
  Challenge or Expand (§4.2.2).
