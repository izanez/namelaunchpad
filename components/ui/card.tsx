import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-card",
        "transition duration-300 hover:border-cyan-300/45 hover:shadow-neon",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
