import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "About NameLaunchpad and how it helps gamers create standout names.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 md:px-6">
      <Card className="p-7 md:p-10">
        <h1 className="text-3xl font-black text-white">About NameLaunchpad</h1>
        <p className="mt-4 leading-7 text-slate-300">
          NameLaunchpad is a modern username platform focused on high-quality gamer tags for competitive and casual
          players. We provide themed generators for major gaming use cases and optimize everything for speed, clarity,
          and search visibility.
        </p>
        <p className="mt-3 leading-7 text-slate-300">
          Whether you need a new identity for Fortnite, Roblox, RPG adventures, or your next clan, our tools help you
          discover names that are unique, memorable, and ready for your profile.
        </p>
      </Card>
    </section>
  );
}

