"use client";

import { useState } from "react";

import { PortfolioHolding } from "@/types/portfolio";

import HoldingRow from "./HoldingRow";
import DeleteDialog from "./DeleteDialog";

import {
  deletePortfolioHolding,
} from "@/services/admin/portfolio.service";

interface HoldingTableProps {

  holdings: PortfolioHolding[];

  onRefresh: () => Promise<void>;

}

export default function HoldingTable({

  holdings,

  onRefresh,

}: HoldingTableProps) {

  const [selectedHolding, setSelectedHolding] =
    useState<PortfolioHolding | null>(null);

  async function handleDelete() {

    if (!selectedHolding) return;

    try {

      await deletePortfolioHolding(
        selectedHolding.id
      );

      setSelectedHolding(null);

      await onRefresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete holding.");

    }

  }

  return (

    <>

      <div className="overflow-hidden rounded-b-xl bg-white">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Rank
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Security
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Sector
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Instrument
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                Allocation
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {holdings.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >

                  No portfolio holdings found.

                </td>

              </tr>

            ) : (

              holdings.map((holding) => (

                <HoldingRow
                  key={holding.id}
                  holding={holding}
                  onDelete={() =>
                    setSelectedHolding(holding)
                  }
                />

              ))

            )}

          </tbody>

        </table>

      </div>

      <DeleteDialog
        open={selectedHolding !== null}
        title="Delete Holding"
        description="Are you sure you want to delete this holding?"
        onCancel={() =>
          setSelectedHolding(null)
        }
        onConfirm={handleDelete}
      />

    </>

  );

}