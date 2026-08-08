"use client";

import { useRef } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  if (data.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center text-gray-500">
        No comparison data available.
      </div>
    );
  }

  function scrollLeft() {
    scrollRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  }

  // Give every holding enough horizontal space
  const chartWidth = Math.max(data.length * 110, 1000);

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        type="button"
        onClick={scrollLeft}
        aria-label="Scroll graph left"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-md hover:bg-gray-50"
      >
        ←
      </button>

      {/* Graph */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden px-12"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <div
          style={{
            width: `${chartWidth}px`,
            minWidth: "100%",
          }}
        >
          <ResponsiveContainer width="100%" height={450}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 20,
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
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={scrollRight}
        aria-label="Scroll graph right"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-md hover:bg-gray-50"
      >
        →
      </button>
    </div>
  );
}
