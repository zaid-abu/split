# Build Plan

## Core Principle

Build the app in production-grade slices. Each slice should include visible UI, realistic states, domain boundaries, and validation appropriate to its risk. For UI-heavy features, build with realistic mock data first, verify design and interaction states, then wire Supabase through services.

Every completed feature should satisfy:

- Matches the visual direction in `context/designs/`.
- Uses tokenized UI and registered reusable components.
- Handles loading, empty, error, offline, and success states.
- Keeps Supabase access in `src/services/`.
- Keeps money logic in `src/lib/`.
- Updates `ui-registry.md` when reusable UI is built.
- Updates `progress-tracker.md` when feature work is completed.
- Runs relevant validation, usually `npm run lint`.

## Phase 1 — Foundation

### 01 App Shell and Theme

Goal: Establish the Expo app shell, theme, safe areas, and shared primitives.

UI:

- Root layout with status bar, safe areas, and app background.
- Inter font loading.
- Tokenized theme in `src/constants/theme.ts`.
- Not-found screen.
- Shared primitives: `AppScreen`, `AppCard`, `AppText`, `AppButton`, `IconButton`.

Logic:

- Expo Router root layout.
- Splash screen controlled after bootstrap.
- Light/dark foundation if supported.
- Route groups for auth and tabs.

Acceptance:

- App boots without layout shift.
- Shared primitives use tokens only.
- Not-found route is readable and actionable.

### 02 Supabase Setup

Goal: Add backend foundation without leaking privileged behavior.

UI:

- Developer-facing missing-env state.
- User-safe connection error state if auth bootstrap cannot complete.

Logic:

- Add/configure `@supabase/supabase-js`.
- Create `src/lib/supabase.ts`.
- Add database types placeholder or generated types.
- Configure env vars.
- Add initial migrations and RLS policies.

Acceptance:

- No service role key in app code.
- Missing env vars fail clearly.
- Services can import the Supabase client from one place.

### 03 Auth and Onboarding

Goal: Complete first-run entry using the auth design reference.

UI:

- Splash/launch screen.
- Welcome carousel inspired by `context/designs/Auth Flow.png`.
- Register screen.
- Sign-in screen.
- Verification screen.
- Profile setup: name, avatar, default currency.
- Permissions education: contacts and notifications.
- Loading, validation, error, success, permission-denied states.

Logic:

- Supabase Auth session bootstrap.
- Auth state provider.
- Protected route redirects.
- Profile row creation/update.
- Onboarding completion only after required profile/permission flow.

Acceptance:

- New user can move through welcome, register, verify if needed, profile setup, permissions, and Home.
- Social/phone auth are placeholders unless wired.
- Auth errors are human-readable.

## Phase 2 — Core Navigation and Home

### 04 Bottom Tabs

Goal: Establish authenticated navigation.

UI:

- Tabs: Home, Friends, Groups, Activity, Account.
- Icon plus label tab items.
- Active/inactive states.
- Optional prominent central add/split action following `context/designs/image.png`.

Logic:

- Expo Router tabs layout.
- Authenticated route protection.

Acceptance:

- Tabs are stable and safe-area aware.
- Active route is visually clear.
- Inactive tabs remain readable.

### 05 Home Dashboard

Goal: Build the production dashboard using realistic mock data first.

UI:

- Header with greeting and avatar.
- Net balance hero adapted from the wallet balance reference.
- Summary cards: you owe, owed to you, total shared this month.
- Quick actions: add expense, settle up, add friend, create group.
- Recent friends with balance indicators.
- Recent activity/transactions.
- Optional spending preview chart card.
- Loading, empty, error, offline, and success states.

Logic:

- Mock data first.
- Dashboard hook/service contract.
- Later wire Supabase after expenses and settlements exist.

Acceptance:

- Dashboard works at 320px.
- Large amounts and names do not overlap.
- CTAs route to appropriate flows or placeholders.
- Empty state guides first action.

## Phase 3 — Friends

### 06 Friends List

UI:

- Search and filter.
- Friend rows with avatar, name, last activity, and net balance.
- Pending requests section.
- Empty, loading, error, offline states.

Logic:

- Friendships schema and service.
- Accepted, pending, blocked states.
- Friend balance query.

Acceptance:

- Balance labels clearly say "you owe" or "owes you".
- Pending requests are actionable.

### 07 Add Friend and Contact Import

UI:

- Search by username/email/phone.
- Invite link and share actions.
- Contact import screen with pre-permission education.
- Permission denied and limited states.

Logic:

- Friend request mutation.
- Invite token generation/validation.
- Optional contacts permission and matching.

Acceptance:

- Contact permission is never requested without context.
- User can recover from denied permission.

### 08 Friend Detail

UI:

- Friend profile header.
- Net balance summary.
- Shared expenses and settlements.
- Settle-up CTA.
- Empty/error/offline/conflict states.

Logic:

- Friend-level balance query.
- Shared expense filters.
- Settlement entry point.

Acceptance:

- Balance is explainable from visible activity.
- Settle-up context is prefilled correctly.

## Phase 4 — Groups

### 09 Groups List

UI:

- Group rows/cards with cover/icon, type, members, last activity, and balance.
- Search/filter.
- Empty state with create group CTA.
- Loading, error, offline states.

Logic:

- Groups and group members schema.
- User-scoped group queries.

Acceptance:

- Archived or left groups are handled deliberately.

### 10 Create Group

UI:

- Name.
- Type.
- Icon/cover.
- Default currency.
- Member picker.
- Invite after creation.
- Validation states.

Logic:

- Group creation transaction.
- Creator admin membership.
- Optional cover upload.
- Activity row.

Acceptance:

