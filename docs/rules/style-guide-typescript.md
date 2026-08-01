# TypeScript Style Guide

This guide extends `coding-standards.md` for TypeScript in this repository. Follow the repository formatter, tsconfig, and existing package conventions first.

## Type Safety

- Keep strict type-checking enabled and fix type errors instead of suppressing them.
- Prefer inference for obvious local values; add explicit types for public APIs, exported utilities, and complex return shapes.
- Use `unknown` at trust boundaries and narrow it with runtime checks.
- Avoid `any`; if it is unavoidable, keep it local and document why.
- Model variants with unions and discriminants, then exhaustively narrow them.

## Choosing Type Constructs

- Use `type` and `interface` based on fit, not dogma.
- Use `interface` for extensible object contracts that benefit from declaration-style readability.
- Use `type` for unions, intersections, mapped types, conditional types, tuples, and utility-type composition.
- Prefer `readonly`, `Readonly<T>`, and `readonly` arrays when mutation is not intended.
- Prefer utility types such as `Partial`, `Pick`, `Omit`, `Record`, and `Awaited` over hand-rolled equivalents.

## Modern TypeScript Features

- Use `satisfies` to validate object shapes without losing specific inference.
- Use `as const` for stable literal objects, tuples, and configuration maps.
- Constrain generics to express real relationships; do not add generics that only make signatures harder to read.
- Prefer plain objects plus unions over enums when runtime enum behavior is unnecessary.

## Modules and Imports

- Write ESM-style imports and exports.
- Use `import type` and `export type` for type-only references.
- Prefer named exports for shared utilities and libraries unless framework conventions make a default export clearer.
- Keep module APIs small and colocate related types with the code that owns them.

## Implementation Style

- Prefer `const`; use `let` only when reassignment is required.
- Use optional chaining and nullish coalescing where they simplify control flow.
- Prefer small helper functions over repeated inline branching.
- Avoid assertions when narrowing or better typing can express the same intent.

## Async and Errors

- Prefer `async`/`await` for application code.
- Validate external data at runtime at API, environment, and storage boundaries.
- Throw `Error` instances or domain-specific subclasses, not strings.
- In `catch` blocks, narrow unknown errors before reading their properties.

## React and TSX

- Use function components and typed props objects.
- Do not use `React.FC` unless an existing local pattern requires it.
- Let component return types infer unless an exported abstraction needs an explicit signature.
- Keep hooks, props, and local state shapes simple; extract shared logic only when reuse is real.
- Type form data, route params, and API responses from their actual sources of truth rather than duplicating shapes manually.

## Repository Notes

- `lib/api-spec` is the source of truth for API contracts.
- `lib/api-client-react` and `lib/api-zod` are generated outputs and should stay aligned with the spec.
- Follow existing test file naming and package-level tooling instead of inventing new conventions.
