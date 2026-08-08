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

import { SectorAllocation } from "@/types/sector-allocation";

interface SectorAllocationChartProps {
  sectors: SectorAllocation[];
}

export default function SectorAllocationChart({
  sectors,
}: SectorAllocationChartProps) {
  const data = sectors.map((sector) => ({
    name: sector.sector_name,
    allocation: sector.allocation_percentage,
  }));

  if (data.length === 0) {
    return (
      <ChartEmptyState message="No sector allocation data available." />
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
              stroke="#e5e7eb"
              strokeDasharray="3 3"
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
              width={170}
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
              fill="#2563eb"
              radius={[0, 8, 8, 0]}
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