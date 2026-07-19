# Design System – Validation Prototype

## Car Rental Management System

**Document:** `docs/03-design-system.md`  
**Based on:**

- `docs/01-validation-prototype-specification.md`
- `docs/02-screen-blueprints.md`

**Version:** 1.0  
**Purpose:** Lightweight design language and component guidelines for the frontend‑only validation prototype.  
**Scope:** Visual consistency, usability, and interaction patterns – not final pixel‑perfect design.

---

## 1. Design Philosophy

The application must feel **easier than using a notebook**.  
Every design decision must reduce cognitive load and make the system feel invisible.

- **Design for clarity, not creativity.** The interface should never surprise or impress; it should simply work.
- **Mobile is the primary context.** Designs must assume a portrait phone screen, one‑handed usage, and short interaction bursts.
- **Arabic is the first language.** The visual hierarchy, typography, and layout must be born out of RTL and Arabic readability.
- **Speed over features.** If something adds friction, it doesn’t belong.

---

## 2. Brand Personality

The application is not a brand in the traditional sense, but it must convey a consistent character:

- **Reliable** – owners must trust that the information is accurate.
- **Organised** – structure should be immediately apparent.
- **Calm** – no urgency or alarm unless truly needed (late returns, overdue maintenance).
- **Friendly** – warm and approachable, never cold or technical.
- **Professional** – clean and serious enough for a business owner.
- **Simple** – free of decoration or unnecessary elements.

---

## 3. Visual Principles

### 3.1 Spacing

- Generous whitespace around cards and sections to avoid crowding.
- Consistent spacing scale (e.g., 4‑8‑16‑24‑32px) – all elements must breathe.
- Between sections: larger gaps; inside cards: moderate padding.

### 3.2 Hierarchy

- The most important information (car status, due dates, revenue total) must be prominent.
- Titles are bold and large; secondary info is smaller and lighter.
- Color is used to direct attention, not to decorate.

### 3.3 Consistency

- The same card pattern is used for vehicles, customers, rentals, and maintenance.
- Buttons and interactive elements behave identically everywhere.
- Terminology matches the owner’s language exactly.

### 3.4 Simplicity

- One primary action per screen.
- No inline charts, complex tables, or nested menus.
- If a feature can be postponed, it’s not added.

### 3.5 Readability

- All text must be legible at arm’s length.
- High contrast between text and background.
- No light grey text on white backgrounds; no thin font weights.

---

## 4. Color Principles

Colors are functional before aesthetic. They communicate status, guide attention, and create visual rest.

| Token          | Role                         | Usage                                                                                                            |
| -------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Primary**    | Main interactive color       | Primary buttons, selected tabs, links, active states. Feels trustworthy and calm (suggested: deep teal or blue). |
| **Secondary**  | Supporting accents           | Less critical interactive elements, background tints, subtle highlights.                                         |
| **Success**    | Available, paid, completed   | Status badges for “متاحة”, fully paid, completed tasks. Must be clearly green but not neon.                      |
| **Warning**    | Maintenance, partial payment | Status for “صيانة”, partial balance, upcoming deadlines that are not yet urgent. Orange/amber tone.              |
| **Danger**     | Overdue, unpaid              | Used sparingly for overdue maintenance or extremely late returns. Red, only when attention is critical.          |
| **Background** | Page background              | Very light neutral (off‑white or warm grey) to reduce glare.                                                     |
| **Surface**    | Cards, modals, input fields  | White or near‑white, with subtle shadows or borders.                                                             |
| **Border**     | Dividers, input outlines     | Light grey, used minimally; often replaced by white space.                                                       |
| **Text**       | Primary text                 | Dark grey (not pure black) for main body copy.                                                                   |
| **Muted Text** | Secondary information        | Lighter grey for dates, subtle labels, and hints. Must still pass contrast checks.                               |

- Color must never be the sole differentiator; always pair with text or icons.
- Use status colors consistently across all badges, cards, and lists.

---

## 5. Typography

Arabic readability is non‑negotiable. The chosen typeface must support clear letterforms at small sizes and heavy weights for emphasis.

### 5.1 Typeface

- A modern, clean Arabic font (system‑native preferred, e.g., Cairo, Noto Kufi Arabic, or IBM Plex Arabic).
- Use one type family with varied weights (Regular, Medium, Bold).
- No decorative fonts.

### 5.2 Hierarchy

