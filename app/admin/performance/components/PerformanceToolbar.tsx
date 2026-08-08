"use client";

import Link from "next/link";

interface PerformanceToolbarProps {

  search: string;

  onSearchChange: (
    value: string
  ) => void;

}

export default function PerformanceToolbar({

  search,

  onSearchChange,

}: PerformanceToolbarProps) {

  return (

    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* ==========================================
          SEARCH
      ========================================== */}

      <div className="flex flex-wrap gap-3">

        <input
          type="text"
          placeholder="Search Fund / Month / Year..."
          value={search}
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
          className="w-72 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />

      </div>

      {/* ==========================================
          CREATE BUTTON
      ========================================== */}

      <Link
        href="/admin/performance/create"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >

        + Add Performance

      </Link>

    </div>

  );

}