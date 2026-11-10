import { useId, useState } from "react";
// Button + region pattern; any number of panels can be open.
export function Accordion({ items }: { items: readonly { question: string; answer: string }[] }) {
  const base = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((old) => {
      const next = new Set(old);
      if (!next.delete(i)) next.add(i);
      return next;
    });
  return (
    <div className="accordion-list">
      {items.map((item, i) => (
        <div className="accordion" key={item.question}>
          <h3>
            <button type="button" id={`${base}-b${i}`} aria-expanded={open.has(i)} aria-controls={`${base}-p${i}`} onClick={() => toggle(i)}>
              {item.question}
              <span aria-hidden="true">{open.has(i) ? "−" : "+"}</span>
            </button>
          </h3>
          <div id={`${base}-p${i}`} role="region" aria-labelledby={`${base}-b${i}`} hidden={!open.has(i)}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
