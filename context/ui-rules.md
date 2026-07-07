# UI Rules

Concise rules for building Split UI. Follow these with `ui-tokens.md` and update `ui-registry.md` after building reusable components.

---

## Design Direction

Split uses modern glassmorphism, but the app must remain practical for financial workflows.

- Use translucent glass panels for dashboards, sheets, summaries, and repeated list rows.
- Keep text high contrast and readable on every background.
- Use restrained blur and shadow. The UI should feel light, not foggy.
- Use green only for positive balances and red only for money the user owes or destructive actions.
- Avoid a one-note blue, purple, beige, or dark slate palette.

---

## Layout

- Mobile first. Every screen must work at 320px width.
- Use safe-area-aware containers on all screens.
- Default horizontal screen padding: `theme.spacing[4]`.
- Default section gap: `theme.spacing[5]`.
- Prefer bottom sheets for focused selectors: split method, category, filters, payment method.
- Use full-screen flows for complex creation/editing: add expense, create group, onboarding.
- Keep primary actions reachable near the bottom on mobile.
- Do not nest cards inside cards. A glass panel can contain rows, but avoid panel-in-panel compositions.

---

## Navigation

Bottom tabs:

```
Home    Friends    Groups    Activity    Account
```

Rules:

- Use icons plus short labels in the tab bar.
- Active tab uses `accent`; inactive tabs use `textMuted`.
- Creation and detail screens push onto stack routes.
- Use modals for filters, category picker, payment method selection, and confirmations.
- Deep links for group invites must route through validation before opening group detail.

---

## Typography

- Font: Inter loaded through `expo-font`.
- Screen titles use `title1`.
- Section titles use `title3`.
- Row titles use `body`.
- Metadata uses `caption`.
- Badge labels use `micro`.
- Balance hero amount uses `display`, but only on dashboard or summary headers.
- Do not use negative letter spacing.
- Do not scale font size based on viewport width.

---

## Glass Surfaces

Glass panels use:

- Translucent background from `theme.colors.glass` or `glassStrong`.
- Hairline border from `glassBorder` or `glassStroke`.
- Radius `lg` or `xl`.
- Shadow `glass` for major panels and `sm` for list rows.

Use `expo-glass-effect` for native glass when available. Always provide a StyleSheet fallback using tokens.

Do not:

- Put large blocks of low-contrast text over busy images.
- Use heavy blur behind dense lists.
- Add decorative orbs or bokeh blobs.
- Use gradients as a substitute for meaningful content.

---

## Buttons

Buttons must have stable height and predictable hit areas.

| Variant | Use |
| --- | --- |
| Primary | Main screen action: add expense, save, continue |
| Secondary | Alternate action: invite, filter, export |
| Positive | Settle up, confirm received |
| Danger | Delete account, delete expense, leave group |
| Ghost | Low-emphasis navigation or inline action |

Rules:

- Minimum height: 44px.
- Icon buttons use familiar symbols where possible.
- Use `expo-symbols` for SF Symbols where appropriate; otherwise use the established icon library once added.
- Button text must not wrap awkwardly. Shorten labels before shrinking below readable size.

---

## Forms

- Labels are always visible. Do not rely on placeholder-only fields.
- Currency amount input must show currency code/symbol clearly.
- Date picker, payer picker, participants picker, category picker, and split method picker should be explicit controls.
- Validate split totals before allowing save.
- Show inline field errors using human-readable messages.
- Do not expose raw Supabase or network errors to users.

---

## Lists and Rows

- Friend rows show avatar, name, last activity or subtitle, and net balance.
- Group rows show cover/icon, name, members, last activity, and group balance.
- Expense rows show category icon, title, payer, date, and amount impact.
- Activity rows show actor, action, target, timestamp, and optional amount.
- Use skeleton rows while loading remote data.
- Empty states must include a relevant CTA when there is a natural next action.

---

## Charts and Analytics

- Charts must be readable on small screens.
- Always include labels or legends that do not rely on color alone.
- Category colors must be consistent across analytics screens.
- Period selector uses segmented controls: week, month, year, custom.
- Empty analytics state should explain that data appears after expenses are added.

---

## Edge States

Every production screen must handle:

- Loading.
- Empty.
- Error.
- Offline.
- Permission denied.
- Not found or expired invite.
- Sync conflict for editable financial records.

For offline mutations, clearly show whether the action is saved locally, queued, synced, or failed.

---

## Do Nots

- Do not hardcode colors, spacing, radii, or shadows in screens.
- Do not use color alone to communicate owed/owed-to-you.
- Do not hide destructive actions without confirmation.
- Do not allow expense saves when split totals do not match the amount.
- Do not show raw exception strings to users.
- Do not add fixed-position overlays that ignore safe areas.
- Do not create marketing-style landing pages inside the app shell.
