import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight, Check, MessageSquare, Phone } from "lucide-react";
import { buttonClass, buttonTextClass } from "@/lib/button-class";
import { contactSchema } from "@/lib/contact-schema";
import { REQUEST_FAILED_MESSAGE, requestCallback } from "@/lib/contact";

type Field = "name" | "phone" | "projectDescription";
type Errors = Partial<Record<Field, string>>;
type Values = Record<Field, string>;

const empty: Values = { name: "", phone: "", projectDescription: "" };

const PHONE = "+15035550142";

const inputClass =
  "w-full rounded-md border border-accent/45 bg-background/40 px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none";

const labelClass = "font-display text-[0.6rem] tracking-[0.22em] text-accent uppercase";

const solidButtonClass = `${buttonTextClass} ${buttonClass}`;

const quickContactClass = `flex h-12.5 items-center justify-center gap-2 px-3 ${solidButtonClass}`;

// The whole contact drawer body: call/text links, then the callback form (or its thank-you).
export function ContactForm({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const onChange =
    (field: Field) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: event.target.value }));
      if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    };

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        // Keep the first message per field: an empty phone also fails the format check
        if (key === "name" || key === "phone" || key === "projectDescription") {
          next[key] ??= issue.message;
        }
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      await requestCallback(parsed.data);
      setStatus("sent");
      setValues(empty);
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="mt-[18vh] grid gap-4">
        <span className="grid h-13 w-13 place-items-center rounded-md border border-primary bg-primary/10 text-primary">
          <Check aria-hidden="true" className="h-5 w-5" />
        </span>
        <h3 className="font-display text-2xl font-light tracking-[0.2em] text-olive uppercase sm:text-3xl">
          Thank you.
        </h3>
        <p>Your request is in. We'll call you back shortly.</p>
        <button
          type="button"
          onClick={onClose}
          className={`mt-3.5 w-fit px-4 py-2 ${solidButtonClass}`}
        >
          Back to projects
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a href={`tel:${PHONE}`} className={quickContactClass}>
          <Phone aria-hidden="true" className="h-3.5 w-3.5" />
          call us
        </a>
        <a href={`sms:${PHONE}`} className={quickContactClass}>
          <MessageSquare aria-hidden="true" className="h-3.5 w-3.5" />
          or text
        </a>
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <p className="font-display text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
          or request a call back below
        </p>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} noValidate className="grid gap-3 sm:gap-4.5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cf-name" className={labelClass}>
              Name
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={onChange("name")}
              aria-invalid={Boolean(errors.name)}
              placeholder="Your name"
              className={`h-11.25 ${inputClass}`}
            />
            {errors.name && <p className="text-xs text-primary">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="cf-phone" className={labelClass}>
              Phone Number
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={onChange("phone")}
              aria-invalid={Boolean(errors.phone)}
              placeholder="(503) 555-0142"
              className={`h-11.25 ${inputClass}`}
            />
            {errors.phone && <p className="text-xs text-primary">{errors.phone}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-desc" className={labelClass}>
            Project Description
          </label>
          <textarea
            id="cf-desc"
            name="projectDescription"
            rows={4}
            value={values.projectDescription}
            onChange={onChange("projectDescription")}
            aria-invalid={Boolean(errors.projectDescription)}
            placeholder="Tell us what you'd like to build"
            className={`resize-none py-2 ${inputClass}`}
          />
          {errors.projectDescription && (
            <p className="text-xs text-primary">{errors.projectDescription}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={`mt-1 flex h-12.5 w-full items-center justify-between px-4 disabled:opacity-50 ${solidButtonClass}`}
        >
          {status === "sending" ? "Sending…" : "Request a callback"}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </button>

        {status === "failed" && (
          <p className="text-center text-xs text-primary">{REQUEST_FAILED_MESSAGE}</p>
        )}

        <p className="text-center text-[0.65rem] text-muted-foreground">
          We will get back to you as soon as possible.
        </p>
      </form>
    </div>
  );
}
