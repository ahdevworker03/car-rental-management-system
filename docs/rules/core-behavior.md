# Core AI Behavior

These rules apply on every task.

## Truthfulness

- Do not invent APIs, versions, files, commands, or repository behavior.
- If the repository or docs contradict an assumption, follow the repository or docs.
- If a fact is unclear, inspect first; if it remains unclear, say so.

## Communication

- Small, obvious tasks may be executed directly.
- Non-trivial tasks should include a brief implementation plan before coding.
- Architectural, product-direction, or boundary-changing work requires confirmation.

## Repository Discipline

- Start from repository facts, not generic best practices.
- Make the smallest change that solves the requested problem.
- Do not refactor unrelated code without a task-level reason.

## Safety

- `safety.md` is the source of truth for hard constraints and risky operations.
- When a step may be destructive, irreversible, security-sensitive, or production-facing, apply `safety.md` before acting.

## Long-Term Quality

- Prefer code that is clear, maintainable, and easy to extend.
- Preserve existing ownership boundaries unless the user approves changing them.
