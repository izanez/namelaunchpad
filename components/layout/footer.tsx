import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-6">
        <AdSlot slot="footer" />
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="text-lg font-bold text-white">GamertagForge</h3>
          <p className="mt-2 text-sm text-slate-400">
            Premium gamer tag generator for unique usernames, clan tags, and streaming aliases.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Generators</h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            <li>
              <Link href="/gamer-tag-generator" className="hover:text-cyan-300">
                Gamer Tag Generator
              </Link>
            </li>
            <li>
              <Link href="/username-generator" className="hover:text-cyan-300">
                Username Generator
              </Link>
            </li>
            <li>
              <Link href="/roblox-username-generator" className="hover:text-cyan-300">
                Roblox Username Generator
              </Link>
            </li>
            <li>
              <Link href="/fortnite-name-generator" className="hover:text-cyan-300">
                Fortnite Name Generator
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Legal</h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            <li>
              <Link href="/privacy-terms" className="hover:text-cyan-300">
                Privacy / Terms
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-cyan-300">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        Copyright {new Date().getFullYear()} GamertagForge. Built for gamers, creators, and streamers.
      </div>
    </footer>
  );
}
