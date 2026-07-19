# Screen Blueprints – Validation Prototype

## Car Rental Management System

**Document:** `docs/02-screen-blueprints.md`  
**Based on:** `docs/01-validation-prototype-specification.md` (Single Source of Truth)  
**Version:** 1.0

---

## 1. Introduction

This document provides a **functional blueprint** for every screen in the front‑end validation prototype.  
It does **not** contain visual design, technical architecture, or backend details.  
Its sole purpose is to give a front‑end developer or AI enough product clarity to build interactive, realistic mockups without making product decisions.

All screens are **Arabic‑only**, **right‑to‑left (RTL)**, and built **mobile‑first** (phone portrait as default).  
Interactions assume large touch targets and minimal learning.

---

## 2. Screen Blueprints

### 2.1 الرئيسية (Dashboard)

#### Purpose

Provide the owner with an instant snapshot of today’s situation – what needs attention, what’s available, what’s rented, what’s under maintenance, and what revenue has come in.

#### Primary Goal

Answer **“What do I need to do today?”** in under five seconds.

#### Information Displayed

- **Status cards** (large, tappable numbers):
  - السيارات المتاحة (Available) – green
  - السيارات المؤجرة (Rented) – blue
  - سيارات في الصيانة (Under Maintenance) – orange
- **Upcoming returns** section:
  - Car name/model, customer name, return date.
  - Only rentals ending today or within 2 days are shown.
- **Upcoming maintenance** section:
  - Maintenance type (تغيير زيت, فحص, تأمين, تسجيل), vehicle, due date.
  - Only tasks due within the next 7 days.
- **Quick actions** (primary buttons):
  - تأجير سيارة (Rent a car)
  - إعادة سيارة (Return a car)
- **Revenue snapshot** card:
  - دخل هذا الشهر (This month’s revenue) – total amount.
  - الرصيد المتبقي (Pending balance) – total unpaid from all active rentals.
  - Tappable to go to التحليلات (Analytics).

#### User Actions

- Tap any status card → navigate to filtered list of vehicles.
- Tap a rental in “upcoming returns” → open rental detail.
- Tap a maintenance item → open maintenance detail.
- Tap “تأجير سيارة” → open new rental flow.
- Tap “إعادة سيارة” → open active rentals list (filtered to those that can be returned).
- Tap revenue card → go to التحليلات.

#### Navigation

- This is the home screen; always accessed from the bottom tab bar (الرئيسية).
- No back button needed (except for drilled‑down items that lead to detail screens).

#### Empty State

- If no vehicles exist: large message “لا توجد سيارات مضافة بعد” with a button “إضافة سيارة” that goes to vehicle add form.
- If no rentals: “لا توجد إيجارات نشطة حالياً”.
- If no upcoming maintenance: “لا توجد صيانة مستحقة هذا الأسبوع”.

#### Mock Data Needed

- At least 3 vehicles: 1 Available, 1 Rented, 1 Under Maintenance.
- 2 active rentals ending today or tomorrow.
- 2 upcoming maintenance tasks (one oil change, one insurance).
- Revenue figures: this month 2,500,000 LBP, pending 750,000 LBP.

#### Validation Goal

Can the owner, at first glance, tell which cars are rented, which are available, what’s urgent, and roughly what they earned this month? Do they immediately understand the dashboard without explanation?

---

### 2.2 السيارات (Vehicles List)

#### Purpose

Show all vehicles and their current status; allow quick search, filtering, and addition of new vehicles.

#### Primary Goal

Enable the owner to find any vehicle within seconds and see its status at a glance.

#### Information Displayed

- **List/grid** of vehicle cards. Each card contains:
  - Thumbnail photo
  - Model (e.g., “تويوتا كورولا”)
  - Plate number (رقم اللوحة)
  - Status badge (متاحة / مؤجرة / صيانة) with colour
  - Daily price (أجرة يومية)
- **Search bar** (top): search by model, plate number, or any word.
- **Filter chips** (horizontal scroll): الكل / متاحة / مؤجرة / صيانة.
- **Add button** (ثابت): “+ إضافة سيارة” floating action button or top‑right.

#### User Actions

- Tap a vehicle card → navigate to تفاصيل السيارة.
- Tap “+ إضافة سيارة” → open vehicle add form.
- Type in search → filter list instantly.
- Tap a status chip → filter by that status.

#### Navigation

- Accessed via bottom tab السيارات.
- From here, user can go to vehicle detail, add vehicle, or return via bottom tabs.

#### Empty State

- No vehicles: illustration (or simple text) “لم تتم إضافة أي سيارة بعد” with a prominent button “إضافة أول سيارة”.

