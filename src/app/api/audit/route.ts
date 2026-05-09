import { NextResponse } from 'next/server';
import { runAuditEngine } from '@/lib/audit-engine';
import { supabase } from '@/lib/supabase';
import { groq } from '@/lib/groq';
import { auditFormSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request
    const parseResult = auditFormSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error }, { status: 400 });
    }

    const formData = parseResult.data;

    // Run deterministic engine
    const auditResult = runAuditEngine(formData);

    // Generate AI Summary using Groq
    let aiSummary = "Your stack appears optimized. We recommend standardizing on single tools where overlap exists to maintain security and avoid redundant costs.";
    
    try {
      if (process.env.GROQ_API_KEY) {
        const prompt = `
          You are a senior SaaS financial auditor. Write a concise, professional ~100-word summary of the following AI tool spend audit for a startup founder.
          
          Input stack:
          ${JSON.stringify(auditResult.tools)}
          
          Recommendations generated:
          ${JSON.stringify(auditResult.recommendations)}
          
          Total monthly savings identified: $${auditResult.totalMonthlySavings}
          Total annual savings identified: $${auditResult.totalAnnualSavings}
          
          Tone: Professional, finance-literate, founder-focused. No fluff. 
          Do not hallucinate numbers. Use the exact savings provided. If savings are $0, praise them for their cost-efficiency.
        `;

        const completion = await groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'llama-3.3-70b-versatile',
          max_tokens: 250,
          temperature: 0.3,
        });

        if (completion.choices[0]?.message?.content) {
          aiSummary = completion.choices[0].message.content;
        }
      }
    } catch (e) {
      console.error("Groq AI Summary Generation Failed, using fallback.", e);
      // Fallback already defined above
    }

    const publicSlug = crypto.randomUUID().substring(0, 12);

    // Save to Supabase
    // If Supabase is not properly configured, we will just return the result for MVP preview purposes
    let auditId = crypto.randomUUID();
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase
        .from('audits')
        .insert([{
          tools: auditResult.tools,
          total_monthly_savings: auditResult.totalMonthlySavings,
          total_annual_savings: auditResult.totalAnnualSavings,
          ai_summary: aiSummary,
          public_slug: publicSlug
        }])
        .select('id')
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
      } else if (data) {
        auditId = data.id;
      }
    }

    return NextResponse.json({ 
      id: auditId, 
      result: auditResult,
      summary: aiSummary
    });

  } catch (error) {
    console.error("Audit API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
