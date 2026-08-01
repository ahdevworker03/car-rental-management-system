# Git Conventions

## Commits

- Use [Conventional Commits](https://www.conventionalcommits.org/) format:

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `ci`.

- Keep commits atomic and focused on a single logical change.
- Commit messages are written in imperative mood (“Add feature” not “Added feature”).

## Branches

- Follow the naming convention defined in `project.md`. Typically:
- Feature branches: `feat/description`
- Bug fixes: `fix/description`
- Chores: `chore/description`
- Always branch from the latest main/master unless otherwise indicated.

## Pull Requests & Merges

- Do not open a PR or merge unless the user requests it.
- If asked to prepare a PR, include a meaningful description, linked issues, and a summary of testing.

## Safety

- Never force‑push to shared branches.
- Before pushing, ensure the branch is up‑to‑date with the target (rebase if safe and permitted).
