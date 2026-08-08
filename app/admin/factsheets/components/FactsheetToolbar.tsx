"use client";

import Link from "next/link";

interface FactsheetToolbarProps {

  search: string;

  onSearchChange: (value: string) => void;

}

export default function FactsheetToolbar({

  search,

  onSearchChange,

}: FactsheetToolbarProps) {

  return (

    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* ==========================================
          SEARCH
      ========================================== */}

      <div className="flex flex-wrap gap-3">

        <input
          type="text"
          placeholder="Search by month..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          className="w-64 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />

        {/* ==========================================
            FUND FILTER
        ========================================== */}

        <select
          className="rounded-lg border border-gray-300 px-4 py-2"
        >

          <option>All Funds</option>

        </select>

        {/* ==========================================
            MONTH FILTER
        ========================================== */}

        <select
          className="rounded-lg border border-gray-300 px-4 py-2"
        >

          <option>All Months</option>

          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>

        </select>

        {/* ==========================================
            YEAR FILTER
        ========================================== */}

        <select
          className="rounded-lg border border-gray-300 px-4 py-2"
        >

          <option>All Years</option>

        </select>

      </div>

      {/* ==========================================
          CREATE BUTTON
      ========================================== */}

      <Link
        href="/admin/factsheets/create"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >

        + New Factsheet

      </Link>

    </div>

  );

}