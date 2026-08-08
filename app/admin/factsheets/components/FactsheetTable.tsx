"use client";

import { useState } from "react";

import { Factsheet } from "@/types/factsheet";

import FactsheetRow from "./FactsheetRow";
import DeleteDialog from "./DeleteDialog";

import { deleteFactsheet } from "@/services/admin/factsheets.service";

interface FactsheetTableProps {
  factsheets: Factsheet[];
  onRefresh: () => Promise<void>;
}

export default function FactsheetTable({
  factsheets,
  onRefresh,
}: FactsheetTableProps) {

  const [selectedFactsheet, setSelectedFactsheet] =
    useState<Factsheet | null>(null);

  async function handleDelete() {

    if (!selectedFactsheet) return;

    try {

      await deleteFactsheet(
        selectedFactsheet.id
      );

      setSelectedFactsheet(null);

      await onRefresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete factsheet.");

    }

  }

  return (

    <>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Fund
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Month
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Year
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Publication Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {factsheets.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500"
                >

                  No factsheets found.

                </td>

              </tr>

            ) : (

              factsheets.map((factsheet) => (

                <FactsheetRow
                  key={factsheet.id}
                  factsheet={factsheet}
                  onDelete={() =>
                    setSelectedFactsheet(factsheet)
                  }
                />

              ))

            )}

          </tbody>

        </table>

      </div>

      <DeleteDialog
        open={selectedFactsheet !== null}
        title="Delete Factsheet"
        description={
          selectedFactsheet
            ? `Delete ${selectedFactsheet.month} ${selectedFactsheet.year} factsheet?`
            : ""
        }
        onCancel={() =>
          setSelectedFactsheet(null)
        }
        onConfirm={handleDelete}
      />

    </>

  );

}