- Failed cover upload and failed group creation are distinct.
- User cannot create an invalid group.

### 11 Group Detail and Settings

UI:

- Group header and members.
- Group balance summary.
- Expense feed.
- Quick add expense.
- Settings: rename, cover, currency, leave/delete.
- Manage members and admin roles.
- Invite link/QR placeholder.
- Realtime-visible activity state.

Logic:

- Group detail query.
- Member management.
- Invite validation.
- Realtime activity updates.

Acceptance:

- Non-admin users do not see privileged actions as available.
- Deleted/missing groups render not-found.

## Phase 5 — Expenses

### 12 Add Expense

UI:

- Amount and currency.
- Title.
- Payer.
- Group/friend context.
- Participants.
- Split method selector.
- Category picker.
- Date.
- Notes.
- Receipt/photo.
- Save disabled until valid.
- Loading, validation, upload, offline, success, error states.

Logic:

- Expense service contract.
- Split validation.
- Receipt upload.
- Activity and notification writes.

Acceptance:

- Split rows sum exactly to amount.
- Save state is unambiguous.
- Receipt failures are recoverable.

### 13 Split Methods

UI:

- Equal split.
- Percentage split.
- Shares split.
- Exact amount split.
- Adjustment split.
- Per-person validation messages.
- Remainder explanation when useful.

Logic:

- Pure split helpers.
- Deterministic rounding.
- Tests for all split modes.

Acceptance:

- Every method passes exact-total tests.
- Invalid splits cannot be saved.

### 14 Expense Detail, Edit, Comments

UI:

- Expense summary.
- Who paid and who owes.
- Receipt preview.
- Edit history.
- Comments thread.
- Edit/delete actions.
- Conflict resolution state.

Logic:

- Expense version checks.
- Soft delete.
- Comments schema and realtime updates.
- Activity records.

Acceptance:

- Stale edits are detected.
- Deleted expenses do not disappear without user context.

### 15 Recurring Expenses

UI:

- Recurring setup for rent, utilities, subscriptions, and custom schedules.
- Next run preview.
- Pause/delete recurrence.
- Failure and retry states.

Logic:

- Recurring templates.
- Scheduled process or Edge Function plan.

Acceptance:

- Recurrence preview is understandable before save.
- Failed generation is visible.

## Phase 6 — Settling Up

### 16 Record Settlement

UI:

- Payer.
- Receiver.
- Amount and currency.
- Method.
- Optional note.
- Confirmation screen.
- Success/failure states.

Logic:

- Settlement mutation.
- Activity and notification rows.
- Balance refresh.

Acceptance:

- User understands whether payment is only recorded or actually processed.

### 17 Simplify Debts

UI:

- Group-level minimized transaction suggestions.
- Per-suggestion settle CTA.
- Currency assumptions.
- Empty settled state.

Logic:

- Debt simplification helper.
- Multi-currency guard.
- Deterministic sorting.

Acceptance:

- Suggestions preserve group net balance.
- No cross-currency simplification pass.

### 18 Integrated Payments Placeholder

UI:

- Payment method placeholder.
- Clear unavailable/not-enabled copy.

Logic:

- No actual payment execution until provider is selected.

Acceptance:

- App never implies real payment was sent unless integration exists.

## Phase 7 — Activity and Notifications

### 19 Activity Feed

UI:

- Chronological feed.
- Filters.
- Empty/loading/error/offline states.
- Grouped date sections.

Logic:

- Activity query.
- Realtime updates.

Acceptance:

- Activity explains financial changes clearly.

### 20 Notifications

UI:

- Actionable notification list.
- Read/unread states.
- Notification preferences entry.

Logic:

- Notification query and mutation.
- Push permission integration.

Acceptance:

- In-app notifications work even if push delivery fails.

## Phase 8 — Analytics and Export

### 21 Spending Overview

UI:

- Week/month/year/custom segmented control.
- Spending summary.
- Trend preview.
- Empty analytics state.

Logic:

- Analytics service.
- Date range helpers.

Acceptance:

- Labels do not rely on color alone.

### 22 Category, Trend, and Group Analytics

UI:

- Category breakdown.
- Spending trend.
- Group analytics.
- Accessible legends.

Logic:

- Chart library selection.
- Aggregation queries.

Acceptance:

- Chart dependency documented before install.

### 23 Export and Reports

UI:

- CSV export first.
- PDF later.
- Export history or success state.

Logic:

- Export generation.
- Storage bucket usage if files are persisted.

Acceptance:

- Exported amounts and currencies are explicit.

## Phase 9 — Production States and Settings

### 24 Search and Filters

UI:

- Global search.
- Filter modal.
- Empty/no-results states.

Logic:

- Scoped search services.

Acceptance:

- Search never leaks inaccessible records.

### 25 Account and Settings

UI:

- Profile.
- Default currency.
- Notification settings.
- Privacy/security.
- Help.
- Logout.
- Delete account confirmation.

Logic:

- Profile update service.
- Account lifecycle actions.

Acceptance:

- Destructive account actions are confirmed and clearly explained.

### 26 Offline, Sync, and Conflict Handling

UI:

- Offline banner.
- Queued mutation list or status.
- Conflict resolution screens for expenses.

Logic:

- Connectivity state.
- Mutation queue if implemented.
- Version conflict handling.

Acceptance:

- Failed writes cannot be mistaken for saved writes.

## Global Definition of Done

A phase or feature is done when:

- UI follows `context/designs/` and token rules.
- Required states are present.
- Financial logic is deterministic and tested when touched.
- Supabase access stays in services.
- Security boundaries are preserved.
- Accessibility basics are met.
- `ui-registry.md` and `progress-tracker.md` are updated.
- Relevant validation has been run or a reason is documented.
