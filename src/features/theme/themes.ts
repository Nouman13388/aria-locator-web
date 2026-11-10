import { siteName } from "../../data/site";
export type ThemeDefinition = {
  id: string;
  label: string;
  swatch: readonly [string, string];
};
export const themes = [
  {
    id: "grey-white",
    label: `${siteName} Grey & White`,
    swatch: ["#FFFFFF", "#707070"],
  },
  { id: "fresh-teal", label: "Fresh Teal", swatch: ["#FFFFFF", "#0E8F8A"] },
  { id: "navy-sun", label: "Navy & Sun", swatch: ["#0F2747", "#F5A524"] },
] as const satisfies readonly ThemeDefinition[];

export const defaultTheme = themes[0].id;
// The explicit registry argument also makes this function portable in the head script.
export function resolveTheme(
  value: unknown,
  registry: readonly ThemeDefinition[] = themes,
) {
  return registry.find((theme) => theme.id === value)?.id ?? registry[0].id;
}

export const themeSelectionCSS = themes
  .map(
    (theme) =>
      `[data-theme="${theme.id}"] .theme-option[data-theme-choice="${theme.id}"]{background:var(--primary);color:var(--on-primary)}`,
  )
  .join("\n");
