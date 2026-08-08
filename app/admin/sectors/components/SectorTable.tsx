"use client";

import { useState } from "react";

import { SectorAllocation } from "@/types/sector-allocation";

import {
  deleteSectorAllocation,
} from "@/services/admin/sector-allocation.service";

import SectorRow from "./SectorRow";
import DeleteDialog from "./DeleteDialog";

interface SectorTableProps {

  sectors: SectorAllocation[];

  onRefresh: () => Promise<void>;

}

export default function SectorTable({

  sectors,

  onRefresh,

}: SectorTableProps) {

  const [selectedSector, setSelectedSector] =
    useState<SectorAllocation | null>(null);

  async function handleDelete() {

    if (!selectedSector) return;

    try {

      await deleteSectorAllocation(
        selectedSector.id
      );

      setSelectedSector(null);

      await onRefresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete sector allocation.");

    }

  }

  return (

    <>

      <table className="min-w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Sector
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold">
              Allocation
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {sectors.length === 0 ? (

            <tr>

              <td
                colSpan={3}
                className="py-10 text-center text-gray-500"
              >

                No sector allocation found.

              </td>

            </tr>

          ) : (

            sectors.map((sector) => (

              <SectorRow
                key={sector.id}
                sector={sector}
                onDelete={() =>
                  setSelectedSector(sector)
                }
              />

            ))

          )}

        </tbody>

      </table>

      <DeleteDialog
        open={selectedSector !== null}
        title="Delete Sector Allocation"
        description="Are you sure you want to delete this sector allocation?"
        onCancel={() =>
          setSelectedSector(null)
        }
        onConfirm={handleDelete}
      />

    </>

  );

}