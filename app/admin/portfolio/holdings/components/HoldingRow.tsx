"use client";

import Link from "next/link";

import {

  Pencil,

  Trash2,

} from "lucide-react";

import {

  PortfolioHolding,

} from "@/types/portfolio";

interface HoldingRowProps {

  holding: PortfolioHolding;

  onDelete: () => void;

}

export default function HoldingRow({

  holding,

  onDelete,

}: HoldingRowProps) {

  const factsheet =
    holding.factsheets;

  return (

    <tr className="border-t border-gray-100 hover:bg-gray-50">

      <td className="px-6 py-4">

        {factsheet?.funds?.name ?? "-"}

      </td>

      <td className="px-6 py-4">

        {factsheet?.month} {factsheet?.year}

      </td>

      <td className="px-6 py-4 text-center">

        {holding.rank ?? "-"}

      </td>

      <td className="px-6 py-4">

        {holding.security_name}

      </td>

      <td className="px-6 py-4">

        {holding.sector ?? "-"}

      </td>

      <td className="px-6 py-4">

        {holding.instrument_type}

      </td>

      <td className="px-6 py-4 text-right">

        {holding.allocation_percentage}%

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <Link
            href={`/admin/portfolio/holdings/${holding.id}/edit`}
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