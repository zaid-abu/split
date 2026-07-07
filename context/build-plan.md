# Build Plan

## Core Principle

Build visible UI with realistic mock data first, verify interaction states, then wire Supabase feature by feature. Every financial workflow must be testable from the UI and backed by deterministic logic.

---

## Phase 1 — Foundation

### 01 App Shell and Theme

**UI:**

- Root layout with safe areas, status bar, app background, and font loading.
- Glassmorphism theme tokens in `src/constants/theme.ts`.
- Shared primitives: `GlassScreen`, `GlassPanel`, `AppText`, `AppButton`, `IconButton`.
- Not-found screen.

**Logic:**

- Expo Router root layout.
- Splash screen controlled after fonts and session bootstrap are ready.
- Light/dark mode foundation.

---

### 02 Supabase Setup

**UI:**

- Developer-only connection error state if Supabase env vars are missing.

**Logic:**

- Add and configure `@supabase/supabase-js`.
- Create `src/lib/supabase.ts`.
- Add database types placeholder.
- Configure environment variables.
- Create initial Supabase migrations and RLS policies.

---

### 03 Auth and Onboarding

**UI:**

- Splash/launch screen.
- Optional onboarding carousel.
- Sign up / log in with email, phone, Google, Apple.
- OTP/email verification.
- Profile setup: name, photo, currency preference.
- Permissions screen for contacts and notifications.

**Logic:**

- Supabase Auth session bootstrap.
- Auth state provider.
- Protected route redirects.
- Profile row creation.
- Onboarding completion routing.

---

## Phase 2 — Core Navigation and Home

### 04 Bottom Tabs

**UI:**

- Tabs: Home, Friends, Groups, Activity, Account.
- Glass tab bar.
- Active/inactive icon and label states.

**Logic:**

- Expo Router tabs layout.
- Authenticated route protection.

---

### 05 Home Dashboard

**UI:**

- Net balance hero.
- Total owed and owed-to-you summaries.
- Recent activity preview.
- Quick actions: add expense, settle up, add friend, create group.
- Empty, loading, error, offline states.

**Logic:**

- Mock data first.
- Wire dashboard query after expense and settlement models exist.

---

## Phase 3 — Friends

### 06 Friends List

**UI:**

- Friend rows with avatar, name, subtitle, net balance.
- Empty state and add friend CTA.
- Search/filter interaction.

**Logic:**

- Friendships schema and services.
- Accepted/pending/blocked states.

---

### 07 Add Friend and Contact Import

**UI:**

- Search by username/email/phone.
- Invite via link/SMS.
- Contact sync/import screen.
- Permission denied state.

**Logic:**

- Friend request mutation.
- Invite token generation.
- Optional contacts permission and local matching.

---

### 08 Friend Detail

**UI:**

- Friend profile header.
- Shared expenses list.
- Balance history.
- Settle up CTA.

**Logic:**

- Friend-level balance query.
- Shared activity and expense filters.

---

## Phase 4 — Groups

### 09 Groups List

**UI:**

- Group cards/rows with icon or cover, type, members, last activity, balance.
- Empty state with create group CTA.

**Logic:**

- Groups and group members schema.
- User-scoped group queries.

---

### 10 Create Group

**UI:**

- Name, type, icon/cover, default currency, member picker.
- Group invite after creation.

**Logic:**

- Group creation transaction.
- Initial member roles.
- Cover upload.

---

### 11 Group Detail and Settings

**UI:**

- Expense feed.
- Members.
- Total balance.
- Quick add expense.
- Settings: rename, cover, currency, leave/delete.
- Manage members and admin roles.
- Invite link/QR code.

**Logic:**

- Group detail queries.
- Member management.
- Invite validation.
- Realtime activity updates.

---

## Phase 5 — Expenses

### 12 Add Expense

**UI:**

- Amount, currency, title, payer, group/friend context, participants.
- Split method selector.
- Category picker.
- Date, notes, receipt/photo.
- Save disabled until split validates.

