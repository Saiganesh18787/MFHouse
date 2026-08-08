"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { PortfolioSummary } from "@/types/portfolio";

interface AssetAllocationChartProps {
  summary: PortfolioSummary | null;
}

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#94a3b8",
];

export default function AssetAllocationChart({
  summary,
}: AssetAllocationChartProps) {
  if (!summary) {
    return (
      <ChartEmptyState message="No asset allocation data available." />
    );
  }

  const data = [
    {
      name: "Equity",
      value: summary.equity,
    },
    {
      name: "Debt",
      value: summary.debt,
    },
    {
      name: "Cash",
      value: summary.cash_and_cash_equivalents,
    },
    {
      name: "Others",
      value: summary.others,
    },
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <ChartEmptyState message="No asset allocation data available." />
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="h-[280px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={2}
            >

              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(2)}%`,
                "Allocation",
              ]}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Custom Legend */}

      <div className="mt-6 space-y-4">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
          >

            <div className="flex items-center gap-3">

              <div
                className="h-4 w-4 rounded"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="font-medium text-gray-700">
                {item.name}
              </span>

            </div>

            <span className="text-lg font-bold text-gray-900">
              {item.value.toFixed(2)}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

function ChartEmptyState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex h-[320px] items-center justify-center rounded-xl border border-gray-200 bg-white">
      <p className="text-sm text-gray-500">
        {message}
      </p>
    </div>
  );
}