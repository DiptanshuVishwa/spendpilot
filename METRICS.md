# Metrics & Instrumentation

## North Star Metric
**Total Savings Identified ($)**
This is the true measure of value created for the ecosystem. If this number is high, users will share the tool and Credex will have a strong pipeline of high-intent leads.

## Supporting Metrics
1. **Audit Completion Rate (%):** Funnel health metric. (Target: >15%)
2. **Email Conversion Rate (%):** Measures the effectiveness of hiding the report capture until the end. (Target: >30%)
3. **High-Intent Lead Volume:** Absolute number of audits resulting in >$500/mo savings.

## Instrumentation Strategy
We use lightweight, privacy-preserving tracking (e.g., PostHog) to instrument:
- `page_view`: Landing page
- `audit_started`: Clicks "Run Free Audit"
- `tool_added`: Clicks "Add Tool" inside the form
- `audit_completed`: Successfully runs engine and sees results
- `lead_captured`: Submits email on the results page

## Pivot Thresholds
If the **Email Conversion Rate** drops below 10%, we will pivot from "Capture email at the end" to "Email gate the results" (requiring email to see the savings number), despite the UX friction, to ensure lead flow for Credex.
