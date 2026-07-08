# UI Rules

These rules define how Split screens and components should be built. Use them with `ui-tokens.md`, `ui-registry.md`, and the designs in `context/designs/`.

The app should feel like the provided designs: rounded, calm, social, finance-focused, and polished. It must also behave like a production financial app: explicit states, recoverable errors, safe destructive actions, and no hidden uncertainty around money.

## Visual Direction

Use the design files as product direction:

- `context/designs/Auth Flow.png` for onboarding and auth.
- `context/designs/image.png` for dashboard, wallet-style summaries, friend cards, chart previews, transactions, and bottom navigation.

Translate the wallet reference into Split concepts:

| Design Reference Concept | Split Concept |
| --- | --- |
| Wallet balance | Net balance across friends and groups |
| Topup | Add expense or record settlement |
| Exchange | Simplify debts or switch currency context |
| Withdraw | Export or settle up depending on context |
| Transactions | Recent expenses, settlements, and activity |
| Recent friends | Friends with active balances |
| Total bill cards | Group/friend expense summaries |

## Layout

Rules:

- Build mobile first and verify 320px width.
- Use safe-area-aware screen wrappers.
- Default horizontal padding is `theme.spacing[4]`.
- Default section gap is `theme.spacing[5]`.
- Primary actions should be reachable near the bottom on mobile.
- Use full-screen flows for onboarding, add expense, create group, edit expense, and complex setup.
- Use bottom sheets for focused selectors: category, split method, payer, participants, filters, payment method, currency.
- Do not nest cards inside cards.
- Avoid fixed overlays that ignore safe areas.

Screen structure should usually be:

```txt
safe screen
  header / top bar
  content sections
  state-aware list or form
  bottom action area when needed
```

## Navigation

Bottom tabs:

```txt
Home    Friends    Groups    Activity    Account
```

Rules:

- Tabs use icons plus short labels.
- Active tab uses `theme.colors.accent`.
- Inactive tabs use `theme.colors.textMuted`.
- A prominent central action may be used for add/split when the tabs layout supports it.
- Creation flows push or present full-screen.
- Focused selectors present as sheets or modal routes.
- Deep links validate before showing protected details.
- Back affordances need 44px minimum hit targets and accessibility labels.

## Typography

Rules:

- Use `AppText` and tokenized typography roles.
- Screen titles use `title1`.
- Major balance values use `display` only in dashboard or summary heroes.
- Section headings use `title3`.
- Row titles use `body`.
- Metadata uses `caption`.
- Badge labels use `micro`.
- Do not use viewport-scaled text.
- Do not use negative letter spacing.
- Avoid long button labels; shorten before shrinking below readable size.

## Color Semantics

Rules:

- Deep indigo is the primary action and active state.
- Green means money owed to the user, positive balance, received, or success.
- Red means user owes money, destructive action, or failed financial state.
- Yellow means pending, queued, warning, or conflict.
- Blue means informational or permission education.
- Do not use color alone to communicate money state. Pair color with text like "you owe", "owes you", "settled", or signed amount.
- Avoid one-note palettes. White, indigo, lavender, sky, green, red, and neutral gray should all have clear roles.

## Cards and Surfaces

Use cards for:

- Dashboard summaries.
- Friend and group rows when they need elevation.
- Expense summaries.
- Settings groups.
- Empty and error state modules.
- Bottom sheet content.

Do not:

- Nest cards inside cards.
- Put long text over busy images.
- Use translucent glass or blur.
- Use decorative gradient blobs or orbs.
- Use gradients as a substitute for real content.

Card content should have clear hierarchy:

```txt
icon/avatar/category
primary label
secondary metadata
money/state value
optional action
```

## Buttons

Variants:

| Variant | Use |
| --- | --- |
| Primary | Main action: continue, save, add expense |
| Secondary | Alternative action: invite, filter, export |
| Positive | Settle up, confirm payment received |
| Danger | Delete, leave group, block, destructive confirmation |
| Ghost | Low-emphasis inline navigation |

Rules:

- Minimum height is 44px.
- Primary CTAs in auth and major flows should usually be 56px high.
- Buttons must expose disabled and pressed states.
- Icon buttons need visible focus/pressed feedback and an accessibility label.
- Destructive actions require confirmation.
- Save buttons for financial records stay disabled until validation passes.

