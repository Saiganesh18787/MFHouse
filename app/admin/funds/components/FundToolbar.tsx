"use client";

import Link from "next/link";

import {
  Search,
  Plus,
  FileJson,
} from "lucide-react";

interface FundToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function FundToolbar({
  search,
  onSearchChange,
}: FundToolbarProps) {
  return (

    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 md:flex-row md:items-center md:justify-between">

      {/* Search */}

      <div className="relative w-full max-w-md">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search funds..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

      </div>

      {/* Actions */}

      <div className="flex gap-3">

        <Link
          href="/admin/funds/create"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Fund
        </Link>

        <button
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
        >
          <FileJson size={18} />
          Import JSON
        </button>

      </div>

    </div>

  );
}