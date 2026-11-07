import type { Answers } from "./schemas";
// Demo adapter: replace this single function when a real API is available.
export async function submitLead(_answers: Answers): Promise<{ demo: true }> {
  return { demo: true };
}
