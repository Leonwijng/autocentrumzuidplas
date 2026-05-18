"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/FadeIn";
import { business } from "@/content/site-content";

const hours = [
  { day: "Maandag – vrijdag", time: "Op afspraak" },
  { day: "Zaterdag", time: "Op afspraak" },
  { day: "Zondag", time: "Gesloten" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Bericht via website");
    const body = encodeURIComponent(
      `Naam: ${form.name}\nE-mail: ${form.email}\nTelefoon: ${form.phone}\n\n${form.message}`,
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="bg-black">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-5 pt-28 pb-32">
        <FadeIn className="mb-16">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#444]">
            Contact
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Neem contact op
          </h1>
          <p className="mt-3 max-w-[48ch] text-[14px] leading-7 text-[#555]">
            Vragen over een auto, wil je langskomen of gewoon even kennismaken?
            Stuur een berichtje via WhatsApp, mail of het formulier hieronder.
          </p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-[1fr_0.6fr]">
          <FadeIn>
            {sent ? (
              <div className="surface rounded-xl px-8 py-12 text-center">
                <p className="text-[15px] font-medium text-white">Mailprogramma geopend!</p>
                <p className="mt-2 text-[13px] text-[#555]">
                  Verzend het bericht vanuit je mailprogramma — we reageren snel.
                </p>
                <button
                  onClick={() => {
                    setForm({ name: "", email: "", phone: "", message: "" });
                    setSent(false);
                  }}
                  className="mt-6 text-[13px] text-white underline-offset-4 hover:underline"
                >
                  Nieuw bericht
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {(
                  [
                    ["name", "Naam", "text", true],
                    ["email", "E-mailadres", "email", true],
                    ["phone", "Telefoonnummer", "tel", false],
                  ] as const
                ).map(([field, label, type, required]) => (
                  <div key={field}>
                    <label className="mb-1.5 block text-[12px] font-medium text-[#555]">
                      {label}
                    </label>
                    <input
                      type={type}
                      required={required}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2.5 text-[13px] text-white outline-none transition placeholder-[#333] focus:border-white/25"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#555]">
                    Bericht
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2.5 text-[13px] text-white outline-none transition placeholder-[#333] focus:border-white/25"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  Verstuur bericht <ArrowRight className="size-3.5" />
                </button>
              </form>
            )}
          </FadeIn>

          <FadeIn delay={0.08} className="space-y-8">
            <div className="surface rounded-xl p-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#444]">
                Direct contact
              </p>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  className="flex items-center justify-between text-[13px] text-white transition-colors hover:text-white/70"
                >
                  <span>WhatsApp</span>
                  <span className="text-[#555]">06 23687249</span>
                </a>
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="flex items-center justify-between text-[13px] text-white transition-colors hover:text-white/70"
                >
                  <span>Telefoon</span>
                  <span className="text-[#555]">06 23687249</span>
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center justify-between text-[13px] text-white transition-colors hover:text-white/70"
                >
                  <span>E-mail</span>
                  <span className="text-[#555]">{business.email}</span>
                </a>
              </div>
            </div>

            <div className="surface rounded-xl p-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#444]">
                Openingstijden
              </p>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between text-[13px]"
                  >
                    <span className="text-[#666]">{h.day}</span>
                    <span
                      className={h.time === "Gesloten" ? "text-[#444]" : "text-white"}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-[#555]">
                Bezoek alleen op afspraak — bel of WhatsApp ons even.
              </p>
            </div>

            <div className="surface rounded-xl p-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#444]">
                Adres
              </p>
              <p className="text-[13px] leading-6 text-[#666]">
                {business.address.street}
                <br />
                {business.address.postcode} {business.address.city}
                <br />
                {business.address.country}
              </p>
              <p className="mt-3 text-[11px] text-[#555]">KvK {business.kvk}</p>
            </div>
          </FadeIn>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
