"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { MarketCap } from "@/types/market-cap";

interface MarketCapChartProps {
  data: MarketCap | null;
}

export default function MarketCapChart({
  data,
}: MarketCapChartProps) {
  if (!data) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-gray-500">
          No market cap allocation available.
        </p>
      </div>
    );
  }

  // Calculate residual allocation as Others
  const others = Math.max(
    0,
    100 -
      Number(data.large_cap ?? 0) -
      Number(data.mid_cap ?? 0) -
      Number(data.small_cap ?? 0)
  );

  const chartData = [
    {
      portfolio: "Portfolio",
      large: data.large_cap ?? 0,
      mid: data.mid_cap ?? 0,
      small: data.small_cap ?? 0,
      others,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Market Cap Bar */}
      <ResponsiveContainer
        width="100%"
        height={80}
      >
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{
            top: 0,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            hide
          />

          <YAxis
            type="category"
            dataKey="portfolio"
            hide
          />

          <Tooltip
            formatter={(value, name) => [
              `${Number(value ?? 0).toFixed(2)}%`,
              name,
            ]}
          />

          <Bar
            dataKey="large"
            name="Large Cap"
            stackId="marketCap"
            fill="#2563eb"
            radius={[4, 0, 0, 4]}
          />

          <Bar
            dataKey="mid"
            name="Mid Cap"
            stackId="marketCap"
            fill="#22c55e"
          />

          <Bar
            dataKey="small"
            name="Small Cap"
            stackId="marketCap"
            fill="#f97316"
          />

          <Bar
            dataKey="others"
            name="Others"
            stackId="marketCap"
            fill="#9ca3af"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-5 grid grid-cols-2 gap-6 text-center sm:grid-cols-4">

        {/* Large Cap */}
        <div>
          <div className="mx-auto mb-2 h-4 w-4 rounded bg-blue-600" />

          <p className="text-sm font-medium text-gray-700">
            Large Cap
          </p>

          <p className="mt-1 text-xl font-bold text-blue-600">
            {Number(data.large_cap ?? 0).toFixed(2)}%
          </p>
        </div>

        {/* Mid Cap */}
        <div>
          <div className="mx-auto mb-2 h-4 w-4 rounded bg-green-500" />

          <p className="text-sm font-medium text-gray-700">
            Mid Cap
          </p>

          <p className="mt-1 text-xl font-bold text-green-600">
            {Number(data.mid_cap ?? 0).toFixed(2)}%
          </p>
        </div>

        {/* Small Cap */}
        <div>
          <div className="mx-auto mb-2 h-4 w-4 rounded bg-orange-500" />

          <p className="text-sm font-medium text-gray-700">
            Small Cap
          </p>

          <p className="mt-1 text-xl font-bold text-orange-600">
            {Number(data.small_cap ?? 0).toFixed(2)}%
          </p>
        </div>

        {/* Others */}
        <div>
          <div className="mx-auto mb-2 h-4 w-4 rounded bg-gray-400" />

          <p className="text-sm font-medium text-gray-700">
            Others
          </p>

          <p className="mt-1 text-xl font-bold text-gray-500">
            {others.toFixed(2)}%
          </p>
        </div>

      </div>
    </div>
  );
}
