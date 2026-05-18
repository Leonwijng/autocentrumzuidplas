"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import type { Car } from "@/lib/cars";

const fuelOptions = ["alle", "benzine", "diesel", "elektrisch", "hybride"] as const;
type FuelFilter = (typeof fuelOptions)[number];

function price(n: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

const fuelLabel: Record<string, string> = {
  alle: "Alle",
  elektrisch: "Elektrisch",
  benzine: "Benzine",
  diesel: "Diesel",
  hybride: "Hybride",
};

export default function OccasionsClient({ cars }: { cars: Car[] }) {
  const [fuel, setFuel] = useState<FuelFilter>("alle");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [search, setSearch] = useState("");

  const filtered = cars.filter((c) => {
    const matchFuel = fuel === "alle" || c.fuel === fuel;
    const matchPrice = c.price <= maxPrice;
    const matchSearch =
      search === "" ||
      `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase());
    return matchFuel && matchPrice && matchSearch;
  });

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pt-28 pb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Alle occasions
        </h1>
        <p className="mt-2 text-[14px] text-[#555]">
          {cars.length} {cars.length === 1 ? "auto" : "auto's"} beschikbaar &mdash; filter op brandstof, prijs of zoekterm.
        </p>
      </section>

      <div className="divider sticky top-14 z-40 bg-black/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-5 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#555]" />
              <input
                type="text"
                placeholder="Zoek merk of model"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-44 rounded-md border border-white/[0.1] bg-white/[0.04] pl-8 pr-3 text-[12px] text-white placeholder-[#444] outline-none transition focus:border-white/25"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#555] hover:text-white"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>

            <div className="h-4 w-px bg-white/[0.07]" />

            {fuelOptions.map((f) => (
              <button
                key={f}
                onClick={() => setFuel(f)}
                className={`h-8 rounded-md px-3 text-[12px] font-medium transition-all ${
                  fuel === f
                    ? "bg-white text-black"
                    : "border border-white/[0.1] text-[#666] hover:border-white/20 hover:text-white"
                }`}
              >
                {fuelLabel[f]}
              </button>
            ))}

            <div className="h-4 w-px bg-white/[0.07]" />

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#555]">Max. prijs</span>
              <input
                type="range"
                min={2500}
                max={100000}
                step={2500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-white"
              />
              <span className="min-w-[60px] text-[11px] font-medium text-white">
                {maxPrice === 100000 ? "geen limiet" : price(maxPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-10 pb-28">
        {cars.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[15px] text-[#555]">
              Op dit moment staat er nog geen aanbod online.
            </p>
            <p className="mt-2 text-[13px] text-[#555]">
              Neem gerust contact op, we helpen je graag persoonlijk.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block text-[13px] text-white underline-offset-4 hover:underline"
            >
              Contact opnemen
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[15px] text-[#444]">Geen auto&apos;s gevonden.</p>
            <button
              onClick={() => {
                setFuel("alle");
                setSearch("");
                setMaxPrice(100000);
              }}
              className="mt-4 text-[13px] text-white underline-offset-4 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((car, i) => (
              <FadeIn key={car.id} delay={i * 0.04}>
                <Link
                  href={`/occasions/${car.id}`}
                  className="group surface surface-hover block overflow-hidden rounded-xl transition-all duration-200"
                >
                  <div className="relative h-48 overflow-hidden bg-[#0a0a0a]">
                    {car.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[12px] text-[#444]">
                        Geen foto
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                      {fuelLabel[car.fuel]}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[13px] font-medium text-white">
                          {car.make} {car.model}
                        </p>
                        <p className="mt-0.5 text-[12px] text-[#555]">
                          {car.year} &middot; {car.km.toLocaleString("nl-NL")} km &middot;{" "}
                          {car.transmission}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-[#333] transition-colors group-hover:text-white" />
                    </div>
                    <p className="mt-3 text-base font-semibold text-white">
                      {price(car.price)}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
