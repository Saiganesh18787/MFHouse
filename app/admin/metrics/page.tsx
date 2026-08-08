"use client";

import { useEffect, useState } from "react";

import MetricTable from "./components/MetricTable";
import MetricToolbar from "./components/MetricToolbar";

import { getMetrics } from "@/services/admin/metrics.service";

import { Metric } from "@/types/metric";

export default function MetricsPage() {

  const [metrics, setMetrics] =
    useState<Metric[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================
      LOAD METRICS
  ========================================== */

  async function loadMetrics() {

    try {

      setLoading(true);

      setError(null);

      const response =
        await getMetrics();

      setMetrics(response);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load metrics."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadMetrics();

  }, []);

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredMetrics =
    metrics.filter((metric) => {

      const factsheet =
        metric.factsheets;

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

        Loading metrics...

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

          Metrics

        </h1>

        <p className="mt-2 text-gray-500">

          Manage factsheet metrics.

        </p>

      </div>

      <MetricToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <MetricTable
        metrics={filteredMetrics}
        onRefresh={loadMetrics}
      />

    </div>

  );

}