"use client";

import Link from "next/link";

import {

  Pencil,

  Trash2,

} from "lucide-react";

import { Metric } from "@/types/metric";

interface MetricRowProps {

  metric: Metric;

  onDelete: () => void;

}

export default function MetricRow({

  metric,

  onDelete,

}: MetricRowProps) {

  const factsheet =
    metric.factsheets;

  return (

    <tr className="border-t border-gray-100 hover:bg-gray-50">

      <td className="px-6 py-4">

        {factsheet?.funds?.name ?? "-"}

      </td>

      <td className="px-6 py-4">

        {factsheet?.month} {factsheet?.year}

      </td>

      <td className="px-6 py-4">

        ₹ {metric.regular_growth_nav}

      </td>

      <td className="px-6 py-4">

        ₹ {metric.aum}

      </td>

      <td className="px-6 py-4">

        {metric.regular_expense_ratio}%

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <Link
            href={`/admin/metrics/${metric.id}/edit`}
            className="text-blue-600 hover:text-blue-800"
          >

            <Pencil size={18} />

          </Link>

          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
          >

            <Trash2 size={18} />

          </button>

        </div>

      </td>

    </tr>

  );

}