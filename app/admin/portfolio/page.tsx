"use client";

import { useEffect, useState } from "react";

import PortfolioTable from "./components/PortfolioTable";
import PortfolioToolbar from "./components/PortfolioToolbar";

import {
  getPortfolioSummaries,
} from "@/services/admin/portfolio.service";

import {
  PortfolioSummary,
} from "@/types/portfolio";

export default function PortfolioPage() {

  const [portfolioSummaries, setPortfolioSummaries] =
    useState<PortfolioSummary[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================
      LOAD PORTFOLIO SUMMARY
  ========================================== */

  async function loadPortfolioSummaries() {

    try {

      setLoading(true);

      setError(null);

      const response =
        await getPortfolioSummaries();

      setPortfolioSummaries(response);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load portfolio summary."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadPortfolioSummaries();

  }, []);

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredPortfolioSummaries =
    portfolioSummaries.filter((summary) => {

      const factsheet =
        summary.factsheets;

      if (!factsheet) {

        return false;

      }

      const fundName =
        factsheet.funds?.name ?? "";

      const month =
        factsheet.month ?? "";

      const year =
        String(factsheet.year ?? "");

      return (

        fundName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        month
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        year.includes(search)

      );

    });

  /* ==========================================
      LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

        Loading portfolio summary...

      </div>

    );

  }

  /* ==========================================
      ERROR
  ========================================== */

  if (error) {

    return (

      <div className="rounded-xl border border-red-200 bg-red-50 p-12 text-center text-red-600">

        {error}

      </div>

    );

  }

  /* ==========================================
      PAGE
  ========================================== */

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Portfolio Summary

        </h1>

        <p className="mt-2 text-gray-500">

          Manage portfolio allocation summary.

        </p>

      </div>

      <PortfolioToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <PortfolioTable
        portfolioSummaries={filteredPortfolioSummaries}
        onRefresh={loadPortfolioSummaries}
      />

    </div>

  );

}