"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import HoldingForm from "../../components/HoldingForm";

import {
  getPortfolioHoldingById,
  updatePortfolioHolding,
} from "@/services/admin/portfolio.service";

import { PortfolioHolding } from "@/types/portfolio";

export default function EditHoldingPage() {

  const params = useParams();

  const router = useRouter();

  const [holding, setHolding] =
    useState<PortfolioHolding | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadHolding() {

      if (!params.id) return;

      const data =
        await getPortfolioHoldingById(
          params.id as string
        );

      setHolding(data);

      setLoading(false);

    }

    loadHolding();

  }, [params.id]);

  async function handleSubmit(
    values: Partial<PortfolioHolding>
  ) {

    try {

      await updatePortfolioHolding(
        params.id as string,
        values
      );

      alert("Holding updated successfully.");

      router.push("/admin/portfolio/holdings");

    } catch (error) {

      console.error(error);

      alert("Failed to update holding.");

    }

  }

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-10">

        Loading...

      </div>

    );

  }

  if (!holding) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-10">

        Holding not found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Holding

        </h1>

        <p className="mt-2 text-gray-500">

          Update portfolio holding.

        </p>

      </div>

      <HoldingForm
        mode="edit"
        initialValues={holding}
        onSubmit={handleSubmit}
      />

    </div>

  );

}