| Level       | Use                           | Weight           | Size (approx.) |
| ----------- | ----------------------------- | ---------------- | -------------- |
| **H1**      | Screen titles                 | Bold             | 24‑28px        |
| **H2**      | Section headers, card titles  | Semi‑bold        | 18‑20px        |
| **H3**      | Sub‑headings, dashboard stats | Medium           | 16‑18px        |
| **Body**    | Descriptions, form values     | Regular          | 16px (minimum) |
| **Caption** | Dates, labels, secondary info | Regular          | 13‑14px        |
| **Button**  | All buttons                   | Medium/Semi‑bold | 16‑18px        |

- Line‑height: generous (1.5 for body, 1.3 for headings).
- Always use text‑align: right (RTL), except numbers/currency may align left inside cards for scannability.

---

## 6. Iconography

- **Style:** Simple, outlined, 2‑stroke weight. Avoid filled icons unless indicating active state.
- **Usage:** Icons accompany labels, never replace them alone. They support recognition, not understanding.
- **Consistency:** Use a single icon set (e.g., Feather Icons, Phosphor, or Material outlined) for all navigation, status, and actions.
- Common icons needed: car, user, document, wrench, home, plus, search, edit, return, payment, calendar, check‑circle, alert‑circle.
- Icons should feel professional and not overly playful.

---

## 7. Cards

Cards are the primary container for almost all information.

### 7.1 Purpose

- Group related information into a single, tappable unit.
- Provide clear separation between different entities (vehicles, customers, rentals).

### 7.2 Structure

- **Rounded corners** (8‑12px) with a subtle shadow or 1px border.
- **Padding:** 16px inside the card.
- **Content order:**
  - Left (start for RTL): status indicator or vehicle photo.
  - Center/right: title, subtitle, secondary details.
  - End (left for RTL): action icon or balance amount.
- Cards are tappable as a whole, with a subtle press state (e.g., scale 0.98 or background tint).

### 7.3 Consistency

- The same pattern is reused for vehicles, customers, rentals, and maintenance; only the content changes.

---

## 8. Buttons

### 8.1 Primary

- Filled with **Primary color**, white text.
- Used for main calls‑to‑action: “تأجير سيارة”, “حفظ”, “تأكيد”.
- Full width on mobile unless there are two side‑by‑side actions.

### 8.2 Secondary

- Outlined with Primary color, transparent background.
- Used for less critical actions: “إلغاء”, “تعديل”, or “عرض الكل”.

### 8.3 Danger

- Filled or outlined with Danger color (red).
- Used for destructive actions: “حذف”, “إنهاء إيجار” (if with penalty).

### 8.4 Text Button

- Plain text, Primary color, no border.
- Used for inline actions like “+ إضافة عميل جديد” or “عرض الإيجارات السابقة”.

### 8.5 Floating Action Button (FAB)

- Circular, Primary color, white icon (+).
- Positioned bottom‑right (or bottom‑left for RTL, depending on thumb zone).
- Used only on list screens (السيارات, العملاء, الإيجارات, الصيانة) to create a new item.

### 8.6 States

- **Loading:** Replace text with a small spinner, disable interaction.
- **Disabled:** Reduced opacity (e.g., 0.4), no interaction, greyed‑out appearance. Use when a form is incomplete.

---

## 9. Forms

Forms are used sparingly, but when present they must feel effortless.

- **Labels:** Above the field, bold, clear Arabic.
- **Input fields:** Full width, sufficient height (min 48px), rounded, 1px border (Border color). Focus state: border changes to Primary.
- **Helper text:** Small, below the field, Muted Text color. Used for examples (e.g., phone format) – never for instruction unless necessary.
- **Required fields:** Indicated by a red asterisk (\*) next to the label, not the field.
- **Validation:**
  - Real‑time validation only after the field loses focus.
  - Errors appear as red text below the field, with a concise Arabic message (e.g., “هذا الحقل مطلوب”).
- **Error messages:** Must be friendly, never technical (“رقم الهاتف غير صحيح” not “Invalid format”).
- **Success:** No success message on save; navigate away or show brief toast (see Feedback).

---

## 10. Status Badges

Badges are used to communicate vehicle, rental, and maintenance states at a glance.

