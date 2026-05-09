'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { auditFormSchema, AuditFormValues } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AuditForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      teamSize: 1,
      primaryUseCase: 'coding',
      tools: [
        { id: crypto.randomUUID(), toolName: 'ChatGPT', plan: 'Free', monthlySpend: 0, seats: 1 }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tools'
  });

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('spendpilot_audit_form');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        form.reset(parsed);
      } catch (e) {
        console.error('Failed to parse saved form data', e);
      }
    }
  }, [form]);

  // Save to localStorage on change
  useEffect(() => {
    if (mounted) {
      // eslint-disable-next-line react-hooks/incompatible-library
      const subscription = form.watch((value) => {
        localStorage.setItem('spendpilot_audit_form', JSON.stringify(value));
      });
      return () => subscription.unsubscribe();
    }
  }, [form, mounted]);

  const onSubmit = async (data: AuditFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to run audit');
      
      const result = await response.json();
      router.push(`/audit/${result.id}`);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      // Here you would typically show a toast error
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Company Basics */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Company Basics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Total Team Size</Label>
                <Input 
                  id="teamSize" 
                  type="number" 
                  min={1}
                  {...form.register('teamSize', { valueAsNumber: true })} 
                />
                {form.formState.errors.teamSize && (
                  <p className="text-sm text-red-500">{form.formState.errors.teamSize.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryUseCase">Primary AI Use Case</Label>
                <select 
                  id="primaryUseCase"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...form.register('primaryUseCase')}
                >
                  <option value="coding">Coding / Engineering</option>
                  <option value="writing">Writing / Content</option>
                  <option value="research">Research / Analysis</option>
                  <option value="data">Data Science</option>
                  <option value="mixed">Mixed / General</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Stack */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Your AI Stack</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => append({ id: crypto.randomUUID(), toolName: 'Cursor', plan: 'Free', monthlySpend: 0, seats: 1 })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Tool
              </Button>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-gray-50 p-4 rounded-xl border border-gray-100">
                  
                  <div className="md:col-span-3 space-y-2">
                    <Label>Tool Name</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...form.register(`tools.${index}.toolName`)}
                    >
                      <option value="Cursor">Cursor</option>
                      <option value="GitHub Copilot">GitHub Copilot</option>
                      <option value="Claude">Claude</option>
                      <option value="ChatGPT">ChatGPT</option>
                      <option value="Anthropic API">Anthropic API</option>
                      <option value="OpenAI API">OpenAI API</option>
                      <option value="Gemini">Gemini</option>
                      <option value="Windsurf">Windsurf</option>
                      <option value="v0">v0</option>
                    </select>
                  </div>

                  <div className="md:col-span-3 space-y-2">
                    <Label>Plan</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...form.register(`tools.${index}.plan`)}
                    >
                      <option value="Free">Free</option>
                      <option value="Pro">Pro / Plus</option>
                      <option value="Team">Team</option>
                      <option value="Business">Business</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Pay-as-you-go">Pay-as-you-go (API)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label>Seats</Label>
                    <Input 
                      type="number" 
                      min={1}
                      {...form.register(`tools.${index}.seats`, { valueAsNumber: true })} 
                    />
                  </div>

                  <div className="md:col-span-3 space-y-2">
                    <Label>Monthly Spend ($)</Label>
                    <Input 
                      type="number" 
                      step="0.01"
                      min={0}
                      {...form.register(`tools.${index}.monthlySpend`, { valueAsNumber: true })} 
                    />
                  </div>

                  <div className="md:col-span-1 flex justify-end">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 p-0"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full md:w-auto px-12 rounded-full h-14 text-lg font-bold shadow-lg shadow-indigo-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Stack...
              </>
            ) : (
              'Run Deterministic Audit'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
