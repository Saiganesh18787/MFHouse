"use client";

import { useRouter } from "next/navigation";

import SectorForm from "../components/SectorForm";

import {
  createSectorAllocation,
} from "@/services/admin/sector-allocation.service";

import {
  SectorAllocation,
} from "@/types/sector-allocation";

export default function CreateSectorPage() {

  const router = useRouter();

  async function handleSubmit(
    values: Omit<
      SectorAllocation,
      "id" | "factsheets"
    >
  ) {

    try {

      await createSectorAllocation(
        values
      );

      alert(
        "Sector allocation created successfully."
      );

      router.push("/admin/sectors");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create sector allocation."
      );

    }

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Create Sector Allocation

        </h1>

        <p className="mt-2 text-gray-500">

          Add a new sector allocation.

        </p>

      </div>

      <SectorForm
        mode="create"
        onSubmit={handleSubmit}
      />

    </div>

  );

}