| Status              | Visual Treatment                                            |
| ------------------- | ----------------------------------------------------------- |
| متاحة (Available)   | Green background, dark green text, or green dot + text.     |
| مؤجرة (Rented)      | Blue background, dark blue text.                            |
| صيانة (Maintenance) | Orange/amber background, dark orange text.                  |
| مدفوع (Paid)        | Green outline/text (or small badge on payment).             |
| جزئي (Partial)      | Orange outline/text – indicates remaining balance.          |
| غير مدفوع (Unpaid)  | Red text or badge – only if balance is overdue.             |
| قادمة (Upcoming)    | Neutral with calendar icon, or orange if due within 2 days. |
| مكتملة (Completed)  | Green checkmark icon + “مكتمل” text.                        |

- All badges are small, rounded pills (border-radius 12‑16px), and placed next to the item title or in the card corner.

---

## 11. Lists

- **Spacing:** 12‑16px between list items.
- **Row layout:** Typically a card (see Cards section).
- **Interaction:** Entire row is tappable; swipe actions are avoided in this prototype (to keep simplicity).
- **Dividers:** None; cards separate themselves.

---

## 12. Navigation

### 12.1 Bottom Navigation Bar

- Permanent bottom bar with **5 icons + labels**.
- Active tab: Primary color icon + label, subtle background highlight.
- Inactive tabs: Muted icon + text.
- Labels always visible (no “icon‑only” mode).
- Arabic labels: الرئيسية, السيارات, العملاء, الإيجارات, الصيانة.

### 12.2 Header

- **Screen title** aligned to the right (RTL), bold, in H2 style.
- No back button on top‑level tab screens.
- On secondary screens (detail, form), a **back arrow** appears on the right (RTL: far right), tappable, with adequate hit area (min 48px).
- No hamburger menus.

### 12.3 Back Navigation

- The back arrow returns to the previous screen exactly as the user would expect.
- No custom gestures; a visible button builds confidence for non‑technical users.

---

## 13. Empty States

Empty states must feel **helpful**, not lonely.

- **Visual:** A simple, friendly illustration or a large icon (e.g., car silhouette, people) in Muted color.
- **Message:** A clear, encouraging line: “لم تتم إضافة أي سيارة بعد” (No cars added yet).
- **Action:** A prominent button to create the first item (e.g., “أضف أول سيارة”).
- **Tone:** Never imply error; always invite action.

Examples:

- لا يوجد عملاء بعد → “أضف أول عميل”
- لا توجد إيجارات نشطة → “أنشئ إيجاراً جديداً”
- لا توجد صيانة مستحقة → “أحسنت! كل الصيانة مكتملة”
- لا توجد إيرادات هذا الشهر → (no panic, just plain statement)

---

## 14. Feedback

Users must always know what happened after an action.

### 14.1 Success

- **Toast** (Android‑style) at the bottom of the screen: brief message with a check icon, auto‑dismiss after 2 seconds. Example: “تم إنشاء الإيجار بنجاح”.
- No modals for success.

### 14.2 Confirmation Dialogs

- Used for destructive or irreversible actions: deleting a vehicle, ending a rental early.
- Simple modal with title, brief message, two buttons: “إلغاء” (Cancel, secondary) and “تأكيد” (Confirm, danger if destructive, primary otherwise).

### 14.3 Warnings

- Inline warning text (e.g., “سيتم تغيير حالة السيارة إلى مؤجرة”).
- For overdue maintenance, a warning badge on the dashboard card.

### 14.4 Errors

- Form errors inline (see Forms).
- Unexpected errors (prototype may not need) – a simple “حدث خطأ، حاول مرة أخرى” dialog with an “حسناً” button.

### 14.5 Loading

- **Skeleton screens** for initial loads: grey placeholder blocks mimicking card shapes.
- **Spinner** for button loading states (e.g., saving).
- No full‑page spinners.

### 14.6 Skeleton Examples

- Dashboard: 3 large rectangular stat cards, 2 thin lines for rental items, 1 revenue card.
- List screens: 4‑5 card placeholders.

---

## 15. RTL Guidelines

The entire interface is right‑to‑left. Every visual decision must be mirrored correctly.

- **Alignment:** Text, icons, and content blocks are right‑aligned. Numbers and currency may be left‑aligned within card containers for better scanning.
- **Icons:** Directional icons (back/forward arrows, chevrons) must point the opposite way compared to LTR. A back arrow in RTL points to the right (forward in Arabic reading direction).
- **Navigation:** Bottom tab order is mirrored: الرئيسية (far right), then السيارات, العملاء, الإيجارات, الصيانة (far left).
- **Buttons and FAB:** Floating action button positioned on the left side of the screen (closer to left thumb reach for right‑handed users? Actually, best placement depends on thumb zone; consider bottom‑left for RTL when user holds phone with right hand, thumb can reach left side easier. So FAB bottom‑left.)
- **Forms:** Labels right‑aligned, placeholder text right‑aligned.
- **Cards:** Image/avatar on the right, content to its left.
- **Animations:** Slide directions must feel natural in RTL.

