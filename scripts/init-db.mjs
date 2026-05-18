import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const envPath = join(dirname(fileURLToPath(import.meta.url)), "..", ".env.local");
try {
  const env = readFileSync(envPath, "utf8");
  for (const line of env.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
} catch {
  // .env.local not present — assume env is already populated
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local or your shell env.");
  process.exit(1);
}

const sql = neon(url);

const ddl = `
CREATE TABLE IF NOT EXISTS cars (
  id           TEXT PRIMARY KEY,
  make         TEXT NOT NULL,
  model        TEXT NOT NULL,
  year         INTEGER NOT NULL,
  km           INTEGER NOT NULL,
  fuel         TEXT NOT NULL CHECK (fuel IN ('benzine','diesel','elektrisch','hybride')),
  transmission TEXT NOT NULL CHECK (transmission IN ('automaat','handgeschakeld')),
  price        INTEGER NOT NULL,
  image        TEXT NOT NULL DEFAULT '',
  color        TEXT NOT NULL DEFAULT '',
  description  TEXT NOT NULL DEFAULT '',
  specs        JSONB NOT NULL DEFAULT '[]'::jsonb,
  published    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cars_created_at_idx ON cars (created_at DESC);
CREATE INDEX IF NOT EXISTS cars_published_idx  ON cars (published);
`;

const statements = ddl
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const stmt of statements) {
  await sql.query(stmt);
}

console.log("Database initialized (cars table ready).");
