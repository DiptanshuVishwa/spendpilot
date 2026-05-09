# AI Prompt Engineering

We use the Groq API (Llama-3.3-70b-versatile) exclusively for generating the executive summary.

## Production Prompt

```text
You are a senior SaaS financial auditor. Write a concise, professional ~100-word summary of the following AI tool spend audit for a startup founder.

Input stack:
[JSON of User Tools]

Recommendations generated:
[JSON of Deterministic Recommendations]

Total monthly savings identified: $[Monthly Savings]
Total annual savings identified: $[Annual Savings]

Tone: Professional, finance-literate, founder-focused. No fluff. 
Do not hallucinate numbers. Use the exact savings provided. If savings are $0, praise them for their cost-efficiency.
```

## Reasoning
We inject the exact JSON output of our deterministic engine into the prompt context. By explicitly commanding the model to "use the exact savings provided" and "not hallucinate numbers," we bridge the gap between deterministic accuracy and personalized generation. 

## Failed Prompt Experiments
**Attempt 1:** We initially passed just the raw tool data to the LLM and asked it to calculate the savings.
*Result:* Failed. LLMs hallucinated subscription costs, miscalculated basic math, and invented tools that didn't exist.

**Attempt 2:** We asked for a 300-word summary.
*Result:* Failed. It sounded too much like generic AI text ("In today's fast-paced digital landscape..."). Startups want speed and numbers, so we restricted it to ~100 words.
