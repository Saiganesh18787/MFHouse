"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import MetricForm from "../../components/MetricForm";

import {

  getMetricById,

  updateMetric,

} from "@/services/admin/metrics.service";

import { Metric } from "@/types/metric";

export default function EditMetricPage() {

  const params = useParams();

  const router = useRouter();

  const [metric, setMetric] =
    useState<Metric | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadMetric() {

      if (!params.id) return;

      const data =
        await getMetricById(
          params.id as string
        );

      setMetric(data);

      setLoading(false);

    }

    loadMetric();

  }, [params.id]);

  async function handleSubmit(
    values: Partial<Metric>
  ) {

    try {

      await updateMetric(
        params.id as string,
        values
      );

      alert("Metric updated successfully.");

      router.push("/admin/metrics");

    } catch (error) {

      console.error(error);

      alert("Failed to update metric.");

    }

  }

  if (loading) {

    return (

      <div className="rounded-xl border bg-white p-10">

        Loading...

      </div>

    );

  }

  if (!metric) {

    return (

      <div className="rounded-xl border bg-white p-10">

        Metric not found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Metric

        </h1>

        <p className="mt-2 text-gray-500">

          Update factsheet metrics.

        </p>

      </div>

      <MetricForm
        mode="edit"
        initialValues={metric}
        onSubmit={handleSubmit}
      />

    </div>

  );

}