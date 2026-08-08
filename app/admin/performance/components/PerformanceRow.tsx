"use client";

import Link from "next/link";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { Performance } from "@/types/performance";

interface PerformanceRowProps {
  performance: Performance;
  onDelete: () => void;
}

export default function PerformanceRow({
  performance,
  onDelete,
}: PerformanceRowProps) {

  const factsheet =
    (performance as any).factsheets;

  return (

    <tr className="border-t border-gray-100 hover:bg-gray-50">

      <td className="px-6 py-4">

        {factsheet?.funds?.name ?? "-"}

      </td>

      <td className="px-6 py-4">

        {factsheet?.month ?? "-"}

      </td>

      <td className="px-6 py-4">

        {factsheet?.year ?? "-"}

      </td>

      <td className="px-6 py-4 text-right">

        {performance.one_month ?? "-"}

      </td>

      <td className="px-6 py-4 text-right">

        {performance.three_month ?? "-"}

      </td>

      <td className="px-6 py-4 text-right">

        {performance.one_year ?? "-"}

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <Link
            href={`/admin/performance/${performance.id}/edit`}
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