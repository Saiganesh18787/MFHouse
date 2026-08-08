"use client";

import { useRouter } from "next/navigation";

import MetricForm from "../components/MetricForm";

import { createMetric } from "@/services/admin/metrics.service";

import { Metric } from "@/types/metric";

export default function CreateMetricPage() {

  const router = useRouter();

  async function handleCreate(
    formData: Omit<Metric, "id" | "factsheets">
  ) {

    try {

      await createMetric(formData);

      alert("Metric created successfully.");

      router.push("/admin/metrics");

    } catch (error) {

      console.error(error);

      alert("Failed to create metric.");

    }

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Create Metric

        </h1>

        <p className="mt-2 text-gray-500">

          Add factsheet metrics.

        </p>

      </div>

      <MetricForm
        mode="create"
        onSubmit={handleCreate}
      />

    </div>

  );

}