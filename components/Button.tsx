// components/Button.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  brutal?: boolean;
  className?: string;
  ariaLabel?: string;
  target?: "_blank";
  rel?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  brutal = false,
  className,
  ariaLabel,
  target,
  rel
}: Props) {
  const base =
    "focus-ring inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-transform active:translate-y-[1px]";
  const styles =
    variant === "primary"
      ? "bg-accent text-black hover:bg-accent-hover"
      : "glass border border-white/20 dark:border-white/10 hover:brightness-105";

  const brutalCls = brutal ? "brutal" : "";

  if (href) {
    return (
      <Link
        href={href}
        prefetch
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        className={cn(base, styles, brutalCls, className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button aria-label={ariaLabel} className={cn(base, styles, brutalCls, className)}>
      {children}
    </button>
  );
}