#### Mock Data Needed

- 5–7 vehicles with varied statuses, including at least one with no photo (placeholder).
- Plate numbers in Lebanese format.
- Realistic daily prices (e.g., 300,000–800,000 LBP).

#### Validation Goal

Does the owner instantly understand the status colour coding? Can they search and filter without hesitation? Do they attempt to tap a car to see more?

---

### 2.3 تفاصيل السيارة (Vehicle Detail)

#### Purpose

Display all relevant information about a single vehicle, its current status, rental and maintenance history.

#### Primary Goal

Give the owner everything they need to know about a car in one place, and enable the main actions: rent, return, edit, or mark under maintenance.

#### Information Displayed

- **Photo gallery** (swipeable, max 3 photos). If no photo, placeholder.
- **Vehicle info section:**
  - الموديل (Model)
  - رقم اللوحة (Plate number)
  - السنة (Year)
  - المسافة المقطوعة (Mileage) – displayed as “xxx,xxx كم”
  - الأجرة اليومية (Daily price)
  - ملاحظات (Notes) – free text
- **Status badge** (large, coloured).
- **Current rental** card (if rented): customer name, dates, remaining balance. Tap goes to rental detail.
- **Rental history** list (collapsed, “عرض الإيجارات السابقة” to expand). Each item: date range, customer, total.
- **Maintenance history** list (similar collapsible list). Each item: type, date, status.

#### User Actions

- Tap “تأجير” (Rent) → initiates new rental flow with this vehicle pre‑selected.
- Tap “إعادة” (Return) → if currently rented, prompts quick return confirmation (date, payment).
- Tap “تعديل” (Edit) → open edit vehicle form (same layout as add, pre‑filled).
- Tap “تسجيل صيانة” → open إضافة صيانة form with vehicle pre‑selected.
- Tap on a photo → full‑screen view.
- Tap current rental card → rental detail.
- Expand history sections to see past rentals/maintenance.

#### Navigation

- Arrives from السيارات list or from rental/customer detail.
- Back button returns to previous screen (or bottom tab).

#### Empty State

- No rentals yet: rental history section says “لا توجد إيجارات سابقة”.
- No maintenance: “لا توجد سجلات صيانة”.

#### Mock Data Needed

- One car with full photo, complete info, current rental, past rentals, and maintenance log.
- One car without photo and minimal data.

#### Validation Goal

Does the owner find the photo and status clear? Do they notice the “Rent” button and understand what it does? Is the information hierarchy logical to them?

---

### 2.4 العملاء (Customers List)

#### Purpose

Quickly access any customer’s information and see who currently has a car.

#### Primary Goal

Make it effortless to find a customer by name or phone, and see at a glance whether they have an active rental or a balance due.

#### Information Displayed

- **Search bar** (by name or phone number).
- **List of customer cards** showing:
  - اسم العميل (Name)
  - رقم الهاتف (Phone number)
  - عدد الإيجارات النشطة (Active rentals count, e.g., “2 سيارات”)
  - رصيد متبقي (Remaining balance, if any, highlighted)
- **Add button**: “+ إضافة عميل”.

#### User Actions

- Tap a customer card → go to تفاصيل العميل.
- Tap “+ إضافة عميل” → open simple add form (name, phone, location).
- Type in search → filter list immediately.

#### Navigation

- From bottom tab العملاء.

#### Empty State

- “لا يوجد عملاء بعد” with a button “إضافة أول عميل”.

#### Mock Data Needed

- 4–6 customers: some with active rentals, some with zero balance, one with a high remaining balance.
- Typical Lebanese names and phone numbers (e.g., 03/70/71).

#### Validation Goal

Is the list scannable? Does the remaining balance grab attention? Do they try to call a customer by tapping the phone number (future improvement note)?

---

### 2.5 تفاصيل العميل (Customer Detail)

#### Purpose

Show everything about a single customer – contact, current rentals, history, and payments.

#### Primary Goal

Give the owner a complete customer profile without searching through multiple places.

#### Information Displayed

- **Contact card:**
  - Name, phone (tappable, but in prototype may not dial), location.
- **Active rentals** section:
  - Each card: vehicle model, plate, rental dates, daily price, remaining balance.
  - Tap leads to rental detail.
- **Rental history** (collapsible):
  - Past rentals with vehicle, dates, total.
- **Payment summary** (simple):
  - إجمالي المدفوع (Total paid)
  - إجمالي المتبقي (Total remaining across all active rentals)

#### User Actions

