# Project Overview

## Product Definition

Split is a production-grade, mobile-first expense sharing app for friends, roommates, couples, families, and travel groups. It helps people record shared costs, understand who owes whom, settle balances, and review spending patterns without turning a social activity into accounting work.

The app must feel trustworthy because it handles money. Every balance shown to the user must be explainable from expenses, splits, and settlements. Every network-backed action must show whether it is loading, saved, queued, synced, failed, or blocked by a permission or conflict.

Core stack:

- Expo SDK 57.
- Expo Router.
- React Native 0.86.
- React 19.
- TypeScript strict.
- Supabase Auth, Postgres, Storage, Edge Functions, and Realtime.
- Tokenized React Native styles.
- Production UI based on the visual language in `context/designs/`.

## Design References

The app should use the two design files as the primary visual direction:

- `context/designs/Auth Flow.png`
- `context/designs/image.png`

Observed design principles from the references:

- White rounded phone surfaces on a pale cool gray app background.
- Deep indigo primary actions and active navigation.
- Lavender, sky blue, and soft purple accent panels.
- Large, friendly typography with high contrast and generous spacing.
- Rounded fields and cards with subtle borders and soft shadows.
- Avatar-led social context: people, friends, and groups should feel present.
- Finance visuals use bills, wallets, charts, receipts, and directional arrows.
- Bottom navigation is icon-led with a prominent central action for adding or splitting.
- Dashboard content is practical: balance, bills, friends, transactions, and charts.
- Auth screens use compact top bars, wallet illustrations, outlined inputs, and social sign-in placeholders.

The production app is not a crypto wallet, bank, or investment product. The visual references include wallet-style screens, but Split’s product meaning is shared expense management. Use the visual language while adapting the content to group bills, balances, friends, and settlements.

## Target Users

Primary users:

- Friends splitting meals, events, groceries, trips, and shared purchases.
- Roommates managing rent, utilities, household supplies, and recurring costs.
- Couples or families tracking shared spending without formal accounting.
- Travel groups who need group balances, receipts, offline capture, and optional multi-currency context.

User expectations:

- They can add an expense quickly.
- They can trust the balance.
- They can see what changed and who changed it.
- They can recover from mistakes.
- They are never left unsure whether a payment or expense was saved.

## Primary App Areas

```txt
/(auth)/splash              Launch and session bootstrap
/(auth)/welcome             Onboarding carousel based on the finance illustration style
/(auth)/sign-in             Email/password, future phone OTP and OAuth entry points
/(auth)/register            Account creation
/(auth)/verify              OTP or email verification
/(auth)/profile-setup       Name, avatar, default currency
/(auth)/permissions         Contacts and notification permission education

/(tabs)/home                Dashboard and quick actions
/(tabs)/friends             Friend balances, friend search, requests
/(tabs)/groups              Group list and group balances
/(tabs)/activity            Activity feed and notification entry
/(tabs)/account             Profile, settings, payments, help

/friends/[id]               Friend detail, shared expenses, settle up
/friends/add                Search or invite friends
/friends/contacts           Contact sync/import

/groups/create              Create group
/groups/[id]                Group detail and expense feed
/groups/[id]/settings       Group settings
/groups/[id]/members        Manage members and roles
/groups/[id]/invite         Invite link and QR code
/groups/[id]/analytics      Group analytics
/groups/[id]/simplify       Simplified debt suggestions

/expenses/new               Add expense
/expenses/[id]              Expense detail, comments, history
/expenses/[id]/edit         Edit expense with conflict detection
/expenses/split-method      Split method selector
/expenses/category          Category picker
/expenses/recurring         Recurring expense setup

/settle-up                  Record payment
/settle-up/confirm          Payment confirmation
/settle-up/payment          Optional integrated payment placeholder

/analytics                  Personal spending overview
/analytics/categories       Category breakdown
/analytics/trends           Spending trends
/analytics/export           CSV first, PDF later

/search                     Global search
/filters                    Filter and sort modal
```