---

## 16. Mobile Guidelines

This is a smartphone‑first application.

### 16.1 Touch Targets

- All interactive elements: minimum **48×48dp** (as per Material Design accessibility).
- Buttons, icons, list items all exceed this size.

### 16.2 Thumb Reach

- Critical actions (Rent, Return) placed in the middle or lower half of the screen.
- Bottom navigation and FAB are naturally accessible.
- Avoid placing important actions in the top corners.

### 16.3 Scrolling

- Long lists scroll vertically only; no horizontal scroll unless for filter chips.
- Pull‑to‑refresh is not needed (mock data is static), but if implemented, follows RTL convention.

### 16.4 Responsive Behavior

- The prototype assumes a width of 360‑414px (typical smartphone).
- On larger screens (tablet), the interface should not drastically rearrange; just display with comfortable max‑width (~480px) centered or with slightly larger padding. However, no tablet‑specific design is required for validation.

### 16.5 One‑Handed Use

- Keep the primary interaction area (buttons, bottom nav) in the lower 60% of the screen.
- Avoid top‑left (hardest to reach with right thumb) for any critical controls.

---

## 17. Accessibility (Simple Principles)

Even in a prototype, basic accessibility ensures inclusivity and reduces future rework.

- **Color contrast:** Text meets WCAG AA (4.5:1 for normal text, 3:1 for large).
- **Touch targets:** As stated, minimum 48px.
- **Labels:** All interactive elements have visible text labels (icons alone insufficient).
- **Content order:** Logical reading order in RTL.
- **Focus states:** Visible focus ring for keyboard navigation (if ever used on desktop, but prototype on phone – still good practice).
- **Error identification:** Errors not conveyed by color alone; they include text.

---

## 18. Motion

Animation must serve usability, never decoration.

- **Transitions between screens:** A simple, quick slide (left for forward in RTL? Actually, in RTL, going deeper should slide from left to right, going back slides right to left). Duration ~200ms, easing ease‑out.
- **Button press:** Subtle scale reduction (0.97) or background darken for 100ms.
- **Loading:** Skeleton shimmer or subtle fade‑in.
- **Feedback toasts:** Fade in from bottom, auto‑dismiss with fade out.
- No parallax, bouncy scroll, or complex choreography.

---

## 19. Components List

The following reusable components should be built as part of the prototype’s UI kit (if using a component‑based framework). All components respect RTL and Arabic text.

- **Button** (Primary, Secondary, Danger, Text, FAB)
- **Input** (Text field, with label, helper, error states)
- **Card** (Base card container)
- **Status Badge**
- **Avatar / Thumbnail** (for vehicle photos, with placeholder)
- **Modal** (Confirmation dialog, simple alert)
- **Bottom Sheet** (Optional – e.g., for date picker or maintenance type selection, though simple inline might suffice)
- **Tabs / Segmented Control** (Used for active/ended, upcoming/completed)
- **Search Bar** (With text input and icon)
- **Statistic Card** (Dashboard status numbers)
- **Task Card** (Dashboard rental/maintenance item)
- **Revenue Card** (Dashboard revenue summary)
- **Car Card** (Vehicle list item)
- **Customer Card** (Customer list item)
- **Maintenance Card** (Maintenance list item)
- **Rental Card** (Rental list item)
- **Empty State** (Illustration + message + action)
- **Loading State / Skeleton** (Card skeleton, stat skeleton)
- **Toast / Snackbar** (Success feedback)
- **Date Picker** (Native‑feeling, simple calendar)
- **Photo Gallery Viewer** (Full‑screen car photo swipe)

Each component must be built once and used identically across all screens. This consistency is what will make the prototype feel like a real, trustworthy tool.

---

## 20. Final Note

This design system exists to ensure that every screen in the validation prototype feels cohesive, intuitive, and respectful of the user’s time. It is not a constraint on creativity but a framework to make the prototype **indistinguishable from a thoughtful, real product** – without over‑engineering.

All future visual design explorations should use this document as their foundation.

---

**End of Design System**
