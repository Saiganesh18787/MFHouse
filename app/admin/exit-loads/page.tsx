"use client";

import { useEffect, useState } from "react";

import ExitLoadAccordion from "./components/ExitLoadAccordion";
import ExitLoadToolbar from "./components/ExitLoadToolbar";

import {
  getExitLoads,
} from "@/services/admin/exit-load.service";

import {
  ExitLoad,
} from "@/types/exit-load";

export default function ExitLoadPage() {

  const [exitLoads, setExitLoads] =
    useState<ExitLoad[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================
      LOAD EXIT LOADS
  ========================================== */

  async function loadExitLoads() {

    try {

      setLoading(true);

      setError(null);

      const response =
        await getExitLoads();

      setExitLoads(response);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load exit load rules."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadExitLoads();

  }, []);

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredExitLoads =
    exitLoads.filter((rule) => {

      const factsheet =
        rule.factsheets;

      if (!factsheet) {

        return false;

      }

      const fundName =
        factsheet.funds?.name ?? "";

      const month =
        factsheet.month ?? "";

      const year =
        String(factsheet.year ?? "");

      const description =
        rule.description ?? "";

      return (

        fundName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        month
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        year.includes(search) ||

        description
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

        Loading exit load rules...

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

          Exit Loads

        </h1>

        <p className="mt-2 text-gray-500">

          Manage exit load rules.

        </p>

      </div>

      <ExitLoadToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <ExitLoadAccordion
        exitLoads={filteredExitLoads}
        onRefresh={loadExitLoads}
      />

    </div>

  );

}