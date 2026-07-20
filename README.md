# Car Rental Management System

An Arabic-first, mobile-optimised internal business tool for small car rental companies in Lebanon. The system is designed to replace the paper notebooks, WhatsApp conversations, and memory that owners currently rely on to manage fleets of 10-50 vehicles. It is currently a validation prototype with a complete frontend backed by static mock data, built to test product-market fit before committing to a full production build.

## Live Demo

🔗 https://car-rental-management-system-car-re.vercel.app/

## Project Status

✅ **Frontend MVP Complete** — All 14 screens render with functional forms and mock data.

✅ **Live on Vercel** — The frontend is deployed and accessible at the URL above.

⏳ **Backend planned for future development** — The API server and database are outside MVP scope.

⏳ **Authentication not implemented** — No user accounts, roles, or sessions.

⏳ **Database not implemented** — All data is in-memory and lost on page reload.

## Business Context

### The Problem

Small Lebanese car rental businesses run their daily operations without dedicated software. Owners track rentals in notebooks, communicate with customers through WhatsApp, and remember maintenance schedules. As the number of vehicles and customers grows, this informal system creates real problems:

- Rental end dates are forgotten or misremembered.
- Customer contact information is lost or scattered.
- It is not clear which vehicles are available at any given moment.
- Maintenance tasks such as oil changes and insurance renewals are missed.
- Revenue is difficult to calculate without manually summing payments.
- There is no organised history of past rentals or vehicle performance.

### The Target Users

The system is designed for owners and managers of small car rental businesses with 10 to 50 vehicles. They are not technical users. Most rely on smartphones for everything and communicate primarily in Arabic. The interface must be usable without any training.

### The Validation Prototype

Rather than building a full production system and discovering that the product does not match what owners actually need, this project starts with a frontend-only prototype. The prototype mimics a fully functional application using hardcoded mock data. No data persists between sessions, there is no authentication, and no real backend exists yet.

The prototype exists to answer one question: **"Would this replace your notebook?"** By putting a realistic, interactive interface in front of actual business owners, the project aims to validate core assumptions about workflows, terminology, and priorities before investing in backend infrastructure.

---

## Features

### Dashboard

The home screen functions as a daily command centre. It shows fleet status counts (available, rented, under maintenance), upcoming rental returns, maintenance tasks due within the week, a monthly revenue snapshot with pending balances, and quick-action buttons for the most common tasks: renting a car and returning a car. Every item on the dashboard is a link to the relevant detail screen.

### Vehicle Management

Vehicles can be viewed in a searchable list with status filter chips. Each vehicle record stores make, model, year, plate number, mileage, daily rental price, and photographs. The vehicle detail screen displays all of this alongside the current rental status, a maintenance log, and full rental history. New vehicles can be added through a dedicated form.

### Customer Management

Customers are listed with their name, phone number, and a summary of active rentals and outstanding balance. A search bar allows finding customers by name or phone. The customer detail screen shows contact information alongside current and past rentals, plus a payment summary. Adding a new customer requires only a name, phone number, and location.

### Rental Management

Rentals are split into active and ended views using a segmented control. Each rental card shows the vehicle, customer, dates, and remaining balance. The rental detail screen provides the full picture: customer and vehicle information, payment history, and the ability to record additional payments or complete a return.

Creating a new rental follows a multi-step flow: select available vehicles, select or add a customer, configure dates and pricing, then confirm. The flow is designed to be completed in under thirty seconds with minimal typing.

### Maintenance Tracking

Maintenance is displayed in upcoming and completed tabs. Each record includes the maintenance type (oil change, mechanical inspection, insurance, registration, or repair), the associated vehicle, due date, and cost. Tasks can be filtered, searched, and marked as complete. The add-maintenance form is a full-screen flow separate from the main navigation to allow focused data entry.

### Analytics

The analytics page provides a revenue breakdown by month, fleet status distribution (available, rented, under maintenance), a list of top debtors with their outstanding balances, and per-vehicle earnings. Charts render using Recharts.

