# Split Agent Instructions

## Expo SDK 57 Is the Version Authority

This project uses **Expo SDK 57**, **Expo Router**, **React Native 0.86**, and **React 19**.

Before writing or changing Expo-specific code, read the exact versioned docs:

`https://docs.expo.dev/versions/v57.0.0/`

Do not rely on older Expo, React Native, or Expo Router assumptions from training data.

---

## Product and Stack

Split is a money-splitting application for friends, groups, roommates, couples, and trips.

Core stack:

- Expo SDK 57
- Expo Router
- React Native
- TypeScript strict
- Supabase Auth, Postgres, Storage, Edge Functions, and Realtime
- Tokenized React Native styles
- Modern glassmorphism UI

Primary app areas:

- Onboarding and auth
- Home dashboard
- Friends
- Groups
- Expenses
- Settling up
- Activity and notifications
- Analytics and export
- Account and settings

---

## Read Before Anything Else

Read these files in this exact order before implementation:

1. `context/project-overview.md`
2. `context/architecture.md`
3. `context/ui-tokens.md`
4. `context/ui-rules.md`
5. `context/ui-registry.md`
6. `context/code-standards.md`
7. `context/library-docs.md`
8. `context/build-plan.md`
9. `context/progress-tracker.md`

If implementation details conflict, use this authority order:

1. Current user request
2. `AGENTS.md`
3. Context files
4. Existing code patterns
5. General knowledge

---

## Rules That Never Change

- Check Expo SDK 57 docs before Expo-specific implementation.
- Use Supabase for backend features unless the user explicitly changes the stack.
- Never ship Supabase service role keys in the Expo app.
- Keep service role behavior in Supabase Edge Functions only.
- Use `src/services/` for Supabase domain reads and writes.
- Do not call Supabase directly from presentational components.
- Use `src/lib/` for shared clients, pure money logic, split math, date helpers, and debt simplification.
- Use `src/constants/theme.ts` tokens for colors, spacing, radii, typography, and shadows.
- Never hardcode hex colors, spacing values, or shadows in screen components.
- Update `context/progress-tracker.md` after every completed feature.
- Update `context/ui-registry.md` after every reusable UI component is built.

---

## Financial Logic Rules

- Store amount and currency explicitly.
- Balances must be derivable from expenses, splits, and settlements.
- Split calculations must sum exactly to the expense total after rounding.
- Support split methods: equal, percentage, shares, exact amount, and adjustment.
- Remainders must be assigned deterministically.
- Do not mix currencies in one debt simplification pass.
- Expense edits must use versioning or another conflict-detection strategy.
- Never hide failed writes, offline queues, or sync conflicts.

---

## UI Rules

- Build mobile-first screens with safe-area-aware layout.
- Use modern glassmorphism with readable contrast and restrained depth.
- Use green for positive balances or money owed to the user.
- Use red for money the user owes or destructive actions.
- Every network-backed screen needs loading, empty, error, offline, and success states.
- Use bottom sheets for focused selectors like category, split method, filters, and payment method.
- Use full-screen flows for add expense, create group, onboarding, and complex edits.
- Do not nest cards inside cards.
- Do not create marketing-style landing pages inside the app shell.

---

## Implementation Flow

Default build sequence for a feature:

1. Read relevant context docs.
2. Inspect existing code and component registry.
3. Build visible UI with realistic mock data.
4. Add loading, empty, error, offline, and edge states.
5. Wire Supabase through a domain service.
6. Add pure helper tests for financial calculations when touched.
7. Update `ui-registry.md` and `progress-tracker.md`.
8. Run the relevant validation command, usually `npm run lint`.

---

## Dependency Rules

- Prefer Expo modules over unmanaged native packages.
- Do not add a dependency unless it is listed in `context/code-standards.md` or you update that file with the reason.
- Chart library is intentionally TBD until analytics implementation starts.
- Before using a third-party library, read `context/library-docs.md` and the current official docs.

---

## Available Skills

Use skills when they match the task:

- `browser:control-in-app-browser` — verify local Expo web UI when a dev server is running.
- `github:*` — use for GitHub PR, issue, review, CI, or publishing workflows.
- `spreadsheets`, `documents`, `pdf`, `presentations` — use only for requested artifact work.
- `openai-docs` — use for OpenAI product/API questions.

Older slash commands such as `/architect`, `/imprint`, `/review`, `/recover`, or `/remember` are not assumed to exist unless the environment provides them explicitly.
