"use client";

import { useState } from "react";

import { Metric } from "@/types/metric";

import MetricRow from "./MetricRow";
import DeleteDialog from "./DeleteDialog";

import { deleteMetric } from "@/services/admin/metrics.service";

interface MetricTableProps {

  metrics: Metric[];

  onRefresh: () => Promise<void>;

}

export default function MetricTable({

  metrics,

  onRefresh,

}: MetricTableProps) {

  const [selectedMetric, setSelectedMetric] =
    useState<Metric | null>(null);

  async function handleDelete() {

    if (!selectedMetric) return;

    try {

      await deleteMetric(
        selectedMetric.id
      );

      setSelectedMetric(null);

      await onRefresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete metric.");

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
                NAV
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                AUM
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Expense Ratio
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {metrics.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >

                  No metrics found.

                </td>

              </tr>

            ) : (

              metrics.map((metric) => (

                <MetricRow
                  key={metric.id}
                  metric={metric}
                  onDelete={() =>
                    setSelectedMetric(metric)
                  }
                />

              ))

            )}

          </tbody>

        </table>

      </div>

      <DeleteDialog
        open={selectedMetric !== null}
        title="Delete Metric"
        description="Are you sure you want to delete this metric?"
        onCancel={() =>
          setSelectedMetric(null)
        }
        onConfirm={handleDelete}
      />

    </>

  );

}