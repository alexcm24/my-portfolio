"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProjectMedia({
  src,
  alt,
  title,
}: {
  src?: string;
  alt: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!src) {
    return (
      <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-line bg-line/30 font-mono text-xs text-muted">
        screenshot coming soon
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge ${title} screenshot`}
        className="group relative block aspect-[16/9] w-full overflow-hidden rounded-lg border border-line"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 700px"
        />
        <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 font-mono text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
          Click to enlarge
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshot`}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg shadow-2xl"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 font-mono text-sm text-white hover:bg-white/20"
          >
            Esc ✕
          </button>
        </div>
      )}
    </>
  );
}
