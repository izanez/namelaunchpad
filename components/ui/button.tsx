import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-xl2 px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out",
        "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80",
        variant === "primary" &&
          "bg-gradient-to-r from-neonPurple via-neonBlue to-neonCyan text-white shadow-neon hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(34,211,238,0.28),0_0_40px_rgba(168,85,247,0.22)]",
        variant === "ghost" &&
          "border border-white/20 bg-white/5 text-slate-100 hover:-translate-y-0.5 hover:border-neonCyan/70 hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
