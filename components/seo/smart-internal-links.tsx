import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { SmartInternalLinkSection } from "@/lib/smart-internal-links";

export function SmartInternalLinks({ sections }: { sections: SmartInternalLinkSection[] }) {
  if (sections.length === 0) return null;

  return (
    <section className="grid gap-6">
      {sections.map((section) => (
        <Card key={section.title} className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">{section.title}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {section.items.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/30">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{item.kind}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </Link>
            ))}
          </div>
        </Card>
      ))}
    </section>
  );
}
