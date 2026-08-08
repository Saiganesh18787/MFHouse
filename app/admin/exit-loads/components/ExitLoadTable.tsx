"use client";

import { useState } from "react";

import { ExitLoad } from "@/types/exit-load";

import ExitLoadRow from "./ExitLoadRow";
import DeleteDialog from "./DeleteDialog";

import {
  deleteExitLoad,
} from "@/services/admin/exit-load.service";

interface ExitLoadTableProps {

  rules: ExitLoad[];

  onRefresh: () => Promise<void>;

}

export default function ExitLoadTable({

  rules,

  onRefresh,

}: ExitLoadTableProps) {

  const [selectedRule, setSelectedRule] =
    useState<ExitLoad | null>(null);

  async function handleDelete() {

    if (!selectedRule) return;

    try {

      await deleteExitLoad(
        selectedRule.id
      );

      setSelectedRule(null);

      await onRefresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete rule.");

    }

  }

  return (

    <>

      <table className="min-w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-center text-sm font-semibold">

              Rule

            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">

              Days

            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">

              Exit Load

            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">

              Description

            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {rules.map((rule) => (

            <ExitLoadRow
              key={rule.id}
              rule={rule}
              onDelete={() =>
                setSelectedRule(rule)
              }
            />

          ))}

        </tbody>

      </table>

      <DeleteDialog
        open={selectedRule !== null}
        title="Delete Exit Load Rule"
        description="Are you sure you want to delete this exit load rule?"
        onCancel={() =>
          setSelectedRule(null)
        }
        onConfirm={handleDelete}
      />

    </>

  );

}