# Screen Inventory — Validation Prototype

**Document:** `docs/architecture/screen inventory.md`
**Role:** Product-facing inventory of every implemented screen, its route, purpose, and major UI sections.

All screens are **Arabic-only**, **RTL**, **mobile-first** (portrait, max 480px viewport). Data is in-memory — no persistence.

---

## Screens

### 1. Dashboard (الرئيسية)
**Route:** `/`  
**Layout:** AppShell (bottom nav)

**Purpose:** Daily command centre — fleet status, revenue, tasks needing attention.

**UI sections:**
- Fleet status cards (3 columns: available/rented/maintenance counts) — tappable, navigate to `/vehicles?filter=X`
- Revenue card (hardcoded January 2025) — shows monthly total and pending balance, tappable → `/analytics`
- Quick actions (2×2 grid): "تأجير سيارة" → `/rentals/new`, "إعادة سيارة" → `/rentals`, "إضافة سيارة" → `/vehicles/add`, "تسجيل صيانة" → `/maintenance/add`
- Today's tasks: ending-soon rentals (due ≤2 days) + overdue maintenance items — tappable cards
- Upcoming maintenance (due ≤7 days, non-overdue) — tappable, "عرض الكل" → `/maintenance`
- Recent activity: last 4 returned rentals — tappable → `/rentals/:id`

**States:** Empty state per section when no tasks/activity exist.

---

### 2. Vehicles (السيارات)
**Route:** `/vehicles`  
**Layout:** AppShell

**Purpose:** Browse, search, filter, and add vehicles.

**UI sections:**
- Search bar (by make/model, plate, year)
- Filter chips: الكل / متاحة / مؤجرة / صيانة — drives `?filter=` query param
- Vehicle card list — each card shows photo, make/model, plate, daily price, status badge, renter name (if rented)
- Add button (top-right, circular `+`)
- Result count when filtered or searched

**States:** Empty (no vehicles), no-results (search/filter with no match).

---

### 3. Vehicle Detail (تفاصيل السيارة)
**Route:** `/vehicles/:id`  
**Layout:** AppShell

**Purpose:** Full vehicle profile — info, current rental, history, actions.

**UI sections:**
- Photo area (first photo or placeholder with car icon)
- Status badge overlay on photo
- Info rows: plate, year, mileage, daily price, notes
- Current rental card (if rented): customer name, date range, remaining balance — tappable → `/rentals/:id`
- Action buttons (context-dependent):
  - Available: "تأجير السيارة" → `/rentals/new?vehicle=:id` + "تسجيل صيانة"
  - Rented: "إعادة السيارة" → current rental detail + "تسجيل صيانة"
  - Maintenance: "تسجيل صيانة" (full width)
- Rental history (collapsible `CollapsibleSection`) — list of past rentals, tappable
- Maintenance history (collapsible `CollapsibleSection`) — list with status badge, type, cost
- Edit button (top-right) → `/vehicles/add?edit=:id`

**States:** Not-found screen if `:id` does not match a vehicle.

---

### 4. Add Vehicle (إضافة سيارة)
**Route:** `/vehicles/add`  
**Layout:** AppShell (supports `?edit=:id` for edit mode)

**Purpose:** Form to create or edit a vehicle.

**UI sections:**
- Photo placeholder (dashed border, tap-to-add — visual only, no upload)
- Vehicle info section: make (_required_), model (_required_), year, plate (_required_)
- Pricing & status: daily price (_required_, numeric), mileage (numeric), status dropdown (available/rented/maintenance)
- Notes textarea
- Save button (disabled until required fields filled) — navigates to `/vehicles` without persistence
- Validation errors shown inline (red text below fields)

---

### 5. Customers (العملاء)
**Route:** `/customers`  
**Layout:** AppShell

**Purpose:** Browse, search, and add customers.

**UI sections:**
- Search bar (by name, phone, location)
- Customer cards — each shows avatar (initials), name, phone, active rental count, remaining balance (highlighted if >0)
- Add button (top-right, circular `+`)

**States:** Empty (no customers), no-results (search with no match).

---

### 6. Customer Detail (تفاصيل العميل)
**Route:** `/customers/:id`  
**Layout:** AppShell

**Purpose:** Complete customer profile — contact, current rentals, payment summary, history.

