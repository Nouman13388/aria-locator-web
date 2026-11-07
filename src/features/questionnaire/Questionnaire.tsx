import { Button } from "../../components/ui/Button";
import { QuestionnaireProvider } from "./state";
import { useStepFlow } from "./useStepFlow";
import { steps } from "./steps";
import { Progress } from "./Progress";
import { Success } from "./Success";
import { LocationStep } from "./steps/LocationStep";
import { MoveInStep } from "./steps/MoveInStep";
import { HomeStep } from "./steps/HomeStep";
import { BudgetStep } from "./steps/BudgetStep";
import { PreferencesStep } from "./steps/PreferencesStep";
import { ContactReviewStep } from "./steps/ContactReviewStep";

export function Questionnaire() {
  return (
    <QuestionnaireProvider>
      <QuestionnaireForm />
    </QuestionnaireProvider>
  );
}
const stepViews = [
  LocationStep,
  MoveInStep,
  HomeStep,
  BudgetStep,
  PreferencesStep,
];
function QuestionnaireForm() {
  const flow = useStepFlow();
  if (!flow.visible) return null;
  if (flow.complete) return <Success title={flow.title} reset={flow.reset} />;
  const View = stepViews[flow.step];
  const props = {
    answers: flow.answers,
    errors: flow.errors,
    update: flow.update,
  };
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
        <Progress step={flow.step} go={flow.go} />
        <form ref={flow.form} noValidate onSubmit={flow.next}>
          <div className="step-content">
            <span className="eyebrow accent">{steps[flow.step].short}</span>
            <h2 ref={flow.title} tabIndex={-1}>
              {steps[flow.step].title}
            </h2>
            <p>{steps[flow.step].description}</p>
            {flow.step === 5 ? (
              <ContactReviewStep {...props} onEdit={flow.go} />
            ) : (
              <View {...props} />
            )}
          </div>
          <div aria-live="polite" aria-atomic="true">
            {Object.keys(flow.errors).length > 0 && (
              <p className="error">
                {flow.errors.submit ||
                  "Please check the highlighted fields before continuing."}
              </p>
            )}
          </div>
          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              disabled={flow.step === 0 || flow.busy}
              onClick={flow.back}
            >
              ← Back
            </Button>
            <Button type="submit" disabled={flow.busy}>
              {flow.busy
                ? "Finishing…"
                : flow.step === 5
                  ? "Complete Demo"
                  : "Continue"}{" "}
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
