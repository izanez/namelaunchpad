import Link from "next/link";
import { Logo } from "@/components/layout/logo";

const links = [
  { href: "/explore-generators", label: "Explore" },
  { href: "/all-generators", label: "Generators" },
  { href: "/username-database", label: "Database" },
  { href: "/gamer-tag-generator", label: "Gamertags" },
  { href: "/username-generator", label: "Username" },
  { href: "/roblox-username-generator", label: "Roblox" },
  { href: "/fortnite-name-generator", label: "Fortnite" },
  { href: "/fantasy-name-generator", label: "Fantasy" },
  { href: "/clan-name-generator", label: "Clan" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Logo />
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-cyan-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/about"
          className="rounded-xl2 border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:border-cyan-300/60 hover:text-white"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
