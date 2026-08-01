# UI / UX Rules for This Repository

Apply these rules to any frontend or user-facing change.

## Product Context

- This is an internal business tool, not a marketing site.
- Optimize for clarity, speed, and repeated daily use.
- Prefer consistency over visual experimentation.

## Language and Layout

- Arabic is the primary language unless the task explicitly says otherwise.
- Design and implement RTL-first, not LTR with RTL fixes layered on later.
- Use terminology that matches the business language in the product docs.

## Mobile-First Behavior

- Start from portrait phone usage and scale up to larger screens.
- Preserve one-handed usability, large touch targets, and short task flows.
- Desktop responsiveness should not break the mobile mental model.

## Visual Consistency

- Follow the design direction in `docs/03-design-system.md`.
- Keep spacing consistent and predictable across screens and components.
- Reuse established card, form, badge, and navigation patterns before inventing new ones.
- Avoid decorative UI that does not improve task completion.

## Accessibility

- Keep semantic structure correct.
- Ensure keyboard access for interactive elements.
- Maintain readable contrast and clear focus states.
- Label form controls explicitly and keep error messages understandable.

## Component and Styling Conventions

- Prefer existing Tailwind utility patterns over ad hoc CSS.
- Reuse workspace UI primitives and shadcn/Radix patterns where they already exist.
- Keep presentation concerns separate from business and data logic.
- Preserve RTL-safe spacing, alignment, icon placement, and overflow behavior.

## User Feedback

- Loading, empty, and error states are required for user-facing flows.
- Feedback should be brief, clear, and non-technical.
- Do not add motion or styling variation unless it serves comprehension.
