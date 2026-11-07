import type { Answers } from "../schemas";
export type StepProps = {
  answers: Answers;
  errors: Record<string, string>;
  update: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
};
