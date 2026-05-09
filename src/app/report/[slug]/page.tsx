import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const revalidate = 0; // Dynamic route

export default async function PublicReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let audit: any = null;
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { data, error } = await supabase
      .from('audits')
      .select('*')
      .eq('public_slug', slug)
      .single();
      
    if (!error && data) {
      audit = data;
    }
  }

  if (!audit) {
    // For MVP UI preview
    if (slug === 'demo') {
      audit = {
        total_monthly_savings: 420,
        total_annual_savings: 5040,
        ai_summary: "Your stack appears heavily overprovisioned for your team size. We noticed overlapping subscriptions between Cursor and GitHub Copilot, and an enterprise plan on ChatGPT that is unnecessary for a small team.",
        tools: [
          { toolName: 'ChatGPT', plan: 'Enterprise', monthlySpend: 1200, seats: 20 },
          { toolName: 'Cursor', plan: 'Business', monthlySpend: 800, seats: 20 },
          { toolName: 'GitHub Copilot', plan: 'Business', monthlySpend: 380, seats: 20 }
        ]
      };
    } else {
      return notFound();
    }
  }

  // Re-run engine for recommendations
  const { runAuditEngine } = await import('@/lib/audit-engine');
  const auditResult = runAuditEngine({
    tools: audit.tools,
    teamSize: 20, // Fallback as teamSize isn't strictly stored in the audit table
    primaryUseCase: 'mixed'
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-6 lg:px-14 h-16 flex items-center justify-between border-b bg-white sticky top-0 z-50">
        <Link className="flex items-center justify-center font-bold text-xl tracking-tighter" href="/">
          <Zap className="h-6 w-6 mr-2 text-indigo-600" />
          <span>SpendPilot <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-500 font-normal">Public Report</Badge></span>
        </Link>
        <Link href="/">
          <Button variant="outline" size="sm" className="rounded-full">Run Your Own Audit</Button>
        </Link>
      </header>
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-500 mb-2">Potential Savings Identified</h1>
            <div className="text-6xl md:text-8xl font-black text-indigo-600 mb-4 tracking-tighter">
              ${auditResult.totalMonthlySavings.toLocaleString()}<span className="text-3xl text-gray-400 font-medium">/mo</span>
            </div>
            <p className="text-xl text-gray-500">
              That's <strong>${auditResult.totalAnnualSavings.toLocaleString()}</strong> added back to the runway every year.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Per-Tool Breakdown</h2>
            
            {auditResult.recommendations.length === 0 ? (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-green-900">Stack is optimized!</h3>
                    <p className="text-green-800 mt-1">No obvious overlapping tools or oversized plans found.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              auditResult.recommendations.map((rec, i) => (
                <Card key={i} className="overflow-hidden border-gray-200">
                  <div className="bg-amber-50 px-6 py-3 border-b border-amber-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="font-semibold text-amber-900 text-sm">Optimization Opportunity</span>
                    </div>
                    <Badge variant="outline" className="bg-white text-green-600 border-green-200 font-bold">
                      Save ${rec.monthlySavings}/mo
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{rec.toolName}</h3>
                        <p className="text-gray-500 text-sm mt-1">Current Spend: ${rec.currentSpend}/mo</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-500 mb-1">Recommended Action</p>
                        {rec.alternativeTool ? (
                          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">Drop & use {rec.alternativeTool}</Badge>
                        ) : (
                          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">Downgrade to {rec.recommendedPlan}</Badge>
                        )}
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed border border-gray-100">
                      <strong>Reasoning:</strong> {rec.reasoning}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* AI Summary */}
            <Card className="border-indigo-100 shadow-md shadow-indigo-50">
              <CardHeader className="bg-indigo-50/50 border-b border-indigo-50 pb-4">
                <CardTitle className="text-lg flex items-center text-indigo-900">
                  <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
                  AI Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {audit.ai_summary}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center py-10">
            <h3 className="text-2xl font-bold mb-4">Does your stack look like this?</h3>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Find out if you're overpaying for AI tools. Run a free, deterministic audit of your own SaaS stack in 60 seconds.
            </p>
            <Link href="/audit/new">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold shadow-lg shadow-indigo-200">
                Audit My AI Spend
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
