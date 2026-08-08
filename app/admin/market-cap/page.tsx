"use client";

import { useEffect, useState } from "react";

import MarketCapTable from "./components/MarketCapTable";
import MarketCapToolbar from "./components/MarketCapToolbar";

import {
  getMarketCaps,
} from "@/services/admin/market-cap.service";

import {
  MarketCap,
} from "@/types/market-cap";

export default function MarketCapPage() {

  const [marketCaps, setMarketCaps] =
    useState<MarketCap[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================
      LOAD MARKET CAPS
  ========================================== */

  async function loadMarketCaps() {

    try {

      setLoading(true);

      setError(null);

      const response =
        await getMarketCaps();

      setMarketCaps(response);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load market cap allocations."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadMarketCaps();

  }, []);

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredMarketCaps =
    marketCaps.filter((record) => {

      const factsheet =
        record.factsheets;

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

        Loading market cap allocations...

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

          Market Cap Allocation

        </h1>

        <p className="mt-2 text-gray-500">

          Manage market cap allocations.

        </p>

      </div>

      <MarketCapToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <MarketCapTable
        marketCaps={filteredMarketCaps}
        onRefresh={loadMarketCaps}
      />

    </div>

  );

}