// components/Section.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Section({
  id,
  label,
  title,
  children,
  className
}: {
  id?: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-6 py-12 sm:py-16", className)}>
      <div className="mb-8">
        <div className="font-mono text-sm text-muted">{label}</div>
        <h2 className="mt-2 inline-block brutal rounded-lg px-3 py-1 text-2xl sm:text-3xl font-semibold">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