## Core User Journeys

### New User Onboarding

1. App launches and bootstraps fonts, splash state, theme, and Supabase session.
2. First-time user sees an illustration-led welcome flow inspired by `Auth Flow.png` and `image.png`.
3. User registers with email/password first. Phone OTP, Google, and Apple are designed as supported paths but should not be presented as fully working until wired.
4. User verifies if required by the backend.
5. User completes profile with name, optional avatar, and default currency.
6. Permissions screen explains contacts and notifications before OS prompts.
7. User lands on Home with first-run empty states and clear CTAs.

### Add First Expense

1. User taps primary add expense action from Home, Friends, or Groups.
2. User enters amount, currency, title, payer, participants, category, date, optional note, and optional receipt.
3. User chooses split method: equal, percentage, shares, exact amount, or adjustment.
4. Split math validates that rounded split totals equal the expense total exactly.
5. Save creates expense, split rows, activity rows, and notification rows.
6. UI confirms success or shows queued/offline/failure state.
7. Balances refresh from ledger data, not from hidden client-only state.

### Settle Up

1. User starts settle-up from a friend, group, or dashboard balance.
2. User chooses payer, receiver, amount, currency, method, and optional note.
3. User sees a confirmation screen before recording.
4. Settlement creates a ledger entry and activity record.
5. If integrated payment is not enabled, the app clearly says it records the payment only.

### Group Debt Simplification

1. User opens simplify debts inside a group.
2. App computes net balances by currency.
3. App suggests minimized debtor-to-creditor payments.
4. Suggestions are deterministic and never mix currencies.
5. User can record a settlement from a suggestion.

## Production Requirements

Every production-grade screen must include:

- Loading state.
- Empty state.
- Error state with retry when retryable.
- Offline state when data may be stale or mutation is queued.
- Success or saved state after mutation.
- Permission denied state where permissions are involved.
- Not found state for missing, deleted, expired, or inaccessible resources.
- Conflict state for editable financial records.

Every financial workflow must:

- Store amount and currency explicitly.
- Avoid casual floating point math for final money values.
- Keep balances derivable from source ledger data.
- Use deterministic rounding and remainder assignment.
- Preserve auditability through activity records and versioning where edits matter.
- Show human-readable user errors, not raw network or Supabase exception strings.

## Scope

In scope:

- Expo Router app shell with auth, tabs, stacks, and modal flows.
- Supabase Auth with email/password first, then phone OTP and OAuth when wired.
- Supabase schema for profiles, friendships, groups, expenses, splits, settlements, activity, notifications, comments, recurring expenses, and attachments.
- Storage buckets for avatars, group covers, receipts, and exports.
- Realtime updates for group activity, active group expense feeds, and notification counts.
- Contact import with permission education.
- Full add/edit expense flow with split methods and receipt attachments.
- Settlement recording and simplified debt suggestions.
- Analytics dashboards and CSV export.
- Offline-aware UI and mutation states.

Out of scope until explicitly added:

- Banking aggregation.
- Automatic payment execution by default.
- Cryptocurrency support.
- Business accounting, invoices, tax handling, reimbursements, or payroll.
- Public social feeds.
- Multi-tenant organization administration.
- AI receipt itemization.

## Success Criteria

The app is ready to be considered production grade when:

- A new user can register, complete onboarding, create or join a group, and add an expense in under 3 minutes.
- The dashboard, friends, groups, expense detail, and settle-up flows explain balances without ambiguity.
- Split calculations pass deterministic tests for equal, percentage, shares, exact, and adjustment methods.
- Offline and failed writes are visible and recoverable.
- Every network-backed screen has loading, empty, error, offline, and success states.
- The UI remains readable and polished at 320px mobile width.
- No service role key or privileged backend behavior exists in the Expo app.
- The design language remains consistent with `context/designs/` while serving Split’s shared-expense workflows.
