import { Link } from "@tanstack/react-router";
import { siteName, wordmarkParts } from "../../data/site";
export function Wordmark() {
  return (
    <Link to="/" className="brand" aria-label={`${siteName} home`}>
      <span className="wordmark" aria-hidden="true">
        {wordmarkParts.name}
        <span className="wordmark-mark">◆</span>
      </span>
    </Link>
  );
}
