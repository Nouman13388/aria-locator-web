import { Input } from "../../../components/ui/Input";
import { Choices } from "../../../components/ui/Choices";
import type { Answers } from "../schemas";
import type { StepProps } from "./types";

export function StepInput({
  answers,
  errors,
  update,
  name,
  label,
  type = "text",
  hint,
}: StepProps & {
  name: keyof Answers;
  label: string;
  type?: string;
  hint?: string;
}) {
  return (
    <Input
      id={name}
      label={label}
      type={type}
      hint={hint}
      min={type === "number" ? "0.01" : undefined}
      step={type === "number" ? "0.01" : undefined}
      inputMode={type === "number" ? "decimal" : undefined}
      value={String(answers[name])}
      onChange={(e) => update(name, e.target.value)}
      error={errors[name]}
      autoComplete={
        name === "name"
          ? "name"
          : name === "email"
            ? "email"
            : name === "phone"
              ? "tel"
              : undefined
      }
    />
  );
}
export function StepChoices({
  answers,
  errors,
  update,
  name,
  label,
  options,
  multiple = false,
  chips = false,
}: StepProps & {
  name: keyof Answers;
  label: string;
  options: readonly string[];
  multiple?: boolean;
  chips?: boolean;
}) {
  return (
    <Choices
      name={name}
      label={label}
      options={options}
      value={answers[name]}
      multiple={multiple}
      chips={chips}
      error={errors[name]}
      onChange={(values) => update(name, multiple ? values : values[0])}
    />
  );
}
