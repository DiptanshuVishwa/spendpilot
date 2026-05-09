'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const leadSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function LeadCaptureForm({ auditId }: { auditId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof leadSchema>>({
    resolver: zodResolver(leadSchema),
    defaultValues: { email: '' }
  });

  const onSubmit = async (data: z.infer<typeof leadSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, auditId }),
      });
      
      if (!response.ok) throw new Error('Failed to save email');
      
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-4 text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="h-10 w-10 text-green-500 mb-2" />
        <p className="font-medium text-green-800">Saved successfully!</p>
        <p className="text-sm text-green-600 mt-1">Check your inbox for the report.</p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Input 
          placeholder="founder@startup.com" 
          type="email"
          className="h-11"
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save Report
      </Button>
    </form>
  );
}
