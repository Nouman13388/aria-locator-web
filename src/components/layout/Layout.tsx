import { actions, ctaCopy } from "../../data/actions";
import { ButtonLink } from "../ui/Button";
export { Header } from "./Header";
export { Footer } from "./Footer";
export function CTA() {
  return (
    <div className="cta">
      <span className="eyebrow">{ctaCopy.eyebrow}</span>
      <h2>
        {ctaCopy.title}
        <br />
        <em>{ctaCopy.emphasis}</em>
      </h2>
      <p>{ctaCopy.description}</p>
      <div className="actions actions-center">
        <ButtonLink appearance="light">
          {actions.findSpace} <span aria-hidden="true">↗</span>
        </ButtonLink>
        <ButtonLink to="/listings" appearance="outline-light">
          See sample listings
        </ButtonLink>
      </div>
      <p className="form-note cta-note">{ctaCopy.note}</p>
    </div>
  );
}
