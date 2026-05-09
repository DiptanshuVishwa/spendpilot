# Development Log

## Day 1 — 2026-05-03
**Hours worked:** 4
**What I did:** Initialized Next.js 15 project, set up Tailwind CSS and shadcn/ui. Created the basic project structure and defined the Supabase schema.
**What I learned:** Next.js 15 App Router handles CSS variables for Tailwind 4 automatically, which simplifies shadcn integration.
**Blockers / what I'm stuck on:** Deciding whether to use AI for the audit logic or keep it deterministic.
**Plan for tomorrow:** Build the deterministic audit engine and write Vitest tests for it.

## Day 2 — 2026-05-04
**Hours worked:** 5
**What I did:** Decided to make the audit engine 100% deterministic. Wrote the rule-based logic in `src/lib/audit-engine.ts` and created the `PRICING_DATA` constant. Wrote 5 Vitest tests covering edge cases like overlapping tools.
**What I learned:** Vitest is incredibly fast compared to Jest and integrates seamlessly with Vite/Next tooling.
**Blockers / what I'm stuck on:** None.
**Plan for tomorrow:** Build the dynamic form for users to input their stack.

## Day 3 — 2026-05-05
**Hours worked:** 6
**What I did:** Built the `AuditForm` component using `react-hook-form` and `zod`. Implemented dynamic field arrays so users can add/remove tools. Added localStorage persistence.
**What I learned:** `useFieldArray` from react-hook-form is powerful but requires careful UUID management for keys to avoid rendering bugs.
**Blockers / what I'm stuck on:** Form styling was a bit tedious to make it look premium.
**Plan for tomorrow:** Build the Landing Page and connect the form to the API route.

## Day 4 — 2026-05-06
**Hours worked:** 5
**What I did:** Built the beautiful landing page inspired by Vercel/Linear. Created the `/api/audit` route to process the form and integrated Groq for the AI executive summary.
**What I learned:** Groq's Llama-3 inference is shockingly fast. Perfect for an MVP where users don't want to wait on a loading screen.
**Blockers / what I'm stuck on:** Prompt engineering for the summary took a few tries to prevent hallucinations.
**Plan for tomorrow:** Build the Results page and Lead Capture flow.

## Day 5 — 2026-05-07
**Hours worked:** 5
**What I did:** Built the `/audit/[id]` Results page. Implemented the "Save this report" lead capture form and the `api/lead` route using Resend.
**What I learned:** Delaying the email capture until *after* the value is shown (the savings number) feels much more ethical and likely has a higher conversion rate.
**Blockers / what I'm stuck on:** Email deliverability in dev mode using Resend requires a verified domain or sending to the registered email address.
**Plan for tomorrow:** Finalize UI polish, mobile responsiveness, and CI/CD.

## Day 6 — 2026-05-08
**Hours worked:** 4
**What I did:** Added GitHub Actions CI/CD workflow (`ci.yml`). Polished mobile views, ensured keyboard accessibility, and added Framer Motion for subtle entry animations.
**What I learned:** Subtle gradients and shadows (glassmorphism) go a long way in making a SaaS look "expensive".
**Blockers / what I'm stuck on:** None.
**Plan for tomorrow:** Write documentation and prepare for launch.

## Day 7 — 2026-05-09
**Hours worked:** 3
**What I did:** Wrote `README.md`, `ARCHITECTURE.md`, `GTM.md`, and all other required documentation. Conducted final end-to-end testing.
**What I learned:** Thorough documentation takes time but is essential for a complete MVP handoff.
**Blockers / what I'm stuck on:** None. Ready to ship.
**Plan for tomorrow:** Launch on Product Hunt.
