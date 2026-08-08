"use client";

import { useMemo, useState } from "react";

import { ComparisonHolding } from "@/types/comparison";

import {
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  MinusCircle,
} from "lucide-react";

interface ComparisonTableProps {
  holdings: ComparisonHolding[];
}

type SortField =
  | "securityName"
  | "previousAllocation"
  | "currentAllocation"
  | "changePP"
  | "status";

type SortDirection =
  | "asc"
  | "desc";

export default function ComparisonTable({
  holdings,
}: ComparisonTableProps) {

  const [sortField, setSortField] =
    useState<SortField>("currentAllocation");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("desc");

  const [search, setSearch] =
    useState("");

  

  const rowsPerPage = 10;

  const sortedHoldings = useMemo(() => {

    const filtered = holdings.filter((holding) =>
      holding.securityName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    const sorted = [...filtered];

    sorted.sort((a, b) => {

      const first = a[sortField];

      const second = b[sortField];

      if (
        typeof first === "number" &&
        typeof second === "number"
      ) {
        return sortDirection === "asc"
          ? first - second
          : second - first;
      }

      return sortDirection === "asc"
        ? String(first).localeCompare(String(second))
        : String(second).localeCompare(String(first));

    });

    return sorted;

  }, [
    holdings,
    search,
    sortField,
    sortDirection,
  ]);

  function handleSort(
    field: SortField
  ) {

    if (sortField === field) {

      setSortDirection(
        sortDirection === "asc"
          ? "desc"
          : "asc"
      );

      return;

    }

    setSortField(field);

    setSortDirection("asc");

  }

  return (

    <div className="overflow-x-auto">

      <div className="mb-4">

        <input
          type="text"
          placeholder="Search holdings..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

      </div>

      <table className="min-w-full border-collapse">

        <thead>

          <tr className="border-b border-gray-200 bg-gray-50">

            <th
              onClick={() =>
                handleSort("securityName")
              }
              className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:text-blue-600"
            >
              Security
            </th>

            <th
              onClick={() =>
                handleSort("previousAllocation")
              }
              className="cursor-pointer px-4 py-3 text-right text-sm font-semibold text-gray-700 hover:text-blue-600"
            >
              Previous
            </th>

            <th
              onClick={() =>
                handleSort("currentAllocation")
              }
              className="cursor-pointer px-4 py-3 text-right text-sm font-semibold text-gray-700 hover:text-blue-600"
            >
              Current
            </th>

            <th
              onClick={() =>
                handleSort("changePP")
              }
              className="cursor-pointer px-4 py-3 text-right text-sm font-semibold text-gray-700 hover:text-blue-600"
            >
              Change
            </th>

            <th
              onClick={() =>
                handleSort("status")
              }
              className="cursor-pointer px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:text-blue-600"
            >
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {sortedHoldings.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="py-10 text-center text-gray-500"
              >
                No holdings found.
              </td>

            </tr>

          ) : (

            sortedHoldings.map((holding) => (

              <tr
                key={holding.securityName}
                className="border-b border-gray-100 hover:bg-gray-50"
              >

                <td className="px-4 py-4 font-medium text-gray-900">
                  {holding.securityName}
                </td>

                <td className="px-4 py-4 text-right">
                  {holding.previousAllocation.toFixed(2)}%
                </td>

                <td className="px-4 py-4 text-right">
                  {holding.currentAllocation.toFixed(2)}%
                </td>

                <td
                  className={`px-4 py-4 text-right font-semibold ${
                    holding.changePP > 0
                      ? "text-green-600"
                      : holding.changePP < 0
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {holding.changePP > 0 ? "+" : ""}
                  {holding.changePP.toFixed(2)}%
                </td>

                <td className="px-4 py-4 text-center">

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      holding.status === "added"
                        ? "bg-green-100 text-green-700"
                        : holding.status === "removed"
                        ? "bg-red-100 text-red-700"
                        : holding.status === "increased"
                        ? "bg-blue-100 text-blue-700"
                        : holding.status === "decreased"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >

                    {holding.status === "added" && (
                      <Plus size={12} />
                    )}

                    {holding.status === "removed" && (
                      <Minus size={12} />
                    )}

                    {holding.status === "increased" && (
                      <ArrowUp size={12} />
                    )}

                    {holding.status === "decreased" && (
                      <ArrowDown size={12} />
                    )}

                    {holding.status === "unchanged" && (
                      <MinusCircle size={12} />
                    )}

                    {holding.status}

                  </span>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}