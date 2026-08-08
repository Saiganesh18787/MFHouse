"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import MarketCapForm from "../../components/MarketCapForm";

import {
  getMarketCapById,
  updateMarketCap,
} from "@/services/admin/market-cap.service";

import {
  MarketCap,
} from "@/types/market-cap";

export default function EditMarketCapPage() {

  const params = useParams();

  const router = useRouter();

  const [marketCap, setMarketCap] =
    useState<MarketCap | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadMarketCap() {

      if (!params.id) return;

      const data =
        await getMarketCapById(
          params.id as string
        );

      setMarketCap(data);

      setLoading(false);

    }

    loadMarketCap();

  }, [params.id]);

  async function handleSubmit(
    values: Partial<MarketCap>
  ) {

    try {

      await updateMarketCap(
        params.id as string,
        values
      );

      alert(
        "Market cap allocation updated successfully."
      );

      router.push("/admin/market-cap");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update market cap allocation."
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

  if (!marketCap) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-10">

        Market cap allocation not found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Market Cap Allocation

        </h1>

        <p className="mt-2 text-gray-500">

          Update market cap allocation.

        </p>

      </div>

      <MarketCapForm
        mode="edit"
        initialValues={marketCap}
        onSubmit={handleSubmit}
      />

    </div>

  );

}