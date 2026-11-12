// Max field lengths for the waitlist form, shared by the inputs and the server check.
// (A "use server" file may only export async functions, so this lives here.)
export const WAITLIST_LIMITS = { name: 80, phone: 20, email: 254 } as const;
