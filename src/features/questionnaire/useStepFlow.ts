import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { getFirstInvalidStep } from "./stepGuard";
import { validateStep, type Answers } from "./schemas";
import { useQuestionnaire } from "./state";
import { submitLead } from "./submitLead";

export function useStepFlow() {
  const {
    state: { answers, complete },
    ready,
    dispatch,
  } = useQuestionnaire();
  const { step: urlStep } = useSearch({ from: "/get-started" });
  const step = urlStep - 1;
  const navigate = useNavigate();
  const invalidStep = ready ? getFirstInvalidStep(answers, urlStep) : null;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (ready && !complete && invalidStep !== null) {
      void navigate({
        to: "/get-started",
        search: { step: invalidStep },
        replace: true,
      });
    }
  }, [ready, complete, invalidStep, navigate]);
  useEffect(() => {
    setErrors({});
    if (!ready || (!complete && invalidStep !== null)) return;
    if (didMount.current) title.current?.focus();
    didMount.current = true;
  }, [step, complete, ready, invalidStep]);

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
    void navigate({
      to: "/get-started",
      search: { step: next + 1 },
      replace: false,
    });
  }
  async function next(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const found = validateStep(step, answers);
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
      await submitLead(answers);
      dispatch({ type: "complete" });
    } catch {
      setErrors({ submit: "The demo could not finish. Please try again." });
    } finally {
      setBusy(false);
    }
  }
  function reset() {
    dispatch({ type: "reset" });
    go(0);
  }
  return {
    answers,
    step,
    complete,
    errors,
    busy,
    title,
    form,
    update,
    go,
    next,
    reset,
    back: () => go(step - 1),
    visible: ready && (complete || invalidStep === null),
  };
}
