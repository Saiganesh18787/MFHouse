"use client";

import { useState } from "react";

import { PortfolioSummary } from "@/types/portfolio";

import PortfolioRow from "./PortfolioRow";
import DeleteDialog from "./DeleteDialog";

import {
  deletePortfolioSummary,
} from "@/services/admin/portfolio.service";

interface PortfolioTableProps {

  portfolioSummaries: PortfolioSummary[];

  onRefresh: () => Promise<void>;

}

export default function PortfolioTable({

  portfolioSummaries,

  onRefresh,

}: PortfolioTableProps) {

  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioSummary | null>(null);

  async function handleDelete() {

    if (!selectedPortfolio) return;

    try {

      await deletePortfolioSummary(
        selectedPortfolio.id
      );

      setSelectedPortfolio(null);

      await onRefresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete portfolio summary.");

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
                Equity
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                Debt
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                Cash
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                Others
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {portfolioSummaries.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >

                  No portfolio summary found.

                </td>

              </tr>

            ) : (

              portfolioSummaries.map((summary) => (

                <PortfolioRow
                  key={summary.id}
                  summary={summary}
                  onDelete={() =>
                    setSelectedPortfolio(summary)
                  }
                />

              ))

            )}

          </tbody>

        </table>

      </div>

      <DeleteDialog
        open={selectedPortfolio !== null}
        title="Delete Portfolio Summary"
        description="Are you sure you want to delete this portfolio summary?"
        onCancel={() =>
          setSelectedPortfolio(null)
        }
        onConfirm={handleDelete}
      />

    </>

  );

}