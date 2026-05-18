import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCarById, listPublishedCars } from "@/lib/cars";
import { business } from "@/content/site-content";
import CarGallery from "./CarGallery";

const fuelLabel: Record<string, string> = {
  elektrisch: "Elektrisch",
  benzine: "Benzine",
  diesel: "Diesel",
  hybride: "Hybride",
};

function price(n: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await getCarById(id);
  if (!car || !car.published) return {};
  return {
    title: `${car.make} ${car.model} – ${price(car.price)}`,
    description: car.description,
  };
}

export default async function OccasionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await getCarById(id);
  if (!car || !car.published) notFound();

  const all = await listPublishedCars();
  const related = all.filter((c) => c.id !== car.id).slice(0, 3);

  return (
    <div className="bg-black">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-5 pt-24 pb-32">
        <Link
          href="/occasions"
          className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-[#555] transition-colors hover:text-white"
        >
          <ArrowLeft className="size-3.5" />
          Alle occasions
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <div>
            <CarGallery
              images={car.images}
              alt={`${car.make} ${car.model}`}
              badge={fuelLabel[car.fuel]}
            />

            <div className="mt-7">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                {car.make} {car.model}
              </h1>
              <p className="mt-1 text-[13px] text-[#555]">
                {car.year} &middot; {car.km.toLocaleString("nl-NL")} km &middot; {car.transmission}
              </p>
            </div>

            {car.specs.length > 0 && (
              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
                {car.specs.map((s) => (
                  <div key={s.label} className="bg-black px-4 py-4">
                    <p className="text-[11px] text-[#444]">{s.label}</p>
                    <p className="mt-0.5 text-[13px] font-medium text-white">{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            {car.description && (
              <div className="divider mt-8 pt-8">
                <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-[#444]">
                  Beschrijving
                </h2>
                <p className="text-[14px] leading-7 text-[#777]">{car.description}</p>
              </div>
            )}

            <div className="divider mt-8 pt-8">
              <ul className="space-y-2">
                {[
                  "NAP gecertificeerd",
                  "APK-keuring bij aflevering",
                  "Bovag garantie mogelijk",
                  "Inruil mogelijk",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[13px] text-[#666]">
                    <span className="size-1.5 shrink-0 rounded-full bg-white/25" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-20">
            <div className="surface rounded-xl p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#444]">
                Vraagprijs
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {price(car.price)}
              </p>
              <p className="mt-1 text-[12px] text-[#555]">
                incl. BTW &middot; excl. tenaamstelling
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                    `Hallo, ik heb interesse in de ${car.make} ${car.model}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md bg-[#25d366] px-4 py-2.5 text-[13px] font-semibold text-black transition-opacity hover:opacity-90"
                >
                  Stuur een WhatsApp
                </a>
                <a href={`tel:${business.phoneIntl}`} className="btn-ghost justify-center">
                  <span>Bel ons</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-1 text-[12px] text-[#555] transition-colors hover:text-white"
                >
                  Of stuur een bericht <ArrowUpRight className="size-3" />
                </Link>
              </div>

              <div className="divider mt-6 pt-5">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-white/[0.07] flex items-center justify-center text-[11px] font-semibold text-white">
                    JZ
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-white">Johan Zuurendonk</p>
                    <p className="text-[11px] text-[#555]">Reageert snel via WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="divider mt-20 pt-16">
            <h2 className="mb-8 text-xl font-semibold tracking-tight text-white">
              Vergelijkbare occasions
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rc) => (
                <Link
                  key={rc.id}
                  href={`/occasions/${rc.id}`}
                  className="group surface surface-hover block overflow-hidden rounded-xl transition-all duration-200"
                >
                  <div className="relative h-40 overflow-hidden bg-[#0a0a0a]">
                    {rc.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={rc.image}
                        alt={`${rc.make} ${rc.model}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[11px] text-[#444]">
                        Geen foto
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <p className="text-[13px] font-medium text-white">
                      {rc.make} {rc.model}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#555]">
                      {rc.year} &middot; {rc.km.toLocaleString("nl-NL")} km
                    </p>
                    <p className="mt-2 text-[13px] font-semibold text-white">
                      {price(rc.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
