# Universal Coding Standards

These principles apply in every language. Language-specific guidance belongs in the language style guide.

## Core Principles

- Prefer simple, readable code over clever shortcuts.
- Make the smallest coherent change that solves the problem.
- Keep responsibilities narrow at the function, module, and package levels.
- Avoid duplication when removing it makes the code clearer, not more abstract.
- Do not add speculative flexibility for future scenarios that do not exist yet.

## Naming

- Use names that describe intent, not implementation trivia.
- Follow the naming conventions already established in the affected package.

## Module Design

- Keep files and modules focused.
- Respect existing package and folder boundaries.
- Avoid circular dependencies and hidden cross-module coupling.

## Error Handling

- Fail clearly when a problem cannot be handled locally.
- Do not swallow errors without a deliberate reason.
- Preserve useful context in error messages and error types.
