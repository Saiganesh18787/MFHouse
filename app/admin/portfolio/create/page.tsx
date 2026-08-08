"use client";

import { useRouter } from "next/navigation";

import PortfolioForm from "../components/PortfolioForm";

import {
  createPortfolioSummary,
} from "@/services/admin/portfolio.service";

import {
  PortfolioSummary,
} from "@/types/portfolio";

export default function CreatePortfolioPage() {

  const router = useRouter();

  async function handleCreate(
    values: Omit<
      PortfolioSummary,
      "id" | "factsheets"
    >
  ) {

    try {

      await createPortfolioSummary(values);

      alert("Portfolio Summary created successfully.");

      router.push("/admin/portfolio");

    } catch (error) {

      console.error(error);

      alert("Failed to create portfolio summary.");

    }

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Create Portfolio Summary

        </h1>

        <p className="mt-2 text-gray-500">

          Add portfolio allocation summary.

        </p>

      </div>

      <PortfolioForm
        mode="create"
        onSubmit={handleCreate}
      />

    </div>

  );

}