import { useRef, useState, type FormEvent } from "react";
import { Input, Textarea } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { modalCopy as copy } from "../../data/content";
import { emptyInquiry, validateInquiry } from "./inquirySchema";
export function InquiryForm() {
  const [values, setValues] = useState(emptyInquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const set = <K extends keyof typeof emptyInquiry>(key: K, value: (typeof emptyInquiry)[K]) => {
    setValues((old) => ({ ...old, [key]: value }));
    setErrors((old) => {
      const next = { ...old };
      delete next[key];
      return next;
    });
  };
  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateInquiry(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) return void form.current?.querySelector<HTMLElement>(`#inq-${first}`)?.focus();
    setValues(emptyInquiry); // nothing is sent or stored
    setDone(true);
    requestAnimationFrame(() => document.getElementById("inq-success")?.focus());
  }
  if (done)
    return (
      <div className="success">
        <span className="success-mark" aria-hidden="true">✓</span>
        <h3 id="inq-success" tabIndex={-1}>{copy.success}</h3>
        <p role="status">{copy.successNote}</p>
        <Button type="button" appearance="secondary" onClick={() => setDone(false)}>Start over</Button>
      </div>
    );
  return (
    <form ref={form} className="pill-form" onSubmit={submit} noValidate>
      <p className="form-note demo-note"><strong>Demo form.</strong> {copy.formNote}</p>
      <Input id="inq-moveDate" label={copy.moveDate} type="date" value={values.moveDate} onChange={(e) => set("moveDate", e.target.value)} error={errors.moveDate} />
      <Input id="inq-firstName" label={copy.firstName} autoComplete="given-name" value={values.firstName} onChange={(e) => set("firstName", e.target.value)} error={errors.firstName} />
      <Input id="inq-lastName" label={copy.lastName} autoComplete="family-name" value={values.lastName} onChange={(e) => set("lastName", e.target.value)} error={errors.lastName} />
      <Input id="inq-phone" label={copy.phone} type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} />
      <Input id="inq-email" label={copy.email} type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
      <Textarea id="inq-message" label={copy.message} maxLength={2000} value={values.message} onChange={(e) => set("message", e.target.value)} error={errors.message} />
      <label className="consent">
        <input type="checkbox" checked={values.consent} onChange={(e) => set("consent", e.target.checked)} />
        {copy.consent}
      </label>
      <Button type="submit" appearance="pill-accent">{copy.submit}</Button>
    </form>
  );
}
