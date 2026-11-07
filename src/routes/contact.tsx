import { actions, contactActionCopy } from "../data/actions";
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
        <div className="grid-2 items-start">
          <ContactAside />
          <ContactForm />
        </div>
      </Section>
      <Section band>
        <div className="center">
          <span className="eyebrow accent">{contactActionCopy.eyebrow}</span>
          <h2>{contactActionCopy.title}</h2>
          <ButtonLink>{actions.tryQuestionnaire}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
