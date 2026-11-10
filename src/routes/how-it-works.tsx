import { siteName } from "../data/site";
import { actions } from "../data/actions";
import { pageIntros } from "../data/pages";
import { createFileRoute } from "@tanstack/react-router";
import { Intro, Section } from "../components/ui/Section";
import { CTA } from "../components/layout/Layout";
import { ButtonLink } from "../components/ui/Button";
import { process } from "../data/site";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/how-it-works")({
  head: () =>
    pageHead(
      "How it works",
      `From your first preferences to a clearer apartment search. Explore how the ${siteName} demo works.`,
    ),
  component: HowItWorks,
});
function HowItWorks() {
  return (
    <>
      <Intro
        eyebrow={pageIntros.process.eyebrow}
        title={pageIntros.process.title}
      >
        {pageIntros.process.description}
      </Intro>
      <div className="wrap grid-2">
        <img
          className="round-image"
          src="/images/keenest-living.webp"
          alt="Light-filled apartment with a linen sofa and glass terrace doors"
          width="640"
          height="580"
        />
        <div>
          <span className="eyebrow accent">The {siteName} approach</span>
          <h2>
            Less noise.
            <br />
            <em>A clearer direction.</em>
          </h2>
          <p>
            Apartment searching involves more than choosing a bedroom count. The
            right starting point includes your routines, priorities, and the
            practical details of a move.
          </p>
          <p>
            This demo shows how a simple brief can bring those considerations
            into focus.
          </p>
        </div>
      </div>
      <Section>
        <div className="section-heading">
          <div>
            <span className="eyebrow accent">The pathway</span>
            <h2>
              From a first thought
              <br />
              to a considered search
            </h2>
          </div>
          <p>
            A preview of the process. No live matching, inquiries, or bookings
            take place here.
          </p>
        </div>
        {process.map((p, i) => (
          <article className="grid-2 process-row" key={p.title}>
            <div>
              <span className="eyebrow accent">Step 0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
            <div className="card">
              <span className="eyebrow muted">
                {
                  [
                    "Your personal brief",
                    "Your priorities",
                    "Your next conversation",
                  ][i]
                }
              </span>
              <h3>
                {
                  [
                    "The essentials, thoughtfully gathered.",
                    "Practical needs. Personal details.",
                    "A starting point for what comes next.",
                  ][i]
                }
              </h3>
              <p>
                {
                  [
                    "Location and timing. Layout and budget. Pets, parking, and the amenities that support your day.",
                    "Separate the essentials from the nice-to-haves. Return to your answers whenever you want to refine them.",
                    "In a live service, a locator would discuss potential matches and confirm property details with you.",
                  ][i]
                }
              </p>
              {i === 0 && <ButtonLink>{actions.tryQuestionnaire}</ButtonLink>}
            </div>
          </article>
        ))}
      </Section>
      <Section band>
        <div className="grid-2">
          <div>
            <span className="eyebrow accent">Designed for clarity</span>
            <h2>
              Your preferences.
              <br />
              <em>In one place.</em>
            </h2>
          </div>
          <div>
            <p>
              The six-step questionnaire keeps things focused, with a review at
              the end so you can check every detail.
            </p>
            <p>
              Non-contact preferences can stay in your browser tab while you
              explore. Contact details stay in memory only. Completing the demo
              clears your answers.
            </p>
          </div>
        </div>
      </Section>
      <Section>
        <CTA />
      </Section>
    </>
  );
}