- Tap a current rental card → rental detail.
- Tap “تعديل” (Edit) → edit customer info.
- Tap “تأجير سيارة” → start rental flow with this customer pre‑selected.
- Expand history to see past rentals.

#### Navigation

- From العملاء list. Back button returns to list.

#### Empty State

- If no rentals yet, “لا توجد إيجارات حالية” and history “لا توجد إيجارات سابقة”.

#### Mock Data Needed

- One customer with multiple past rentals and an active rental with balance.
- One customer brand new.

#### Validation Goal

Do owners find the balance information useful? Do they immediately see whether this customer owes money?

---

### 2.6 الإيجارات (Rentals List)

#### Purpose

Manage all rentals – active and past – and start new ones.

#### Primary Goal

Provide a clear separation between current and ended rentals, with quick access to details and return actions.

#### Information Displayed

- **Segmented control**: نشط (Active) / منتهي (Ended).
- **Active tab** – list of active rental cards:
  - Vehicle model & plate
  - Customer name
  - Date range (من ... إلى ...)
  - Remaining balance (if any)
  - Button: “إعادة” (Return)
- **Ended tab** – list of ended rentals (same info without return button, showing “منتهي” badge).
- **Search bar** (optional, filters by customer or vehicle).
- **Add button**: “+ إيجار جديد”.

#### User Actions

- Tap a rental card → rental detail.
- Tap “إعادة” on an active card → quick return flow (confirm date, final payment).
- Tap “+ إيجار جديد” → start new rental flow.
- Switch tabs to see history.

#### Navigation

- From bottom tab الإيجارات.

#### Empty State

- No active rentals: “لا توجد إيجارات نشطة” and a prompt to create one.

#### Mock Data Needed

- At least 3 active rentals (one with balance, one fully paid, one ending today).
- At least 4 ended rentals.

#### Validation Goal

Is the distinction between active and ended obvious? Can they quickly return a car from this list?

---

### 2.7 إنشاء إيجار (New Rental) – Multi‑step flow

#### Purpose

Guide the owner through renting one or multiple vehicles to a customer with minimal friction.

#### Primary Goal

Complete a rental in under 30 seconds with as few decisions as possible.

The flow may be presented as steps or a single scrollable form – but conceptually it consists of:

**Step 1: Select Vehicle(s)**

- List of **only available vehicles**.
- Each item: photo thumbnail, model, plate, daily price.
- Checkbox or tap to select; multiple selection allowed.
- Selected cars appear in a summary bar at bottom (e.g., “2 سيارات مختارة”).
- “التالي” (Next) button.

**Step 2: Select Customer**

- Search field (name or phone) with live results.
- Quick add new customer link (name, phone, location) inline.
- Display selected customer card.
- “التالي” button.

**Step 3: Rental Details**

- **Start date** (default today, editable via date picker).
- **End date** (required, date picker).
- **Daily price** – pre‑filled from each vehicle, but can be edited per vehicle if multiple selected (simple list of selected cars with editable price).
- **Total** – automatically calculated (daily price × number of days × number of vehicles).
- **دفعة أولى (Initial payment)** – optional field, editable amount.
- **الرصيد المتبقي (Remaining)** – auto‑calculated total minus paid.
- **ملاحظات (Notes)** – free text.

**Step 4: Confirmation**

- Summary card: customer name, vehicles (list), dates, total, paid, remaining.
- “تأكيد” (Confirm) button.
- After confirm, cars marked as rented, return to الإيجارات active tab or show success message.

#### Navigation

- Can be started from الرئيسية, الإيجارات, or السيارة detail.
- Back button at each step (with confirmation if data will be lost? Prototype may skip warning).

#### Empty State (within flow)

- If no available vehicles at Step 1: “جميع السيارات مؤجرة حالياً” and option to go back.
- If customer list empty: prompt to add first customer.

#### Mock Data Needed

- At least 3 available vehicles to select from.
- A couple of existing customers, plus ability to add new one.

#### Validation Goal

Can the owner complete a rental without asking for help? Do they notice they can select multiple vehicles? Is the payment field intuitive? Where do they hesitate?

---

### 2.8 تفاصيل الإيجار (Rental Detail) – (implied screen, derived from workflows)

Even though not explicitly listed in the requirements’ screen list, we need a detail screen for rentals. It is referenced by dashboard, customer detail, and vehicles. So I'll include it here.

#### Purpose

View and manage a specific rental: see full details, add payments, return, or edit.

#### Primary Goal

Give a complete picture of a single rental transaction and allow actions (add payment, return).

#### Information Displayed

