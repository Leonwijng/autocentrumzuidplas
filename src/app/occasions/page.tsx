import OccasionsClient from "./OccasionsClient";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { listPublishedCars } from "@/lib/cars";

export const revalidate = 60;

export const metadata = {
  title: "Occasions",
  description:
    "Bekijk het complete aanbod tweedehands auto's bij Autocentrum Zuidplas in Nieuwerkerk aan den IJssel.",
};

export default async function OccasionsPage() {
  const cars = await listPublishedCars();

  return (
    <div className="bg-black">
      <SiteHeader />
      <OccasionsClient cars={cars} />
      <SiteFooter />
    </div>
  );
}
