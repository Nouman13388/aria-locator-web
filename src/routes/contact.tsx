import { pageIntros } from "../data/pages";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { Intro, Section } from "../components/ui/Section";
import { Input, Textarea } from "../components/ui/Input";
import { Button, ButtonLink } from "../components/ui/Button";
import { contactSchema } from "../features/questionnaire/schemas";
import { contact } from "../data/site";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact",
      "Try the Aria demo contact form. Nothing is sent or stored.",
    ),
  component: Contact,
});
const schema = contactSchema.extend({
  phone: z.union([z.literal(""), contactSchema.shape.phone]),
  message: z
    .string()
    .trim()
    .min(10, "Please add a message of at least 10 characters.")
    .max(2000, "Keep your message under 2,000 characters."),
});
const empty = { name: "", email: "", phone: "", message: "" };
function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  function submit(e: FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(values);
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
    <>
      <Intro
        eyebrow={pageIntros.contact.eyebrow}
        title={pageIntros.contact.title}
      >
        {pageIntros.contact.description}
      </Intro>
      <Section>
        <div className="grid-2" style={{ alignItems: "start" }}>
          <aside className="contact-aside">
            <span className="eyebrow accent">A considered connection</span>
            <h2>
              Good spaces.
              <br />
              <em>Thoughtful conversations.</em>
            </h2>
            <p>
              Tell us what’s on your mind, or explore the questionnaire to put
              your preferences into words.
            </p>
            <div className="diamond" aria-hidden="true">
              ◆
            </div>
            <span className="eyebrow muted">{contact.label}</span>
            <p>{contact.email}</p>
            <p className="form-note">
              Placeholder only. This is not a real service contact.
            </p>
            <img
              src="/images/contact-0.jpg"
              alt="Calm architectural lounge with a travertine desk and warm light"
              loading="lazy"
              width="600"
              height="400"
            />
          </aside>
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
                <Button onClick={() => setSuccess(false)}>Try Again</Button>
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
                    <p className="error">
                      Please check the highlighted fields.
                    </p>
                  )}
                </div>
                <Button type="submit">
                  Try Demo Form <span aria-hidden="true">↗</span>
                </Button>
                <p className="form-note">
                  No network calls. No contact details are stored.
                </p>
              </form>
            )}
          </div>
        </div>
      </Section>
      <Section band>
        <div className="center">
          <span className="eyebrow accent">Ready to find your direction?</span>
          <h2>Begin with what feels like home.</h2>
          <ButtonLink>Try the Questionnaire ↗</ButtonLink>
        </div>
      </Section>
    </>
  );
}
