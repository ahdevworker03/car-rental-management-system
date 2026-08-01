# Design and Architecture Principles

Use these rules when a task affects structure, boundaries, or long-term extensibility.

## Structural Decisions

- Abstract only when it removes real duplication or clarifies the design.
- Prefer composition over deep inheritance or tightly coupled frameworks.
- Keep dependencies minimal and explicit.
- Optimize for clear boundaries before optimizing for reuse.

## Public Surfaces

- Keep public interfaces small, stable, and documented.
- Hide internal implementation details behind package or module boundaries.
- Measure performance work instead of guessing.

## State and Data Flow

- Minimize shared mutable state.
- Keep data flow easy to trace across packages and layers.
- Preserve the distinction between prototype frontend behavior and future API-backed behavior.

## Decision Escalation

Pause and ask for approval before changing:

- project architecture
- folder structure
- major dependencies
- UX direction
- business logic
- public APIs
- database schema
- deployment strategy

Routine implementation inside an approved direction does not require confirmation.
