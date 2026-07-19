# Validation Prototype Specification

## Car Rental Management System

**Document version:** 1.0  
**Role:** Single Source of Truth (SSOT) for the frontend-only validation prototype  
**Output file:** `01-validation-prototype-specification.md`

---

## 1. Purpose

This document defines the complete product requirements for a **frontend‑only validation prototype** of an internal Car Rental Management System.  
The prototype is intended solely to test product‑market fit with small car rental business owners in Lebanon.  
It does **not** represent a production‑ready application, nor does it include any backend, authentication, database, or deployment logic.

**Primary validation question:**

> “Would this replace your notebook?”

Everything in this document exists to answer that question quickly, cheaply, and with minimal risk.

---

## 2. Business Context

### 2.1 The Problem

Small Lebanese car rental businesses (10–50 vehicles) currently run their operations using notebooks, WhatsApp chats, and memory.  
This leads to:

- Lost or forgotten rental information
- No clear overview of vehicle availability
- Unreliable maintenance tracking
- Difficulty tracking payments and balances
- No way to see revenue at a glance

### 2.2 The Proposed Solution

A simple, mobile‑friendly, Arabic‑only internal tool that replaces paper and memory with:

- A daily workspace showing what needs attention
- Clear vehicle statuses: **Available**, **Rented**, **Under Maintenance**
- Fast rental creation and return flows
- Customer and vehicle contact cards
- Basic revenue and maintenance reminders

The system is **not** a customer‑facing marketplace, not an ERP, and not an accounting tool. It is the digital equivalent of the owner’s notebook, made smarter.

---

## 3. Target Users

| Attribute           | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| **Who**             | Owners or managers of small car rental businesses                    |
| **Fleet size**      | 10–50 vehicles                                                       |
| **Technical level** | Very low – most use only WhatsApp, phone calls, and basic apps       |
| **Device**          | Primarily smartphones (Android, large screens common)                |
| **Language**        | Arabic only – cannot read or prefer not to read English              |
| **Expectations**    | Speed, simplicity, minimal typing, intuitive touch actions           |
| **Primary need**    | Replace notebook with something that “just works” with zero training |

---

## 4. Core Modules (Arabic‑only, RTL)

The prototype will contain only five top‑level modules. These mirror the mental model of the business owner.

| #   | Arabic name   | English equivalent | Purpose                                                          |
| --- | ------------- | ------------------ | ---------------------------------------------------------------- |
| 1   | **الرئيسية**  | Dashboard          | Daily workspace – see everything that matters today              |
| 2   | **السيارات**  | Vehicles           | Manage all vehicles, their details, photos, status               |
| 3   | **العملاء**   | Customers          | Store customer name, phone, location, rental history             |
| 4   | **الإيجارات** | Rentals            | Active and past rentals, payment tracking, balance               |
| 5   | **الصيانة**   | Maintenance        | Track oil changes, inspections, insurance, registration, repairs |

Analytics (revenue summary) will live inside **الرئيسية** as simple cards – not a separate module.

---

## 5. Dashboard Requirements (الرئيسية)

The dashboard must function as the owner’s daily command centre.  
On opening the app, they should immediately see:

1. **Vehicle status summary**
   - Available (green)
   - Rented (blue)
   - Under Maintenance (orange)
   - Shown as large, tappable numbers/cards

2. **Rentals ending today or within 2 days**
   - Car name, customer name, return date
   - Tap to see rental detail

3. **Maintenance due this week**
   - Type (oil, inspection, insurance, registration)
   - Vehicle name, due date

4. **Quick actions**
   - “Rent a car” button (goes to fast rental flow)
   - “Return a car” button (goes to active rentals)

5. **Revenue snapshot**
   - This month’s total income (simple number)
   - Pending balances (total money not yet collected)

No charts, no complex filters. The dashboard must fit on one mobile screen with scrolling for details. Every item is a direct link to the relevant record.

---

## 6. UX Principles

Every decision must prioritise the following:

