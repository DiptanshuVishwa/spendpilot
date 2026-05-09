# Architecture: SpendPilot

## Data Flow

```mermaid
graph TD
    A[User (Browser)] -->|Inputs Stack Data| B(Next.js App Router)
    B -->|POST /api/audit| C{API Route: Audit Engine}
    
    C -->|1. Deterministic Calculation| D[Pricing Configuration Data]
    D --> C
    
    C -->|2. Generate Summary| E[Groq API / Llama-3]
    E -->|Returns ~100 words| C
    
    C -->|3. Store Audit| F[(Supabase: audits table)]
    F -->|Returns Audit ID| C
    
    C -->|Returns Result| B
    B -->|Redirects| G[Results Page /audit/[id]]
    
    G -->|User submits email| H{API Route: /api/lead}
    H -->|Store Lead| I[(Supabase: leads table)]
    H -->|Send confirmation| J[Resend Email API]
```

## Stack Reasoning

1. **Next.js 15 (App Router):** Chosen for its hybrid server/client capabilities. The audit engine can run securely on the server (`/api/audit`) ensuring pricing configurations and API keys are not exposed to the client. Server components on the Results page ensure fast load times for public reports.
2. **Supabase:** Provides instant serverless Postgres, perfect for an MVP. Easy to spin up and handles UUID generation and relational data (audits -> leads).
3. **Groq (Llama-3):** Chosen over standard OpenAI for lightning-fast inference. The summary needs to be generated instantaneously while the user waits on the loading screen.
4. **Resend:** Developer-friendly email API with React Email support (though raw HTML is used here for simplicity in the MVP).

## Scalability Plan (10k audits/day)

If SpendPilot hits Product Hunt and scales to 10k audits/day:
1. **Caching Pricing Data:** The deterministic engine relies on static data, so no DB hits are required for calculation.
2. **Groq API Limits:** Ensure Groq API limits can handle ~10k requests/day (or implement fallbacks to Anthropic/OpenAI).
3. **Database Indexing:** Ensure `public_slug` and `id` in Supabase are indexed for fast retrieval on public report pages.
4. **Edge Functions:** The audit calculation could be moved to a Vercel Edge function since it has no Node.js dependencies, further reducing latency.
