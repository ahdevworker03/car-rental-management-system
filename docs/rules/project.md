# Project Context

## Overview

Car Rental Management System is an Arabic-first internal tool for small Lebanese car rental businesses. The current repository is a validation prototype built to answer one question quickly: would this replace the owner's notebook?

## Current Status

- Frontend MVP is the primary deliverable and is live as a prototype.
- The frontend is functional but uses in-memory mock data only.
- The backend exists as a stub with a health check and shared schema wiring.
- Authentication, persistence, and production business workflows are not implemented.

## Goals

- Validate product-market fit before building full infrastructure.
- Keep frontend flows realistic enough for user testing.
- Preserve a clean path from prototype data to API-backed implementation.
- Maintain a repository structure that supports long-term monorepo growth.

## Architecture Summary

- `artifacts/car-rental/`: React 19 + Vite single-page app, Arabic UI, RTL, mobile-first.
- `artifacts/api-server/`: Express 5 API server stub.
- `lib/api-spec/`: OpenAPI 3.1 source of truth.
- `lib/api-client-react/`: generated React Query client from OpenAPI.
- `lib/api-zod/`: generated Zod schemas from OpenAPI.
- `lib/db/`: Drizzle + PostgreSQL database layer, currently skeletal.

## Repository Structure

- `artifacts/` deployable applications.
- `lib/` shared internal libraries.
- `docs/` product, design, architecture, and rule documentation.
- Root `package.json`, `pnpm-workspace.yaml`, and `tsconfig*.json` define workspace-wide behavior.

## Technology Stack

- Package manager: `pnpm` workspaces only.
- Language: TypeScript across the workspace.
- Frontend: React 19, Vite 7, Tailwind CSS 4, wouter, react-hook-form, Zod, Radix/shadcn patterns, Recharts.
- Backend: Express 5, Pino, Zod, Drizzle ORM, PostgreSQL.
- Tooling: TypeScript project references, Prettier, Orval, esbuild.

## Responsibilities

- Frontend owns prototype UX, routing, forms, mock data flows, and validation-facing interactions.
- Backend owns API surface, request validation, persistence boundaries, and future production data flows.
- Shared libraries own the API contract, generated clients/schemas, and database access primitives.

## Generated Code Boundaries

- Treat `lib/api-client-react/` and `lib/api-zod/` as generated outputs.
- Change generated behavior by editing `lib/api-spec/` or the codegen configuration, then regenerate.
- Do not hand-edit generated files unless the user explicitly asks for a temporary patch.

## OpenAPI Workflow

- Update the OpenAPI spec first.
- Regenerate client and schema packages second.
- Update frontend or backend consumers last.
- Repository facts override assumptions about what the API "should" look like.

## Important Constraints

- This repo is a prototype first, not a production system.
- Mock data behavior in the frontend is intentional unless the task explicitly moves a flow to the API.
- Arabic copy, RTL layout, and mobile usability are product requirements, not polish.
- Avoid introducing infrastructure or dependency complexity without a clear repository-level need.

## Development Philosophy

- Follow the current repository before proposing new patterns.
- Prefer small, reviewable changes over broad refactors.
- Preserve the migration path from prototype code to contract-driven production code.

## Source of Truth

- Repository architecture: `docs/architecture/`
- Setup, scripts, and status: `README.md`, root `package.json`, `pnpm-workspace.yaml`
