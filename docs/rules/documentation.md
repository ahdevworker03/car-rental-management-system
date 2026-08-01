# Documentation Standards

Document the parts of the system that other people or packages must rely on.

## Document These

- public APIs and contract changes
- reusable workspace libraries
- shared utilities with non-obvious behavior
- complex business logic
- architectural decisions that affect future implementation
- generated-code workflows and source-of-truth boundaries

## Comments

- Keep comments rare and useful.
- Explain why, constraints, or edge cases, not obvious mechanics.
- Remove stale comments when changing related logic.

## Project Docs

- Update `README.md` when setup, scripts, or high-level behavior changes.
- Update architecture or product docs when the repository truth changes.
- Add migration notes for breaking API or workflow changes.

## When Not to Document

- Do not add docstrings or comments to every function by default.
- Do not document code that is already obvious from names, types, and tests.

## Style

- Write in direct, simple English.
- Prefer concrete examples when a workflow is easy to misuse.
