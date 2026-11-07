import { siteName } from "../data/site";
import { actions, faqActionCopy } from "../data/actions";
import { pageIntros } from "../data/pages";
import { createFileRoute } from "@tanstack/react-router";
import { Intro, Section } from "../components/ui/Section";
import { Accordion } from "../components/ui/Accordion";
import { ButtonLink } from "../components/ui/Button";
import { faqGroups } from "../data/faq";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead(
      "Frequently asked questions",
      `Answers about the ${siteName} demo, apartment search preferences, and the questionnaire.`,
    ),
  component: FAQ,
});
function FAQ() {
  return (
    <>
      <Intro eyebrow={pageIntros.faq.eyebrow} title={pageIntros.faq.title}>
        {pageIntros.faq.description}
      </Intro>
      <Section>
        <div className="faq-layout">
          <aside>
            <nav aria-label="FAQ categories" className="faq-nav">
              <span className="eyebrow accent">Explore by topic</span>
              {faqGroups.map((g) => (
                <a key={g.id} href={`#${g.id}`}>
                  {g.title} ↗
                </a>
              ))}
            </nav>
          </aside>
          <div>
            {faqGroups.map((g) => (
              <section className="faq-group" id={g.id} key={g.id}>
                <span className="eyebrow accent">◆ {g.title}</span>
                <h2>{g.title}</h2>
                {g.items.map(([question, answer]) => (
                  <Accordion
                    key={question}
                    question={question}
                    answer={answer}
                  />
                ))}
              </section>
            ))}
          </div>
        </div>
        <div className="card center">
          <span className="eyebrow accent">{faqActionCopy.eyebrow}</span>
          <h2>{faqActionCopy.title}</h2>
          <p>{faqActionCopy.description}</p>
          <div className="actions actions-center">
            <ButtonLink to="/contact">{actions.contactArrow}</ButtonLink>
            <ButtonLink variant="secondary">{actions.getStarted}</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
