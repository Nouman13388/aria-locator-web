import { actions } from "../../data/actions";
import { useRef, useState, type FormEvent } from "react";
import { Input, Textarea } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { contactSchema } from "./schema";
const empty = { name: "", email: "", phone: "", message: "" };
export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  function submit(e: FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const next = Object.fromEntries(
        result.error.issues.map((i) => [String(i.path[0]), i.message]),
      );
      setErrors(next);
      (
        form.current?.querySelector(
          `#contact-${Object.keys(next)[0]}`,
        ) as HTMLElement
      )?.focus();
      return;
    }
    setValues(empty);
    setErrors({});
    setSuccess(true);
    requestAnimationFrame(() =>
      document.getElementById("contact-success")?.focus(),
    );
  }
  function update(key: keyof typeof empty, value: string) {
    setValues((old) => ({ ...old, [key]: value }));
    setErrors((old) => {
      const next = { ...old };
      delete next[key];
      return next;
    });
  }
  return (
    <div className="card">
      {success ? (
        <div className="success">
          <span className="success-mark" aria-hidden="true">
            ✓
          </span>
          <h2 id="contact-success" tabIndex={-1}>
            Demo complete.
          </h2>
          <p role="status">
            Nothing was sent. Your message and contact details have been
            cleared.
          </p>
          <Button onClick={() => setSuccess(false)}>{actions.tryAgain}</Button>
        </div>
      ) : (
        <form ref={form} onSubmit={submit} noValidate>
          <span className="eyebrow accent">Send a little context</span>
          <h3>How can we help?</h3>
          <p className="form-note">
            Demo form — nothing is sent. Please use sample details.
          </p>
          <Input
            id="contact-name"
            label="Name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            error={errors.name}
          />
          <Input
            id="contact-email"
            label="Email address"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            error={errors.email}
          />
          <Input
            id="contact-phone"
            label="Phone number (optional)"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            error={errors.phone}
          />
          <Textarea
            id="contact-message"
            label="Your message"
            maxLength={2000}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            error={errors.message}
          />
          <div aria-live="polite">
            {Object.keys(errors).length > 0 && (
              <p className="error">Please check the highlighted fields.</p>
            )}
          </div>
          <Button type="submit">
            {actions.tryContactForm} <span aria-hidden="true">↗</span>
          </Button>
          <p className="form-note">
            No network calls. No contact details are stored.
          </p>
        </form>
      )}
    </div>
  );
}
