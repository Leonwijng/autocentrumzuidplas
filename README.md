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
| `GITHUB_TOKEN` | GitHub PAT (contents: read & write) voor foto-uploads | Alleen voor uploads |
| `GITHUB_REPO` | `owner/repo` voor uploads — default `Leonwijng/autocentrumzuidplas` | Optioneel |
| `GITHUB_BRANCH` | Branch voor uploads — default `main` | Optioneel |

Op Vercel zet je dezelfde variabelen onder *Project → Settings → Environment Variables*.

### GitHub token aanmaken

1. Ga naar https://github.com/settings/personal-access-tokens/new
2. Kies **Fine-grained token** → Repository access: alleen `Leonwijng/autocentrumzuidplas`
3. Permissions → **Repository permissions** → **Contents**: *Read and write*
4. Genereer en kopieer de token naar `GITHUB_TOKEN` (lokaal én op Vercel)

## Het CMS

- `/admin/login` — inloggen met `ADMIN_PASSWORD`
- `/admin` — alle auto's beheren (zien, bewerken, verwijderen)
- `/admin/cars/new` — nieuwe auto toevoegen

Foto's worden via de GitHub API gecommit naar `public/uploads/cars/` in deze repo (max 8 MB, JPG/PNG/WebP/AVIF). Je kunt ook een externe URL plakken. De URL die opgeslagen wordt is een `raw.githubusercontent.com` link, dus de foto is direct beschikbaar — ook vóórdat Vercel opnieuw deployt.

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

Eerste deploy: zet alle env-vars (zie hierboven), inclusief `GITHUB_TOKEN`.