## Forms

Rules:

- Labels must be explicit or accessible. Do not rely only on placeholders for production forms.
- Auth fields may visually follow the reference placeholders, but accessibility labels and errors are required.
- Currency amount inputs must show currency code or symbol.
- Date, payer, participants, category, split method, and currency must be explicit controls.
- Validate locally before calling a service.
- Show inline errors near the relevant field.
- Do not show raw Supabase or network exception strings.
- Long forms should group fields into sections and keep the primary action persistent or easy to reach.

Required add/edit expense form behavior:

- Amount is required and must parse to a positive minor-unit value.
- Currency is required.
- Title is required.
- Payer is required.
- At least one participant is required.
- Split rows must sum exactly to the expense total.
- Receipt upload failures must not silently discard the expense.
- Edits must detect stale versions.

## Lists and Rows

Friend row:

- Avatar or initials.
- Name.
- Subtitle: last activity, email/phone, or relationship state.
- Net balance with text and color.
- Optional action: settle, remind, accept.

Group row:

- Cover/icon.
- Name.
- Type, member count, last activity.
- User’s net balance in the group.
- Optional unread/activity marker.

Expense row:

- Category icon.
- Title.
- Payer and date.
- Amount impact for current user.
- Receipt/comment marker when relevant.

Activity row:

- Actor.
- Action.
- Target.
- Timestamp.
- Optional amount.

Rules:

- Use stable row heights where possible.
- Use skeleton rows while loading remote data.
- Empty list states need a relevant CTA when a natural next action exists.
- Lists with many rows should use virtualized list components.

## Financial UI

Rules:

- Always show currency with money values.
- Use signed or clearly labeled balances.
- Distinguish "you owe" from "owes you".
- Show assumptions for multi-currency conversions.
- Settlement suggestions are recommendations, not automatic payments.
- Do not hide failed writes or queued mutations.
- Conflict states must explain that another change happened and offer refresh/review.

Common balance labels:

- `You are owed`
- `You owe`
- `Settled`
- `Pending`
- `Queued`
- `Failed`

## State Requirements

Every network-backed screen needs:

- Loading state.
- Empty state.
- Error state.
- Offline or stale data state.
- Success state for mutations.

Additional states by feature:

- Permissions: pre-prompt education, granted, denied, limited/unavailable.
- Invites: valid, expired, already used, not found, no access.
- Auth: invalid credentials, unverified, session expired, rate limited.
- Expense edit: stale version, deleted expense, participant removed.
- Receipt/media: permission denied, upload progress, upload failed, retry.

## Empty States

Empty states should be practical and short:

- Say what is missing.
- Say what the user can do next.
- Provide one primary CTA when appropriate.

Examples:

- No friends: invite or search for a friend.
- No groups: create a group.
- No expenses: add first expense.
- No activity: activity appears after expenses, settlements, or invites.
- No analytics: insights appear after expenses are added.

## Error States

Error states should:

- Use human-readable copy.
- Avoid raw backend strings.
- Include retry if retryable.
- Include navigation fallback if not found.
- Preserve user input when possible.
- Log developer details separately.

## Accessibility

Rules:

- All pressable controls need meaningful accessibility labels.
- Icon-only controls need labels.
- Text contrast must remain readable on every surface.
- State cannot be communicated by color alone.
- Inputs must announce errors.
- Touch targets should be at least 44px.
- Dynamic type should not break layout; if full dynamic type support is not complete, do not create fixed-height text containers that clip.

## Platform Behavior

Rules:

- Respect iOS and Android safe areas.
- Avoid web-only styling assumptions.
- Use Expo APIs according to SDK 57 docs.
- Do not introduce native dependencies without approval and documentation.
- Web must remain usable for development previews where Expo supports it.

## QA Checklist for Screens

Before calling a screen done:

- 320px width works.
- Loading, empty, error, offline, and success states exist.
- Long names and large money values do not overlap.
- Keyboard does not hide critical form controls.
- Back navigation behaves predictably.
- No raw hex, spacing, shadow, or radius values in screen styles.
- No direct Supabase access from presentational components.
- Destructive actions confirm.
- Financial save is blocked when invalid.
- Design matches the tone of `context/designs/`.
