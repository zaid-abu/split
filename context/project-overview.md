# Project Overview

## About the Project

Split is a mobile-first money splitting app for friends, roommates, couples, travel groups, and small shared households. Users can add expenses, split them in flexible ways, track balances, settle up, and understand spending patterns over time.

The product is built with **Expo SDK 57**, **Expo Router**, and **Supabase**. The UI direction is modern glassmorphism: translucent surfaces, soft depth, crisp typography, subtle borders, and clear red/green financial signals.

---

## The Problem It Solves

Shared expenses become messy when people pay at different times, use different currencies, or forget who owes what. Split keeps the shared ledger clear:

- Everyone can see who paid, who owes, and what changed.
- Groups can minimize debt with settlement suggestions.
- Friends and groups get readable balance histories.
- Analytics explain where money went by period, category, friend, and group.

---

## Target Users

- Friends splitting meals, events, trips, and shared purchases.
- Roommates managing rent, utilities, groceries, and recurring bills.
- Couples or families tracking shared spending without heavy accounting tools.
- Travelers who need group balances, currency support, receipts, and offline-friendly capture.

---

## Primary App Areas

```
/(auth)/splash              → Launch and session bootstrap
/(auth)/welcome             → Optional onboarding carousel
/(auth)/sign-in             → Email, phone, Google, Apple sign-in
/(auth)/verify              → OTP or email verification
/(auth)/profile-setup       → Name, photo, default currency
/(auth)/permissions         → Contacts and notification permission prompts

/(tabs)/home                → Dashboard and quick actions
/(tabs)/friends             → Friend balances and friend search
/(tabs)/groups              → Group list and group balances
/(tabs)/activity            → Activity feed and notifications entry
/(tabs)/account             → Profile, settings, payments, help

/friends/[id]               → Friend detail, shared expenses, settle up
/friends/add                → Search/invite friends
/friends/contacts           → Contact sync/import

/groups/create              → Create group
/groups/[id]                → Group detail and expense feed
/groups/[id]/settings       → Group settings
/groups/[id]/members        → Manage members and roles
/groups/[id]/invite         → Share link or QR invite
/groups/[id]/analytics      → Group-level analytics
/groups/[id]/simplify       → Simplified debt suggestions

/expenses/new               → Add expense
/expenses/[id]              → Expense detail, comments, history
/expenses/[id]/edit         → Edit expense
/expenses/split-method      → Split method selector
/expenses/category          → Category picker
/expenses/recurring         → Recurring expense setup

/settle-up                  → Record payment
/settle-up/confirm          → Payment confirmation
/settle-up/payment          → Integrated payment flow, if enabled

/analytics                  → Personal spending overview
/analytics/categories       → Category breakdown
/analytics/trends           → Spending trends
/analytics/export           → CSV/PDF export

/search                     → Global search
/filters                    → Filter and sort modal
```

---

## Navigation

Bottom tab navigation with five tabs:

```
Home    Friends    Groups    Activity    Account
```

Use stack navigation for creation flows, detail screens, settings screens, modals, and confirmation flows. Keep primary tabs stable and predictable.

---

## Core User Flow

### Onboarding and Auth

- Splash screen initializes fonts, theme, Supabase session, and deep-link routing.
- New users can sign up or log in with email, phone OTP, Google, or Apple.
- Verification handles OTP or email confirmation.
- Profile setup collects name, avatar, and default currency.
- Permissions screen asks for contacts and notifications only after explaining the value.
- Optional carousel appears for first-time users only.

### Home Dashboard

- Shows total owed, total owed to user, and net balance.
- Highlights recent expenses, settlements, friend requests, reminders, and sync state.
- Provides quick actions: add expense, settle up, create group, add friend.
- Uses empty states for first-run setup.

### Friends

- Friends list shows each friend's net balance with green/red/neutral indicators.
- Add friend supports username, email, phone search, invite link, and SMS share.
- Friend detail shows shared expenses, settlements, balance history, and settle-up CTA.
- Contact sync/import is optional and permission-gated.

### Groups

- Groups list shows group name, type, member count, last activity, and current balance.
- Group detail shows expense feed, members, totals, quick add expense, and settings.
- Create group captures name, icon/cover, type, default currency, and initial members.
- Group invite supports link and QR code.
- Manage members handles add/remove, admin role changes, leave, and delete flows.

### Expenses

- Add expense captures amount, currency, payer, participants, split method, category, date, notes, and receipt/photo.
- Split methods: equally, percentage, shares, exact amount, and adjustment.
- Expense detail shows who paid, who owes what, comments, receipt, and edit history.
- Editing an expense creates an activity item and handles conflict resolution if another edit happened first.
- Recurring expenses support rent, subscriptions, utilities, and custom schedules.

### Settling Up

- Settle up records a payment between users or inside a group.
- Confirmation screen summarizes payer, receiver, amount, method, and linked expenses.
- Integrated payments are optional. If enabled, support method selection, processing, success, failure, and retry states.
- Simplify debts shows minimized transaction suggestions across a group.

### Activity and Notifications

- Activity feed is chronological and includes expenses added, edited, deleted, settled, comments, friend requests, invites, reminders, and payment confirmations.
- Notifications screen groups actionable items and read-only updates.
- Expense comments support discussion without cluttering the main ledger.

### Analytics

- Spending overview supports week, month, year, and custom ranges.
- Category breakdown uses pie, donut, or bar charts with accessible labels.
- Trends show spending over time, by group, by friend, and by category.
- Group-level analytics show top spenders, top categories, monthly totals, and settlement health.
- Personal insights compare current vs previous period and budget vs actual.
- Export screen supports CSV first and PDF later.

---

## Edge and System States

Production-grade screens must include:

- Empty states for no friends, no groups, no expenses, no activity, no analytics data.
- Loading and skeleton states for every network-backed list or detail screen.
- Error states for network failure, sync failure, permission denial, invalid invite, and deleted resources.
- Offline indicator and queued mutations.
- 404/not found state for deleted groups, expired invites, or missing expenses.
- Currency conversion conflict resolution for multi-currency groups.
- Edit conflict UI for simultaneous expense updates.

---

## Features In Scope

- Expo Router app structure with auth, tabs, stacks, and modal flows.
- Supabase Auth with email, phone OTP, Google, and Apple.
- Supabase Postgres schema for profiles, friendships, groups, members, expenses, splits, settlements, activity, notifications, comments, recurring expenses, and attachments.
- Supabase Storage for avatars, group covers, and receipts.
- Realtime subscriptions for group activity and balance updates.
- Contact import screen and invite flows.
- Full expense entry and editing.
- Settlement recording and simplified debt suggestions.
- Analytics dashboards and export.
- Offline-aware UI states.
- Modern glassmorphism design system across mobile and web.

---

## Features Out of Scope Until Explicitly Added

- Banking aggregation.
- Automatic payment execution by default.
- Cryptocurrency support.
- Business accounting, invoices, taxes, or reimbursements.
- Public social feed.
- Multi-tenant organization admin console.
- AI receipt itemization unless added as a later feature.

---

## Success Criteria

- A new user can sign up, create a profile, add a friend/group, and add the first expense in under 3 minutes.
- Balances are always explainable from underlying expenses, splits, and settlements.
- A group can settle debts with minimized transaction suggestions.
- Analytics are useful after several expenses and remain readable on small screens.
- Offline and sync states do not hide data loss or failed writes.
- UI is visually consistent, modern, and legible in light and dark modes.
