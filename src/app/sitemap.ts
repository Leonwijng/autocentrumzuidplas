import type { MetadataRoute } from "next";
import { listPublishedCars } from "@/lib/cars";

const baseUrl = "https://autocentrumzuidplas.nl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await listPublishedCars();
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/occasions`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/over-ons`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...cars.map((car) => ({
      url: `${baseUrl}/occasions/${car.id}`,
      lastModified: new Date(car.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
