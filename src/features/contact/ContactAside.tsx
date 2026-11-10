import { contact } from "../../data/site";
export function ContactAside() {
  return (
    <aside className="contact-aside">
      <span className="eyebrow accent">A considered connection</span>
      <h2>
        Good spaces.
        <br />
        <em>Thoughtful conversations.</em>
      </h2>
      <p>
        Tell us what’s on your mind, or explore the questionnaire to put your
        preferences into words.
      </p>
      <div className="diamond" aria-hidden="true">
        ◆
      </div>
      <span className="eyebrow muted">{contact.label}</span>
      <p>{contact.email}</p>
      <p className="form-note">
        Placeholder only. This is not a real service contact.
      </p>
      <img
        src="/images/aria-kitchen.webp"
        alt="Sunlit open kitchen and dining space with pendant lights"
        loading="lazy"
        width="600"
        height="400"
      />
    </aside>
  );
}
