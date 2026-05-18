"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Trash2 } from "lucide-react";
import type { Car } from "@/lib/cars";

type Action = (formData: FormData) => Promise<void | { error?: string }>;

type Props = {
  car?: Car;
  saveAction: Action;
  deleteAction?: () => Promise<void>;
  title: string;
};

export default function CarForm({ car, saveAction, deleteAction, title }: Props) {
  const [image, setImage] = useState<string>(car?.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deleting, startDelete] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.text()) || "Upload mislukt");
      const data = (await res.json()) as { url: string };
      setImage(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload mislukt");
    } finally {
      setUploading(false);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await saveAction(fd);
      if (result && "error" in result && result.error) setError(result.error);
    });
  }

  const specsText = car?.specs.map((s) => `${s.label}: ${s.value}`).join("\n") ?? "";

  return (
    <div className="min-h-svh bg-black">
      <header className="border-b border-white/[0.07]">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#888] hover:text-white"
          >
            <ArrowLeft className="size-3.5" /> Terug naar overzicht
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="mb-8 text-2xl font-semibold tracking-tight text-white">{title}</h1>

        <form onSubmit={onSubmit} className="space-y-6">
          <input type="hidden" name="image" value={image} />

          <Section title="Foto">
            <div className="space-y-3">
              {image ? (
                <div className="relative overflow-hidden rounded-lg border border-white/[0.08]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="" className="aspect-[16/9] w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[11px] text-white backdrop-blur hover:bg-black/90"
                  >
                    Verwijderen
                  </button>
                </div>
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed border-white/[0.12] text-[12px] text-[#555]">
                  Geen foto
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleUpload(f);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="btn-ghost text-[12px] py-1.5"
                >
                  <Upload className="size-3.5" /> {uploading ? "Uploaden…" : "Foto uploaden"}
                </button>
                <span className="text-[11px] text-[#555]">of plak een URL:</span>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://…"
                  className="flex-1 min-w-[200px] rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-[12px] text-white outline-none focus:border-white/25"
                />
              </div>
            </div>
          </Section>

          <Section title="Basis">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Merk" name="make" defaultValue={car?.make} required />
              <Field label="Model" name="model" defaultValue={car?.model} required />
              <Field label="Bouwjaar" name="year" type="number" defaultValue={car?.year} required />
              <Field label="Kilometerstand" name="km" type="number" defaultValue={car?.km} required />
              <Select
                label="Brandstof"
                name="fuel"
                defaultValue={car?.fuel ?? "benzine"}
                options={[
                  { value: "benzine", label: "Benzine" },
                  { value: "diesel", label: "Diesel" },
                  { value: "elektrisch", label: "Elektrisch" },
                  { value: "hybride", label: "Hybride" },
                ]}
              />
              <Select
                label="Transmissie"
                name="transmission"
                defaultValue={car?.transmission ?? "handgeschakeld"}
                options={[
                  { value: "handgeschakeld", label: "Handgeschakeld" },
                  { value: "automaat", label: "Automaat" },
                ]}
              />
              <Field label="Prijs (€)" name="price" type="number" defaultValue={car?.price} required />
              <Field label="Kleur" name="color" defaultValue={car?.color} />
            </div>
          </Section>

          <Section title="Beschrijving">
            <Textarea
              name="description"
              rows={4}
              defaultValue={car?.description}
              placeholder="Korte verkooptekst over deze auto…"
            />
          </Section>

          <Section title="Specificaties" hint="Eén per regel, formaat: Label: Waarde">
            <Textarea
              name="specs"
              rows={8}
              defaultValue={specsText}
              placeholder={"Bouwjaar: 2022\nVermogen: 150 pk\nAPK: 07-2026"}
              mono
            />
          </Section>

          <Section title="Geavanceerd">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="URL slug"
                name="id"
                defaultValue={car?.id}
                placeholder="auto-genereren-uit-merk-model"
                hint="Wordt /occasions/<slug>"
              />
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-[13px] text-white">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={car?.published ?? true}
                    className="size-4 accent-white"
                  />
                  Online publiceren
                </label>
              </div>
            </div>
          </Section>

          {error && <p className="text-[12px] text-red-400">{error}</p>}

          <div className="flex items-center justify-between border-t border-white/[0.07] pt-6">
            <div>
              {deleteAction && (
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => {
                    if (!confirm("Deze auto definitief verwijderen?")) return;
                    startDelete(async () => {
                      await deleteAction();
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-[12px] text-red-400 hover:text-red-300 disabled:opacity-60"
                >
                  <Trash2 className="size-3.5" /> {deleting ? "Verwijderen…" : "Verwijder auto"}
                </button>
              )}
            </div>
            <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
              {pending ? "Opslaan…" : "Opslaan"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[#666]">
          {title}
        </h2>
        {hint && <span className="text-[11px] text-[#555]">{hint}</span>}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-[#888]">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none transition focus:border-white/25"
      />
      {hint && <span className="mt-1 block text-[11px] text-[#555]">{hint}</span>}
    </label>
  );
}

function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-[#888]">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none transition focus:border-white/25"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-black">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  name,
  rows,
  defaultValue,
  placeholder,
  mono,
}: {
  name: string;
  rows: number;
  defaultValue?: string;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <textarea
      name={name}
      rows={rows}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`w-full resize-none rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none transition focus:border-white/25 ${
        mono ? "font-mono" : ""
      }`}
    />
  );
}
