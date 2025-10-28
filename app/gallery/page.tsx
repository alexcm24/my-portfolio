import Image from "next/image";
import type { Metadata } from "next";
import { galleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "My gallery",
  description: "Visual notes from travels and weekend explorations."
};

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-24 sm:pt-32">
      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Visual diary</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">My gallery</h1>
          <p className="text-muted text-lg">
            Places and textures that keep my design eye curious. Shot on the road, developed at my desk.
          </p>
        </div>
        <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted">
          Coordinates logged from 64°N to 13°N
        </p>
      </header>

      <section className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-gap:1.5rem]">
        {galleryImages.map((image, index) => (
          <figure
            key={image.src}
            className="group break-inside-avoid overflow-hidden rounded-2xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="w-full h-auto transition-transform duration-200 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
              priority={index < 2}
            />
          </figure>
        ))}
      </section>
    </main>
  );
}
