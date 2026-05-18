"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
  badge?: string;
};

export default function CarGallery({ images, alt, badge }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const current = images[active] ?? images[0] ?? "";
  const hasMultiple = images.length > 1;

  const openLightbox = () => {
    if (current) setLightbox(true);
  };

  const closeLightbox = () => setLightbox(false);

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  return (
    <>
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-xl bg-[#0a0a0a]">
          {current ? (
            <button
              type="button"
              onClick={openLightbox}
              className="group relative block w-full cursor-zoom-in"
              aria-label="Foto vergroten"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current}
                alt={alt}
                className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <ZoomIn className="size-4 text-white" />
              </span>
            </button>
          ) : (
            <div className="flex aspect-video items-center justify-center text-[13px] text-[#444]">
              Geen foto beschikbaar
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          {badge && (
            <span className="pointer-events-none absolute bottom-4 left-4 rounded-md bg-black/60 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
              {badge}
            </span>
          )}
          {hasMultiple && (
            <span className="pointer-events-none absolute right-4 top-4 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
              {active + 1} / {images.length}
            </span>
          )}
        </div>

        {hasMultiple && (
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                className={`relative overflow-hidden rounded-md transition ${
                  i === active
                    ? "ring-2 ring-white"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="aspect-4/3 w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Sluiten"
          >
            <X className="size-5" />
          </button>

          {/* Counter */}
          {hasMultiple && (
            <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-[12px] text-white backdrop-blur-sm">
              {active + 1} / {images.length}
            </span>
          )}

          {/* Prev */}
          {hasMultiple && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Vorige foto"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] select-none rounded-lg object-contain shadow-2xl"
            draggable={false}
          />

          {/* Next */}
          {hasMultiple && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Volgende foto"
            >
              <ChevronRight className="size-5" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
