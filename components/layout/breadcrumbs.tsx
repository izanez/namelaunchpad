import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition hover:text-cyan-300">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-semibold text-slate-200" : ""}>{item.label}</span>
              )}
              {!isLast ? <span className="text-slate-600">{">"}</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