### User Experience

The entire interface uses Arabic language and a right-to-left layout with the Cairo typeface. The app is framed in a phone-shaped viewport (max 480px width) and navigated via a five-tab bottom bar. Two full-screen flows (new rental, add maintenance) temporarily hide the tab bar to reduce distractions during data entry. Toast notifications, loading skeletons, and contextual empty states provide feedback throughout.

---

## Architecture

This repository is a **pnpm workspace monorepo** that organises code into four top-level directories, each with a clear responsibility:

```
artifacts/     Deployable packages (the frontend app and the API server).
lib/           Shared libraries consumed by the artifacts.
Docs/          Product and design documentation.
```

The separation between `artifacts/` and `lib/` follows a standard monorepo pattern: deployable code lives in `artifacts/`, while reusable internal packages live in `lib/` and are pulled in as workspace dependencies. This makes dependencies explicit and allows each package to be type-checked and versioned independently.

**Frontend (`artifacts/car-rental/`)** -- A single-page application built with React 19, TypeScript, Vite, and Tailwind CSS 4. It uses wouter for client-side routing, TanStack React Query for server-state management, react-hook-form with Zod for form validation, and shadcn/ui components (Radix UI primitives) for the UI layer. Mock data resides in `src/data/` as TypeScript modules with in-memory access functions. The frontend does not currently call any API; it reads and writes directly to these static data structures.

**Backend (`artifacts/api-server/`)** -- An Express 5 server with CORS, JSON body parsing, and Pino logging. It currently exposes a single health-check endpoint at `/api/healthz`. The server imports Zod schemas from `@workspace/api-zod` and the database client from `@workspace/db`. The database schema (Drizzle ORM with PostgreSQL) is a stub -- the schema file exports an empty object. The server is bundled with esbuild and produces ESM output.

**Shared Libraries:**

- `lib/api-spec/` -- An OpenAPI 3.1 specification that defines the API contract. Orval reads this spec to generate the two packages below.
- `lib/api-client-react/` -- Generated React Query hooks and a custom fetch client produced from the OpenAPI spec. These are ready to be consumed by the frontend once API routes are implemented.
- `lib/api-zod/` -- Generated Zod schemas produced from the OpenAPI spec. These are used by the API server for request validation.
- `lib/db/` -- The database layer using Drizzle ORM. It exports a configured PostgreSQL client and a schema placeholder awaiting table definitions.

The direction of dependencies flows inward: the API server depends on `api-zod` and `db`, while the frontend will eventually depend on `api-client-react`. The `api-spec` package is the source of truth that both codegen targets derive from.

---

## Screens

| Page            | Route              | Notes                                                   |
| --------------- | ------------------ | ------------------------------------------------------- |
| Dashboard       | `/`                | Fleet status, upcoming events, revenue snapshot         |
| Vehicles        | `/vehicles`        | Searchable list with status filter chips                |
| Add Vehicle     | `/vehicles/add`    | Vehicle creation form                                   |
| Vehicle Detail  | `/vehicles/:id`    | Vehicle profile with maintenance log and rental history |
| Customers       | `/customers`       | List with active rental count and balance per customer  |
| Add Customer    | `/customers/add`   | Customer creation form                                  |
| Customer Detail | `/customers/:id`   | Customer profile with rentals, payments, and balance    |
| Rentals         | `/rentals`         | Active/ended segmented list with search                 |
| New Rental      | `/rentals/new`     | Multi-step rental creation wizard (full-screen)         |
| Rental Detail   | `/rentals/:id`     | Rental details, payment history, return action          |
| Maintenance     | `/maintenance`     | Upcoming/completed tabs with search and filters         |
| Add Maintenance | `/maintenance/add` | Maintenance record form (full-screen)                   |
| Analytics       | `/analytics`       | Revenue chart, fleet distribution, per-vehicle earnings |

---

## Technology Stack

### Frontend

