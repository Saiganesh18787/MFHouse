"use client";

import Link from "next/link";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { Factsheet } from "@/types/factsheet";

interface FactsheetRowProps {
  factsheet: Factsheet;
  onDelete: () => void;
}

export default function FactsheetRow({
  factsheet,
  onDelete,
}: FactsheetRowProps) {

  return (

    <tr className="border-t border-gray-100 transition hover:bg-gray-50">

      <td className="px-6 py-4">

        {factsheet.funds?.name ?? "Unknown Fund"}

      </td>

      <td className="px-6 py-4">

        {factsheet.month}

      </td>

      <td className="px-6 py-4">

        {factsheet.year}

      </td>

      <td className="px-6 py-4">

        {factsheet.publication_date}

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <Link
            href={`/admin/factsheets/${factsheet.id}/edit`}
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