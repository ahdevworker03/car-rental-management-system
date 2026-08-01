# README Analyst & Application Verifier

## Role

I act as a **repository analyst and application verifier** for creating a professional GitHub README. I do not write README content. I provide verified information from the repository and running application upon request.

## Verified Repository Facts (Initial Scan)

### Project Identity

- **Name:** `workspace` (placeholder)
- **License:** MIT
- **Repository root:** `car-rental-management-system`
- **README.md:** Empty (0 lines) — awaiting creation
- **Package manager:** pnpm (monorepo)
- **Workspace config:** `pnpm-workspace.yaml`

### Frontend Application (`@workspace/car-rental`)

- Located at `artifacts/car-rental/`
- **Tech stack:** React 19.1, TypeScript 5.9, Vite 7.3, Tailwind CSS v4, shadcn/ui (New York style), wouter (routing), TanStack React Query (data fetching), framer-motion (animation), lucide-react (icons), recharts (charts), react-hook-form + zod (forms), next-themes (dark/light mode)
- **Language direction:** Arabic RTL (`dir="rtl"`, Cairo font)
- **Current data layer:** Static in-memory mock data (`src/data/`) — not connected to a live backend
- **Backend:** Express API server at `artifacts/api-server/` with a single `/api/healthz` endpoint
- **Generated API client:** Orval-generated React Query hooks + Zod schemas exist but are not yet wired to real endpoints

### Pages (Routes)

| Route | Component | Layout |
|---|---|---|
| `/` | DashboardPage | AppShell |
| `/vehicles` | VehiclesPage | AppShell |
| `/vehicles/add` | AddVehiclePage | AppShell |
| `/vehicles/:id` | VehicleDetailPage | AppShell |
| `/customers` | CustomersPage | AppShell |
| `/customers/add` | AddCustomerPage | AppShell |
| `/customers/:id` | CustomerDetailPage | AppShell |
| `/rentals` | RentalsPage | AppShell |
| `/rentals/new` | NewRentalPage | Fullscreen (no AppShell) |
| `/rentals/:id` | RentalDetailPage | AppShell |
| `/maintenance` | MaintenancePage | AppShell |
| `/maintenance/add` | AddMaintenancePage | Fullscreen (no AppShell) |
| `/analytics` | AnalyticsPage | AppShell |

### Documentation Directory (`docs/`)

- `architecture/architecture.md`
- `architecture/design system.md`
- `architecture/screen-blueprints.md`
- `product specification/english.md`
- `product specification/Arabic.pdf`
- `rules/` — 12 markdown files on coding standards, git, TypeScript, UI/UX, testing, etc.

## Methodology

For each README section request:

1. Determine minimum repository files needed.
2. Read those files.
3. Run the frontend if necessary.
4. Navigate to relevant pages and verify UI matches implementation.
5. Capture portfolio-quality screenshots when requested.
6. Return only verified facts and observations.

## Scope

- **Focus:** Frontend application (`@workspace/car-rental`) only
- **Ignore:** Backend, database, OpenAPI, generated clients, shared libraries, deployment infrastructure unless explicitly requested
- **Accuracy:** Never guess, never assume, never invent features
- **Conflicts:** Identify conflicting information across files if found

## Limitations Noted

- The frontend uses mock data (`src/data/`) — no real API integration yet
- README.md is completely empty
- Repository name is `workspace` (likely a placeholder — the actual GitHub repo name should be used in README screenshots/links)
- `docs/` directory is gitignored

Awaiting section-specific requests.
