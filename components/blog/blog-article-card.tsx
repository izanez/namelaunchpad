import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { BlogArticleSummary } from "@/lib/blog-hub";

export function BlogArticleCard({ article }: { article: BlogArticleSummary }) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <Card className="h-full p-5 transition hover:border-cyan-300/30">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{article.category}</p>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
            {article.readingTime} min read
          </span>
        </div>
        <h3 className="mt-3 text-xl font-bold text-white">{article.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{article.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-400">{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          <span className="font-semibold text-cyan-300">Open Article</span>
        </div>
      </Card>
    </Link>
  );
}
