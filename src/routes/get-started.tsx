import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";
import { Questionnaire } from "../features/questionnaire/Questionnaire";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/get-started")({
  validateSearch: z.object({
    step: z.coerce.number().int().min(1).max(6).catch(1).default(1),
  }),
  head: () =>
    pageHead(
      "Find your space",
      "Build your apartment search brief in six thoughtful steps. Demo only; no inquiry is sent.",
    ),
  component: Questionnaire,
});
