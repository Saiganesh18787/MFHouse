"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import PortfolioForm from "../../components/PortfolioForm";

import {
  getPortfolioSummaryById,
  updatePortfolioSummary,
} from "@/services/admin/portfolio.service";

import {
  PortfolioSummary,
} from "@/types/portfolio";

export default function EditPortfolioPage() {

  const params = useParams();

  const router = useRouter();

  const [summary, setSummary] =
    useState<PortfolioSummary | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadSummary() {

      if (!params.id) return;

      const data =
        await getPortfolioSummaryById(
          params.id as string
        );

      setSummary(data);

      setLoading(false);

    }

    loadSummary();

  }, [params.id]);

  async function handleSubmit(
    values: Partial<PortfolioSummary>
  ) {

    try {

      await updatePortfolioSummary(
        params.id as string,
        values
      );

      alert("Portfolio Summary updated successfully.");

      router.push("/admin/portfolio");

    } catch (error) {

      console.error(error);

      alert("Failed to update portfolio summary.");

    }

  }

  if (loading) {

    return (

      <div className="rounded-xl border bg-white p-10">

        Loading...

      </div>

    );

  }

  if (!summary) {

    return (

      <div className="rounded-xl border bg-white p-10">

        Portfolio Summary not found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Portfolio Summary

        </h1>

        <p className="mt-2 text-gray-500">

          Update portfolio allocation.

        </p>

      </div>

      <PortfolioForm
        mode="edit"
        initialValues={summary}
        onSubmit={handleSubmit}
      />

    </div>

  );

}