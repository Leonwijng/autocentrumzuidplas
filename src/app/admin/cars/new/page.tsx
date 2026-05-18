import { requireAuth } from "@/lib/auth";
import CarForm from "../CarForm";
import { createCarAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function NewCarPage() {
  await requireAuth();
  return <CarForm title="Nieuwe auto" saveAction={createCarAction} />;
}
