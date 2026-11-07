import type { Answers } from "./schemas";
export function Review({
  answers: a,
  onEdit,
}: {
  answers: Answers;
  onEdit: (step: number) => void;
}) {
  const sections = [
    ["Location", [a.location, ...a.surroundings].filter(Boolean).join(" · ")],
    ["Move-in", `${a.moveDate} · ${a.flexibility}`],
    [
      "Layout",
      [
        `${a.bedrooms} bedrooms`,
        `${a.bathrooms} bathrooms`,
        ...a.mustHaves,
        a.notes,
      ]
        .filter(Boolean)
        .join(" · "),
    ],
    ["Budget", `${a.budgetMin} – ${a.budgetMax} per month · local currency`],
    ["Lifestyle", [a.pets, a.parking, ...a.amenities].join(" · ")],
  ];
  return (
    <div style={{ marginBottom: 28 }}>
      {sections.map(([title, value], i) => (
        <div className="review-row" key={title}>
          <div>
            <span className="eyebrow">{title}</span>
            <p>{value}</p>
          </div>
          <button
            type="button"
            className="text-button"
            onClick={() => onEdit(i)}
            aria-label={`Edit ${title.toLowerCase()}`}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
