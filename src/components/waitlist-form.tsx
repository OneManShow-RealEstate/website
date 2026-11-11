"use client";

import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { waitlist } from "@/content/home";
import { WAITLIST_LIMITS } from "@/lib/waitlist-limits";

const initialState: WaitlistState = { status: "idle" };

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);
  const errors = state.errors ?? {};
  const values = state.values;
  const { fields } = waitlist;

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-highlight text-highlight-foreground">
          <CircleCheck className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl font-bold">{waitlist.success.title}</h3>
        <p className="mt-2 text-muted-foreground">{waitlist.success.text}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-4 text-start">
      <Field id="name" label={fields.name.label} error={errors.name}>
        <Input id="name" name="name" defaultValue={values?.name} maxLength={WAITLIST_LIMITS.name} autoComplete="name" placeholder={fields.name.placeholder} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className="h-11 bg-background" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="phone" label={fields.phone.label} error={errors.phone}>
          <Input id="phone" name="phone" defaultValue={values?.phone} maxLength={WAITLIST_LIMITS.phone} type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder={fields.phone.placeholder} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} className="h-11 bg-background text-end" />
        </Field>
        <Field id="email" label={fields.email.label} error={errors.email}>
          <Input id="email" name="email" defaultValue={values?.email} maxLength={WAITLIST_LIMITS.email} type="email" autoComplete="email" dir="ltr" placeholder={fields.email.placeholder} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className="h-11 bg-background text-end" />
        </Field>
      </div>

      <fieldset aria-describedby={errors.type ? "type-error" : undefined}>
        <legend className="mb-2 text-sm font-medium">{fields.type.label}</legend>
        <div className="grid grid-cols-2 gap-2">
          {fields.type.options.map((option) => (
            <label key={option.value} className="cursor-pointer">
              <input type="radio" name="type" value={option.value} defaultChecked={values?.type === option.value} className="peer sr-only" />
              <span className="flex h-11 items-center justify-center rounded-lg border bg-background text-sm font-semibold transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 hover:border-primary/40">
                {option.label}
              </span>
            </label>
          ))}
        </div>
        <FieldError id="type-error" error={errors.type} />
      </fieldset>

      {/* Honeypot, hidden from people and screen readers */}
      <input type="text" name="hp_extra" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consent" defaultChecked={values?.consent} aria-describedby={errors.consent ? "consent-error" : undefined} className="mt-0.5 size-4 shrink-0 accent-primary" />
          <span>
            {waitlist.consent.before}
            <Link href={waitlist.consent.href} target="_blank" className="font-medium text-primary underline underline-offset-2">
              {waitlist.consent.link}
            </Link>
          </span>
        </label>
        <FieldError id="consent-error" error={errors.consent} />
      </div>

      {state.message && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="h-12 text-base">
        {pending ? waitlist.pending : waitlist.submit}
      </Button>
      <p className="text-center text-sm text-muted-foreground">{waitlist.note}</p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1 text-sm text-destructive">
      {error}
    </p>
  );
}
