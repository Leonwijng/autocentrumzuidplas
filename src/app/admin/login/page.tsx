"use client";

import { useState, useTransition } from "react";
import { loginAction } from "../actions";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-black px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-white/[0.02] p-7"
      >
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[#444]">
          Autocentrum Zuidplas
        </p>
        <h1 className="text-xl font-semibold text-white">Admin login</h1>
        <p className="mt-2 text-[13px] text-[#666]">Beheer je auto-aanbod.</p>

        <label className="mt-6 mb-1.5 block text-[12px] font-medium text-[#666]">
          Wachtwoord
        </label>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="w-full rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2.5 text-[13px] text-white outline-none transition focus:border-white/25"
        />

        {error && (
          <p className="mt-3 text-[12px] text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="btn-primary mt-5 w-full justify-center disabled:opacity-60"
        >
          {pending ? "Inloggen…" : "Inloggen"}
        </button>
      </form>
    </div>
  );
}
