import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

const DEFAULT_REPO = "Leonwijng/autocentrumzuidplas";
const DEFAULT_BRANCH = "main";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return new NextResponse(
      "GITHUB_TOKEN is niet geconfigureerd. Stel deze in op Vercel of in .env.local.",
      { status: 500 },
    );
  }

  const repo = process.env.GITHUB_REPO || DEFAULT_REPO;
  const branch = process.env.GITHUB_BRANCH || DEFAULT_BRANCH;

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return new NextResponse("Geen bestand", { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return new NextResponse("Bestand is te groot (max 8 MB)", { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return new NextResponse("Alleen JPG, PNG, WebP of AVIF toegestaan", { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `public/uploads/cars/${filename}`;

  const bytes = Buffer.from(await file.arrayBuffer());
  const content = bytes.toString("base64");

  const ghRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${encodeURI(path)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        "User-Agent": "autocentrumzuidplas-cms",
      },
      body: JSON.stringify({
        message: `chore: upload ${filename}`,
        content,
        branch,
      }),
    },
  );

  if (!ghRes.ok) {
    const text = await ghRes.text();
    return new NextResponse(
      `GitHub upload mislukt (${ghRes.status}): ${text}`,
      { status: 500 },
    );
  }

  const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
  return NextResponse.json({ url });
}
