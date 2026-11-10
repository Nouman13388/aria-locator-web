export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (page: number) => void }) {
  if (pages <= 1) return null;
  const go = (label: string, target: number, text: string, disabled: boolean) => (
    <button type="button" aria-label={label} disabled={disabled} onClick={() => onChange(target)}>
      <span aria-hidden="true">{text}</span>
    </button>
  );
  return (
    <nav className="pagination" aria-label="Pagination">
      {go("First page", 1, "«", page === 1)}
      {go("Previous page", page - 1, "‹", page === 1)}
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button key={n} type="button" aria-label={`Page ${n}`} aria-current={n === page ? "page" : undefined} onClick={() => onChange(n)}>
          {n}
        </button>
      ))}
      {go("Next page", page + 1, "›", page === pages)}
      {go("Last page", pages, "»", page === pages)}
    </nav>
  );
}
