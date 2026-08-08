"use client";

import { useState } from "react";

import { MarketCap } from "@/types/market-cap";

import MarketCapRow from "./MarketCapRow";
import DeleteDialog from "./DeleteDialog";

import {
  deleteMarketCap,
} from "@/services/admin/market-cap.service";

interface MarketCapTableProps {

  marketCaps: MarketCap[];

  onRefresh: () => Promise<void>;

}

export default function MarketCapTable({

  marketCaps,

  onRefresh,

}: MarketCapTableProps) {

  const [selectedMarketCap, setSelectedMarketCap] =
    useState<MarketCap | null>(null);

  async function handleDelete() {

    if (!selectedMarketCap) return;

    try {

      await deleteMarketCap(
        selectedMarketCap.id
      );

      setSelectedMarketCap(null);

      await onRefresh();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete market cap allocation."
      );

    }

  }

  return (

    <>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">

                Fund

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">

                Month

              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">

                Large Cap

              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">

                Mid Cap

              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">

                Small Cap

              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {marketCaps.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >

                  No market cap allocations found.

                </td>

              </tr>

            ) : (

              marketCaps.map((marketCap) => (

                <MarketCapRow
                  key={marketCap.id}
                  marketCap={marketCap}
                  onDelete={() =>
                    setSelectedMarketCap(
                      marketCap
                    )
                  }
                />

              ))

            )}

          </tbody>

        </table>

      </div>

      <DeleteDialog
        open={selectedMarketCap !== null}
        title="Delete Market Cap Allocation"
        description="Are you sure you want to delete this market cap allocation?"
        onCancel={() =>
          setSelectedMarketCap(null)
        }
        onConfirm={handleDelete}
      />

    </>

  );

}