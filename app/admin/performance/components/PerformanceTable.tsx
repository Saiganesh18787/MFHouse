"use client";

import { useState } from "react";

import { Performance } from "@/types/performance";

import PerformanceRow from "./PerformanceRow";
import DeleteDialog from "./DeleteDialog";

import { deletePerformance } from "@/services/admin/performance.service";

interface PerformanceTableProps {
  performance: Performance[];
  onRefresh: () => Promise<void>;
}

export default function PerformanceTable({
  performance,
  onRefresh,
}: PerformanceTableProps) {

  const [selectedPerformance, setSelectedPerformance] =
    useState<Performance | null>(null);

  async function handleDelete() {

    if (!selectedPerformance) return;

    try {

      await deletePerformance(
        selectedPerformance.id
      );

      setSelectedPerformance(null);

      await onRefresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete performance.");

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

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Year
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                1M
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                3M
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                1Y
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {performance.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >

                  No performance records found.

                </td>

              </tr>

            ) : (

              performance.map((record) => (

                <PerformanceRow
                  key={record.id}
                  performance={record}
                  onDelete={() =>
                    setSelectedPerformance(record)
                  }
                />

              ))

            )}

          </tbody>

        </table>

      </div>

      <DeleteDialog
        open={selectedPerformance !== null}
        title="Delete Performance"
        description="Are you sure you want to delete this performance record?"
        onCancel={() =>
          setSelectedPerformance(null)
        }
        onConfirm={handleDelete}
      />

    </>

  );

}