- **Customer info** (name, phone).
- **Vehicle(s)** list (if multiple).
- **Date range** (start – end).
- **Daily price(s)** and total.
- **Payment history**: list of payments (amount, date).
- **Remaining balance**.
- **Notes**.
- **Status**: نشط or منتهي.

#### User Actions

- “تسجيل دفعة” (Record payment) → pop‑up or inline field to add amount and date.
- “إعادة السيارة” (Return car) → confirm return date (default today) and optionally final payment.
- “تعديل” (Edit) → edit rental details (dates, price, notes) – for active rentals only.
- Back navigation.

#### Navigation

- From rental list, customer detail, vehicle detail, dashboard.

#### Mock Data Needed

- One rental with multiple vehicles and several payments.

#### Validation Goal

Do owners understand how to record a payment? Is the balance clearly visible?

---

### 2.9 الصيانة (Maintenance List)

#### Purpose

Track upcoming and completed maintenance tasks across the fleet.

#### Primary Goal

Prevent missing critical maintenance by showing what’s due next, and keep a history for each vehicle.

#### Information Displayed

- **Segmented control**: قادمة (Upcoming) / مكتملة (Completed).
- **Upcoming tab** – list of cards:
  - نوع الصيانة (Type icon/label)
  - السيارة (Vehicle model & plate)
  - تاريخ الاستحقاق (Due date)
  - أيام متبقية (Days left, e.g., “بعد ٣ أيام” with warning colour if overdue).
- **Completed tab** – similar list, but with date completed and green checkmark.
- **Add button**: “+ تسجيل صيانة”.

#### User Actions

- Tap a maintenance card → maintenance detail (simple view with edit/mark complete).
- Tap “+ تسجيل صيانة” → open إضافة صيانة form.
- On an upcoming item, swipe or button to “إتمام الصيانة” (Mark complete) which moves it to completed tab and optionally updates vehicle status to available if it was under maintenance.

#### Navigation

- From bottom tab الصيانة.

#### Empty State

- No upcoming maintenance: “لا توجد صيانة مستحقة – أحسنت!”.
- No completed: “لم يتم تسجيل أي صيانة مكتملة بعد”.

#### Mock Data Needed

- At least 4 upcoming tasks of different types, 2 overdue, and 3 completed.

#### Validation Goal

Can the owner quickly spot what’s urgent? Do they understand the maintenance types? Do they want to filter by vehicle?

---

### 2.10 إضافة صيانة (Add Maintenance)

#### Purpose

Record a new maintenance task – either scheduled future work or a completed one.

#### Primary Goal

Capture the minimum necessary information to track vehicle maintenance without complexity.

#### Information Displayed / Form Fields

- **السيارة (Vehicle)** – dropdown/selection from list of all vehicles.
- **نوع الصيانة (Maintenance type)** – predefined list:
  - تغيير زيت
  - فحص ميكانيكي
  - تأمين
  - تسجيل (Registration)
  - تصليح (Repair)
- **التاريخ (Date)** – date picker (default today).  
  If future, treated as “due date”; if today/past, treated as completed date.
- **تذكير (Reminder)** – optional, number of days before due date to show in dashboard. (For simplicity, fixed options: أسبوع / ٣ أيام / يوم before)
- **التكلفة (Cost)** – optional amount field.
- **ملاحظات (Notes)** – free text.
- Button: “حفظ” (Save).

After saving, if the maintenance is future and vehicle was Available, vehicle status changes to “Under Maintenance” automatically (except maybe for insurance/registration? We’ll keep simple: any future maintenance puts car in maintenance status). If the task is completed, car remains in current status.

#### Navigation

- From الصيانة screen or from vehicle detail.
- Back discards changes (with confirmation in prototype? maybe simple dialog).

#### Empty State

- N/A (form).

#### Mock Data Needed

- All vehicles available to select.

#### Validation Goal

Is the type selection sufficient? Do they understand that future tasks will change vehicle status? Do they ask for recurring maintenance setup?

---

### 2.11 التحليلات (Analytics)

#### Purpose

Show a very simple overview of revenue and fleet status; no advanced charts.

#### Primary Goal

Answer “How much did I make?” and “How is the fleet doing?” in a glance.

#### Information Displayed

- **Revenue card**:
  - دخل هذا الشهر (This month) – large number.
  - مقارنة بالشهر الماضي (compared to last month) – simple arrow and percentage (if mock data supports).
- **Revenue by vehicle** list – each car with total earned this month.
- **Most rented vehicle** – highlight top car.
- **Fleet status summary** repeated for convenience:
  - متاحة / مؤجرة / صيانة (counts).
- **Pending balances** total.

#### User Actions

