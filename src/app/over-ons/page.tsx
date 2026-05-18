import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/FadeIn";
import { business } from "@/content/site-content";

export const metadata = {
  title: "Over ons",
  description:
    "Autocentrum Zuidplas – een lokaal autobedrijf uit Nieuwerkerk aan den IJssel met eerlijk advies en persoonlijke service.",
};

const values = [
  {
    title: "Persoonlijk",
    text: "Geen nummer, maar een mens. We nemen de tijd voor jou en jouw wensen.",
  },
  {
    title: "Eerlijk",
    text: "Transparante prijzen, duidelijke communicatie, geen verborgen kosten.",
  },
  {
    title: "Lokaal",
    text: "Gevestigd in Nieuwerkerk aan den IJssel, midden in de Zuidplas.",
  },
  {
    title: "Kwaliteit",
    text: "Elke auto wordt zorgvuldig geselecteerd en gecontroleerd voor verkoop.",
  },
];

export default function OverOnsPage() {
  return (
    <div className="bg-black">
      <SiteHeader />

      <section className="mx-auto max-w-5xl px-5 pt-28 pb-20">
        <FadeIn>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#444]">
            Over ons
          </p>
          <h1 className="text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.15] tracking-tight text-white">
            Een lokaal autobedrijf<br className="hidden sm:block" /> met persoonlijke service.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[15px] leading-7 text-[#666]">
            {business.name} is gevestigd in Nieuwerkerk aan den IJssel. Wij richten ons op
            tweedehands auto&apos;s en onderdelen, met persoonlijke begeleiding van eerste
            interesse tot na de aankoop. Geen druk, geen trucjes — gewoon een eerlijk advies.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`https://wa.me/${business.whatsapp}`} className="btn-primary">
              Stuur een WhatsApp <ArrowRight className="size-3.5" />
            </a>
            <Link href="/occasions" className="btn-ghost">
              Bekijk het aanbod
            </Link>
          </div>
        </FadeIn>
      </section>

      <div className="divider">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <FadeIn className="mb-10">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Waar wij voor staan
            </h2>
          </FadeIn>
          <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.06}>
                <div className="bg-black px-6 py-7">
                  <p className="text-[13px] font-semibold text-white">{v.title}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[#555]">{v.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <div className="divider">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Bedrijfsgegevens
              </h2>
              <p className="mt-3 text-[13px] leading-6 text-[#666]">
                {business.name} is een eenmanszaak ingeschreven bij de Kamer van Koophandel.
                Activiteiten: detailhandel in tweedehands voertuigen en onderdelen.
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <dl className="surface rounded-xl p-6 text-[13px]">
                <div className="flex justify-between border-b border-white/[0.06] py-2.5">
                  <dt className="text-[#666]">Handelsnaam</dt>
                  <dd className="text-white">{business.name}</dd>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] py-2.5">
                  <dt className="text-[#666]">KvK-nummer</dt>
                  <dd className="text-white">{business.kvk}</dd>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] py-2.5">
                  <dt className="text-[#666]">Adres</dt>
                  <dd className="text-right text-white">
                    {business.address.street}
                    <br />
                    {business.address.postcode} {business.address.city}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] py-2.5">
                  <dt className="text-[#666]">Telefoon</dt>
                  <dd className="text-white">06 23687249</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-[#666]">E-mail</dt>
                  <dd className="text-white">{business.email}</dd>
                </div>
              </dl>
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="divider">
        <FadeIn>
          <div className="mx-auto max-w-5xl px-5 py-20 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Benieuwd naar ons aanbod?
            </h2>
            <p className="mx-auto mt-3 max-w-[40ch] text-[14px] text-[#555]">
              Bekijk alle occasions of neem direct contact op.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/occasions" className="btn-primary">
                Bekijk occasions <ArrowRight className="size-3.5" />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Contact
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>

      <SiteFooter />
    </div>
  );
}
