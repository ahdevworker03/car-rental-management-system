# AI Agent Rule System

This is the entry point for the modular rule system. Do not load every file by default. Read only what the task needs.

## Task Routing

| Task Type         | Files to read (in order)                                                                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bug fix**       | project.md → core-behavior.md → workflow.md → safety.md → coding-standards.md → style-guide-typescript.md → testing.md (if tests change)                                |
| **New feature**   | project.md → core-behavior.md → workflow.md → design-decisions.md → safety.md → coding-standards.md → style-guide-typescript.md → testing.md → documentation.md → ui-ux.md (if UI) |
| **Refactoring**   | project.md → core-behavior.md → workflow.md → design-decisions.md → safety.md → coding-standards.md → style-guide-typescript.md → testing.md                              |
| **Documentation** | project.md → core-behavior.md → documentation.md → workflow.md                                                                                                          |
| **Testing**       | project.md → core-behavior.md → testing.md → safety.md → style-guide-typescript.md                                                                                      |
| **UI work**       | project.md → core-behavior.md → workflow.md → ui-ux.md → design-decisions.md → safety.md → style-guide-typescript.md → testing.md                                       |
| **Repo cleanup**  | project.md → core-behavior.md → workflow.md → safety.md → coding-standards.md → git.md                                                                                 |

## Rule Priority

1. Explicit user instructions
2. `project.md`
3. Architecture and project documentation
4. Existing repository patterns
5. General rule files
6. AI assumptions

Never let assumptions override repository facts.

## How to Use

1. Identify the task type.
2. Read `project.md` first.
3. Read only the files listed for that task.
4. Follow references only when they are directly relevant.
5. If the repository contradicts a general rule, follow the repository.
