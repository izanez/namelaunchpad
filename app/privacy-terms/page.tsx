import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy & Terms",
  description: "Read the privacy policy and terms for using NameLaunchpad.",
  alternates: {
    canonical: "/privacy-terms",
  },
};

export default function PrivacyTermsPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 md:px-6">
      <Card className="space-y-6 p-7 md:p-10">
        <div>
          <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
          <p className="mt-3 text-slate-300">
            NameLaunchpad does not require account registration. Favorite names are stored locally in your browser and
            are not transmitted to a backend service.
          </p>
          <p className="mt-3 text-slate-300">
            This website uses Google AdSense. For users in the EWR, UK, and Switzerland, consent is managed via a CMP
            in Google AdSense according to applicable policy requirements.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Terms of Use</h2>
          <p className="mt-3 text-slate-300">
            Generated names are suggestions only. Users are responsible for checking platform availability and ensuring
            their chosen names comply with game and community guidelines.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Legal & Contact</h2>
          <p className="mt-3 text-slate-300">
            Contact:{" "}
            <a href="mailto:whatduhaben@gmail.com" className="font-semibold text-cyan-300 hover:text-cyan-200">
              whatduhaben@gmail.com
            </a>
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Additional pages:{" "}
            <Link href="/impressum" className="text-cyan-300 hover:text-cyan-200">
              Impressum
            </Link>{" "}
            and{" "}
            <Link href="/contact" className="text-cyan-300 hover:text-cyan-200">
              Contact
            </Link>
            .
          </p>
        </div>
      </Card>
    </section>
  );
}
