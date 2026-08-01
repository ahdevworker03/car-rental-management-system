# Safety Rules

These are hard constraints. They override convenience, speed, and local preference.

## Destructive Operations

- Do not delete files, clear data, drop tables, rewrite history, or remove code paths without explicit user approval.
- Do not run `git reset --hard`, `git clean`, force-pushes, destructive rebases, or similar history-rewriting commands without explicit approval.
- Treat bulk renames, schema rewrites, and large mechanical edits as approval-worthy when they materially increase risk.

## Code and Data Changes

- Do not run migrations, schema-changing SQL, or data-modifying scripts without explicit approval.
- Do not change public APIs, database schema, deployment strategy, or business-critical flows silently; escalate through `design-decisions.md`.
- Do not hand-edit generated code unless the user explicitly wants a temporary exception.

## Repository Safety

- Inspect the current worktree before changing files when overlap is possible.
- Never revert unrelated user changes.
- Do not commit, push, open PRs, merge, or rebase unless the user asked for that action.

## Secrets and Credentials

- Never expose secrets, tokens, passwords, or private keys in output, code comments, or logs.
- If a secret is present in the repo, warn the user without reproducing the secret value.

## External Systems

- Do not call production services, external APIs, or cloud resources without explicit approval.
- Do not install or upgrade dependencies unless the task requires it and the user approved that direction.

## When to Stop

- If an action feels risky and the rules do not clearly allow it, pause and ask.
