"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import FundForm from "../../components/FundForm";

import {
  getFundById,
  updateFund,
} from "@/services/admin/funds.service";

import { Fund } from "@/types/fund";

export default function EditFundPage() {

  const params = useParams();

  const router = useRouter();

  const [fund, setFund] =
    useState<Fund | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadFund() {

      if (!params.id) return;

      const data =
        await getFundById(
          params.id as string
        );

      setFund(data);

      setLoading(false);

    }

    loadFund();

  }, [params.id]);

  async function handleSubmit(
    values: Partial<Fund>
  ) {

    try {

    await updateFund(
      params.id as string,
      values
    );

    alert("Fund updated successfully.");

    router.push("/admin/funds");

  } catch (error) {

    console.error(error);

    alert("Failed to update fund.");

  }

  }

  if (loading) {

    return (

      <div className="rounded-xl border bg-white p-10">

        Loading...

      </div>

    );

  }

  if (!fund) {

    return (

      <div className="rounded-xl border bg-white p-10">

        Fund not found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Fund

        </h1>

        <p className="mt-2 text-gray-500">

          Update mutual fund information.

        </p>

      </div>

      <FundForm
        mode="edit"
        initialValues={fund}
        onSubmit={handleSubmit}
      />

    </div>

  );

}