- View only, no interactions beyond scrolling.
- Optionally tap a vehicle row to go to vehicle detail.

#### Navigation

- Accessed from revenue card on الرئيسية (or possibly from a “المزيد” link). No dedicated tab; it’s a secondary screen.
- Back button returns to dashboard.

#### Empty State

- If no revenue this month, “لا توجد إيرادات هذا الشهر”.

#### Mock Data Needed

- Data consistent with dashboard: monthly revenue, per‑car breakdown, fleet status.

#### Validation Goal

Does the owner understand the numbers? Do they find this sufficient, or do they ask for more detailed reports?

---

## 3. Navigation Map

- **Bottom tab bar** (always visible):
  - الرئيسية (Dashboard)
  - السيارات (Vehicles)
  - العملاء (Customers)
  - الإيجارات (Rentals)
  - الصيانة (Maintenance)

**Main navigation paths:**

- From **الرئيسية**:
  - Status cards → السيارات (filtered)
  - Rental return item → تفاصيل الإيجار (Rental detail)
  - Maintenance item → تفاصيل الصيانة (Maintenance detail, lightweight screen)
  - “تأجير سيارة” → إنشاء إيجار flow
  - “إعادة سيارة” → الإيجارات (active tab)
  - Revenue card → التحليلات

- From **السيارات**:
  - Car card → تفاصيل السيارة
  - “+” → إضافة سيارة form
  - Back to الرئيسية via tab

- From **تفاصيل السيارة**:
  - “تأجير” → إنشاء إيجار (vehicle pre‑selected)
  - “إعادة” → quick return flow
  - “تعديل” → edit vehicle form
  - “تسجيل صيانة” → إضافة صيانة (vehicle pre‑selected)
  - Current rental card → تفاصيل الإيجار
  - Back to السيارات

- From **العملاء**:
  - Customer card → تفاصيل العميل
  - “+” → إضافة عميل form

- From **تفاصيل العميل**:
  - Rental card → تفاصيل الإيجار
  - “تأجير سيارة” → إنشاء إيجار (customer pre‑selected)
  - “تعديل” → edit customer
  - Back to العملاء

- From **الإيجارات**:
  - Rental card → تفاصيل الإيجار
  - “+” → إنشاء إيجار
  - “إعادة” on card → quick return

- From **تفاصيل الإيجار**:
  - “تسجيل دفعة” (inline)
  - “إعادة السيارة” → confirm return
  - Back to الإيجارات

- From **الصيانة**:
  - Maintenance card → maintenance detail (view / mark complete)
  - “+” → إضافة صيانة

- From **إضافة صيانة**:
  - Save → back to الصيانة (or vehicle detail)

- **التحليلات**:
  - Only accessed from dashboard; back to الرئيسية.

---

## 4. Daily User Journey (Ideal)

A typical day for the business owner:

1. **Open the app** → see الرئيسية.
2. Immediately notice a red/orange maintenance warning: “تسجيل سيارة مرسيدس ينتهي بعد يومين”. Taps it, sees details, decides to handle later.
3. Sees “الإيجارات المنتهية اليوم”: a Toyota rental ending today; taps to open rental detail.
4. Customer calls – wants to extend. Owner edits rental end date, saves.
5. Another customer arrives to return a car. From dashboard, taps “إعادة سيارة” → sees list of active rentals, picks the correct one, confirms return, records final cash payment.
6. New walk‑in customer wants to rent a Kia. From dashboard, taps “تأجير سيارة”.
   - Step 1: selects Kia (available).
   - Step 2: adds new customer quickly (name, phone).
   - Step 3: sets dates, daily price auto‑filled, takes 200,000 LBP initial payment, remaining auto‑calculated.
   - Confirms.
7. Checks revenue: taps revenue card on dashboard, sees monthly total has updated, nods.
8. Glances at vehicle status cards: 2 available, 3 rented, 1 in maintenance – all as expected.
9. Closes app, continues work.

---

## 5. Implementation Notes

- All screens must support RTL layout; labels mirror Arabic text exactly as given.
- Mock data should feel realistic, using Lebanese names, plate numbers, and currency (LBP).
- The prototype is **interactive**: buttons navigate, forms accept input (though nothing is saved to a backend), lists filter, date pickers work.
- For simplicity, actions like adding a payment or marking maintenance complete can be implemented with simple in‑memory updates (state resets on reload).
- No actual validation logic; if a user taps “return car” on a non‑rented car, allow it (it’s a prototype).
- Provide enough data so that all screens look populated and realistic, but don’t overcomplicate.

---

**End of Screen Blueprints**
