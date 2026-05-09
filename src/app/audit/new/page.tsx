import Link from 'next/link';
import { AuditForm } from '@/components/audit-form';
import { Zap, ArrowLeft } from 'lucide-react';

export default function NewAuditPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-6 lg:px-14 h-16 flex items-center border-b bg-white sticky top-0 z-50">
        <Link className="flex items-center text-gray-500 hover:text-gray-900 transition-colors mr-6" href="/">
          <ArrowLeft className="h-5 w-5 mr-1" /> Back
        </Link>
        <Link className="flex items-center justify-center font-bold text-xl tracking-tighter" href="/">
          <Zap className="h-6 w-6 mr-2 text-indigo-600" />
          <span>SpendPilot</span>
        </Link>
      </header>
      
      <main className="flex-1 py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Audit your AI stack
          </h1>
          <p className="text-lg text-gray-500">
            Enter your current tools, plans, and spend. We'll run a deterministic analysis to find consolidation opportunities and savings.
          </p>
        </div>
        
        <AuditForm />
      </main>
    </div>
  );
}