**UI sections:**
- Contact card: avatar (initials), name, location, phone (call button — visual only, `preventDefault`), info rows (phone, location, notes)
- Payment summary: total paid (green), remaining balance (red if >0, "لا يوجد" otherwise)
- Active rentals section — each card: vehicle name, plate, date range, remaining balance, total — tappable → `/rentals/:id`
- Rental history (collapsible) — past rentals: vehicle, date range, total — tappable
- "تأجير سيارة" button → `/rentals/new?customer=:id`
- Edit button (top-right) → `/customers/add?edit=:id`

**States:** Not-found screen if `:id` does not match a customer.

---

### 7. Add Customer (إضافة عميل)
**Route:** `/customers/add`  
**Layout:** AppShell (supports `?edit=:id` for edit mode)

**Purpose:** Form to create or edit a customer.

**UI sections:**
- Name (_required_), phone (_required_), location, notes
- Save button (disabled until name + phone filled) — navigates to `/customers`
- Inline validation errors

---

### 8. Rentals (الإيجارات)
**Route:** `/rentals`  
**Layout:** AppShell

**Purpose:** Manage all rentals — active and ended.

**UI sections:**
- Segmented control: نشطة / منتهية
- Search bar (by customer name, phone, vehicle name/plate)
- Rental cards — each shows customer name, vehicle name/plate, date range, remaining balance (if active)
- Add button (top-right, circular `+`) → `/rentals/new`

**States:** Empty (no active/ended rentals with CTA for active tab), no-results.

---

### 9. New Rental (تأجير جديد)
**Route:** `/rentals/new`  
**Layout:** Full-screen (no AppShell, no bottom nav)

**Purpose:** Multi-step rental creation flow.

**UI sections:**
- Step progress indicator (3 steps: السيارة → العميل → التفاصيل)
- **Step 1 — Vehicle picker** (collapsible):
  - Search within available vehicles
  - Select one vehicle — pre-selects from `?vehicle=` query param
  - Shows selected vehicle summary (make, model, plate, daily price, "متاحة" badge)
  - "جميع السيارات مؤجرة حالياً" if no available vehicles
- **Step 2 — Customer picker** (collapsible):
  - Search by name/phone
  - Pre-selects from `?customer=` query param
  - Shows selected customer summary (name, phone, location)
- **Step 3 — Rental details** (always visible):
  - Start date (default 2025-01-15), end date (required, must be after start)
  - Daily price (pre-filled from selected vehicle, editable)
  - Initial payment (optional)
  - Auto-calculated summary: vehicle, customer, dates, daily price, days count, total, paid, remaining
- Notes textarea
- Save button — pushes to mock rentals array, marks vehicle as rented, shows success screen, auto-redirects to `/rentals` after 1.2s
- Inline validation errors

**Pre-selection:** `?vehicle=:id&customer=:id` query params supported.

---

### 10. Rental Detail (تفاصيل الإيجار)
**Route:** `/rentals/:id`  
**Layout:** AppShell

**Purpose:** View rental details, record payments, return vehicle.

**UI sections:**
- Status banner (active: blue / ended: green) with return date if ended
- Customer card: name (tappable → `/customers/:id`), phone (visual call button), avatar
- Vehicle card: photo, make/model (tappable → `/vehicles/:id`), plate
- Rental info: start date, end date, days count, daily price, total, notes
- Payment summary:
  - Progress bar (% paid)
  - Paid amount / total
  - Payment history list (amount + date)
  - Remaining balance (red if >0)
  - "لم يتم تسجيل أي دفعة" when no payments
- **Active rental actions:**
  - "تسجيل دفعة" — inline input: amount field + confirm button, validates ≤ remaining
  - "إعادة السيارة" — opens return confirmation: return date picker (default today), remaining balance warning, confirm/cancel buttons — marks rental ended, sets vehicles to available, success toast
- "تعديل العقد" button — shows placeholder success toast ("سيتم توفيره في إصدار لاحق")
- Success toast (green bar) after actions

**States:** Not-found screen if `:id` does not match a rental.

---

### 11. Maintenance (الصيانة)
**Route:** `/maintenance`  
**Layout:** AppShell

**Purpose:** Track upcoming, overdue, and completed maintenance.

