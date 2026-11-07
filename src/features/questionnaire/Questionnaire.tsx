import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button, ButtonLink } from "../../components/ui/Button";
import { Input, Textarea } from "../../components/ui/Input";
import { Choices } from "../../components/ui/Choices";
import { steps, locationChips, mustHaveOptions, amenityOptions } from "./steps";
import { validateStep, type Answers } from "./schemas";
import { QuestionnaireProvider, useQuestionnaire } from "./state";
import { Review } from "./Review";
import { submitLead } from "./submitLead";
export function Questionnaire() {
  return (
    <QuestionnaireProvider>
      <QuestionnaireForm />
    </QuestionnaireProvider>
  );
}
function QuestionnaireForm() {
  const {
    state: { answers: a, step, complete },
    dispatch,
  } = useQuestionnaire();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) title.current?.focus();
    didMount.current = true;
  }, [step, complete]);
  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    dispatch({ type: "update", patch: { [key]: value } });
    setErrors((old) => {
      const next = { ...old };
      delete next[key];
      return next;
    });
  }
  function go(next: number) {
    setErrors({});
    dispatch({ type: "step", step: next });
  }
  const field = (
    key: keyof Answers,
    label: string,
    type = "text",
    hint?: string,
  ) => (
    <Input
      key={key}
      id={key}
      label={label}
      type={type}
      min={type === "number" ? "0.01" : undefined}
      step={type === "number" ? "0.01" : undefined}
      inputMode={type === "number" ? "decimal" : undefined}
      value={String(a[key])}
      onChange={(e) => update(key, e.target.value)}
      error={errors[key]}
      hint={hint}
      autoComplete={
        key === "name"
          ? "name"
          : key === "email"
            ? "email"
            : key === "phone"
              ? "tel"
              : undefined
      }
    />
  );
  const choices = (
    key: keyof Answers,
    label: string,
    options: readonly string[],
    multiple = false,
    chips = false,
  ) => (
    <>
      <Choices
        name={key}
        label={label}
        options={options}
        value={a[key]}
        multiple={multiple}
        chips={chips}
        error={errors[key]}
        onChange={(v) => update(key, multiple ? v : v[0])}
      />
    </>
  );
  async function next(e: FormEvent) {
    e.preventDefault();
    let found = validateStep(step, a);
    if (step === 5) {
      for (let i = 0; i < 5; i++) {
        const previous = validateStep(i, a);
        if (Object.keys(previous).length) {
          go(i);
          found = previous;
          break;
        }
      }
    }
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => {
        const first = Object.keys(found)[0];
        const control =
          document.getElementById(first) ??
          form.current?.querySelector<HTMLElement>(`[name="${first}"]`);
        if (control instanceof HTMLElement) control.focus();
        else title.current?.focus();
      });
      return;
    }
    if (step < 5) {
      go(step + 1);
      return;
    }
    setBusy(true);
    try {
      await submitLead(a);
      dispatch({ type: "complete" });
    } catch {
      setErrors({ submit: "The demo could not finish. Please try again." });
    } finally {
      setBusy(false);
    }
  }
  if (complete)
    return (
      <div className="wrap questionnaire-shell">
        <div className="questionnaire-card success">
          <span className="success-mark" aria-hidden="true">
            ✓
          </span>
          <h1 ref={title} tabIndex={-1}>
            A thoughtful start.
          </h1>
          <p role="status">
            Demo only. No inquiry was sent, and no data was stored.
          </p>
          <p>
            Your answers and contact details have been cleared. This was a
            preview of the Aria experience.
          </p>
          <div className="actions" style={{ justifyContent: "center" }}>
            <Button onClick={() => dispatch({ type: "reset" })}>
              Try Again
            </Button>
            <ButtonLink to="/" variant="secondary">
              Back to Home
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  return (
    <div className="wrap questionnaire-shell">
      <div className="center" style={{ marginBottom: 28 }}>
        <span className="eyebrow accent">
          Your preferences ◆ Your next chapter
        </span>
        <h1>Curate your residence</h1>
        <p className="form-note">A more personal search starts here.</p>
      </div>
      <div className="questionnaire-card">
        <div className="progress-meta">
          <span>Step {step + 1} of 6</span>
          <span>{Math.round(((step + 1) / 6) * 100)}% complete</span>
        </div>
        <div className="step-track">
          {steps.map((s, i) => (
            <button
              key={s.short}
              type="button"
              className="step-tab"
              disabled={i > step}
              aria-current={step === i ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${s.short}`}
              onClick={() => go(i)}
            >
              {String(i + 1).padStart(2, "0")}
              <br />
              {s.short}
            </button>
          ))}
        </div>
        <progress
          max={6}
          value={step + 1}
          aria-label="Questionnaire progress"
        />
        <form ref={form} noValidate onSubmit={next}>
          <div className="step-content">
            <span className="eyebrow accent">{steps[step].short}</span>
            <h2 ref={title} tabIndex={-1}>
              {steps[step].title}
            </h2>
            <p>{steps[step].description}</p>
            {step === 0 && (
              <>
                {field(
                  "location",
                  "City or neighborhood",
                  "text",
                  "For example, your preferred city and nearby areas.",
                )}
                {choices(
                  "surroundings",
                  "What kind of surroundings appeal to you?",
                  locationChips,
                  true,
                  true,
                )}
                <img
                  src="/images/get-started-questionnaire-0.jpg"
                  alt="Sunlit limestone architecture and a peaceful tree-lined street"
                  style={{ height: 150, borderRadius: 8 }}
                />
              </>
            )}
            {step === 1 && (
              <>
                {field("moveDate", "Target move-in date", "date")}
                {choices("flexibility", "How flexible is your date?", [
                  "Exact date",
                  "±2 weeks",
                  "Flexible",
                ])}
              </>
            )}
            {step === 2 && (
              <>
                {choices("bedrooms", "Bedrooms", [
                  "Studio",
                  "1",
                  "2",
                  "3",
                  "4+",
                ])}
                {choices("bathrooms", "Bathrooms", ["1", "1.5", "2", "3+"])}
                {choices("mustHaves", "Must-haves", mustHaveOptions, true)}
                <Textarea
                  id="notes"
                  label="Anything else that matters? (optional)"
                  value={a.notes}
                  maxLength={500}
                  onChange={(e) => update("notes", e.target.value)}
                  error={errors.notes}
                />
              </>
            )}
            {step === 3 && (
              <>
                <div className="form-grid">
                  {field("budgetMin", "Minimum monthly rent", "number")}
                  {field("budgetMax", "Maximum monthly rent", "number")}
                </div>
                <p className="form-note">
                  Use the same local currency for both amounts. These are your
                  preferences, not a quote.
                </p>
              </>
            )}
            {step === 4 && (
              <>
                {choices("pets", "Pets", [
                  "No pets",
                  "Cat(s)",
                  "Dog(s)",
                  "Other pets",
                ])}
                {choices("parking", "Parking", [
                  "Not needed",
                  "One space",
                  "Two or more spaces",
                  "Flexible",
                ])}
                {choices(
                  "amenities",
                  "Amenities (optional)",
                  amenityOptions,
                  true,
                )}
              </>
            )}
            {step === 5 && (
              <>
                <Review answers={a} onEdit={go} />
                {field("name", "Your name")}
                {field("email", "Email address", "email")}
                {field("phone", "Phone number", "tel")}
                <p className="form-note">
                  Contact details stay in memory only. Refreshing this page
                  clears them.
                </p>
              </>
            )}
          </div>
          <div aria-live="polite" aria-atomic="true">
            {Object.keys(errors).length > 0 && (
              <p className="error">
                {errors.submit ||
                  "Please check the highlighted fields before continuing."}
              </p>
            )}
          </div>
          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              disabled={step === 0 || busy}
              onClick={() => go(step - 1)}
            >
              ← Back
            </Button>
            <Button type="submit" disabled={busy}>
              {busy ? "Finishing…" : step === 5 ? "Complete Demo" : "Continue"}{" "}
              <span aria-hidden="true">→</span>
            </Button>
          </div>
          <p className="form-note center" style={{ margin: "20px 0 0" }}>
            Demo only · No inquiry is sent
          </p>
        </form>
      </div>
    </div>
  );
}
