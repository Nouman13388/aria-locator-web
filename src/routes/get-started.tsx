import { createFileRoute } from "@tanstack/react-router";
import { Questionnaire } from "../features/questionnaire/Questionnaire";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/get-started")({
  head: () =>
    pageHead(
      "Find your space",
      "Build your apartment search brief in six thoughtful steps. Demo only; no inquiry is sent.",
    ),
  component: Questionnaire,
});
