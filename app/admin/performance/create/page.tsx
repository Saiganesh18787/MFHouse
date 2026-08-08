"use client";

import { useRouter } from "next/navigation";

import PerformanceForm from "../components/PerformanceForm";

import { createPerformance } from "@/services/admin/performance.service";

import { Performance } from "@/types/performance";

export default function CreatePerformancePage() {

  const router = useRouter();

  async function handleCreate(
    values: Omit<Performance, "id" | "factsheets">
  ) {

    try {

      await createPerformance(values);

      alert("Performance created successfully.");

      router.push("/admin/performance");

    } catch (error) {

      console.error(error);

      alert("Failed to create performance.");

    }

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Create Performance

        </h1>

        <p className="mt-2 text-gray-500">

          Add monthly performance data.

        </p>

      </div>

      <PerformanceForm
        mode="create"
        onSubmit={handleCreate}
      />

    </div>

  );

}