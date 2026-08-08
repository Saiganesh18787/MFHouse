"use client";

import { useEffect, useState } from "react";

import HoldingToolbar from "./components/HoldingToolbar";
import HoldingsAccordion from "./components/HoldingsAccordion";

import {
  getPortfolioHoldings,
} from "@/services/admin/portfolio.service";

import {
  PortfolioHolding,
} from "@/types/portfolio";

interface HoldingGroup {

  factsheet: {

    id: number;

    month: string;

    year: number;

    funds?: {

      id: number;

      name: string;

    } | null;

  };

  holdings: PortfolioHolding[];

}

function groupHoldingsByFactsheet(
  holdings: PortfolioHolding[]
): HoldingGroup[] {

  const groups = new Map<number, HoldingGroup>();

  holdings.forEach((holding) => {

    if (!holding.factsheets) return;

    const factsheetId =
      holding.factsheets.id;

    if (!groups.has(factsheetId)) {

      groups.set(factsheetId, {

        factsheet: holding.factsheets,

        holdings: [],

      });

    }

    groups
      .get(factsheetId)!
      .holdings
      .push(holding);

  });

  return Array.from(groups.values());

}

export default function PortfolioHoldingsPage() {

  const [holdings, setHoldings] =
    useState<PortfolioHolding[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================
      LOAD HOLDINGS
  ========================================== */

  async function loadHoldings() {

    try {

      setLoading(true);

      setError(null);

      const response =
        await getPortfolioHoldings();

      setHoldings(response);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load portfolio holdings."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadHoldings();

  }, []);

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredHoldings =
    holdings.filter((holding) => {

      const factsheet =
        holding.factsheets;

      if (!factsheet) {

        return false;

      }

      const fundName =
        factsheet.funds?.name ?? "";

      const security =
        holding.security_name ?? "";

      const sector =
        holding.sector ?? "";

      const month =
        factsheet.month ?? "";

      const year =
        String(factsheet.year ?? "");

      return (

        fundName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        security
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        sector
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        month
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        year.includes(search)

      );

    });

  /* ==========================================
      GROUP HOLDINGS
  ========================================== */

  const groupedHoldings =
    groupHoldingsByFactsheet(
      filteredHoldings
    );

  /* ==========================================
      LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

        Loading portfolio holdings...

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

          Portfolio Holdings

        </h1>

        <p className="mt-2 text-gray-500">

          Manage portfolio holdings.

        </p>

      </div>

      <HoldingToolbar
        search={search}
        onSearchChange={setSearch}
      />

      

      
      <HoldingsAccordion
        groups={groupedHoldings}
        onRefresh={loadHoldings}
      />
      

    </div>

  );

}