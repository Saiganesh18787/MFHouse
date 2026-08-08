"use client";

import Link from "next/link";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { Fund } from "@/types/fund";

interface FundRowProps {
  fund: Fund;
  onDelete: () => void;
}

export default function FundRow({
  fund,
  onDelete,
}: FundRowProps) {

  const status =
    fund.status ?? "Unknown";

  return (

    <tr className="border-t border-gray-100 transition hover:bg-gray-50">

      {/* Scheme Code */}

      <td className="px-6 py-4 font-mono text-sm text-gray-700">

        {fund.scheme_code}

      </td>

      {/* Fund */}

      <td className="px-6 py-4">

        <div>

          <p className="font-medium text-gray-900">

            {fund.name}

          </p>

          <p className="text-sm text-gray-500">

            {fund.amc}

          </p>

        </div>

      </td>

      {/* Category */}

      <td className="px-6 py-4">

        {fund.category}

      </td>

      {/* Plan */}

      <td className="px-6 py-4">

        {fund.plan}

      </td>

      {/* Option */}

      <td className="px-6 py-4">

        {fund.option}

      </td>

      {/* Status */}

      <td className="px-6 py-4">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status.toLowerCase() === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          {status}

        </span>

      </td>

      {/* Actions */}

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <Link
            href={`/admin/funds/${fund.id}/edit`}
            className="text-blue-600 transition hover:text-blue-800"
            title="Edit Fund"
          >

            <Pencil size={18} />

          </Link>

          <button
            onClick={onDelete}
            className="text-red-600 transition hover:text-red-800"
            title="Delete Fund"
          >

            <Trash2 size={18} />

          </button>

        </div>

      </td>

    </tr>

  );

}