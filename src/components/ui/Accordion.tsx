export function Accordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="accordion">
      <summary>{question}</summary>
      <p>{answer}</p>
    </details>
  );
}
