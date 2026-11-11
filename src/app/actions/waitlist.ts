"use server";

import { Resend } from "resend";

import { waitlist } from "@/content/home";
import { WAITLIST_LIMITS as LIMITS } from "@/lib/waitlist-limits";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "email" | "type" | "consent", string>>;
  // What was submitted, so the form can refill itself (React resets forms after an action)
  values?: { name: string; phone: string; email: string; type: string; consent: boolean };
};

// Allowed "independent / office" values and their labels, from the form's own options
const TYPES: Record<string, string> = Object.fromEntries(
  waitlist.fields.type.options.map((option) => [option.value, option.label])
);

// Israeli mobile or landline, digits only after stripping spaces and dashes
const PHONE = /^(?:\+972|0)(?:[23489]|5\d|7\d)\d{7}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Waitlist sign-up: validates the form and emails the details to the team.
// Needs RESEND_API_KEY and WAITLIST_TO_EMAIL (set in Vercel, see .env.example).
export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  // Honeypot: real people never fill this hidden field (named so browser autofill skips it)
  if (formData.get("hp_extra")) {
    console.warn("Waitlist: honeypot filled, submission ignored");
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const rawPhone = String(formData.get("phone") ?? "").trim();
  const phone = rawPhone.replace(/[\s-]/g, "");
  const email = String(formData.get("email") ?? "").trim();
  const type = String(formData.get("type") ?? "");
  const consent = formData.get("consent") === "on";

  const values = { name, phone: rawPhone, email, type, consent };

  const errors: WaitlistState["errors"] = {};
  if (name.length < 2 || name.length > LIMITS.name) errors.name = "נא למלא שם מלא";
  if (rawPhone.length > LIMITS.phone || !PHONE.test(phone)) errors.phone = "נא למלא מספר טלפון תקין";
  if (email.length > LIMITS.email || !EMAIL.test(email)) errors.email = "נא למלא כתובת מייל תקינה";
  if (!Object.hasOwn(TYPES, type)) errors.type = "נא לבחור עצמאי או משרד";
  if (!consent) errors.consent = "צריך לאשר את מדיניות הפרטיות";
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Waitlist: RESEND_API_KEY or WAITLIST_TO_EMAIL is not set");
    return { status: "error", message: "משהו השתבש. נסו שוב בעוד כמה דקות.", values };
  }

  const typeLabel = TYPES[type];
  const { error } = await new Resend(apiKey).emails.send({
    // Resend's shared sender; switch to our own domain once it's verified
    from: "One Man Show <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `נרשם חדש לרשימת ההמתנה: ${name}`,
    text: [`שם: ${name}`, `טלפון: ${phone}`, `מייל: ${email}`, `סוג: ${typeLabel}`].join("\n"),
  });

  if (error) {
    console.error("Waitlist: Resend error", error);
    return { status: "error", message: "משהו השתבש. נסו שוב בעוד כמה דקות.", values };
  }
  return { status: "success" };
}
