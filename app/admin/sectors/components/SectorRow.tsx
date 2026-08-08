"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import { SectorAllocation } from "@/types/sector-allocation";

interface SectorRowProps {

  sector: SectorAllocation;

  onDelete: () => void;

}

export default function SectorRow({

  sector,

  onDelete,

}: SectorRowProps) {

  return (

    <tr className="border-t border-gray-100 hover:bg-gray-50">

      <td className="px-6 py-4">

        {sector.sector_name}

      </td>

      <td className="px-6 py-4 text-right">

        {sector.allocation_percentage}%

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <Link
            href={`/admin/sectors/${sector.id}/edit`}
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