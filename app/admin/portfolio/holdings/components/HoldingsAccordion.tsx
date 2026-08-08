"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { PortfolioHolding } from "@/types/portfolio";

import HoldingTable from "./HoldingTable";

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

interface HoldingsAccordionProps {

  groups: HoldingGroup[];

  onRefresh: () => Promise<void>;

}

export default function HoldingsAccordion({

  groups,

  onRefresh,

}: HoldingsAccordionProps) {

  const [openFactsheetId, setOpenFactsheetId] =
    useState<number | null>(

      groups.length > 0
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

                <h2 className="text-lg font-semibold text-left">

                  {group.factsheet.funds?.name}

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                  {group.factsheet.month} {group.factsheet.year}

                  {" • "}

                  {group.holdings.length} Holdings

                </p>

              </div>

              {isOpen ? (

                <ChevronDown />

              ) : (

                <ChevronRight />

              )}

            </button>

            {isOpen && (

  <div className="border-t border-gray-200">

    <div className="flex items-center justify-between bg-gray-50 px-6 py-4">

      <div>

        <p className="text-sm text-gray-500">

          {group.holdings.length} Holdings

        </p>

      </div>

      <div className="flex gap-3">

        <Link
          href={`/admin/portfolio/${group.factsheet.id}/edit`}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-white"
        >

          Edit Summary

        </Link>

        <Link
          href={`/admin/portfolio/holdings/create?factsheet=${group.factsheet.id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >

          + Add Holding

        </Link>

      </div>

    </div>

    <HoldingTable
      holdings={group.holdings}
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