**UI sections:**
- Overdue alert strip (if any overdue items) — shows count + "عرض المتأخرة" filter shortcut
- Filter chips: الكل / متأخرة / قادمة / مكتملة — drives `?filter=` query param
- Search bar (by vehicle name/plate, maintenance type label)
- Maintenance cards — each shows: type icon/label, vehicle name/plate, due date, status, expandable for notes/cost + "إتمام" (mark complete) button for non-completed items
- Mark complete updates status to "completed" in mock data, shows success toast
- Add button (top-right, circular `+`) → `/maintenance/add`
- Result count when filtered or searched

**Sorting:** Overdue first → upcoming → completed (chronological within groups).

---

### 12. Add Maintenance (تسجيل صيانة)
**Route:** `/maintenance/add`  
**Layout:** Full-screen (no AppShell, no bottom nav)

**Purpose:** Record a new maintenance task.

**UI sections:**
- **Vehicle picker** (collapsible) — search all vehicles (not just available), pre-selects from `?vehicle=` query param
- **Maintenance type** (2×3 grid of buttons):
  - تغيير زيت, فحص ميكانيكي, تأمين, تسجيل, تصليح — each with icon
  - Selected state: primary border + tint
- Date (default 2025-01-15), cost (optional, numeric), notes textarea
- Save button (disabled until vehicle + type selected) — pushes to mock maintenance array, shows success screen, auto-redirects to `/maintenance` after 1.2s
- Status determined by date: past → "overdue", future → "upcoming"

---

### 13. Analytics (التحليلات)
**Route:** `/analytics`  
**Layout:** AppShell (back button to dashboard)

**Purpose:** Revenue overview, fleet status breakdown, debtor highlight.

**UI sections:**
- **Revenue card** (primary background): month total (hardcoded January 2025), month-over-month change (vs December 2024, % + amount), positive/negative trend icon
- **Pending balance warning** (red alert bar): total unpaid from active rentals
- **Revenue by vehicle** (bar-style list): per-vehicle earnings this month, sorted descending, top earner highlighted ("الأعلى" badge), tappable → `/vehicles/:id`
- **Fleet status** (3-column stat cards): available/rented/maintenance counts
  - Rented vehicles list (tappable → `/vehicles/:id`)
  - Maintenance vehicles list (tappable → `/vehicles/:id`)
- **Quick stats** (2-column grid): completed rentals count, total registered customers
- **Top debtor** card: customer with highest outstanding balance, name, location, amount — tappable → `/customers/:id`

---

### 14. Not Found (404)
**Route:** (catch-all)  
**Layout:** Full-screen (centered card)

Simple 404 page with `AlertCircle` icon and "Page Not Found" message in English.

---

## Navigation Map

**Bottom tab bar** (5 tabs, always visible in AppShell):
الرئيسية | السيارات | العملاء | الإيجارات | الصيانة

**Full-screen flows** (no bottom nav): `/rentals/new`, `/maintenance/add`

**Cross-navigation paths:**
- Dashboard status cards → `/vehicles?filter=available|rented|maintenance`
- Dashboard revenue → `/analytics`
- Dashboard tasks → `/rentals/:id` or `/maintenance`
- Dashboard quick actions → `/rentals/new`, `/rentals`, `/vehicles/add`, `/maintenance/add`
- Vehicle detail → `/rentals/new?vehicle=:id`, `/rentals/:id`, `/maintenance/add?vehicle=:id`
- Customer detail → `/rentals/new?customer=:id`, `/rentals/:id`
- Rental detail → `/customers/:id`, `/vehicles/:id`
- Analytics vehicle rows → `/vehicles/:id`
- Analytics top debtor → `/customers/:id`

**Add forms** (`?edit=:id` query param): `/vehicles/add`, `/customers/add` (pre-fills not implemented — edit button navigates to form with param only).

---

## Implementation Notes

- All data reads and writes go through `data/index.ts` (in-memory arrays). No API calls.
- Mutations (add rental, return vehicle, mark maintenance complete, add payment) directly modify the exported arrays in `data/*.ts`. Changes are lost on page reload.
- Date references are hardcoded to January 2025 (`MOCK_TODAY = "2025-01-15"`).
- RTL is enforced globally via the app shell. All text is Arabic except the 404 page.
- Filter query params (`?filter=`, `?vehicle=`, `?customer=`) are read from URL search params but are not persisted across navigation.
- No backend or authentication exists.
