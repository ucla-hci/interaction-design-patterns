## thoughts
- #demo how to visualize the pattern in a simple and abstract form so a designer can see what a ui might look like if adopting this pattern
- [] formalize a pattern language spec
- outcomes we are working towards
    - a pattern library
    - a way for LM to use the pattern library (MCP?): match -> instantiate
    - a front demo
    - experiments to validate the pattern approach
        - matching and instantiating a pattern vs. baseline
        - transparency and control

## website
goal:
- an interactive wiki-like reference for efficient browsing, studying, and deploying patterns across all levels
features:
- mirror the hierarchy of the patterns: workflow-subtask-component
- the metaphor is card: each workflow/subtask/component pattern displayed as a card
- designers can browse a catalog of workflow/subtask/component patterns, or they can access them "in context", e.g., clicking a subtask in a workflow to open its card and clicking a C-xx mentioning in a subtask card opens the component card
- one interaction design challenge is how to prevent getting lost. similar to an API documentation, there should be some navigational support to help designers return to the previous level
- some "meta" info, e.g., what is a pattern, what attributes are there and what they mean, glossary etc should be well documented and available on demand
- keep it simple. avoid info overload -- we'd rather start scarce than add more than trying to include everything then struggle to make it lean
- use visual (over text) as much as possible