import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, DollarSign, TrendingDown, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 lg:px-14 h-16 flex items-center border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center font-bold text-xl tracking-tighter" href="/">
          <Zap className="h-6 w-6 mr-2 text-indigo-600" />
          <span>SpendPilot</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="#how-it-works">
            How it Works
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="#faq">
            FAQ
          </Link>
          <Link href="/audit/new">
            <Button size="sm" className="rounded-full px-6">
              Run Free Audit
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-48 xl:py-56 bg-gradient-to-b from-indigo-50/50 via-white to-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 blur-3xl rounded-full mix-blend-multiply" />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-5xl text-center">
            <div className="flex flex-col items-center space-y-8">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-50/50 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
                Stop Overpaying for AI Tools
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                Your AI Stack Is Probably Too Expensive.
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl leading-relaxed">
                Most startups overpay for overlapping AI subscriptions and enterprise plans they don&apos;t need. 
                Audit your stack in 60 seconds and discover immediate savings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
                <Link href="/audit/new" className="w-full">
                  <Button size="lg" className="w-full rounded-full h-14 text-lg font-medium shadow-lg shadow-indigo-200">
                    Audit My AI Spend
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-4">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> No credit card required
                <CheckCircle2 className="h-4 w-4 text-green-500 ml-4" /> Deterministic results
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="w-full py-12 md:py-16 bg-white border-y border-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto opacity-70 grayscale">
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="font-bold text-2xl text-gray-900">Linear</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="font-bold text-2xl text-gray-900">Vercel</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="font-bold text-2xl text-gray-900">Ramp</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="w-full py-24 md:py-32 bg-gray-50/50">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">How it works</h2>
              <p className="text-gray-500 text-lg">Three simple steps to optimize your burn rate.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">1</div>
                <h3 className="text-xl font-bold">Input Your Stack</h3>
                <p className="text-gray-500">Tell us which AI tools your team uses, the plans you&apos;re on, and your total seat count.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">2</div>
                <h3 className="text-xl font-bold">We Audit Your Spend</h3>
                <p className="text-gray-500">Our deterministic pricing engine evaluates your stack against current pricing data and overlapping features.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">3</div>
                <h3 className="text-xl font-bold">Get Instant Savings</h3>
                <p className="text-gray-500">Receive a customized report with actionable recommendations to downgrade or consolidate tools.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Savings */}
        <section className="w-full py-24 md:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Real Startup Savings</h2>
              <p className="text-gray-500 text-lg max-w-[600px]">See how other engineering teams have optimized their AI spend.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0 bg-gray-50/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                      <TrendingDown className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Saved $1,200/mo</h4>
                      <p className="text-sm text-gray-500">Series A SaaS Startup</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 italic">&quot;We were paying for both Cursor and GitHub Copilot for all 40 engineers. Standardizing on one saved us instantly.&quot;</p>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Before</span>
                      <span className="font-medium">$2,400/mo</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-green-600 font-medium">After</span>
                      <span className="font-bold text-green-600">$1,200/mo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0 bg-gray-50/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Downgraded Enterprise</h4>
                      <p className="text-sm text-gray-500">Seed Stage Biotech</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 italic">&quot;We defaulted to ChatGPT Enterprise for security, but the Team plan provided the same privacy features we needed for a 5-person team.&quot;</p>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Before</span>
                      <span className="font-medium">$300/mo</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-green-600 font-medium">After</span>
                      <span className="font-bold text-green-600">$150/mo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h4 className="font-bold text-lg mb-2">Do you use AI to calculate my savings?</h4>
                <p className="text-gray-600">No. Our pricing engine is 100% deterministic, built on top of official pricing tiers and feature comparisons. We only use AI to generate your personalized summary text.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h4 className="font-bold text-lg mb-2">Is the audit really free?</h4>
                <p className="text-gray-600">Yes. We provide the savings analysis completely free. If we find significant savings (e.g., $500+/mo), we may suggest speaking with Credex to unlock further discounts through bulk cloud credits.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h4 className="font-bold text-lg mb-2">How current is your pricing data?</h4>
                <p className="text-gray-600">We constantly monitor pricing changes from OpenAI, Anthropic, GitHub, and Cursor. Our rule engine reflects the latest published enterprise and team pricing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-32 bg-indigo-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to stop burning cash?</h2>
            <p className="text-indigo-100 text-xl max-w-[600px] mx-auto mb-10">
              Join hundreds of engineering teams who have optimized their AI stack in minutes.
            </p>
            <Link href="/audit/new">
              <Button size="lg" variant="secondary" className="rounded-full h-14 px-8 text-lg font-bold text-indigo-600 bg-white hover:bg-gray-50 shadow-2xl">
                Run Free Audit Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <Zap className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold text-gray-900">SpendPilot</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-900">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
