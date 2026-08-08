"use client";

import { useRouter } from "next/navigation";

import ExitLoadForm from "../components/ExitLoadForm";

import {
  createExitLoad,
} from "@/services/admin/exit-load.service";

import {
  ExitLoad,
} from "@/types/exit-load";

export default function CreateExitLoadPage() {

  const router = useRouter();

  async function handleSubmit(
    values: Omit<
      ExitLoad,
      "id" | "factsheets"
    >
  ) {

    try {

      await createExitLoad(values);

      alert(
        "Exit load rule created successfully."
      );

      router.push("/admin/exit-loads");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create exit load rule."
      );

    }

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Create Exit Load Rule

        </h1>

        <p className="mt-2 text-gray-500">

          Add a new exit load rule.

        </p>

      </div>

      <ExitLoadForm
        mode="create"
        onSubmit={handleSubmit}
      />

    </div>

  );

}