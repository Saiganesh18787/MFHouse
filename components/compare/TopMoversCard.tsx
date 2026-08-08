import { ArrowDown, ArrowUp } from "lucide-react";

import { ComparisonHolding } from "@/types/comparison";

interface TopMoversCardProps {
  title: string;
  holdings: ComparisonHolding[];
  type: "increase" | "decrease";
}

export default function TopMoversCard({
  title,
  holdings,
  type,
}: TopMoversCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold">
        {title}
      </h2>

      {holdings.length === 0 ? (

        <div className="flex h-[220px] items-center justify-center text-gray-400">
          No data available
        </div>

      ) : (

        <div className="space-y-4">

          {holdings.map((holding) => (

            <div
              key={holding.securityName}
              className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
            >

              <div>

                <p className="font-medium text-gray-900">
                  {holding.securityName}
                </p>

                <p className="text-sm text-gray-500">
                  {holding.previousAllocation.toFixed(2)}%
                  {" → "}
                  {holding.currentAllocation.toFixed(2)}%
                </p>

              </div>

              <div
                className={`flex items-center gap-2 font-semibold ${
                  type === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >

                {type === "increase" ? (
                  <ArrowUp size={18} />
                ) : (
                  <ArrowDown size={18} />
                )}

                {holding.changePP > 0
                  ? `+${holding.changePP.toFixed(2)}%`
                  : `${holding.changePP.toFixed(2)}%`}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}