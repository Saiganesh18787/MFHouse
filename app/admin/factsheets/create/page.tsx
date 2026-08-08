"use client";

import { useRouter } from "next/navigation";

import FactsheetForm from "../components/FactsheetForm";

import { createFactsheet } from "@/services/admin/factsheets.service";

import { Factsheet } from "@/types/factsheet";

export default function CreateFactsheetPage() {

  const router = useRouter();

  async function handleCreate(
    formData: Omit<Factsheet, "id">
  ) {

    try {

      await createFactsheet(formData);

      alert(
        "Factsheet created successfully."
      );

      router.push(
        "/admin/factsheets"
      );

    } catch (error) {

      console.error(error);

      if (error instanceof Error) {

        alert(error.message);

      } else {

        alert("Failed to create factsheet.");

      }

    }

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Create Factsheet

        </h1>

        <p className="mt-2 text-gray-500">

          Add a monthly factsheet.

        </p>

      </div>

      <FactsheetForm
        mode="create"
        onSubmit={handleCreate}
      />

    </div>

  );

}