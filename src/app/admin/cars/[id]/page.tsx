import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import { getCarById } from "@/lib/cars";
import CarForm from "../CarForm";
import { updateCarAction, deleteCarAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();
  const { id } = await params;
  const car = await getCarById(id);
  if (!car) notFound();

  const save = updateCarAction.bind(null, car.id);
  const remove = deleteCarAction.bind(null, car.id);

  return (
    <CarForm
      title={`${car.make} ${car.model}`}
      car={car}
      saveAction={save}
      deleteAction={remove}
    />
  );
}
