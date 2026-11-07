import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
type FieldProps = { label: string; error?: string; hint?: string };
export function Input({
  label,
  error,
  hint,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & FieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error || hint ? `${id}-help` : undefined}
      />
      {(error || hint) && (
        <span id={`${id}-help`} className={error ? "error" : "form-note"}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
export function Textarea({
  label,
  error,
  id,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-help` : undefined}
      />
      {error && (
        <span id={`${id}-help`} className="error">
          {error}
        </span>
      )}
    </div>
  );
}
