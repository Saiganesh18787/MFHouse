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

  const large = Number(data.large_cap) || 0;
  const mid = Number(data.mid_cap) || 0;
  const small = Number(data.small_cap) || 0;

  // Use an explicit "others" value if the API provides one,
  // otherwise derive it so the bar always totals 100%.
  const others =
    data.others !== undefined && data.others !== null
      ? Number(data.others)
      : Math.max(0, 100 - large - mid - small);

  const chartData = [
    {
      portfolio: "Portfolio",
      large,
      mid,
      small,
      others,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
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
            formatter={(value) => [`${value}%`, "Allocation"]}
          />
          <Bar
            dataKey="large"
            stackId="marketCap"
            fill="#2563eb"
            radius={[4, 0, 0, 4]}
          />
          <Bar
            dataKey="mid"
            stackId="marketCap"
            fill="#22c55e"
          />
          <Bar
            dataKey="small"
            stackId="marketCap"
            fill="#f97316"
          />
          <Bar
            dataKey="others"
            stackId="marketCap"
            fill="#9ca3af"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-5 grid grid-cols-4 gap-6 text-center">
        <div>
          <div className="mx-auto mb-2 h-4 w-4 rounded bg-blue-600" />
          <p className="text-sm font-medium text-gray-700">
            Large Cap
          </p>
          <p className="mt-1 text-xl font-bold text-blue-600">
            {large}%
          </p>
        </div>
        <div>
          <div className="mx-auto mb-2 h-4 w-4 rounded bg-green-500" />
          <p className="text-sm font-medium text-gray-700">
            Mid Cap
          </p>
          <p className="mt-1 text-xl font-bold text-green-600">
            {mid}%
          </p>
        </div>
        <div>
          <div className="mx-auto mb-2 h-4 w-4 rounded bg-orange-500" />
          <p className="text-sm font-medium text-gray-700">
            Small Cap
          </p>
          <p className="mt-1 text-xl font-bold text-orange-600">
            {small}%
          </p>
        </div>
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
