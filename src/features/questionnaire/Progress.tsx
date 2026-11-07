import { steps } from "./steps";
export function Progress({
  step,
  go,
}: {
  step: number;
  go: (step: number) => void;
}) {
  return (
    <>
      <div className="progress-meta">
        <span>Step {step + 1} of 6</span>
        <span>{Math.round(((step + 1) / 6) * 100)}% complete</span>
      </div>
      <div className="step-track">
        {steps.map((item, index) => (
          <button
            key={item.short}
            type="button"
            className="step-tab"
            disabled={index > step}
            aria-current={step === index ? "step" : undefined}
            aria-label={`Step ${index + 1}: ${item.short}`}
            onClick={() => go(index)}
          >
            {String(index + 1).padStart(2, "0")}
            <br />
            {item.short}
          </button>
        ))}
      </div>
      <progress max={6} value={step + 1} aria-label="Questionnaire progress" />
    </>
  );
}
