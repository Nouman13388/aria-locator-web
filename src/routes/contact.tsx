import { ContactForm } from "../features/contact/ContactForm";
import { ContactAside } from "../features/contact/ContactAside";
import { pageIntros } from "../data/pages";
import { createFileRoute } from "@tanstack/react-router";
import { Intro, Section } from "../components/ui/Section";
import { ButtonLink } from "../components/ui/Button";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact",
      "Try the Aria demo contact form. Nothing is sent or stored.",
    ),
  component: Contact,
});
function Contact() {
  return (
    <>
      <Intro
        eyebrow={pageIntros.contact.eyebrow}
        title={pageIntros.contact.title}
      >
        {pageIntros.contact.description}
      </Intro>
      <Section>
        <div className="grid-2" style={{ alignItems: "start" }}>
          <ContactAside />
          <ContactForm />
        </div>
      </Section>
      <Section band>
        <div className="center">
          <span className="eyebrow accent">Ready to find your direction?</span>
          <h2>Begin with what feels like home.</h2>
          <ButtonLink>Try the Questionnaire ↗</ButtonLink>
        </div>
      </Section>
    </>
  );
}
