import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-6">
        <AdSlot slot="footer" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <h2 className="text-2xl font-black text-white">About NameLaunchpad</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            NameLaunchpad helps users generate unique usernames, gamer tags, clan names, and fantasy names for games,
            social media, and creator profiles. Whether you need a fresh identity for competitive play, a memorable
            Twitch or Discord handle, or a strong name for an RPG character or gaming squad, NameLaunchpad brings those
            ideas together in one place. The platform is designed to make name creation faster, cleaner, and more
            consistent across different styles and use cases. You can explore popular tools like the{" "}
            <Link href="/username-generator" className="text-cyan-300 hover:text-cyan-200">Username Generator</Link>,{" "}
            <Link href="/fortnite-name-generator" className="text-cyan-300 hover:text-cyan-200">Fortnite Name Generator</Link>,{" "}
            <Link href="/roblox-username-generator" className="text-cyan-300 hover:text-cyan-200">Roblox Username Generator</Link>,{" "}
            <Link href="/fantasy-name-generator" className="text-cyan-300 hover:text-cyan-200">Fantasy Name Generator</Link>, and{" "}
            <Link href="/clan-name-generator" className="text-cyan-300 hover:text-cyan-200">Clan Name Generator</Link>. Each generator is built to help users discover names that are readable, memorable, and ready to use across gaming, streaming, and social platforms.
          </p>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <Logo compact />
          <p className="mt-2 text-sm text-slate-400">Premium username platform for unique gaming names, clan tags, and streaming aliases.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Generators</h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            <li><Link href="/gamer-tag-generator" className="hover:text-cyan-300">NameLaunchpad</Link></li>
            <li><Link href="/blog" className="hover:text-cyan-300">Blog</Link></li>
            <li><Link href="/guides" className="hover:text-cyan-300">Guides</Link></li>
            <li><Link href="/articles" className="hover:text-cyan-300">Articles</Link></li>
            <li><Link href="/explore-generators" className="hover:text-cyan-300">Explore Generators</Link></li>
            <li><Link href="/all-generators" className="hover:text-cyan-300">All Generators</Link></li>
            <li><Link href="/username-database" className="hover:text-cyan-300">Username Database</Link></li>
            <li><Link href="/daily-top" className="hover:text-cyan-300">Daily Top 25</Link></li>
            <li><Link href="/compare" className="hover:text-cyan-300">Username Comparisons</Link></li>
            <li><Link href="/intent" className="hover:text-cyan-300">Intent Pages</Link></li>
            <li><Link href="/assets" className="hover:text-cyan-300">Linkable Assets</Link></li>
            <li><Link href="/username-generator" className="hover:text-cyan-300">Username Generator</Link></li>
            <li><Link href="/roblox-username-generator" className="hover:text-cyan-300">Roblox Username Generator</Link></li>
            <li><Link href="/fortnite-name-generator" className="hover:text-cyan-300">Fortnite Name Generator</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Legal</h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            <li><Link href="/privacy-terms" className="hover:text-cyan-300">Privacy / Terms</Link></li>
            <li><Link href="/impressum" className="hover:text-cyan-300">Impressum</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-300">Contact</Link></li>
            <li><Link href="/about" className="hover:text-cyan-300">About</Link></li>
            <li>
              <a href="mailto:whatduhaben@gmail.com" className="hover:text-cyan-300">
                Contact: whatduhaben@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">Copyright {new Date().getFullYear()} NameLaunchpad. Built for gamers, creators, and streamers.</div>
    </footer>
  );
}
