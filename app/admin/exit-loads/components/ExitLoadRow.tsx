"use client";

import Link from "next/link";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import { ExitLoad } from "@/types/exit-load";

interface ExitLoadRowProps {

  rule: ExitLoad;

  onDelete: () => void;

}

export default function ExitLoadRow({

  rule,

  onDelete,

}: ExitLoadRowProps) {

  return (

    <tr className="border-t border-gray-100 hover:bg-gray-50">

      <td className="px-6 py-4 text-center">

        {rule.rule_order}

      </td>

      <td className="px-6 py-4 text-center">

        {rule.redemption_within_days ?? "Nil"}

      </td>

      <td className="px-6 py-4 text-center">

        {rule.exit_load_percentage}%

      </td>

      <td className="px-6 py-4">

        {rule.description}

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <Link
            href={`/admin/exit-load/${rule.id}/edit`}
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