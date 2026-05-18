"use client";

import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
  badge?: string;
};

export default function CarGallery({ images, alt, badge }: Props) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0] ?? "";
  const hasMultiple = images.length > 1;

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl bg-[#0a0a0a]">
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current}
            alt={alt}
            className="aspect-[16/9] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center text-[13px] text-[#444]">
            Geen foto beschikbaar
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {badge && (
          <span className="absolute bottom-4 left-4 rounded-md bg-black/60 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
            {badge}
          </span>
        )}
        {hasMultiple && (
          <span className="absolute right-4 top-4 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
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
                className="aspect-[4/3] w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