| Technology                                                            | Purpose                                                                                                          |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| React 19 with TypeScript                                              | Application framework with static typing                                                                         |
| Vite 7                                                                | Development server and production bundler                                                                        |
| Tailwind CSS 4 with `@tailwindcss/vite` and `@tailwindcss/typography` | Utility-first CSS with on-demand compilation via the Vite plugin                                                 |
| wouter                                                                | Lightweight client-side router with a hook-based API; chosen over heavier alternatives for its small bundle size |
| TanStack React Query 5                                                | Server-state cache and data-fetching layer (ready for when the API exists)                                       |
| react-hook-form with `@hookform/resolvers`                            | Performant form state management with Zod schema integration                                                     |
| Zod                                                                   | Runtime schema validation, shared between frontend and backend                                                   |
| shadcn/ui (Radix UI primitives)                                       | Accessible, unstyled component primitives with Tailwind-based styling                                            |
| framer-motion                                                         | Declarative animations and layout transitions                                                                    |
| recharts                                                              | Charting library for the analytics page                                                                          |
| date-fns                                                              | Date manipulation and formatting                                                                                 |
| lucide-react                                                          | Icon set                                                                                                         |
| sonner                                                                | Toast notification system                                                                                        |

### Backend

| Technology          | Purpose                                                      |
| ------------------- | ------------------------------------------------------------ |
| Express 5           | HTTP server framework                                        |
| Drizzle ORM         | Type-safe database query builder and schema definition       |
| PostgreSQL via `pg` | Relational database                                          |
| Pino with pino-http | Structured logging for the server and HTTP requests          |
| esbuild             | Fast bundler for the server code (outputs ESM)               |
| Zod                 | Request payload validation, shared from `@workspace/api-zod` |

### Workspace and Tooling

| Technology                             | Purpose                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------- |
| pnpm workspaces with catalog           | Dependency management across the monorepo with shared version constraints                   |
| TypeScript 5.9 with project references | Incremental type-checking and strict mode across packages                                   |
| OpenAPI 3.1 with Orval                 | API contract definition and automated code generation for the client and validation schemas |
| Drizzle Kit                            | Database schema push (development-only migration workflow)                                  |
| esbuild                                | Backend bundler                                                                             |

---

## Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm 9 or later

### Install

```sh
pnpm install
```

### Development

Start the frontend development server:

```sh
pnpm dev
```

The application runs at `http://localhost:5173` by default.

### Production Build

Type-check the entire project and build all packages:

```sh
pnpm build
```

### Type Checking

```sh
pnpm typecheck
```

### API Server

To start the API server in development mode:

```sh
pnpm --filter @workspace/api-server run dev
```

Requires a PostgreSQL database with a `DATABASE_URL` environment variable. The server runs on port 3001 by default.

---

## Project Status

**Implemented:**

- Complete frontend with 14 screens covering dashboard, vehicles, customers, rentals, maintenance, and analytics.
- Arabic RTL layout with mobile-first phone-frame design.
- Multi-step rental creation flow.
- Mock data layer with 7 vehicles, 6 customers, 7 rentals, and 7 maintenance records.
- Data access helpers for cross-referencing entities (rentals by vehicle, rentals by customer, revenue calculations, pending balances).
- OpenAPI specification with generated React Query client and Zod schemas.
- Health-check endpoint on the API server.

**In Progress (stubs exist but are not functional):**

- Backend API routes beyond the health check.
- Database schema definitions.
- Frontend-to-API integration (the generated client exists but is not wired up).

**Planned:**

- Authentication and multi-tenant user management.
- Persistent data storage via the API.
- Reporting and export (PDF, CSV).

---

## Future Roadmap

1. Define the database schema in `lib/db/` and push it to PostgreSQL.
2. Implement REST API routes for all CRUD operations (vehicles, customers, rentals, maintenance).
3. Replace the in-memory mock data layer with TanStack React Query calls to the API.
4. Add user authentication and session management.
5. Build reporting features for data export.

These items reflect the repository's current trajectory. Nothing beyond these steps has been scoped.

---

## License

[MIT](LICENSE)
