export type ThemeDefinition = {
  id: string;
  label: string;
  swatch: readonly [string, string];
  personality: {
    name: string;
    hero: "overlay" | "split" | "navy";
    displayFont: string;
    fontFile: string;
    radius: number;
  };
};
export const themes = [
  {
    id: "clean-grey",
    label: "Clean Grey",
    swatch: ["#FFFFFF", "#1D4ED8"],
    personality: {
      name: "Precise",
      hero: "overlay",
      displayFont: "Inter Variable",
      fontFile: "inter",
      radius: 12,
    },
  },
  {
    id: "fresh-teal",
    label: "Fresh Teal",
    swatch: ["#FFFFFF", "#0E8F8A"],
    personality: {
      name: "Welcoming",
      hero: "split",
      displayFont: "Plus Jakarta Sans Variable",
      fontFile: "plus-jakarta-sans",
      radius: 24,
    },
  },
  {
    id: "navy-sun",
    label: "Navy & Sun",
    swatch: ["#0F2747", "#F5A524"],
    personality: {
      name: "Editorial",
      hero: "navy",
      displayFont: "Outfit Variable",
      fontFile: "outfit",
      radius: 6,
    },
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

export const personalityCSS = themes
  .map(
    (theme) =>
      `[data-theme="${theme.id}"]{--font-display:"${theme.personality.displayFont}",sans-serif;--font-body:"Inter Variable",sans-serif;--radius-card:${theme.personality.radius}px}`,
  )
  .join("\n");
