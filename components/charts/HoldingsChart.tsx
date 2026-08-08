"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PortfolioHolding } from "@/types/portfolio";

interface HoldingsChartProps {
  holdings: PortfolioHolding[];
}

export default function HoldingsChart({
  holdings,
}: HoldingsChartProps) {
  const data = [...holdings]
    .sort((a, b) => {
      if (
        a.rank !== null &&
        b.rank !== null
      ) {
        return a.rank - b.rank;
      }

      return (
        b.allocation_percentage -
        a.allocation_percentage
      );
    })
    .slice(0, 10)
    .map((holding) => ({
      name: holding.security_name,
      allocation: holding.allocation_percentage,
    }));

  if (data.length === 0) {
    return (
      <ChartEmptyState message="No holdings data available." />
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="h-[420px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              horizontal={false}
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                `${value}%`
              }
              tick={{
                fontSize: 12,
                fill: "#6b7280",
              }}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={150}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#374151",
              }}
            />

            <Tooltip
              cursor={{
                fill: "#f9fafb",
              }}
              formatter={(value) => [
                `${Number(value).toFixed(2)}%`,
                "Allocation",
              ]}
            />

            <Bar
              dataKey="allocation"
              radius={[0, 8, 8, 0]}
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

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
    <div className="flex h-[420px] items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
      <p className="text-sm text-gray-500">
        {message}
      </p>
    </div>
  );
}