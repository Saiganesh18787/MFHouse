"use client";

import { useEffect, useState } from "react";

import SectorToolbar from "./components/SectorToolbar";
import SectorAccordion from "./components/SectorAccordion";

import {
  getSectorAllocations,
} from "@/services/admin/sector-allocation.service";

import {
  SectorAllocation,
} from "@/types/sector-allocation";

interface SectorGroup {

  factsheet: {

    id: number;

    month: string;

    year: number;

    funds?: {

      id: number;

      name: string;

    } | null;

  };

  sectors: SectorAllocation[];

}

function groupByFactsheet(
  sectors: SectorAllocation[]
): SectorGroup[] {

  const groups =
    new Map<number, SectorGroup>();

  sectors.forEach((sector) => {

    if (!sector.factsheets) return;

    const factsheetId =
      sector.factsheets.id;

    if (!groups.has(factsheetId)) {

      groups.set(factsheetId, {

        factsheet:
          sector.factsheets,

        sectors: [],

      });

    }

    groups
      .get(factsheetId)!
      .sectors
      .push(sector);

  });

  return Array.from(groups.values());

}

export default function SectorsPage() {

  const [sectors, setSectors] =
    useState<SectorAllocation[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function loadSectors() {

    try {

      setLoading(true);

      setError(null);

      const response =
        await getSectorAllocations();

      setSectors(response);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load sector allocations."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadSectors();

  }, []);

  const filteredSectors =
    sectors.filter((sector) => {

      const factsheet =
        sector.factsheets;

      if (!factsheet) {

        return false;

      }

      const fundName =
        factsheet.funds?.name ?? "";

      const sectorName =
        sector.sector_name ?? "";

      const month =
        factsheet.month ?? "";

      const year =
        String(
          factsheet.year ?? ""
        );

      return (

        fundName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        sectorName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        month
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        year.includes(search)

      );

    });

  const groupedSectors =
    groupByFactsheet(
      filteredSectors
    );

  if (loading) {

    return (

      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

        Loading sector allocations...

      </div>

    );

  }

  if (error) {

    return (

      <div className="rounded-xl border border-red-200 bg-red-50 p-12 text-center text-red-600">

        {error}

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Sector Allocation

        </h1>

        <p className="mt-2 text-gray-500">

          Manage sector allocation data.

        </p>

      </div>

      <SectorToolbar
        search={search}
        onSearchChange={
          setSearch
        }
      />

      <SectorAccordion
        groups={groupedSectors}
        onRefresh={
          loadSectors
        }
      />

    </div>

  );

}