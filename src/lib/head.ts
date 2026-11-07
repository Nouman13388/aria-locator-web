export const pageHead = (title: string, description: string) => ({
  meta: [
    { title: `${title} | Aria` },
    { name: "description", content: description },
  ],
});
