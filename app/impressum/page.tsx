import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum and provider information for NameLaunchpad.",
  alternates: {
    canonical: "/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 md:px-6">
      <Card className="space-y-5 p-7 md:p-10">
        <h1 className="text-3xl font-black text-white">Impressum</h1>
        <p className="text-sm leading-7 text-slate-300">
          Angaben gemaess Paragraph 5 TMG.
        </p>
        <div className="rounded-xl2 border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-slate-200">Olgica Damjanovic</p>
          <p className="mt-1 text-sm text-slate-300">Dunavska ulica 3</p>
          <p className="mt-1 text-sm text-slate-300">21101 Novi Sad</p>
          <p className="mt-1 text-sm text-slate-300">Serbia</p>
          <p className="mt-1 text-sm text-slate-300">Kontakt: whatduhaben@gmail.com</p>
        </div>
      </Card>
    </section>
  );
}
