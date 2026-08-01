# Testing Standards & Philosophy

## Mindset

- Tests are a safety net, not a chore.
- Every bug fix should ideally include a test that reproduces the bug.
- Every new feature should have corresponding tests.

## Test Types

- **Unit tests**: Verify a single function/class in isolation.
- **Integration tests**: Verify interaction between components.
- **End‑to‑end tests**: Verify full user workflows (use sparingly, as they are slower).

## Good Tests

- Are **independent**: one test does not rely on the state of another.
- Follow **Arrange, Act, Assert**.
- Have descriptive names that explain the scenario and expected outcome.
- Test behaviour, not implementation details.

## What to Test

- Happy path and main edge cases.
- Error handling paths.
- Boundary values.

## Coverage

- Aim for high coverage on critical business logic; do not obsess over 100%.
- Never delete or skip a failing test just to “pass coverage”.

## Tools & Configuration

- Use whatever test framework is specified in `project.md`.
- Run tests before committing (if project config allows).
