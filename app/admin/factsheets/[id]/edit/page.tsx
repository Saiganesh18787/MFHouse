"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import FactsheetForm from "../../components/FactsheetForm";

import {

  getFactsheetById,

  updateFactsheet,

} from "@/services/admin/factsheets.service";

import { Factsheet } from "@/types/factsheet";

export default function EditFactsheetPage() {

  const params = useParams();

  const router = useRouter();

  const [factsheet, setFactsheet] =
    useState<Factsheet | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadFactsheet() {

      if (!params.id) return;

      const data =
        await getFactsheetById(
          params.id as string
        );

      setFactsheet(data);

      setLoading(false);

    }

    loadFactsheet();

  }, [params.id]);

  async function handleSubmit(
    values: Partial<Factsheet>
  ) {

    try {

      await updateFactsheet(
        params.id as string,
        values
      );

      alert(
        "Factsheet updated successfully."
      );

      router.push(
        "/admin/factsheets"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update factsheet."
      );

    }

  }

  if (loading) {

    return (

      <div className="rounded-xl border bg-white p-10">

        Loading...

      </div>

    );

  }

  if (!factsheet) {

    return (

      <div className="rounded-xl border bg-white p-10">

        Factsheet not found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Factsheet

        </h1>

        <p className="mt-2 text-gray-500">

          Update monthly factsheet.

        </p>

      </div>

      <FactsheetForm
        mode="edit"
        initialValues={factsheet}
        onSubmit={handleSubmit}
      />

    </div>

  );

}