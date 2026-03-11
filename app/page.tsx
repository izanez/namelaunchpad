import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createWebApplicationSchema, createWebsiteSchema } from "@/lib/seo";

const TrendingUsernamesSection = dynamic(
  () => import("@/components/generator/trending-usernames-section").then((mod) => mod.TrendingUsernamesSection),
  {
    loading: () => (
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-36 animate-pulse rounded-2xl border border-white/10 bg-slate-900/45" />
          ))}
        </div>
      </section>
    ),
  }
);

const RandomUsernameFeed = dynamic(
  () => import("@/components/generator/random-username-feed").then((mod) => mod.RandomUsernameFeed),
  {
    loading: () => (
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-20 animate-pulse rounded-2xl border border-white/10 bg-slate-900/45" />
          ))}
        </div>
      </section>
    ),
  }
);

const DailyUsernameChallenge = dynamic(
  () => import("@/components/generator/daily-username-challenge").then((mod) => mod.DailyUsernameChallenge),
  {
    loading: () => (
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="h-36 animate-pulse rounded-2xl border border-white/10 bg-slate-900/45" />
      </section>
    ),
  }
);

const DailyPopularGenerators = dynamic(
  () => import("@/components/generator/daily-popular-generators").then((mod) => mod.DailyPopularGenerators),
  {
    loading: () => (
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-36 animate-pulse rounded-2xl border border-white/10 bg-slate-900/45" />
          ))}
        </div>
      </section>
    ),
  }
);

const GeneratorRequest = dynamic(
  () => import("@/components/generator/generator-request").then((mod) => mod.GeneratorRequest),
  {
    loading: () => (
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="h-40 animate-pulse rounded-2xl border border-white/10 bg-slate-900/45" />
      </section>
    ),
  }
);

const LiveCounter = dynamic(
  () => import("@/components/generator/live-counter").then((mod) => mod.LiveCounter),
  {
    loading: () => (
      <div className="mt-6 inline-flex min-h-10 min-w-[280px] animate-pulse rounded-full border border-orange-300/20 bg-orange-400/8 px-4 py-2" />
    ),
  }
);

const GeneratorSearch = dynamic(
  () => import("@/components/generator/generator-search").then((mod) => mod.GeneratorSearch),
  {
    loading: () => (
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="h-12 animate-pulse rounded-xl2 border border-white/10 bg-slate-900/45" />
      </section>
    ),
  }
);

const generators = [
  {
    href: "/generators/fortnite-name-generator",
    title: "Generator Landing Pages",
    copy: "Explore scalable SEO generator pages for Fortnite, Roblox, Minecraft, Twitch, Valorant, and Discord.",
  },
  {
    href: "/gamer-tag-generator",
    title: "NameLaunchpad",
    copy: "Create flexible username ideas for console, PC, Discord, and creator profiles.",
  },
  {
    href: "/username-generator",
    title: "Username Generator",
    copy: "Create stylish usernames for gaming and social handles.",
  },
  {
    href: "/roblox-username-generator",
    title: "Roblox Username Generator",
    copy: "Find playful and brandable Roblox-style names.",
  },
  {
    href: "/fortnite-name-generator",
    title: "Fortnite Name Generator",
    copy: "Generate sweaty, clean, and memorable Fortnite names.",
  },
  {
    href: "/minecraft-name-generator",
    title: "Minecraft Name Generator",
    copy: "Find blocky, survival, and PvP-ready Minecraft usernames.",
  },
  {
    href: "/twitch-username-generator",
    title: "Twitch Username Generator",
    copy: "Create streamer-friendly Twitch names for channels and clips.",
  },
  {
    href: "/valorant-name-generator",
    title: "Valorant Name Generator",
    copy: "Generate tactical shooter tags with a ranked-ready tone.",
  },
  {
    href: "/discord-name-generator",
    title: "Discord Name Generator",
    copy: "Build clean Discord usernames for servers and communities.",
  },
  {
    href: "/fantasy-name-generator",
    title: "Fantasy Name Generator",
    copy: "Forge mystical names for RPGs, guilds, and stories.",
  },
  {
    href: "/clan-name-generator",
    title: "Clan Name Generator",
    copy: "Build iconic clan identities with strong group names.",
  },
];

