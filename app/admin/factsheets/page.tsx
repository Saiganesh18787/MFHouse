"use client";

import { useEffect, useState } from "react";

import FactsheetTable from "./components/FactsheetTable";
import FactsheetToolbar from "./components/FactsheetToolbar";

import { getFactsheets } from "@/services/admin/factsheets.service";

import { Factsheet } from "@/types/factsheet";

export default function FactsheetsPage() {

  const [factsheets, setFactsheets] =
    useState<Factsheet[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================
      LOAD FACTSHEETS
  ========================================== */

  async function loadFactsheets() {

    try {

      setLoading(true);

      setError(null);

      const response =
        await getFactsheets();

      setFactsheets(response);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load factsheets."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadFactsheets();

  }, []);

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredFactsheets =
    factsheets.filter((factsheet) =>
      factsheet.month
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  /* ==========================================
      LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

        Loading factsheets...

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

          Factsheets

        </h1>

        <p className="mt-2 text-gray-500">

          Manage monthly mutual fund factsheets.

        </p>

      </div>

      <FactsheetToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <FactsheetTable
        factsheets={filteredFactsheets}
        onRefresh={loadFactsheets}
      />

    </div>

  );

}