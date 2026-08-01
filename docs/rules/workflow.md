# Repository-First Workflow

Use this process for any task that changes code, tests, or documentation.

## Order of Work

1. Understand the task and confirm the expected outcome.
2. Read `project.md` first.
3. Inspect the repository area you will touch:
   - relevant source files
   - nearby tests
   - local patterns and abstractions
   - architecture or product docs if the change depends on them
4. Identify boundary conditions before editing:
   - generated code vs source code
   - package ownership inside the monorepo
   - scripts or build steps affected by the change
   - current git status when the task may overlap existing work
5. Make an implementation plan:
   - small tasks: proceed directly
   - non-trivial tasks: state a brief plan before coding
   - architecture or product-direction changes: get confirmation first
6. Implement the smallest coherent change.
7. Verify with the relevant checks:
   - tests
   - typecheck
   - lint/format if relevant
   - manual diff review
8. Update documentation only where `documentation.md` requires it.
9. Summarize what changed, what was verified, and any remaining caveats.

## Rule Priority

Use this order when rules conflict:

1. Explicit user instructions
2. `project.md`
3. Architecture and project documentation
4. Existing repository patterns
5. General rule files
6. AI assumptions

Never let assumptions override repository facts.
