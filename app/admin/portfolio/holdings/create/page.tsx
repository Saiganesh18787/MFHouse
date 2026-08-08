"use client";

import { useRouter } from "next/navigation";

import HoldingForm from "../components/HoldingForm";

import {
  createPortfolioHolding,
} from "@/services/admin/portfolio.service";

import {
  PortfolioHolding,
} from "@/types/portfolio";

export default function CreateHoldingPage() {

  const router = useRouter();

  async function handleCreate(
    values: Omit<
      PortfolioHolding,
      "id" | "factsheets"
    >
  ) {

    try {

      await createPortfolioHolding(values);

      alert("Holding created successfully.");

      router.push("/admin/portfolio/holdings");

    } catch (error) {

      console.error(error);

      alert("Failed to create holding.");

    }

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Create Holding

        </h1>

        <p className="mt-2 text-gray-500">

          Add a portfolio holding.

        </p>

      </div>

      <HoldingForm
        mode="create"
        onSubmit={handleCreate}
      />

    </div>

  );

}