import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, company, role, teamSize, auditId } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Save Lead to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('leads')
        .insert([{
          email,
          company,
          role,
          team_size: teamSize,
          audit_id: auditId
        }]);

      if (error) {
        console.error("Supabase lead insert error:", error);
      }
    }

    // Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'SpendPilot <onboarding@resend.dev>', // In production use verified domain
          to: email,
          subject: 'Your SpendPilot AI Audit Report',
          html: `
            <h2>Your AI Spend Audit is ready.</h2>
            <p>Thank you for using SpendPilot. We've securely generated your report.</p>
            <p>If you're spending over $500/month on AI, you may qualify for startup credits via Credex.</p>
            <p><a href="https://credex.com">Talk to Credex to claim credits</a></p>
            <br/>
            <p>Best,<br/>The SpendPilot Team</p>
          `
        });
      } catch (emailError) {
        console.error("Resend error:", emailError);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Lead API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
