"use client";

import { useEffect, useState } from "react";

import MetadataTable from "./components/MetadataTable";
import MetadataToolbar from "./components/MetadataToolbar";

import {
  getMetadata,
} from "@/services/admin/metadata.service";

import {
  FundMetadata,
} from "@/types/fund-metadata";

export default function MetadataPage() {

  const [metadata, setMetadata] =
    useState<FundMetadata[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================
      LOAD METADATA
  ========================================== */

  async function loadMetadata() {

    try {

      setLoading(true);

      setError(null);

      const response =
        await getMetadata();

      setMetadata(response);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load fund metadata."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadMetadata();

  }, []);

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredMetadata =
    metadata.filter((item) => {

      const fund =
        item.funds;

      if (!fund) {

        return false;

      }

      const fundName =
        fund.name ?? "";

      const amc =
        fund.amc ?? "";

      const category =
        fund.category ?? "";

      const subCategory =
        fund.sub_category ?? "";

      const benchmark =
        item.benchmark_name ?? "";

      const risk =
        item.risk_level ?? "";

      const objective =
        item.investment_objective ?? "";

      return (

        fundName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        amc
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        category
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        subCategory
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        benchmark
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        risk
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        objective
          .toLowerCase()
          .includes(search.toLowerCase())

      );

    });

  /* ==========================================
      LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

        Loading metadata...

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

          Fund Metadata

        </h1>

        <p className="mt-2 text-gray-500">

          Manage fund metadata.

        </p>

      </div>

      <MetadataToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <MetadataTable
        metadata={filteredMetadata}
        onRefresh={loadMetadata}
      />

    </div>

  );

}