export type IntentTemplatePage = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  examples: string[];
  faq: Array<{ q: string; a: string }>;
  keywords: string[];
};

const platforms = [
  { key: "valorant", label: "Valorant" },
  { key: "fortnite", label: "Fortnite" },
  { key: "discord", label: "Discord" },
  { key: "tiktok", label: "TikTok" },
] as const;

const styles = [
  { key: "clean", label: "Clean" },
  { key: "aesthetic", label: "Aesthetic" },
  { key: "dark", label: "Dark" },
] as const;

const lengths = [
  { key: "short", label: "Short", range: "4-6" },
  { key: "medium", label: "Medium", range: "7-10" },
] as const;

function titleCase(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

function makeExamples(platform: string, style: string, length: string) {
  const seed = `${platform}${style}${length}`;
  const roots = ["Nova", "Viper", "Echo", "Drift", "Luna", "Kaoro", "Rush", "Cipher"];
  const suffixes = ["Arc", "Pulse", "Byte", "Shift", "Core", "Flux", "Trace", "Wave"];
  return Array.from({ length: 8 }).map((_, index) => `${roots[(seed.length + index) % roots.length]}${suffixes[(seed.length * 2 + index) % suffixes.length]}`);
}

export const intentTemplatePages: IntentTemplatePage[] = platforms.flatMap((platform) =>
  styles.flatMap((style) =>
    lengths.map((length) => {
      const slug = `${length.key}-${style.key}-${platform.key}-names`;
      const title = `${titleCase(length.key)} ${style.label} ${platform.label} Names`;
      return {
        slug,
        title,
        seoTitle: `${title} (2026) - ${platform.label} Username Ideas`,
        description: `${title} with focused examples, FAQs, and generator flow for faster availability checks.`,
        intro: `${title} targets users who need fast-fit naming ideas with clear readability and branding intent. This page is optimized for direct pick, copy, and availability-check flow.`,
        examples: makeExamples(platform.key, style.key, length.key),
        faq: [
          {
            q: `Why do ${length.key} ${style.key} names perform well on ${platform.label}?`,
            a: `They balance readability and identity, which improves memorability and profile recognition.`,
          },
          {
            q: "How should I pick the final name?",
            a: "Copy your top options, run availability check, then keep one primary and one backup variant.",
          },
        ],
        keywords: [platform.key, style.key, length.key, "username ideas", "name generator"],
      };
    })
  )
);

export const intentTemplateSlugs = intentTemplatePages.map((page) => page.slug);

export function getIntentTemplatePage(slug: string) {
  return intentTemplatePages.find((page) => page.slug === slug);
}
