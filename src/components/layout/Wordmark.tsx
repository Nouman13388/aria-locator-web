import { Link } from "@tanstack/react-router";
import { siteName, wordmarkParts } from "../../data/site";
export function Wordmark() {
  return (
    <Link to="/" className="brand" aria-label={`${siteName} home`}>
      <span className="wordmark" aria-hidden="true">
        <span>{wordmarkParts.parts[0]}</span>
        <span className="wordmark-diamond">◆</span>
        <span>{wordmarkParts.parts.slice(1).join(" ")}</span>
      </span>
      <span className="brand-tag">{wordmarkParts.descriptor}</span>
    </Link>
  );
}
