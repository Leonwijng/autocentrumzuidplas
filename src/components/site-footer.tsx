import Link from "next/link";
import Image from "next/image";
import { business } from "@/content/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-black">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Image
              src="/logo.png"
              alt={business.name}
              width={140}
              height={46}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-3 max-w-xs text-[13px] leading-6 text-[#555]">
              Lokale autohandelaar uit Nieuwerkerk aan den IJssel. Bereikbaar via
              WhatsApp, telefoon en e-mail.
            </p>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#555]">
              Pagina&apos;s
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Occasions", href: "/occasions" },
                { label: "Over ons", href: "/over-ons" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[13px] text-[#666] transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#555]">
              Contact
            </p>
            <div className="flex flex-col gap-2 text-[13px] text-[#666]">
              <a
                href={`tel:${business.phoneIntl}`}
                className="transition-colors hover:text-white"
              >
                06 23687249
              </a>
              <a
                href={`mailto:${business.email}`}
                className="transition-colors hover:text-white"
              >
                {business.email}
              </a>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                className="transition-colors hover:text-white"
              >
                WhatsApp
              </a>
              <span className="text-[#444]">
                {business.address.street}, {business.address.city}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-6 text-[12px] text-[#444]">
          <span>© {new Date().getFullYear()} {business.name} · KvK {business.kvk}</span>
          <Link href="/admin" className="hover:text-[#666]">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
