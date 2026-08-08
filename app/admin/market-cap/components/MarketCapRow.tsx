"use client";

import Link from "next/link";

import {

  Pencil,

  Trash2,

} from "lucide-react";

import {

  MarketCap,

} from "@/types/market-cap";

interface MarketCapRowProps {

  marketCap: MarketCap;

  onDelete: () => void;

}

export default function MarketCapRow({

  marketCap,

  onDelete,

}: MarketCapRowProps) {

  const factsheet =
    marketCap.factsheets;

  return (

    <tr className="border-t border-gray-100 hover:bg-gray-50">

      <td className="px-6 py-4">

        {factsheet?.funds?.name ?? "-"}

      </td>

      <td className="px-6 py-4">

        {factsheet?.month ?? "-"} {factsheet?.year ?? ""}

      </td>

      <td className="px-6 py-4 text-right">

        {marketCap.large_cap}%

      </td>

      <td className="px-6 py-4 text-right">

        {marketCap.mid_cap}%

      </td>

      <td className="px-6 py-4 text-right">

        {marketCap.small_cap}%

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <Link
            href={`/admin/market-cap/${marketCap.id}/edit`}
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