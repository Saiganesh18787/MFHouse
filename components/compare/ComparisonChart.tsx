"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ComparisonChartData } from "@/types/comparison";

interface ComparisonChartProps {
  data: ComparisonChartData[];
  previousMonth: string;
  currentMonth: string;
}

export default function ComparisonChart({
  data,
  previousMonth,
  currentMonth,
}: ComparisonChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center text-gray-500">
        No comparison data available.
      </div>
    );
  }

  // Give every company enough horizontal space
  const chartWidth = Math.max(data.length * 120, 900);

  return (
    <div className="w-full">
      {/* Horizontal scroll container */}
      <div className="w-full overflow-x-auto">
        <div
          style={{
            width: `${chartWidth}px`,
          }}
        >
          <BarChart
            width={chartWidth}
            height={450}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 90,
            }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="holding"
              angle={-35}
              textAnchor="end"
              interval={0}
              height={100}
              tick={{
                fontSize: 11,
              }}
            />

            <YAxis
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              formatter={(value, name) => [
                `${Number(value ?? 0).toFixed(2)}%`,
                name,
              ]}
            />

            <Legend
              verticalAlign="top"
              height={40}
            />

            <Bar
              dataKey="previousAllocation"
              name={previousMonth}
              fill="#3B82F6"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="currentAllocation"
              name={currentMonth}
              fill="#10B981"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
