import { useRef, useState, type FormEvent } from "react";
import { Input, Textarea } from "../../components/ui/Input";
import { Choices } from "../../components/ui/Choices";
import { Button } from "../../components/ui/Button";
import type { City } from "../../data/cities";
import { emptyGetStarted, layoutOptions, mustHaveOptions, parkingOptions, petOptions, validateGetStarted } from "./schema";
const labels: Record<string, string> = {
  moveDate: "Move date", layout: "Layout", pets: "Pets", parking: "Parking",
  firstName: "First name", lastName: "Last name", phone: "Phone", email: "Email", notes: "Special requests",
};
export function GetStartedForm({ city }: { city: City }) {
  const [values, setValues] = useState(emptyGetStarted);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const names = city.neighborhoods.map((area) => area.name);
  const set = <K extends keyof typeof emptyGetStarted>(key: K, value: (typeof emptyGetStarted)[K]) => {
    setValues((old) => ({ ...old, [key]: value }));
    setErrors((old) => {
      const next = { ...old };
      delete next[key];
      return next;
    });
  };
  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateGetStarted({
      ...values,
      neighborhoods: values.neighborhoods.map((name) => city.neighborhoods.find((a) => a.name === name)!.slug),
    });
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    // Nothing is sent or stored: clear every value, including contact details.
    setValues(emptyGetStarted);
    setDone(true);
    requestAnimationFrame(() => document.getElementById("get-started-success")?.focus());
  }
  const keys = Object.keys(errors);
  if (done)
    return (
      <div className="card success">
        <span className="success-mark" aria-hidden="true">✓</span>
        <h2 id="get-started-success" tabIndex={-1}>Demo complete.</h2>
        <p role="status">Nothing was sent or stored. Your answers have been cleared.</p>
        <Button onClick={() => setDone(false)}>Start over</Button>
      </div>
    );
  return (
    <form className="card get-started-form" onSubmit={submit} noValidate>
      <p className="form-note demo-note"><strong>Demo:</strong> nothing is sent or stored. Please use sample details.</p>
      {keys.length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="error-summary">
          <p>Please fix the following:</p>
          <ul>
            {keys.map((key) => (
              <li key={key}>
                <a href={`#gs-${key}`}>{labels[key] ?? key}: {errors[key]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2>Your move</h2>
      <Input id="gs-moveDate" label="Target move date" type="date" value={values.moveDate} onChange={(e) => set("moveDate", e.target.value)} error={errors.moveDate} />
      <Choices label="Layout" name="gs-layout" options={layoutOptions} value={values.layout} onChange={(v) => set("layout", v[0])} chips error={errors.layout} />
      <Choices label={`Neighborhoods in ${city.name} (optional)`} name="gs-neighborhoods" options={names} value={values.neighborhoods} onChange={(v) => set("neighborhoods", v)} multiple chips />
      <h2>Your household</h2>
      <Choices label="Pets" name="gs-pets" options={petOptions} value={values.pets} onChange={(v) => set("pets", v[0])} chips error={errors.pets} />
      <Choices label="Parking" name="gs-parking" options={parkingOptions} value={values.parking} onChange={(v) => set("parking", v[0])} chips error={errors.parking} />
      <Choices label="Must-haves (optional)" name="gs-musthaves" options={mustHaveOptions} value={values.mustHaves} onChange={(v) => set("mustHaves", v)} multiple chips />
      <h2>Contact details</h2>
      <div className="grid-2 form-pair">
        <Input id="gs-firstName" label="First name" autoComplete="given-name" value={values.firstName} onChange={(e) => set("firstName", e.target.value)} error={errors.firstName} />
        <Input id="gs-lastName" label="Last name" autoComplete="family-name" value={values.lastName} onChange={(e) => set("lastName", e.target.value)} error={errors.lastName} />
        <Input id="gs-phone" label="Phone" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} />
        <Input id="gs-email" label="Email" type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
      </div>
      <Textarea id="gs-notes" label="Special requests (optional)" maxLength={2000} value={values.notes} onChange={(e) => set("notes", e.target.value)} error={errors.notes} />
      <label className="consent">
        <input type="checkbox" checked={values.consentContact} onChange={(e) => set("consentContact", e.target.checked)} />
        Optional: I would like a follow-up about this brief (demo only).
      </label>
      <label className="consent">
        <input type="checkbox" checked={values.consentMarketing} onChange={(e) => set("consentMarketing", e.target.checked)} />
        Optional: send me occasional updates (demo only).
      </label>
      <Button type="submit">Submit demo brief <span aria-hidden="true">↗</span></Button>
    </form>
  );
}
