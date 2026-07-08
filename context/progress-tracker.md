# Progress Tracker

Update this file after every completed feature. A new agent should be able to read this file and immediately understand what is done, what is in progress, what is next, and which production gaps remain.

## Current Status

**Phase:** Phase 2 — Core Navigation and Home
**Last completed:** Auth flow visual rewrite from `context/designs/Auth Flow.png`
**Current documentation update:** Context files rewritten 2026-07-08 for production-grade build guidance and design usage
**Next product feature:** Build Phase 2 — 05 Home Dashboard using `context/designs/image.png`

## Progress

### Phase 1 — Foundation

- [x] 01 App Shell and Theme
- [x] 02 Supabase Setup
- [x] 03 Auth and Onboarding
  - Rewritten 2026-07-08 with welcome, separate sign-in/register, verification, profile setup, and permissions screens.
  - Auth Flow design applied 2026-07-08 to welcome, login, and register screens with icon inputs, social placeholders, and terms consent.

### Phase 2 — Core Navigation and Home

- [x] 04 Bottom Tabs
- [ ] 05 Home Dashboard

### Phase 3 — Friends

- [ ] 06 Friends List
- [ ] 07 Add Friend and Contact Import
- [ ] 08 Friend Detail

### Phase 4 — Groups

- [ ] 09 Groups List
- [ ] 10 Create Group
- [ ] 11 Group Detail and Settings

### Phase 5 — Expenses

- [ ] 12 Add Expense
- [ ] 13 Split Methods
- [ ] 14 Expense Detail, Edit, Comments
- [ ] 15 Recurring Expenses

### Phase 6 — Settling Up

- [ ] 16 Record Settlement
- [ ] 17 Simplify Debts
- [ ] 18 Integrated Payments Placeholder

### Phase 7 — Activity and Notifications

- [ ] 19 Activity Feed
- [ ] 20 Notifications

### Phase 8 — Analytics and Export

- [ ] 21 Spending Overview
- [ ] 22 Category, Trend, and Group Analytics
- [ ] 23 Export and Reports

### Phase 9 — Production States and Settings

- [ ] 24 Search and Filters
- [ ] 25 Account and Settings
- [ ] 26 Offline, Sync, and Conflict Handling

## Decisions Made

- Tech stack is Expo SDK 57 with Expo Router, React Native 0.86, React 19, TypeScript strict, and Supabase.
- Expo SDK 57 docs are the authority for Expo APIs.
- UI direction is based on `context/designs/Auth Flow.png` and `context/designs/image.png`.
- Visual language: white rounded surfaces, deep indigo actions, lavender/sky accent panels, soft shadows, avatar-led social context, practical finance layouts.
- Supabase is the backend for Auth, Postgres, Storage, Realtime, and Edge Functions.
- Supabase service role behavior must stay in Edge Functions only.
- Bottom navigation uses five tabs: Home, Friends, Groups, Activity, Account.
- The app may use a prominent central action for add/split if it fits the tab implementation.
- Balances must be derivable from expenses, splits, and settlements.
- Money calculations should use minor-unit integer logic for durable totals.
- Split methods must support equal, percentage, shares, exact amount, and adjustment.
- Remainders must be assigned deterministically.
- Expense edits need versioning or equivalent conflict detection.
- Integrated payments remain a placeholder until a provider is explicitly selected.
- Auth/onboarding uses email/password only for now; Google, Apple, phone OTP, contacts import, and real push permission registration remain out of scope until explicitly added.
- New users flow through welcome, register, optional verification, profile setup, permissions, then Home.
- `onboarding_completed` is set only after permissions.

## Production Bar

Every feature should include:

- Loading state.
- Empty state.
- Error state.
- Offline or stale state.
- Success state after mutation.
- Permission-denied state when permissions are involved.
- Not-found state for deleted, expired, missing, or inaccessible resources.
- Conflict state for editable financial records.
- Human-readable errors.
- No raw Supabase errors in UI.
- No direct Supabase calls from presentational components.
- Tokenized styles only.

## Current Known Gaps

- Home Dashboard is next and not yet built.
- Supabase dependency/setup is noted in docs, but confirm current code before backend work because prior notes said it was not yet wired in app code.
- Social auth buttons are placeholders until OAuth is configured.
- Phone OTP is planned but not wired.
- Contacts import is planned but not wired.
- Push notification permission flow is educational/placeholder until Expo Notifications are implemented.
- Full offline mutation queue is not implemented yet.
- Financial helper tests need to be added when split/money logic is implemented.
- Chart library remains TBD until analytics begins.

## Documentation Updates

- 2026-07-08: Rewrote all context files with production-grade guidance, design reference usage, stricter architecture boundaries, UI rules, library guidance, build plan, and progress tracking.

## Next Recommended Work

1. Inspect existing Home tab implementation and shared components.
2. Build Home Dashboard with realistic mock data based on `context/designs/image.png`.
3. Add loading, empty, error, offline, and success/dashboard-ready states.
4. Register any new reusable components in `ui-registry.md`.
5. Update this tracker after Home Dashboard is complete.
6. Run `npm run lint`.
