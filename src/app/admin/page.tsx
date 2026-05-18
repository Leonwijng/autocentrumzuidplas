import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { listAllCars } from "@/lib/cars";
import { logoutAction } from "./actions";

function price(n: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  await requireAuth();
  const cars = await listAllCars();

  return (
    <div className="min-h-svh bg-black">
      <header className="border-b border-white/[0.07]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#444]">
              Admin
            </p>
            <p className="text-[13px] font-medium text-white">Autocentrum Zuidplas</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[13px] text-[#666] hover:text-white">
              Bekijk site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-[13px] text-[#666] hover:text-white"
              >
                Uitloggen
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Auto-aanbod
            </h1>
            <p className="mt-1 text-[13px] text-[#555]">
              {cars.length} {cars.length === 1 ? "auto" : "auto's"} in totaal
            </p>
          </div>
          <Link href="/admin/cars/new" className="btn-primary">
            <Plus className="size-3.5" /> Nieuwe auto
          </Link>
        </div>

        {cars.length === 0 ? (
          <div className="surface rounded-xl px-8 py-16 text-center">
            <p className="text-[14px] text-[#666]">Nog geen auto&apos;s toegevoegd.</p>
            <Link
              href="/admin/cars/new"
              className="mt-4 inline-block text-[13px] text-white underline-offset-4 hover:underline"
            >
              Voeg je eerste auto toe
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/[0.07]">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-white/[0.03] text-[#666]">
                <tr>
                  <th className="px-4 py-3 font-medium">Auto</th>
                  <th className="px-4 py-3 font-medium">Jaar</th>
                  <th className="px-4 py-3 font-medium">Km</th>
                  <th className="px-4 py-3 font-medium">Prijs</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {cars.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-white/[0.06] hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">
                        {c.make} {c.model}
                      </p>
                      <p className="text-[11px] text-[#555]">{c.id}</p>
                    </td>
                    <td className="px-4 py-3 text-[#888]">{c.year}</td>
                    <td className="px-4 py-3 text-[#888]">
                      {c.km.toLocaleString("nl-NL")}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">
                      {price(c.price)}
                    </td>
                    <td className="px-4 py-3">
                      {c.published ? (
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                          Online
                        </span>
                      ) : (
                        <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-[#888]">
                          Concept
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/cars/${c.id}`}
                        className="inline-flex items-center gap-1 text-[12px] text-[#888] hover:text-white"
                      >
                        <Pencil className="size-3" /> Bewerken
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
