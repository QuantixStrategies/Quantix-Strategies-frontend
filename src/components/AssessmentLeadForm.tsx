import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BUSINESS_MODEL_OPTIONS,
  BUSINESS_STAGE_OPTIONS,
  INDUSTRY_OPTIONS,
  MARKETS_OPTIONS,
  TEAM_SIZE_OPTIONS,
} from '@/data/leadFormOptions';
import type { PendingAssessment } from '@/types/assessment';
import { leadCaptureSchema, type LeadCaptureFormData } from '@/types/leadCapture';
import { buildAssessmentSubmission } from '@/utils/formatAssessmentSubmission';
import { submitAssessment, AssessmentSubmitError } from '@/lib/submitAssessment';
import type { AssessmentResult } from '@/types/assessment';

interface AssessmentLeadFormProps {
  pending: PendingAssessment;
  onSuccess: (result: AssessmentResult) => void;
}

const selectTriggerClass =
  'border-[rgba(56,111,164,0.25)] bg-[var(--bg-primary)] text-[var(--text-primary)]';

const inputClass =
  'border-[rgba(56,111,164,0.25)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]';

export function AssessmentLeadForm({ pending, onSuccess }: AssessmentLeadFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LeadCaptureFormData>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      name: '',
      businessName: '',
      email: '',
      industry: undefined,
      businessModel: undefined,
      businessStage: undefined,
      teamSize: undefined,
      markets: undefined,
      businessDescription: '',
      website: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: LeadCaptureFormData) => {
    if (data.website) return;

    setSubmitError(null);
    try {
      const payload = buildAssessmentSubmission(data, pending);
      await submitAssessment(payload);
      onSuccess(payload.assessment.result);
    } catch (err) {
      const message =
        err instanceof AssessmentSubmitError
          ? err.message
          : 'Something went wrong. Please try again.';
      setSubmitError(message);
    }
  };

  return (
    <div className="w-full bg-[var(--bg-primary)] px-4 pb-16 pt-0">
      <header className="px-4 py-10 text-center sm:py-[60px] sm:pb-10">
        <p className="mb-2 text-[11px] uppercase tracking-[3px] text-[#386FA4]">
          Assessment Complete · One Last Step
        </p>
        <h2 className="font-playfair text-[32px] font-normal text-[var(--text-primary)] sm:text-4xl">
          Tell Us About Your Business
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-[var(--text-muted)]">
          You&apos;re almost there. Share a few details so we can tailor your results — and connect
          if you&apos;d like a follow-up conversation.
        </p>
      </header>

      <div className="mx-auto max-w-[680px] rounded-xl border border-[rgba(184,150,46,0.25)] border-t-4 border-t-[#B8962E] bg-[var(--bg-secondary)] px-6 py-8 sm:px-10 sm:py-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input tabIndex={-1} autoComplete="off" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--text-primary)]">Name</FormLabel>
                    <FormControl>
                      <Input className={inputClass} placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--text-primary)]">Business Name</FormLabel>
                    <FormControl>
                      <Input className={inputClass} placeholder="Company or venture name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className={inputClass}
                      placeholder="you@company.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">Industry / Sector</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INDUSTRY_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">Business Model</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Select business model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BUSINESS_MODEL_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="businessStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--text-primary)]">Business Stage</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BUSINESS_STAGE_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--text-primary)]">Team Size</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TEAM_SIZE_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="markets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">Markets</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Select primary market" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MARKETS_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">
                    In one sentence, what does your business do and for whom?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className={`min-h-[88px] resize-none ${inputClass}`}
                      placeholder="e.g. We help B2B SaaS founders in India scale operations without burning out."
                      maxLength={200}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitError && (
              <p
                className="rounded-md border border-[rgba(149,79,114,0.4)] bg-[rgba(149,79,114,0.1)] px-4 py-3 text-sm text-[#954F72]"
                role="alert"
              >
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-none bg-[#386FA4] py-3.5 text-[13px] font-normal uppercase tracking-[1.5px] text-[var(--text-primary)] transition-all duration-[250ms] hover:bg-[#954F72] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Submitting…
                </>
              ) : (
                'View My Results'
              )}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
