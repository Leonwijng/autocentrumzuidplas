"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  setSessionCookie,
  clearSessionCookie,
  checkPassword,
  requireAuth,
} from "@/lib/auth";
import {
  createCar,
  updateCar,
  deleteCar,
  slugify,
  type CarInput,
  type FuelType,
  type Spec,
  type TransmissionType,
} from "@/lib/cars";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Onjuist wachtwoord." };
  }
  await setSessionCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

function parseSpecs(raw: string): Spec[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { label: line, value: "" };
      return {
        label: line.slice(0, idx).trim(),
        value: line.slice(idx + 1).trim(),
      };
    });
}

function parseCarForm(formData: FormData): CarInput {
  const make = String(formData.get("make") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const year = Number(formData.get("year") ?? 0);
  const km = Number(formData.get("km") ?? 0);
  const fuel = String(formData.get("fuel") ?? "benzine") as FuelType;
  const transmission = String(formData.get("transmission") ?? "handgeschakeld") as TransmissionType;
  const price = Number(formData.get("price") ?? 0);
  const image = String(formData.get("image") ?? "").trim();
  const color = String(formData.get("color") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const specs = parseSpecs(String(formData.get("specs") ?? ""));
  const published = formData.get("published") === "on";

  let id = String(formData.get("id") ?? "").trim();
  if (!id) id = slugify(`${make}-${model}-${year}`);

  return {
    id,
    make,
    model,
    year,
    km,
    fuel,
    transmission,
    price,
    image,
    color,
    description,
    specs,
    published,
  };
}

export async function createCarAction(formData: FormData) {
  await requireAuth();
  const input = parseCarForm(formData);
  await createCar(input);
  revalidatePath("/");
  revalidatePath("/occasions");
  revalidatePath("/admin");
  redirect(`/admin/cars/${input.id}`);
}

export async function updateCarAction(originalId: string, formData: FormData) {
  await requireAuth();
  const input = parseCarForm(formData);
  await updateCar(originalId, input);
  revalidatePath("/");
  revalidatePath("/occasions");
  revalidatePath(`/occasions/${originalId}`);
  revalidatePath(`/occasions/${input.id}`);
  revalidatePath("/admin");
  redirect(`/admin/cars/${input.id}`);
}

export async function deleteCarAction(id: string) {
  await requireAuth();
  await deleteCar(id);
  revalidatePath("/");
  revalidatePath("/occasions");
  revalidatePath("/admin");
  redirect("/admin");
}
