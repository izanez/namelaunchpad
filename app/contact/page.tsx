import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact NameLaunchpad.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 md:px-6">
      <Card className="p-7 md:p-10">
        <h1 className="text-3xl font-black text-white">Contact</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          For support, legal, or business inquiries:
        </p>
        <p className="mt-2">
          <a href="mailto:whatduhaben@gmail.com" className="text-base font-semibold text-cyan-300 hover:text-cyan-200">
            whatduhaben@gmail.com
          </a>
        </p>
      </Card>
    </section>
  );
}
