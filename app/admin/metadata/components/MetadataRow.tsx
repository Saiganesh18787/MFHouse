"use client";

import Link from "next/link";

import {

  Pencil,

  Trash2,

} from "lucide-react";

import {

  FundMetadata,

} from "@/types/fund-metadata";

interface MetadataRowProps {

  metadata: FundMetadata;

  onDelete: () => void;

}

export default function MetadataRow({

  metadata,

  onDelete,

}: MetadataRowProps) {

  const fund =
    metadata.funds;

  return (

    <tr className="border-t border-gray-100 hover:bg-gray-50">

      <td className="px-6 py-4">

        {fund?.name ?? "-"}

      </td>

      <td className="px-6 py-4">

        {fund?.amc ?? "-"}

      </td>

      <td className="px-6 py-4">

        {fund?.category ?? "-"}

      </td>

      <td className="px-6 py-4">

        {metadata.benchmark_name}

      </td>

      <td className="px-6 py-4">

        {metadata.risk_level}

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <Link
            href={`/admin/metadata/${metadata.id}/edit`}
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