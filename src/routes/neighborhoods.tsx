import { createFileRoute } from "@tanstack/react-router";
import { legacy } from "../lib/legacy";
export const Route = createFileRoute("/neighborhoods")(legacy("/neighborhoods"));
