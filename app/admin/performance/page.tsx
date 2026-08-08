"use client";

import { useEffect, useState } from "react";

import PerformanceTable from "./components/PerformanceTable";
import PerformanceToolbar from "./components/PerformanceToolbar";

import { getPerformance } from "@/services/admin/performance.service";

import { Performance } from "@/types/performance";

export default function PerformancePage() {

  const [performance, setPerformance] =
    useState<Performance[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================
      LOAD PERFORMANCE
  ========================================== */

  async function loadPerformance() {

    try {

      setLoading(true);

      setError(null);

      const response =
        await getPerformance();

      setPerformance(response);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load performance records."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadPerformance();

  }, []);

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredPerformance =
    performance.filter((record) => {

      const factsheet =
        (record as any).factsheets;

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

        Loading performance...

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

          Performance

        </h1>

        <p className="mt-2 text-gray-500">

          Manage monthly performance records.

        </p>

      </div>

      <PerformanceToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <PerformanceTable
        performance={filteredPerformance}
        onRefresh={loadPerformance}
      />

    </div>

  );

}