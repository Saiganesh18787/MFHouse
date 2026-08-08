"use client";

import { ComparisonHolding } from "@/types/comparison";

interface AddedRemovedCardProps {
  title: string;
  holdings: ComparisonHolding[];
  type: "added" | "removed";
}

export default function AddedRemovedCard({
  title,
  holdings,
  type,
}: AddedRemovedCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        {title}
      </h2>

      {holdings.length === 0 ? (

        <div className="flex h-[180px] items-center justify-center text-gray-400">
          No data available
        </div>

      ) : (

        <div className="space-y-3">

          {holdings.map((holding) => (

            <div
              key={holding.securityName}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
            >

              <div>

                <p className="font-medium text-gray-900">
                  {holding.securityName}
                </p>

                <p className="text-sm text-gray-500">
                  Previous: {holding.previousAllocation.toFixed(2)}%
                </p>

                <p className="text-sm text-gray-500">
                  Current: {holding.currentAllocation.toFixed(2)}%
                </p>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  type === "added"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {type === "added"
                  ? "Added"
                  : "Removed"}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}