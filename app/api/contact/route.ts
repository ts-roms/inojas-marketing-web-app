import { NextResponse } from "next/server";
import {
  emptyContactForm,
  validateContactForm,
  type ContactFormValues,
  type ContactResponse,
} from "@/lib/contact";

/**
 * Contact form endpoint.
 *
 * ---------------------------------------------------------------------------
 * INTEGRATION POINT
 * ---------------------------------------------------------------------------
 * No email provider or CRM has been specified for this project, so this route
 * does not pretend to deliver anything. Behaviour:
 *
 *   • CONTACT_WEBHOOK_URL unset  → 503 with code `not_configured`, and the UI
 *     tells the visitor their message was NOT sent, with phone/email fallbacks.
 *   • CONTACT_WEBHOOK_URL set    → the validated payload is POSTed there as
 *     JSON and the visitor gets a genuine success state.
 *
 * To use a provider SDK instead (Resend, Postmark, SendGrid, HubSpot…), replace
 * the `deliver()` body below. Everything else — validation, error shapes, the
 * client form — stays as it is. Credentials must come from environment
 * variables; never commit them.
 */

export const runtime = "nodejs";
/** Nothing here is cacheable. */
export const dynamic = "force-dynamic";

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

async function deliver(values: ContactFormValues): Promise<boolean> {
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) return false;

  const token = process.env.CONTACT_WEBHOOK_TOKEN;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      phone: values.phone,
      subject: values.subject,
      message: values.message,
      receivedAt: new Date().toISOString(),
      source: "website-contact-form",
    }),
  });

  if (!response.ok) {
    throw new Error(`Delivery endpoint responded with ${response.status}`);
  }

  return true;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, code: "bad_request", message: "Expected a JSON body." }, 400);
  }

  if (typeof payload !== "object" || payload === null) {
    return json({ ok: false, code: "bad_request", message: "Expected a JSON object." }, 400);
  }

  const raw = payload as Record<string, unknown>;

  const values: ContactFormValues = {
    ...emptyContactForm,
    name: asString(raw.name).trim(),
    email: asString(raw.email).trim(),
    phone: asString(raw.phone).trim(),
    subject: asString(raw.subject).trim(),
    message: asString(raw.message).trim(),
    website: asString(raw.website).trim(),
  };

  // Honeypot: a filled hidden field means a bot. Accept silently so the bot
  // learns nothing, but do not forward anything.
  if (values.website) {
    return json({ ok: true }, 202);
  }

  const errors = validateContactForm(values);
  if (Object.keys(errors).length > 0) {
    return json(
      {
        ok: false,
        code: "validation_error",
        message: "Some fields need attention.",
        errors,
      },
      422,
    );
  }

  if (!process.env.CONTACT_WEBHOOK_URL) {
    return json(
      {
        ok: false,
        code: "not_configured",
        message:
          "This website is not yet connected to a message delivery service, so your message was not sent.",
      },
      503,
    );
  }

  try {
    await deliver(values);
    return json({ ok: true, message: "Message received." }, 200);
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return json(
      {
        ok: false,
        code: "delivery_failed",
        message: "We could not deliver your message just now. Please try again or call us.",
      },
      502,
    );
  }
}
