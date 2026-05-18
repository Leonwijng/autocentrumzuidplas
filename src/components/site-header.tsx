"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { business } from "@/content/site-content";

const links = [
  { label: "Occasions", href: "/occasions" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-black/80 backdrop-blur-md">
      {/* Desktop */}
      <div className="mx-auto hidden h-16 max-w-6xl items-center px-6 md:grid md:grid-cols-3">
        {/* Left: logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt={business.name}
            width={100}
            height={40}
            className="h-14 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Center: nav */}
        <nav className="flex items-center justify-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-[#888] transition-colors duration-150 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: buttons */}
        <div className="flex items-center justify-end gap-2.5">
          <a
            href={`https://wa.me/${business.whatsapp}`}
            className="btn-ghost text-[13px] py-1.5"
          >
            WhatsApp
          </a>
          <Link href="/occasions" className="btn-primary text-[13px] py-1.5">
            Bekijk occasions
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex h-16 items-center justify-between px-5 md:hidden">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt={business.name}
            width={110}
            height={36}
            className="h-8 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex size-9 items-center justify-center rounded-md text-[#888] hover:text-white"
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/6 bg-black px-5 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-[14px] text-[#888] transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              className="btn-ghost justify-center text-[14px]"
            >
              WhatsApp
            </a>
            <Link href="/occasions" className="btn-primary justify-center text-[14px]">
              Bekijk occasions
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
