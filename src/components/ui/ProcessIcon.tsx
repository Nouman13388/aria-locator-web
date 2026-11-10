const paths = [
  "M9 5H6v16h12V5h-3M9 3h6v4H9zM9 13l2 2 4-4",
  "M6 3v7m0 4v7M12 3v12m0 4v2M18 3v3m0 4v11M3 10h6M9 15h6M15 6h6",
  "M14 4a6 6 0 0 0-5 9L3 19v3h3v-3h3v-3l2-2a6 6 0 1 0 3-10zM17 7h.01",
];
export function ProcessIcon({ step }: { step: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[step]} />
    </svg>
  );
}
