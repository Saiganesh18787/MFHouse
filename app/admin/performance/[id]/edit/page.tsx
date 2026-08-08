"use client";

import { useEffect, useState } from "react";

import {

  useParams,

  useRouter,

} from "next/navigation";

import PerformanceForm from "../../components/PerformanceForm";

import {

  getPerformanceById,

  updatePerformance,

} from "@/services/admin/performance.service";

import { Performance } from "@/types/performance";

export default function EditPerformancePage() {

  const params = useParams();

  const router = useRouter();

  const [performance, setPerformance] =
    useState<Performance | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadPerformance() {

      if (!params.id) return;

      const data =
        await getPerformanceById(
          params.id as string
        );

      setPerformance(data);

      setLoading(false);

    }

    loadPerformance();

  }, [params.id]);

  async function handleSubmit(
    values: Partial<Performance>
  ) {

    try {

      await updatePerformance(
        params.id as string,
        values
      );

      alert(
        "Performance updated successfully."
      );

      router.push(
        "/admin/performance"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update performance."
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

  if (!performance) {

    return (

      <div className="rounded-xl border bg-white p-10">

        Performance not found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Performance

        </h1>

        <p className="mt-2 text-gray-500">

          Update monthly performance.

        </p>

      </div>

      <PerformanceForm
        mode="edit"
        initialValues={performance}
        onSubmit={handleSubmit}
      />

    </div>

  );

}