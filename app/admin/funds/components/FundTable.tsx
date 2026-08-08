"use client";

import { useState } from "react";

import { Fund } from "@/types/fund";

import FundRow from "./FundRow";
import DeleteDialog from "./DeleteDialog";
import { deleteFund } from "@/services/admin/funds.service";

interface FundTableProps {
  funds: Fund[];
  onRefresh: () => Promise<void>;
}

export default function FundTable({
  funds,
  onRefresh
}: FundTableProps) {

  const [selectedFund, setSelectedFund] =
    useState<Fund | null>(null);

  async function handleDelete() {

  if (!selectedFund) return;

  try {

    await deleteFund(selectedFund.id);

    setSelectedFund(null);

    await onRefresh();

  } catch (error) {

    console.error(error);

    alert("Failed to delete fund.");

  }

}

  return (

    <>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Scheme Code
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Fund
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Plan
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Option
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {funds.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  No funds found.
                </td>

              </tr>

            ) : (

              funds.map((fund) => (

                <FundRow
                  key={fund.id}
                  fund={fund}
                  onDelete={() =>
                    setSelectedFund(fund)
                  }
                />

              ))

            )}

          </tbody>

        </table>

      </div>

      <DeleteDialog
        open={selectedFund !== null}
        title="Delete Fund"
        description={
          selectedFund
            ? `Are you sure you want to delete "${selectedFund.name}"?`
            : ""
        }
        onCancel={() =>
          setSelectedFund(null)
        }
        onConfirm={handleDelete}
      />

    </>

  );

}