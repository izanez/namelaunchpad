import Link from "next/link";
import { Card } from "@/components/ui/card";

type SeoContentProps = {
  title: string;
  intro: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  internalLinks?: Array<{
    href: string;
    label: string;
  }>;
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
};

export function SeoContent({ title, intro, sections, internalLinks, faqItems }: SeoContentProps) {
  return (
    <section className="mx-auto mt-8 w-full max-w-6xl px-4 pb-6 md:px-6">
      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-black text-white md:text-3xl">{title}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">{intro}</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-lg font-bold text-cyan-200">{section.heading}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{section.body}</p>
            </div>
          ))}
        </div>
        {internalLinks && internalLinks.length > 0 ? (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white">Related Generators</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-100 transition hover:border-cyan-300/70 hover:text-cyan-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        {faqItems && faqItems.length > 0 ? (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h4 className="text-base font-semibold text-cyan-200">{item.question}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Card>
    </section>
  );
}
