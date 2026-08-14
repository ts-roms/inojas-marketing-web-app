/**
 * Contact form contract.
 *
 * Deliberately shared by the client form and the API route so validation
 * cannot drift between them — the browser check is a convenience, the server
 * check is the one that counts.
 */

export type ContactFieldName = "name" | "email" | "phone" | "subject" | "message";

export type ContactFormValues = Record<ContactFieldName, string> & {
  /** Honeypot: real users never see it, bots fill it in. */
  website?: string;
};

export type ContactErrors = Partial<Record<ContactFieldName, string>>;

export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 2000;

/** Pragmatic email check — the real proof is a deliverable reply. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Digits, spaces and the usual separators; length checked on the digits only. */
const PHONE_PATTERN = /^[+()\d\s.-]{7,}$/;

export const emptyContactForm: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

export function validateField(
  field: ContactFieldName,
  values: ContactFormValues,
): string | undefined {
  const value = (values[field] ?? "").trim();

  switch (field) {
    case "name":
      if (!value) return "Enter your full name.";
      if (value.length < 2) return "Enter your full name.";
      return undefined;

    case "email":
      if (!value) return "Enter your email address so we can reply.";
      if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address, e.g. name@company.com.";
      return undefined;

    case "phone":
      // Optional, but validated when supplied.
      if (!value) return undefined;
      if (!PHONE_PATTERN.test(value) || value.replace(/\D/g, "").length < 7) {
        return "Enter a valid phone number, or leave this field empty.";
      }
      return undefined;

    case "subject":
      if (!value) return "Add a subject so we can route your message.";
      if (value.length < 3) return "Add a slightly longer subject.";
      return undefined;

    case "message":
      if (!value) return "Tell us what you need help with.";
      if (value.length < MESSAGE_MIN_LENGTH) {
        return `Please add a little more detail (at least ${MESSAGE_MIN_LENGTH} characters).`;
      }
      if (value.length > MESSAGE_MAX_LENGTH) {
        return `Please keep the message under ${MESSAGE_MAX_LENGTH} characters.`;
      }
      return undefined;

    default:
      return undefined;
  }
}

export const contactFieldOrder: ContactFieldName[] = [
  "name",
  "email",
  "phone",
  "subject",
  "message",
];

export function validateContactForm(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of contactFieldOrder) {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  }
  return errors;
}

/** Response shape returned by POST /api/contact. */
export type ContactResponse = {
  ok: boolean;
  /** `not_configured` means no delivery service is wired up yet. */
  code?: "validation_error" | "not_configured" | "delivery_failed" | "bad_request";
  message?: string;
  errors?: ContactErrors;
};
