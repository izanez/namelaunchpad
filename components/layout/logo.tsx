import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  className?: string;
  compact?: boolean;
};

export function Logo({ href = "/", className, compact = false }: LogoProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center font-extrabold tracking-[0.02em] text-white",
        compact ? "text-lg" : "text-xl md:text-2xl",
        className
      )}
    >
      <span className="text-white">Name</span>
      <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(59,130,246,0.24)]">
        Launch
      </span>
      <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.24)]">
        pad
      </span>
    </span>
  );

  return (
    <Link href={href} className="inline-flex items-center">
      {content}
    </Link>
  );
}