**Logic:**

- Expense, split, activity writes.
- Receipt upload.
- Split validation.

---

### 13 Split Methods

**UI:**

- Equal split.
- Percentage split.
- Shares split.
- Exact amount split.
- Adjustment split.
- Per-person validation messages.

**Logic:**

- Pure split calculation helpers.
- Rounding and remainder tests.

---

### 14 Expense Detail, Edit, Comments

**UI:**

- Who paid and who owes what.
- Receipt preview.
- Edit history.
- Comments thread.
- Edit/delete actions.
- Conflict resolution state.

**Logic:**

- Expense version checks.
- Comments schema and realtime updates.
- Soft delete.

---

### 15 Recurring Expenses

**UI:**

- Recurring setup for rent, utilities, subscriptions, custom.
- Next run preview.
- Pause/delete recurrence.

**Logic:**

- Recurring templates.
- Edge Function or scheduled process plan.

---

## Phase 6 — Settling Up

### 16 Record Settlement

**UI:**

- Choose payer, receiver, amount, currency, method, note.
- Payment confirmation.
- Success/failure states.

**Logic:**

- Settlement mutation.
- Activity and notification rows.
- Balance refresh.

---

### 17 Simplify Debts

**UI:**

- Group-level minimized transaction suggestions.
- Per-suggestion settle CTA.
- Explanation of assumptions.

**Logic:**

- Debt simplification helper.
- Currency-specific suggestion generation.

---

### 18 Integrated Payments Placeholder

**UI:**

- Linked payment methods.
- Method selection.
- Processing, success, failure, retry states.

**Logic:**

- Keep provider integration behind a service boundary.
- Do not execute real payments until provider is selected and approved.

---

## Phase 7 — Activity and Notifications

### 19 Activity Feed

**UI:**

- Chronological feed of expenses, edits, settlements, comments, invites.
- Filters by group/friend/action.

**Logic:**

- Activity query and realtime subscription.

---

### 20 Notifications

**UI:**

- Reminders.
- Friend requests.
- Payment confirmations.
- Mark read/unread.

**Logic:**

- Notification rows.
- Push notification permission and preferences.

---

## Phase 8 — Analytics and Export

### 21 Spending Overview

**UI:**

- Week/month/year selector.
- Total spent, owed, owed-to-you.
- Spending trend chart.

**Logic:**

- Analytics aggregation service.

---

### 22 Category, Trend, and Group Analytics

**UI:**

- Category breakdown.
- Trends over time.
- Per group/per friend analytics.
- Group-level top spenders, top categories, monthly totals.
- Personal insights.

**Logic:**

- Aggregations from expenses and splits.
- Chart data normalization.

---

### 23 Export and Reports

**UI:**

- CSV export first.
- PDF export later.
- Date range and scope selectors.

**Logic:**

- Export generation.
- Supabase Storage record.

---

## Phase 9 — Production States

### 24 Search and Filters

**UI:**

- Global search for expenses, friends, groups.
- Filter/sort modal by date, category, amount, person.

**Logic:**

- Search services.
- Indexed database queries.

---

### 25 Account and Settings

**UI:**

- Account/profile.
- Edit profile.
- Currency and locale settings.
- Notification preferences.
- Linked payment methods.
- Security settings: password, biometric lock, 2FA.
- Privacy settings.
- Help/support and FAQ.
- Feedback/rate app.
- About/legal.
- Delete account flow.

**Logic:**

- Profile mutations.
- Preference storage.
- Account deletion Edge Function.

---

### 26 Offline, Sync, and Conflict Handling

**UI:**

- Offline indicator.
- Queued mutation states.
- Sync failure recovery.
- Multi-currency conflict resolution.
- Simultaneous edit conflict resolution.

**Logic:**

- Network state.
- Optimistic writes where safe.
- Version-based conflict detection.
