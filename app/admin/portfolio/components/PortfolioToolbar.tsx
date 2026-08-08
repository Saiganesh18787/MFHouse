"use client";

import Link from "next/link";

import { Plus } from "lucide-react";

interface PortfolioToolbarProps {

  search: string;

  onSearchChange: (
    value: string
  ) => void;

}

export default function PortfolioToolbar({

  search,

  onSearchChange,

}: PortfolioToolbarProps) {

  return (

    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* ==========================================
          SEARCH
      ========================================== */}

      <div className="flex-1">

        <input
          type="text"
          placeholder="Search by fund, month or year..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />

      </div>

      {/* ==========================================
          CREATE BUTTON
      ========================================== */}

      <Link
        href="/admin/portfolio/create"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
      >

        <Plus size={18} />

        New Portfolio Summary

      </Link>

      <Link
        href="/admin/portfolio/holdings"
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-50"
      >
        Portfolio Holdings
      </Link>

    </div>

  );

}