- **Mobile‑first** – Designed for portrait smartphone use; tablet is secondary.
- **Arabic‑first** – All interface text in Arabic; RTL layout mandatory.
- **Extremely simple** – One primary action per screen whenever possible.
- **Familiar language** – Use the exact words owners use: “أجرة يومية” not “سعر الإيجار اليومي”, “دفع” not “تسديد دفعة”.
- **Minimal navigation** – Bottom tab bar with exactly 5 items (no hamburger menu, no nested drawers).
- **Few clicks** – A new rental should take under 30 seconds with minimal typing.
- **Forgiveness** – Mistakes must be easy to correct (e.g., cancel, edit).
- **No training required** – The interface should explain itself through labels and clear hierarchy.

---

## 7. UI Principles (Visual Direction)

This is not a final design; it is a constraint set for future visual design.

- **Clean** – Generous white space, no clutter.
- **Spacious** – Cards with padding, clear separation between sections.
- **Readable** – Large, familiar Arabic typeface (e.g., system font at minimum 16px).
- **Large touch targets** – Minimum 48×48dp for all interactive elements.
- **High contrast** – Dark text on light background, strong status colours.
- **Simple cards** – Information grouped in rounded‑corner cards with subtle shadows.
- **Consistent buttons** – One primary action colour (blue/teal), one destructive (red for delete/cancel).
- **Minimal colours** – Three status colours: green (available), blue (rented), orange (maintenance), plus neutral grey for inactive.
- **Clear hierarchy** – Titles bold, subtitles lighter, secondary info smaller.

No illustrations, no animations beyond subtle feedback, no custom decorative elements.

---

## 8. User Workflows (Conceptual)

These describe how a user completes tasks **without specifying implementation details**.

### 8.1 Viewing Today’s Tasks

- Open app → **الرئيسية** loads automatically.
- Owner scans the “Rentals ending soon” and “Maintenance due” sections.
- Tapping any item opens the full detail (rental or maintenance record).

### 8.2 Renting a Car (Single or Multiple)

1. From **الرئيسية** tap “تأجير سيارة” (or from **الإيجارات** tap “+” ).
2. **Step 1 – Choose vehicle(s):**
   - See a list of only **available** cars (photo, plate number, daily price).
   - Can select one or multiple.
3. **Step 2 – Select customer:**
   - Search by name or phone, or tap “عميل جديد” to quickly add name, phone, location.
4. **Step 3 – Rental details:**
   - Pick start date (default today), end date.
   - Daily price auto‑fills from vehicle record but can be overridden.
   - Total amount calculated instantly.
   - Option to record an initial payment (optional).
5. **Confirmation screen** – review summary and tap “تأكيد”.
6. Cars immediately change status to **Rented**.

### 8.3 Returning a Car

1. From **الرئيسية** “إعادة سيارة” (or **الإيجارات** → select active rental).
2. Confirm return date (default today) – can adjust if returning late.
3. See final amount due, any remaining balance.
4. Option to record final payment.
5. Confirm – car returns to **Available**. Rental moves to history.

### 8.4 Viewing Customer Information

- Go to **العملاء** → list of all customers (searchable).
- Tap a customer to see:
  - Name, phone, location.
  - Current rentals (if any).
  - Past rental history (simple list).

### 8.5 Viewing Vehicle Information

- Go to **السيارات** → grid/list of all vehicles with status icon.
- Tap a vehicle to see:
  - Photos (tap to view full‑screen).
  - Model, plate number, year, mileage.
  - Daily rental price.
  - Maintenance log (next due dates).
  - Notes.
  - Button to edit or mark as under maintenance.

### 8.6 Recording Maintenance

- From **الصيانة** → tap “+” or from a vehicle detail page → “تسجيل صيانة”.
- Select maintenance type: تغيير زيت / فحص ميكانيكي / تأمين / تسجيل / تصليح.
- Choose vehicle.
- Set due date or done date (if recording past maintenance).
- Add notes.
- Car status automatically becomes “Under Maintenance” if future due date, or stays available if just a log entry.

### 8.7 Checking Revenue

- **الرئيسية** shows monthly total and pending balances.
- Tap the revenue card to see a simple list:
  - Month‑by‑month income (this year).
  - Amount collected vs. pending for each month.
- No export, no chart – just clear numbers.

---

## 9. Information Architecture

All pages and their purpose. Layouts are **not** defined here.

### 9.1 Bottom Tab Bar (always visible)

