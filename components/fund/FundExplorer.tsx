"use client";

import { useMemo, useState } from "react";
import { Fund } from "@/types/fund";
import FundGrid from "./FundGrid";

interface FundExplorerProps {
  funds: Fund[];
}

const FUNDS_PER_PAGE = 9;

export default function FundExplorer({
  funds,
}: FundExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [amc, setAmc] = useState("All");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          funds
            .map((fund) => fund.category)
            .filter(Boolean)
        )
      ).sort(),
    ];
  }, [funds]);

  const amcs = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          funds
            .map((fund) => fund.amc)
            .filter(Boolean)
        )
      ).sort(),
    ];
  }, [funds]);

  const filteredFunds = useMemo(() => {
    const query = search.trim().toLowerCase();

    return funds.filter((fund) => {
      const matchesSearch =
        !query ||
        fund.name.toLowerCase().includes(query) ||
        fund.amc.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" ||
        fund.category === category;

      const matchesAmc =
        amc === "All" ||
        fund.amc === amc;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAmc
      );
    });
  }, [funds, search, category, amc]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFunds.length / FUNDS_PER_PAGE)
  );

  const startIndex = (page - 1) * FUNDS_PER_PAGE;

  const visibleFunds = filteredFunds.slice(
    startIndex,
    startIndex + FUNDS_PER_PAGE
  );

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleCategory(value: string) {
    setCategory(value);
    setPage(1);
  }

  function handleAmc(value: string) {
    setAmc(value);
    setPage(1);
  }

  return (
    <div>
      {/* Search + Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search funds..."
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />

        <select
          value={category}
          onChange={(e) =>
            handleCategory(e.target.value)
          }
          className="rounded-lg border border-gray-300 bg-white px-4 py-3"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All"
                ? "All Categories"
                : item}
            </option>
          ))}
        </select>

        <select
          value={amc}
          onChange={(e) => handleAmc(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-3"
        >
          {amcs.map((item) => (
            <option key={item} value={item}>
              {item === "All"
                ? "All AMCs"
                : item}
            </option>
          ))}
        </select>
      </div>

      {/* Result count */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredFunds.length}{" "}
          {filteredFunds.length === 1
            ? "fund"
            : "funds"}{" "}
          found
        </p>

        {(search !== "" ||
          category !== "All" ||
          amc !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setAmc("All");
              setPage(1);
            }}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Funds */}
      {visibleFunds.length > 0 ? (
        <FundGrid funds={visibleFunds} />
      ) : (
        <div className="rounded-xl border bg-white p-12 text-center">
          <h2 className="text-lg font-semibold">
            No funds found
          </h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredFunds.length > FUNDS_PER_PAGE && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() =>
              setPage((current) =>
                Math.max(current - 1, 1)
              )
            }
            className="rounded-lg border bg-white px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage((current) =>
                Math.min(
                  current + 1,
                  totalPages
                )
              )
            }
            className="rounded-lg border bg-white px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}