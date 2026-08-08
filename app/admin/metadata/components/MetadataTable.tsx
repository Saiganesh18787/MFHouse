"use client";

import { useState } from "react";

import { FundMetadata } from "@/types/fund-metadata";

import MetadataRow from "./MetadataRow";
import DeleteDialog from "./DeleteDialog";

import {
  deleteMetadata,
} from "@/services/admin/metadata.service";

interface MetadataTableProps {

  metadata: FundMetadata[];

  onRefresh: () => Promise<void>;

}

export default function MetadataTable({

  metadata,

  onRefresh,

}: MetadataTableProps) {

  const [selectedMetadata, setSelectedMetadata] =
    useState<FundMetadata | null>(null);

  async function handleDelete() {

    if (!selectedMetadata) return;

    try {

      await deleteMetadata(
        selectedMetadata.id
      );

      setSelectedMetadata(null);

      await onRefresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete metadata.");

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

                AMC

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">

                Category

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">

                Benchmark

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">

                Risk Level

              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {metadata.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >

                  No metadata found.

                </td>

              </tr>

            ) : (

              metadata.map((item) => (

                <MetadataRow
                  key={item.id}
                  metadata={item}
                  onDelete={() =>
                    setSelectedMetadata(item)
                  }
                />

              ))

            )}

          </tbody>

        </table>

      </div>

      <DeleteDialog
        open={selectedMetadata !== null}
        title="Delete Metadata"
        description="Are you sure you want to delete this metadata?"
        onCancel={() =>
          setSelectedMetadata(null)
        }
        onConfirm={handleDelete}
      />

    </>

  );

}