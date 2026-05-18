# Autocentrum Zuidplas

Website + CMS voor [autocentrumzuidplas.nl](https://autocentrumzuidplas.nl). Gebouwd met Next.js 16, Tailwind v4 en Neon Postgres.

## Eerste keer opstarten

```bash
npm install
cp .env.example .env.local   # vul de variabelen in
npm run db:init              # maakt de cars tabel aan in Neon
npm run dev
```

Open http://localhost:3000 — en http://localhost:3000/admin/login om in te loggen.

## Omgevingsvariabelen (`.env.local`)

| Variabele | Wat | Verplicht |
|---|---|---|
| `DATABASE_URL` | Neon Postgres connection string | ✅ |
| `ADMIN_PASSWORD` | Wachtwoord om in te loggen op `/admin/login` | ✅ |
| `SESSION_SECRET` | Lange random string voor cookie-signing | ✅ |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token voor foto-uploads | Alleen voor uploads |

Op Vercel zet je dezelfde variabelen onder *Project → Settings → Environment Variables*. `BLOB_READ_WRITE_TOKEN` wordt automatisch ingesteld zodra je een Vercel Blob-store koppelt.

## Het CMS

- `/admin/login` — inloggen met `ADMIN_PASSWORD`
- `/admin` — alle auto's beheren (zien, bewerken, verwijderen)
- `/admin/cars/new` — nieuwe auto toevoegen

Foto's worden geüpload naar Vercel Blob (max 8 MB, JPG/PNG/WebP/AVIF). Je kunt ook een externe URL plakken.

Specificaties voer je in als regels in de vorm `Label: Waarde`, bijvoorbeeld:

```
Bouwjaar: 2022
Vermogen: 150 pk
APK: 07-2026
```

## Database

Schema staat in `scripts/init-db.mjs`. Wijzigingen aan de tabel? Pas dat script aan en draai het opnieuw — het is idempotent (`CREATE TABLE IF NOT EXISTS`).

## Deploy

```bash
git push  # → Vercel pickt het automatisch op
```

Eerste deploy: koppel het project aan een Vercel Blob store en zet alle env-vars (zie hierboven).
