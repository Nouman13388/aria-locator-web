export function Choices({
  label,
  name,
  options,
  value,
  onChange,
  multiple = false,
  chips = false,
  error,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value: string | string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
  chips?: boolean;
  error?: string;
}) {
  const selected = Array.isArray(value) ? value : [value];
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend>{label}</legend>
      <div className="choices">
        {options.map((option) => (
          <label className={`choice ${chips ? "chip" : ""}`} key={option}>
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              checked={selected.includes(option)}
              aria-invalid={!!error}
              onChange={() =>
                onChange(
                  multiple
                    ? selected.includes(option)
                      ? selected.filter((v) => v !== option)
                      : [...selected, option]
                    : [option],
                )
              }
            />
            {option}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="error">
          {error}
        </p>
      )}
    </fieldset>
  );
}
