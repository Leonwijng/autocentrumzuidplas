import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new NextResponse(
      "BLOB_READ_WRITE_TOKEN is niet geconfigureerd. Stel deze in op Vercel of in .env.local.",
      { status: 500 },
    );
  }

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
  const key = `cars/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const blob = await put(key, file, {
    access: "public",
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url });
}
