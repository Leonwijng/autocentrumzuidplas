import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/FadeIn";
import { business, reviews } from "@/content/site-content";
import { listPublishedCars } from "@/lib/cars";

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

export default async function HomePage() {
  const cars = await listPublishedCars();
  const featured = cars.slice(0, 3);

  return (
    <div className="bg-black">
      <SiteHeader />

      {/* HERO */}
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pt-14 text-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

        <div className="relative mx-auto max-w-3xl">
          <p className="animate-fade-up delay-1 mb-4 text-[13px] font-medium text-white/50">
            Occasions &middot; Onderdelen &middot; Persoonlijk advies
          </p>
          <h1 className="animate-fade-up delay-2 text-balance text-[clamp(2.6rem,5.5vw,4.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
            Jouw volgende auto<br className="hidden sm:block" /> uit Nieuwerkerk aan den IJssel.
          </h1>
          <p className="animate-fade-up delay-3 mx-auto mt-6 max-w-[44ch] text-[15px] leading-7 text-white/55">
            {business.name} biedt een zorgvuldig geselecteerd aanbod van tweedehands auto&apos;s.
            Transparant geprijsd, persoonlijk begeleid.
          </p>
          <div className="animate-fade-up delay-4 mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/occasions" className="btn-primary">
              Bekijk het aanbod <ArrowRight className="size-3.5" />
            </Link>
            <a href={`https://wa.me/${business.whatsapp}`} className="btn-ghost">
              Stuur een WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="divider">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid grid-cols-2 divide-x divide-white/[0.07] sm:grid-cols-4">
            {([
              ["Lokaal", "Nieuwerkerk a/d IJssel"],
              ["NAP", "Km gecertificeerd"],
              ["< 1u", "Reactie WhatsApp"],
              ["100%", "Eerlijke prijs"],
            ] as const).map(([v, l]) => (
              <div key={l} className="px-6 py-7 text-center">
                <p className="text-xl font-semibold text-white">{v}</p>
                <p className="mt-0.5 text-[12px] text-[#555]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED CARS */}
      {featured.length > 0 && (
        <section className="divider mx-auto max-w-5xl px-5 py-24">
          <FadeIn className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Uitgelichte occasions
            </h2>
            <Link
              href="/occasions"
              className="flex items-center gap-1 text-[13px] text-[#555] transition-colors hover:text-white"
            >
              Alles bekijken <ArrowUpRight className="size-3.5" />
            </Link>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((car, i) => (
              <FadeIn key={car.id} delay={i * 0.07}>
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
                    <p className="text-[13px] font-medium text-white">
                      {car.make} {car.model}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#555]">
                      {car.year} &middot; {car.km.toLocaleString("nl-NL")} km
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-base font-semibold text-white">
                        {price(car.price)}
                      </span>
                      <ArrowUpRight className="size-4 text-[#444] transition-colors group-hover:text-white" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* OVER ONS */}
      <section className="divider">
        <div className="mx-auto max-w-5xl px-5 py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#444]">
                Over ons
              </p>
              <h2 className="text-2xl font-semibold leading-snug tracking-tight text-white">
                Lokaal, eerlijk en persoonlijk. Geen druk, geen trucjes.
              </h2>
              <p className="mt-5 text-[15px] leading-7 text-[#666]">
                {business.name} is een lokaal autobedrijf uit Nieuwerkerk aan den IJssel.
                Wij selecteren elke auto met zorg, zijn eerlijk over staat en prijs, en
                staan ook na de koop voor je klaar.
              </p>
              <Link
                href="/over-ons"
                className="mt-7 inline-flex items-center gap-1.5 text-[13px] text-white underline-offset-4 hover:underline"
              >
                Lees meer over ons <ArrowUpRight className="size-3.5" />
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07]">
                {([
                  ["NAP", "Km gecertificeerd"],
                  ["APK", "Bij aflevering"],
                  ["BOVAG", "Eerlijke handel"],
                  ["Inruil", "Mogelijk"],
                ] as const).map(([n, t]) => (
                  <div key={t} className="bg-black px-6 py-7">
                    <p className="text-2xl font-semibold text-white">{n}</p>
                    <p className="mt-1 text-[12px] text-[#555]">{t}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="divider">
        <div className="mx-auto max-w-5xl px-5 py-24">
          <FadeIn className="mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Klantreviews
            </h2>
            <p className="mt-1.5 text-[13px] text-[#555]">
              Wat klanten over ons zeggen
            </p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.slice(0, 4).map((r, i) => (
              <FadeIn key={r.name} delay={i * 0.06}>
                <div className="surface rounded-xl p-5">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <svg
                        key={j}
                        className="size-3.5 fill-amber-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[13px] leading-6 text-[#888]">&ldquo;{r.text}&rdquo;</p>
                  <div className="mt-4 border-t border-white/[0.06] pt-4">
                    <p className="text-[12px] font-medium text-white">{r.name}</p>
                    <p className="text-[11px] text-[#555]">{r.location}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="divider">
        <FadeIn>
          <div className="mx-auto max-w-5xl px-5 py-24 text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white">
              Klaar om jouw volgende auto te vinden?
            </h2>
            <p className="mx-auto mt-4 max-w-[40ch] text-[15px] text-[#666]">
              Bekijk ons aanbod of neem direct contact op.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/occasions" className="btn-primary">
                Bekijk occasions <ArrowRight className="size-3.5" />
              </Link>
              <a href={`https://wa.me/${business.whatsapp}`} className="btn-ghost">
                WhatsApp ons
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      <SiteFooter />
    </div>
  );
}
