"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import SectorForm from "../../components/SectorForm";

import {
  getSectorAllocationById,
  updateSectorAllocation,
} from "@/services/admin/sector-allocation.service";

import {
  SectorAllocation,
} from "@/types/sector-allocation";

export default function EditSectorPage() {

  const params = useParams();

  const router = useRouter();

  const [sector, setSector] =
    useState<SectorAllocation | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadSector() {

      if (!params.id) return;

      const data =
        await getSectorAllocationById(
          params.id as string
        );

      setSector(data);

      setLoading(false);

    }

    loadSector();

  }, [params.id]);

  async function handleSubmit(
    values: Partial<SectorAllocation>
  ) {

    try {

      await updateSectorAllocation(
        params.id as string,
        values
      );

      alert(
        "Sector allocation updated successfully."
      );

      router.push("/admin/sectors");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update sector allocation."
      );

    }

  }

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-10">

        Loading...

      </div>

    );

  }

  if (!sector) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-10">

        Sector allocation not found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Sector Allocation

        </h1>

        <p className="mt-2 text-gray-500">

          Update sector allocation.

        </p>

      </div>

      <SectorForm
        mode="edit"
        initialValues={sector}
        onSubmit={handleSubmit}
      />

    </div>

  );

}