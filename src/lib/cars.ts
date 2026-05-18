import { sql } from "./db";

export type FuelType = "benzine" | "diesel" | "elektrisch" | "hybride";
export type TransmissionType = "automaat" | "handgeschakeld";

export type Spec = { label: string; value: string };

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: FuelType;
  transmission: TransmissionType;
  price: number;
  image: string;
  images: string[];
  color: string;
  description: string;
  specs: Spec[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

type CarRow = {
  id: string;
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: FuelType;
  transmission: TransmissionType;
  price: number;
  image: string;
  images: string[] | string | null;
  color: string;
  description: string;
  specs: Spec[] | string | null;
  published: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

function parseJsonArray<T>(value: T[] | string | null): T[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function rowToCar(row: CarRow): Car {
  const specs = parseJsonArray<Spec>(row.specs);
  let images = parseJsonArray<string>(row.images).filter(Boolean);
  if (images.length === 0 && row.image) images = [row.image];
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    year: row.year,
    km: row.km,
    fuel: row.fuel,
    transmission: row.transmission,
    price: row.price,
    image: row.image,
    images,
    color: row.color,
    description: row.description,
    specs,
    published: row.published,
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    updated_at: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
  };
}

export async function listPublishedCars(): Promise<Car[]> {
  const rows = (await sql`
    SELECT * FROM cars
    WHERE published = true
    ORDER BY created_at DESC
  `) as CarRow[];
  return rows.map(rowToCar);
}

export async function listAllCars(): Promise<Car[]> {
  const rows = (await sql`
    SELECT * FROM cars
    ORDER BY created_at DESC
  `) as CarRow[];
  return rows.map(rowToCar);
}

export async function getCarById(id: string): Promise<Car | null> {
  const rows = (await sql`
    SELECT * FROM cars WHERE id = ${id} LIMIT 1
  `) as CarRow[];
  return rows[0] ? rowToCar(rows[0]) : null;
}

export type CarInput = {
  id: string;
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: FuelType;
  transmission: TransmissionType;
  price: number;
  images: string[];
  color: string;
  description: string;
  specs: Spec[];
  published: boolean;
};

export async function createCar(input: CarInput): Promise<Car> {
  const cover = input.images[0] ?? "";
  const rows = (await sql`
    INSERT INTO cars (
      id, make, model, year, km, fuel, transmission, price,
      image, images, color, description, specs, published
    ) VALUES (
      ${input.id}, ${input.make}, ${input.model}, ${input.year}, ${input.km},
      ${input.fuel}, ${input.transmission}, ${input.price},
      ${cover}, ${JSON.stringify(input.images)}::jsonb,
      ${input.color}, ${input.description},
      ${JSON.stringify(input.specs)}::jsonb, ${input.published}
    )
    RETURNING *
  `) as CarRow[];
  return rowToCar(rows[0]);
}

export async function updateCar(id: string, input: CarInput): Promise<Car | null> {
  const cover = input.images[0] ?? "";
  const rows = (await sql`
    UPDATE cars SET
      id = ${input.id},
      make = ${input.make},
      model = ${input.model},
      year = ${input.year},
      km = ${input.km},
      fuel = ${input.fuel},
      transmission = ${input.transmission},
      price = ${input.price},
      image = ${cover},
      images = ${JSON.stringify(input.images)}::jsonb,
      color = ${input.color},
      description = ${input.description},
      specs = ${JSON.stringify(input.specs)}::jsonb,
      published = ${input.published},
      updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `) as CarRow[];
  return rows[0] ? rowToCar(rows[0]) : null;
}

export async function deleteCar(id: string): Promise<boolean> {
  const rows = (await sql`
    DELETE FROM cars WHERE id = ${id} RETURNING id
  `) as { id: string }[];
  return rows.length > 0;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
