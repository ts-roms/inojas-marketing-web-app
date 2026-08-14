import { fill, t } from "@/lib/i18n";

/**
 * Contact form contract.
 *
 * Deliberately shared by the client form and the API route so validation
 * cannot drift between them — the browser check is a convenience, the server
 * check is the one that counts.
 *
 * All messages come from `public/locale/en.json` under `form.errors`.
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
  const errors = t.form.errors;

  switch (field) {
    case "name":
      if (!value || value.length < 2) return errors.nameRequired;
      return undefined;

    case "email":
      if (!value) return errors.emailRequired;
      if (!EMAIL_PATTERN.test(value)) return errors.emailInvalid;
      return undefined;

    case "phone":
      // Optional, but validated when supplied.
      if (!value) return undefined;
      if (!PHONE_PATTERN.test(value) || value.replace(/\D/g, "").length < 7) {
        return errors.phoneInvalid;
      }
      return undefined;

    case "subject":
      if (!value) return errors.subjectRequired;
      if (value.length < 3) return errors.subjectShort;
      return undefined;

    case "message":
      if (!value) return errors.messageRequired;
      if (value.length < MESSAGE_MIN_LENGTH) {
        return fill(errors.messageShort, { min: MESSAGE_MIN_LENGTH });
      }
      if (value.length > MESSAGE_MAX_LENGTH) {
        return fill(errors.messageLong, { max: MESSAGE_MAX_LENGTH });
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
