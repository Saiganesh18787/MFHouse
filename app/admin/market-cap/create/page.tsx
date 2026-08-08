"use client";

import { useRouter } from "next/navigation";

import MarketCapForm from "../components/MarketCapForm";

import {
  createMarketCap,
} from "@/services/admin/market-cap.service";

import {
  MarketCap,
} from "@/types/market-cap";

export default function CreateMarketCapPage() {

  const router = useRouter();

  async function handleSubmit(
    values: Omit<
      MarketCap,
      "id" | "created_at" | "factsheets"
    >
  ) {

    try {

      await createMarketCap(values);

      alert(
        "Market cap allocation created successfully."
      );

      router.push("/admin/market-cap");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create market cap allocation."
      );

    }

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Create Market Cap Allocation

        </h1>

        <p className="mt-2 text-gray-500">

          Add a new market cap allocation.

        </p>

      </div>

      <MarketCapForm
        mode="create"
        onSubmit={handleSubmit}
      />

    </div>

  );

}