const trendingGenerators = [
  {
    href: "/generators/fortnite-name-generator",
    title: "Fortnite Name Generator",
    copy: "Popular for battle royale players, ranked grinders, and clip creators.",
  },
  {
    href: "/generators/roblox-username-generator",
    title: "Roblox Username Generator",
    copy: "Popular for kid-friendly, playful, and block-style username ideas.",
  },
  {
    href: "/generators/minecraft-name-generator",
    title: "Minecraft Name Generator",
    copy: "Popular for survival, PvP, building, and SMP-style username ideas.",
  },
  {
    href: "/generators/valorant-name-generator",
    title: "Valorant Name Generator",
    copy: "Popular for tactical shooter names with a competitive esports tone.",
  },
  {
    href: "/generators/twitch-username-generator",
    title: "Twitch Username Generator",
    copy: "Popular for streamers, clip channels, and cross-platform creator branding.",
  },
];

const generatorCategories = [
  { href: "/category/gaming", title: "Gaming", copy: "Fortnite, Minecraft, Valorant, Steam, clan, and gaming username generators." },
  { href: "/category/social-media", title: "Social Media", copy: "Discord, TikTok, Instagram, Reddit, and creator handle generators." },
  { href: "/category/fantasy", title: "Fantasy", copy: "Fantasy, guild, RPG, D&D, and magical character name generators." },
  { href: "/category/anime", title: "Anime", copy: "Anime, Naruto, Dragon Ball, One Piece, and fandom-style username generators." },
  { href: "/category/funny", title: "Funny", copy: "Funny, meme, and playful username generators with lighter tone." },
  { href: "/category/streamer", title: "Streamer", copy: "Twitch, YouTube, VTuber, and streamer branding generators." },
  { href: "/category/hacker", title: "Hacker", copy: "Cyber, glitch, hacker, and terminal-style username generators." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={createWebsiteSchema()} />
      <JsonLd data={createWebApplicationSchema()} />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
        ])}
      />
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-12 md:px-6">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl md:p-12">
          <div className="max-w-3xl animate-fadeUp">
            <p className="mb-3 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
              NameLaunchpad
            </p>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              Generate the Perfect Username
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Create unique gamer tags, social media usernames and fantasy names instantly.
            </p>
            <LiveCounter />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/username-generator">
                <Button>Start Generating</Button>
              </Link>
              <Link href="#browse-generators">
                <Button variant="ghost">Browse Generators</Button>
              </Link>
            </div>
          </div>
        </section>

        <GeneratorSearch />
        <DailyUsernameChallenge />
        <DailyPopularGenerators />
        <RandomUsernameFeed />
        <TrendingUsernamesSection />
        <GeneratorRequest />

        <section className="content-auto mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Trending Generator Pages</h2>
            <span className="text-xs uppercase tracking-wide text-slate-400">Popular right now</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {trendingGenerators.map((item) => (
              <Card key={item.href} className="p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.copy}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  {"View Page ->"}
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="content-auto mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Generator Categories</h2>
            <span className="text-xs uppercase tracking-wide text-slate-400">Browse by topic</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {generatorCategories.map((item) => (
              <Card key={item.href} className="p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.copy}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  {"Explore Category ->"}
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section id="browse-generators" className="content-auto mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Browse Generators</h2>
            <span className="text-xs uppercase tracking-wide text-slate-400">11 tools available</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {generators.map((item) => (
              <Card key={item.href} className="p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.copy}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  {"Open Generator ->"}
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="content-auto mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300 backdrop-blur-lg">
          <h2 className="text-xl font-bold text-white">SEO-Friendly Name Platform</h2>
          <p className="mt-3 text-sm leading-7">
            NameLaunchpad helps gamers and creators discover unique names instantly. Our username generators are designed
            for discoverability, readability, and brand consistency across gaming profiles, streaming channels, and
            social media handles.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-cyan-200">Generator Categories</h3>
              <p className="mt-2 text-sm leading-7">
                Explore dedicated tools for gamer tags, usernames, Fortnite names, Roblox usernames, fantasy RPG names,
                and clan names. Each page is built around its own naming style and search intent.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-200">How NameLaunchpad Helps</h3>
              <p className="mt-2 text-sm leading-7">
                Whether you need a new handle for Twitch, Discord, TikTok, YouTube, Xbox, PlayStation, or PC gaming,
                NameLaunchpad helps you compare styles, save favorites, and test names before you use them publicly.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