| Tab       | Icon hint    | Page                           |
| --------- | ------------ | ------------------------------ |
| الرئيسية  | Home / gauge | Dashboard                      |
| السيارات  | Car          | Vehicle list                   |
| العملاء   | People       | Customer list                  |
| الإيجارات | Document     | Rental list (active / history) |
| الصيانة   | Wrench       | Maintenance list               |

### 9.2 Page Details

**الرئيسية (Dashboard)**

- Status summary cards
- Today’s workload lists
- Quick action buttons
- Revenue snapshot

**السيارات (Vehicles)**

- Full vehicle list with status badge and photo thumbnail
- Search/filter by status
- Vehicle detail screen (photos, info, maintenance log, edit button)
- Add vehicle (manual form)

**العملاء (Customers)**

- Customer list (name, phone, current rental count)
- Search by name or phone
- Customer detail (info, current rentals, history)
- Add customer (simple form)

**الإيجارات (Rentals)**

- Segmented control: نشط (Active) / منتهي (Ended)
- Each rental card: car, customer, dates, remaining balance
- Create rental flow (as described)
- Rental detail (all info, payment history, add payment, return/end)

**الصيانة (Maintenance)**

- Segmented: قادمة (Upcoming) / مكتملة (Completed)
- Each item: type, vehicle, due date
- Add maintenance record flow
- Maintenance detail (type, vehicle, dates, notes, mark complete)

**Additional simple pages**

- Edit vehicle, edit customer (reuse add forms)
- Payment recording (part of rental detail)
- Revenue list (accessed from dashboard card)

No settings, no profile, no multi‑user.

---

## 10. Validation Goals

What we must learn from showing this prototype to real business owners:

1. **Can they understand the interface without any explanation?**
   - Do the Arabic labels and icons make sense immediately?

2. **Can they create a rental quickly?**
   - Is the flow intuitive? Do they stumble on steps?

3. **Is any information missing that they typically write in their notebook?**
   - Do they expect fields for driver’s license, contract terms, etc.? (Even if out of scope, capture that need.)

4. **Is anything confusing or ambiguous?**
   - Do colours, status words, or interactions cause hesitation?

5. **Would they replace their notebook with this?**
   - After using the prototype, ask directly: “هل تستبدل دفترك بهذا؟”

6. **Which feature do they ask for first?**
   - If they say “I need X”, note it for future prioritisation.

7. **Do they trust the revenue numbers?**
   - Does the simple revenue display satisfy their need to know earnings?

8. **Is the mobile‑only approach acceptable?**
   - Do they ever need a desktop, or is phone sufficient?

---

## 11. Out of Scope

The following are **intentionally excluded** from the prototype (and from MVP scope until validated otherwise):

- Online booking / customer portal
- Payment gateway integration (only manual payment recording)
- GPS tracking or telemetry
- Digital contracts / e‑signatures
- Multi‑branch or location management
- User roles, permissions, employee login
- Accounting integration or profit/loss reports
- AI‑powered recommendations or chatbots
- Backend, API, database, server logic
- Authentication / authorisation (prototype runs with hardcoded mock data)
- Data persistence across sessions
- Performance optimisation
- Security (no real data)

If a business owner requests any of the above during validation, it will be captured as a future enhancement but must not derail the current scope.

---

## 12. Definition of Done

The validation prototype is considered **successful** when:

- A business owner can navigate all five modules **without training**.
- They are able to **complete a rental end‑to‑end** (select car, add customer, set dates, confirm) in under 30 seconds.
- They can **return a car** and see the balance update.
- They can **add a maintenance task** and see it appear on the dashboard.
- They can **interpret the dashboard** and state what needs their attention today.
- They voluntarily compare it to their notebook and **express a clear preference** (“Yes, I would use this instead” or “No, because…”).
- The feedback collected provides **concrete evidence** to either proceed, pivot, or abandon the product idea.

The prototype’s technical completeness is irrelevant; the only metric is **clarity of product‑market signal**.

---

## 13. Writing & Usage Notes

- This specification is the **single source of truth** for the frontend prototype implementation.
- Any future design or development decision must refer back to this document.
- No technical implementation details (framework, library, state management) should be inferred from this document.
- The Arabic language and RTL layout are non‑negotiable; mock data and UI must reflect real Lebanese car rental terms.
- This document is living: after validation, insights will feed into the next iteration (MVP specification).

---

**End of Specification**
