export type ComparisonIntentPage = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  left: {
    label: string;
    strengths: string[];
    fit: string;
  };
  right: {
    label: string;
    strengths: string[];
    fit: string;
  };
  verdict: string;
  faq: Array<{ q: string; a: string }>;
  intent: string[];
};

export const comparisonIntentPages: ComparisonIntentPage[] = [
  {
    slug: "fortnite-vs-valorant-username-styles",
    title: "Fortnite vs Valorant Username Styles",
    seoTitle: "Fortnite vs Valorant Username Styles: Which One Fits Better?",
    description:
      "Comparison of Fortnite and Valorant username styles with practical fit guidance for clips, ranked play, and creator branding.",
    intro:
      "Fortnite names usually perform best with high-energy words and duo-friendly rhythm. Valorant names often win with short, tactical readability for killfeed and comms.",
    left: {
      label: "Fortnite Style",
      strengths: ["Aggressive style words", "Duo and clan pairing potential", "Strong clip and montage identity"],
      fit: "Best for creator-heavy battle royale identity and duo brand consistency.",
    },
    right: {
      label: "Valorant Style",
      strengths: ["Short clean tags", "Fast callout readability", "Competitive match-ready tone"],
      fit: "Best for ranked players who need clear name recognition during fast rounds.",
    },
    verdict:
      "If your goal is clip branding and social personality, Fortnite style tends to convert better. If your goal is clean ranked readability, Valorant style is usually stronger.",
    faq: [
      {
        q: "Can I use one style for both games?",
        a: "Yes, but keep the base short. Then adjust suffixes per game so the identity stays consistent while matching each context.",
      },
      {
        q: "Which style is easier to remember?",
        a: "Short tactical tags are remembered faster in-game. Expressive Fortnite names can be better for content recall.",
      },
    ],
    intent: ["compare", "fortnite", "valorant", "style", "gaming"],
  },
  {
    slug: "short-vs-aesthetic-usernames",
    title: "Short vs Aesthetic Usernames",
    seoTitle: "Short vs Aesthetic Usernames: Readability vs Brand Feel",
    description:
      "Compare short usernames vs aesthetic usernames and choose based on memorability, social branding, and cross-platform availability.",
    intro:
      "Short usernames are usually easier to type, remember, and read in compact UI contexts. Aesthetic usernames can increase social appeal and creator identity when tone matters more than speed.",
    left: {
      label: "Short Usernames",
      strengths: ["High memorability", "Faster typing", "Better for constrained UI spaces"],
      fit: "Best for gamer tags, ranked names, and fast profile search behavior.",
    },
    right: {
      label: "Aesthetic Usernames",
      strengths: ["Stronger style identity", "Creator-friendly tone", "Better mood matching for visual niches"],
      fit: "Best for TikTok, Instagram, and themed creator branding.",
    },
    verdict:
      "Use short usernames when utility and speed matter. Use aesthetic usernames when tone and emotional brand match drive profile clicks.",
    faq: [
      {
        q: "Can I combine both approaches?",
        a: "Yes. Use a short base plus one aesthetic modifier, then validate availability across your target platforms.",
      },
      {
        q: "Which one ranks better in search?",
        a: "Short and aesthetic intents both rank well when pages include clear examples, FAQs, and internal links to related flows.",
      },
    ],
    intent: ["compare", "short", "aesthetic", "username", "branding"],
  },
];

export const comparisonIntentSlugs = comparisonIntentPages.map((entry) => entry.slug);

export function getComparisonIntentPage(slug: string) {
  return comparisonIntentPages.find((entry) => entry.slug === slug);
}
