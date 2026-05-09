# SpendPilot - AI Spend Audit SaaS

SpendPilot is a production-quality startup MVP built to help engineering teams and startup founders audit their AI tool stack, discover overlapping subscriptions, and optimize their burn rate.

## 🚀 Overview

Many startups overpay for redundant AI tools (e.g., Cursor + Copilot) or enterprise plans they don't need. SpendPilot uses a **deterministic pricing engine** to analyze a user's AI stack, calculate exact monthly and annual savings, and generate a personalized executive summary.

### Key Features
- **Deterministic Audit Engine:** No hallucinations. Savings are calculated based on official pricing data.
- **Dynamic Tool Stack Builder:** Add multiple tools, plans, and seats.
- **AI Executive Summary:** Uses Groq (Llama 3) to generate a founder-focused summary of the audit.
- **Shareable Reports:** Secure, public-facing URLs to share with teams.
- **Lead Capture:** Captures emails *after* providing value, using Resend for delivery.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **AI:** Groq API (llama-3.3-70b-versatile)
- **Emails:** Resend
- **Validation:** Zod + React Hook Form
- **Testing:** Vitest

## 💻 Local Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.local.example` to `.env.local` and add your keys (Supabase, Groq, Resend).
4. Run Supabase migrations (optional for local UI testing, required for saving reports):
   Execute `supabase/migrations/0000_initial.sql` in your Supabase SQL editor.
5. Start the dev server: `npm run dev`

## 🌍 Deployment

This project is optimized for deployment on **Vercel**.
1. Push to GitHub.
2. Import project into Vercel.
3. Add Environment Variables in Vercel settings.
4. Deploy.

*Deployed URL Placeholder: https://spendpilot.vercel.app*

## 📸 Screenshots
*(Placeholders for actual screenshots)*
- `landing-page.png`
- `audit-form.png`
- `savings-report.png`
