"use client";

import { useEffect, useState } from "react";

import FundTable from "./components/FundTable";
import FundToolbar from "./components/FundToolbar";

import { getFunds } from "@/services/admin/funds.service";
import { Fund } from "@/types/fund";

export default function FundsPage() {

  const [funds, setFunds] =
    useState<Fund[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================
      LOAD FUNDS
  ========================================== */

  async function loadFunds() {

    try {

      setLoading(true);

      setError(null);

      const response =
        await getFunds();

      setFunds(response);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load funds."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadFunds();

  }, []);

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredFunds = funds.filter((fund) =>
    fund.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ==========================================
      LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

        Loading funds...

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

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div>

        <h1 className="text-3xl font-bold">
          Funds
        </h1>

        <p className="mt-2 text-gray-500">
          Manage mutual funds.
        </p>

      </div>

      {/* ==========================================
          TOOLBAR
      ========================================== */}

      <FundToolbar
        search={search}
        onSearchChange={setSearch}
      />

      {/* ==========================================
          TABLE
      ========================================== */}

      <FundTable
        funds={filteredFunds}
        onRefresh={loadFunds}
      />

    </div>

  );

}