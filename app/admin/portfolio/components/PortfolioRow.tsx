"use client";

import Link from "next/link";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { PortfolioSummary } from "@/types/portfolio";

interface PortfolioRowProps {

  summary: PortfolioSummary;

  onDelete: () => void;

}

export default function PortfolioRow({

  summary,

  onDelete,

}: PortfolioRowProps) {

  const factsheet =
    summary.factsheets;

  return (

    <tr className="border-t border-gray-100 hover:bg-gray-50">

      <td className="px-6 py-4">

        {factsheet?.funds?.name ?? "-"}

      </td>

      <td className="px-6 py-4">

        {factsheet?.month} {factsheet?.year}

      </td>

      <td className="px-6 py-4 text-right">

        {summary.equity}%

      </td>

      <td className="px-6 py-4 text-right">

        {summary.debt}%

      </td>

      <td className="px-6 py-4 text-right">

        {summary.cash_and_cash_equivalents}%

      </td>

      <td className="px-6 py-4 text-right">

        {summary.others}%

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <Link
            href={`/admin/portfolio/${summary.id}/edit`}
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