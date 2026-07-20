# Car Rental Management System

A mobile-optimised, Arabic-first internal business tool for small car rental companies in Lebanon. The system replaces paper notebooks and ad-hoc messaging with a structured interface to track vehicles, customers, rentals, and maintenance.

This repository is a monorepo containing a frontend application, an API server stub, shared libraries, and product documentation. The project is currently a validation prototype with a complete frontend backed by static mock data.

---

## Features

- **Dashboard** -- Fleet status overview, daily revenue snapshot, upcoming maintenance alerts, quick-access action buttons.
- **Vehicle Management** -- Add, view, and search vehicles. Each vehicle record includes status, specifications, photo gallery, and rental history.
- **Customer Management** -- Add, view, and search customers. Customer profiles show contact information, active rentals, payment summary, and history.
- **Rental Management** -- Create multi-step rentals (select vehicle, select customer, configure dates and payments). Track active and completed rentals with remaining balance.
- **Maintenance Tracking** -- Log maintenance tasks with type, cost, and due dates. Filter by upcoming or completed status.
- **Analytics** -- Revenue breakdown by month, fleet utilisation, top debtors, and per-vehicle earnings.
- **Arabic RTL Interface** -- Full right-to-left layout with the Cairo typeface and Lebanese Pound currency formatting.
- **Mobile-First Layout** -- Phone-frame viewport with a five-tab bottom navigation bar designed for on-the-go use by rental owners and staff.

---

## Screens

| Page               | Route              | Description                                          |
| ------------------ | ------------------ | ---------------------------------------------------- |
| Dashboard          | `/`                | Summary cards, quick actions, recent activity         |
| Vehicles           | `/vehicles`        | Searchable vehicle list with status filters           |
| Add Vehicle        | `/vehicles/add`    | Vehicle creation form                                 |
| Vehicle Detail     | `/vehicles/:id`    | Full vehicle profile with history                     |
| Customers          | `/customers`       | Customer list with active-rental and balance info     |
| Add Customer       | `/customers/add`   | Customer creation form                                |
| Customer Detail    | `/customers/:id`   | Customer profile with rentals and payment summary     |
| Rentals            | `/rentals`         | Rental list with active/ended toggle and search       |
| New Rental         | `/rentals/new`     | Multi-step rental creation wizard (full-screen)       |
| Rental Detail      | `/rentals/:id`     | Rental details, payments, and return action           |
| Maintenance        | `/maintenance`     | Maintenance list with upcoming/completed tabs         |
| Add Maintenance    | `/maintenance/add` | Maintenance record form (full-screen)                 |
| Analytics          | `/analytics`       | Revenue chart, fleet stats, per-vehicle earnings      |

---

## Technology Stack

### Frontend

- **React 19** with TypeScript
- **Vite 7** (build tool and dev server)
- **Tailwind CSS 4** with `@tailwindcss/vite` plugin and `@tailwindcss/typography`
- **wouter** (lightweight client-side routing)
- **TanStack React Query 5** (server-state management)
- **react-hook-form** with `@hookform/resolvers` (form management and validation)
- **Zod** (schema validation)
- **shadcn/ui** (component library built on Radix UI primitives)
- **lucide-react** (icons)
- **framer-motion** (animations and transitions)
- **recharts** (charts)
- **date-fns** and **react-day-picker** (date utilities)
- **sonner** (toast notifications)
- **embla-carousel-react**, **cmdk**, **vaul**, **input-otp**

### Backend (in early development)

- **Express 5** (HTTP server)
- **Drizzle ORM** with PostgreSQL (`pg`)
- **Pino** (logging)
- **Zod** (request validation)
- **esbuild** (bundling)

### Shared Infrastructure

- **pnpm workspaces** (monorepo management)
- **TypeScript 5.9** with project references across packages
- **OpenAPI 3.1** specification with **Orval** code generation
- **Drizzle Kit** (schema push and migrations)

---

## Repository Structure

```
artifacts/
  car-rental/          Frontend React application
  api-server/          Express API server (stub)
lib/
  api-client-react/    Generated React Query API client from OpenAPI spec
  api-spec/            OpenAPI specification and Orval codegen config
  api-zod/             Generated Zod schemas from OpenAPI spec
  db/                  Database layer with Drizzle ORM and PostgreSQL client
scripts/               Utility scripts (post-merge hook, etc.)
Docs/                  Product specification, screen blueprints, and design system
```

- `artifacts/` -- Deployable packages (frontend app and API server).
- `lib/` -- Shared packages consumed by the artifacts.
- `scripts/` -- Helper scripts for repository maintenance.
- `Docs/` -- Project documentation (specification, blueprints, design system).

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

### Build

Type-check the entire project and build all packages:

```sh
pnpm build
```

### Type Checking

```sh
pnpm typecheck
```

---

## Project Status

This is a **validation prototype**. The frontend is fully implemented with static mock data to demonstrate functionality and test product-market fit. The backend API server and database schema are stubs awaiting implementation. No data persists between sessions.

---

## Documentation

Detailed product documentation is located in the `Docs/` directory:

- `01-validation-prototype-specification.md` -- Product specification, business context, and user workflows.
- `02-screen-blueprints.md` -- Functional blueprints for every screen.
- `03-design-system.md` -- Design philosophy, colour tokens, typography, and component guidelines.
- `1-product specification/` -- English and Arabic product overviews.

---

## License

Licensed under the [MIT License](LICENSE).

---

## Future Improvements

- Implement backend API routes for all CRUD operations.
- Define the database schema and connect the frontend to live data.
- Add authentication and user management for multi-tenant use.
- Replace mock data with persisted state via the API.
- Add reporting and export features (PDF, CSV).
