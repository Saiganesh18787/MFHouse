"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";

interface SectorToolbarProps {

  search: string;

  onSearchChange: (
    value: string
  ) => void;

}

export default function SectorToolbar({

  search,

  onSearchChange,

}: SectorToolbarProps) {

  return (

    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* Search */}

      <div className="relative w-full md:max-w-md">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search by fund, sector, month or year..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
        />

      </div>

      {/* Create */}

      <Link
        href="/admin/sectors/create"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >

        <Plus size={18} />

        New Sector Allocation

      </Link>

    </div>

  );

}