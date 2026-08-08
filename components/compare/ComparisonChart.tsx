"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
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
      <div className="flex h-[420px] items-center justify-center">
        <p className="text-gray-500">
          No comparison data available.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[460px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 70,
          }}
          barGap={8}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="holding"
            angle={-35}
            textAnchor="end"
            interval={0}
            height={80}
            tick={{
              fontSize: 11,
            }}
          />

          <YAxis
            tickFormatter={(value) =>
              `${value}%`
            }
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
      </ResponsiveContainer>
    </div>
  );
}
