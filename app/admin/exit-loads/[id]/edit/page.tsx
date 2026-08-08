"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import ExitLoadForm from "../../components/ExitLoadForm";

import {
  getExitLoadById,
  updateExitLoad,
} from "@/services/admin/exit-load.service";

import {
  ExitLoad,
} from "@/types/exit-load";

export default function EditExitLoadPage() {

  const params = useParams();

  const router = useRouter();

  const [rule, setRule] =
    useState<ExitLoad | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadRule() {

      if (!params.id) return;

      const data =
        await getExitLoadById(
          params.id as string
        );

      setRule(data);

      setLoading(false);

    }

    loadRule();

  }, [params.id]);

  async function handleSubmit(
    values: Partial<ExitLoad>
  ) {

    try {

      await updateExitLoad(
        params.id as string,
        values
      );

      alert(
        "Exit load rule updated successfully."
      );

      router.push("/admin/exit-load");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update exit load rule."
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

  if (!rule) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-10">

        Exit load rule not found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Exit Load Rule

        </h1>

        <p className="mt-2 text-gray-500">

          Update exit load rule.

        </p>

      </div>

      <ExitLoadForm
        mode="edit"
        initialValues={rule}
        onSubmit={handleSubmit}
      />

    </div>

  );

}