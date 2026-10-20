import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { contactSchema } from "@/lib/contact-schema";
import { requestCallback } from "@/lib/contact";

type Field = "name" | "phone" | "projectDescription";
type Errors = Partial<Record<Field, string>>;
type Values = Record<Field, string>;

const empty: Values = { name: "", phone: "", projectDescription: "" };

const inputClass =
  "w-full rounded-md border border-accent/45 bg-background/40 px-3 py-1.5 text-sm text-foreground " +
  "placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none";

const labelClass = "font-display text-[0.6rem] tracking-[0.22em] text-accent uppercase";

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [message, setMessage] = useState("");

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
    setMessage("");
    try {
      await requestCallback(parsed.data);
      setStatus("sent");
      setValues(empty);
    } catch (error) {
      setStatus("failed");
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : "We couldn't send your request. Please call or text us instead.",
      );
    }
  }

  if (status === "sent") {
    return (
      <p className="font-display text-sm leading-relaxed tracking-wide text-primary">
        Thank you — your request is in. We'll call you back shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3">
      <div>
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
          className={`mt-1 ${inputClass}`}
        />
        {errors.name && <p className="mt-1 text-xs text-primary">{errors.name}</p>}
      </div>

      <div>
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
          className={`mt-1 ${inputClass}`}
        />
        {errors.phone && <p className="mt-1 text-xs text-primary">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="cf-desc" className={labelClass}>
          Project Description
        </label>
        <textarea
          id="cf-desc"
          name="projectDescription"
          rows={3}
          value={values.projectDescription}
          onChange={onChange("projectDescription")}
          aria-invalid={Boolean(errors.projectDescription)}
          placeholder="Tell us what you'd like to build"
          className={`mt-1 resize-none ${inputClass}`}
        />
        {errors.projectDescription && (
          <p className="mt-1 text-xs text-primary">{errors.projectDescription}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md border border-primary bg-primary/10 px-4 py-2 font-display text-sm font-medium tracking-[0.25em] text-primary uppercase transition-colors duration-300 hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Request a callback"}
      </button>

      {status === "failed" && <p className="text-xs text-primary">{message}</p>}
    </form>
  );
}
