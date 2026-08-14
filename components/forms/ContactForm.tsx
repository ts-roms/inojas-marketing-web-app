"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icons";
import { site } from "@/data/site";
import {
  MESSAGE_MAX_LENGTH,
  contactFieldOrder,
  emptyContactForm,
  validateContactForm,
  validateField,
  type ContactErrors,
  type ContactFieldName,
  type ContactFormValues,
  type ContactResponse,
} from "@/lib/contact";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  /** Delivery is not wired up — say so plainly rather than faking a send. */
  | { kind: "unconfigured"; message: string }
  | { kind: "error"; message: string };

const inputBase =
  "w-full rounded-md bg-white px-4 text-brand-900 shadow-subtle ring-1 ring-inset transition-shadow duration-200 placeholder:text-brand-500";

/**
 * Contact form.
 *
 * State is controlled, validation is shared with the API route, and every
 * error is announced: fields carry `aria-invalid` plus a linked description,
 * and form-level outcomes land in a live region. Nothing claims a message was
 * delivered unless the server actually delivered it.
 */
export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const formId = useId();
  const [values, setValues] = useState<ContactFormValues>({
    ...emptyContactForm,
    subject: defaultSubject,
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactFieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const fieldId = (field: ContactFieldName) => `${formId}-${field}`;
  const errorId = (field: ContactFieldName) => `${formId}-${field}-error`;
  const isSubmitting = status.kind === "submitting";

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as ContactFieldName | "website";
    const next = { ...values, [field]: event.target.value };
    setValues(next);

    // Re-validate a field that has already errored, so the message clears as
    // soon as the visitor fixes it.
    if (field !== "website" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, next) }));
    }
  }

  function handleBlur(field: ContactFieldName) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, values) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(contactFieldOrder.map((field) => [field, true])));

    const firstInvalid = contactFieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setStatus({ kind: "error", message: "Please correct the highlighted fields." });
      formRef.current
        ?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)
        ?.focus();
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: ContactResponse = await response.json().catch(() => ({ ok: false }));

      if (response.ok && data.ok) {
        setStatus({
          kind: "success",
          message:
            "Salamat — your enquiry has been received. Our team will get back to you with a quotation or to arrange a check-up.",
        });
        setValues({ ...emptyContactForm });
        setTouched({});
        setErrors({});
        return;
      }

      if (data.code === "not_configured") {
        setStatus({
          kind: "unconfigured",
          message:
            data.message ??
            "This form is not connected to a delivery service yet, so your message was not sent.",
        });
        return;
      }

      if (data.code === "validation_error" && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "error", message: data.message ?? "Please correct the fields above." });
        return;
      }

      setStatus({
        kind: "error",
        message: data.message ?? "Something went wrong. Please try again or call us.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "We could not reach the server. Check your connection, or contact us by phone or email.",
      });
    }
  }

  /* ---------------------------------------------------------------- */
  /* Success state                                                    */
  /* ---------------------------------------------------------------- */
  if (status.kind === "success") {
    return (
      <div
        role="status"
        tabIndex={-1}
        className="rounded-xl bg-white p-8 text-center ring-1 ring-hairline shadow-card sm:p-10"
      >
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <Icon name="checkCircle" className="size-7" />
        </span>
        <h3 className="mt-6 text-h3 text-brand-900">Message sent</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-brand-600">{status.message}</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-7 inline-flex h-11 items-center justify-center rounded-md bg-brand-900 px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-brand-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl bg-white p-6 ring-1 ring-hairline shadow-card sm:p-8"
    >
      <p className="text-sm text-brand-500">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          required
          autoComplete="name"
          placeholder="Juan dela Cruz"
          value={values.name}
          error={touched.name ? errors.name : undefined}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          id={fieldId("name")}
          errorId={errorId("name")}
          disabled={isSubmitting}
        />

        <Field
          label="Email address"
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="juan@company.com.ph"
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          id={fieldId("email")}
          errorId={errorId("email")}
          disabled={isSubmitting}
        />

        <Field
          label="Phone number"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="Optional"
          placeholder={site.contact.mobileDisplay}
          value={values.phone}
          error={touched.phone ? errors.phone : undefined}
          onChange={handleChange}
          onBlur={() => handleBlur("phone")}
          id={fieldId("phone")}
          errorId={errorId("phone")}
          disabled={isSubmitting}
        />

        <Field
          label="Subject"
          name="subject"
          required
          placeholder="Forklift hydraulic leak — Calamba warehouse"
          value={values.subject}
          error={touched.subject ? errors.subject : undefined}
          onChange={handleChange}
          onBlur={() => handleBlur("subject")}
          id={fieldId("subject")}
          errorId={errorId("subject")}
          disabled={isSubmitting}
        />

        <div className="sm:col-span-2">
          <Field
            as="textarea"
            label="Message"
            name="message"
            required
            rows={6}
            placeholder="Tell us the equipment and brand, what it is doing (or not doing), and where it is located."
            hint={`${values.message.length}/${MESSAGE_MAX_LENGTH}`}
            value={values.message}
            error={touched.message ? errors.message : undefined}
            onChange={handleChange}
            onBlur={() => handleBlur("message")}
            id={fieldId("message")}
            errorId={errorId("message")}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Honeypot — hidden from people and assistive tech, catnip for bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-website`}>Website (leave this field empty)</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-900 px-6 text-base font-medium text-white shadow-subtle transition-all duration-200 hover:bg-brand-800 hover:shadow-lift disabled:pointer-events-none disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Icon name="spinner" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Icon name="arrowRight" className="size-4" />
            </>
          )}
        </button>

        <p className="text-sm text-brand-500">
          Or call{" "}
          <a
            href={site.contact.mobileHref}
            className="font-medium text-accent-700 underline underline-offset-4 hover:text-accent-800"
          >
            {site.contact.mobileDisplay}
          </a>
        </p>
      </div>

      {/* Form-level outcome, announced to screen readers. */}
      <div aria-live="polite" className="empty:hidden">
        {status.kind === "error" || status.kind === "unconfigured" ? (
          <div
            className={cn(
              "mt-6 flex gap-3 rounded-md p-4 text-sm",
              status.kind === "unconfigured"
                ? "bg-amber-50 text-amber-900 ring-1 ring-inset ring-amber-200"
                : "bg-red-50 text-red-800 ring-1 ring-inset ring-red-200",
            )}
          >
            <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
            <div>
              <p className="font-medium">
                {status.kind === "unconfigured" ? "Message not sent" : "Something went wrong"}
              </p>
              <p className="mt-1 leading-relaxed">{status.message}</p>
              {status.kind === "unconfigured" ? (
                <p className="mt-2 leading-relaxed">
                  Please email{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="font-medium underline underline-offset-4"
                  >
                    {site.contact.email}
                  </a>{" "}
                  or call{" "}
                  <a
                    href={site.contact.mobileHref}
                    className="font-medium underline underline-offset-4"
                  >
                    {site.contact.mobileDisplay}
                  </a>{" "}
                  instead.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Field                                                                      */
/* -------------------------------------------------------------------------- */

type FieldProps = {
  label: string;
  name: ContactFieldName;
  id: string;
  errorId: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  rows?: number;
  as?: "input" | "textarea";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
};

function Field({
  label,
  name,
  id,
  errorId,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required = false,
  disabled = false,
  placeholder,
  type = "text",
  rows = 5,
  as = "input",
  autoComplete,
  inputMode,
}: FieldProps) {
  const invalid = Boolean(error);
  const control = cn(
    inputBase,
    as === "input" ? "h-12" : "py-3.5 leading-relaxed",
    invalid ? "ring-red-400 focus:ring-red-500" : "ring-brand-200 focus:ring-brand-500",
    disabled && "cursor-not-allowed opacity-60",
  );

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-brand-800">
          {label}
          {required ? (
            <>
              {" "}
              <span aria-hidden="true" className="text-accent-700">
                *
              </span>
              <span className="sr-only">(required)</span>
            </>
          ) : null}
        </label>
        {hint ? <span className="text-xs text-brand-500">{hint}</span> : null}
      </div>

      <div className="mt-2">
        {as === "textarea" ? (
          <textarea
            id={id}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? errorId : undefined}
            className={control}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={autoComplete}
            inputMode={inputMode}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? errorId : undefined}
            className={control}
          />
        )}
      </div>

      {invalid ? (
        <p id={errorId} className="mt-2 flex items-start gap-1.5 text-sm text-red-700">
          <Icon name="alert" className="mt-0.5 size-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
