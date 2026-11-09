export type ThemeDefinition = {
  id: string;
  label: string;
  swatch: readonly [string, string];
};
export const themes = [
  {
    id: "client",
    label: "Client Preference",
    swatch: ["#FFFFFF", "#707070"],
  },
  {
    id: "recommended",
    label: "Recommended Design",
    swatch: ["#FAF7F2", "#1F3A44"],
  },
  {
    id: "sage",
    label: "Sage Calm",
    swatch: ["#F6F7F2", "#3F5B4A"],
  },
  {
    id: "indigo",
    label: "Indigo Night",
    swatch: ["#0F1424", "#C9B27C"],
  },
  {
    id: "clay",
    label: "Terracotta Clay",
    swatch: ["#FBF6F1", "#8A3B24"],
  },
  {
    id: "blue",
    label: "Institutional Blue",
    swatch: ["#FFFFFF", "#1B4B8F"],
  },
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
