"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import { SectorAllocation } from "@/types/sector-allocation";

import SectorTable from "./SectorTable";

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

interface SectorAccordionProps {

  groups: SectorGroup[];

  onRefresh: () => Promise<void>;

}

export default function SectorAccordion({

  groups,

  onRefresh,

}: SectorAccordionProps) {

  const [openFactsheetId, setOpenFactsheetId] =
    useState<number | null>(
      groups.length
        ? groups[0].factsheet.id
        : null
    );

  return (

    <div className="space-y-4">

      {groups.map((group) => {

        const isOpen =
          openFactsheetId ===
          group.factsheet.id;

        return (

          <div
            key={group.factsheet.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >

            <button
              onClick={() =>
                setOpenFactsheetId(
                  isOpen
                    ? null
                    : group.factsheet.id
                )
              }
              className="flex w-full items-center justify-between px-6 py-5 hover:bg-gray-50"
            >

              <div>

                <h2 className="text-left text-lg font-semibold">

                  {group.factsheet.funds?.name}

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                  {group.factsheet.month} {group.factsheet.year}

                  {" • "}

                  {group.sectors.length} Sectors

                </p>

              </div>

              {isOpen
                ? <ChevronDown />
                : <ChevronRight />}

            </button>

            {isOpen && (

              <div className="border-t border-gray-200">

                <div className="flex items-center justify-between bg-gray-50 px-6 py-4">

                  <p className="text-sm text-gray-500">

                    {group.sectors.length} Sector Allocations

                  </p>

                  <Link
                    href={`/admin/sectors/create?factsheet=${group.factsheet.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                  >

                    + Add Sector

                  </Link>

                </div>

                <SectorTable
                  sectors={group.sectors}
                  onRefresh={onRefresh}
                />

              </div>

            )}

          </div>

        );

      })}

    </div>

  );

}