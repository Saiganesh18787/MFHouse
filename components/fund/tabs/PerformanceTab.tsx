import PerformanceRow from "@/components/common/PerformanceRow";

import { Performance } from "@/types/performance";

interface PerformanceTabProps {
  performance: Performance | null;
}

export default function PerformanceTab({
  performance,
}: PerformanceTabProps) {
  return (
    <div>

      <div className="mb-4">

        <h2 className="text-xl font-semibold text-gray-900">
          Performance
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Fund returns across different periods
        </p>

      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50 px-5 py-3">

          <p className="text-sm font-medium text-gray-600">
            Period
          </p>

          <p className="text-right text-sm font-medium text-gray-600">
            Return
          </p>

        </div>

        <PerformanceRow
          period="1 Month"
          value={performance?.one_month ?? null}
        />

        <PerformanceRow
          period="3 Months"
          value={performance?.three_month ?? null}
        />

        <PerformanceRow
          period="6 Months"
          value={performance?.six_month ?? null}
        />

        <PerformanceRow
          period="1 Year"
          value={performance?.one_year ?? null}
        />

        <PerformanceRow
          period="3 Years"
          value={performance?.three_year ?? null}
        />

        <PerformanceRow
          period="5 Years"
          value={performance?.five_year ?? null}
        />

        <PerformanceRow
          period="10 Years"
          value={performance?.ten_year ?? null}
          last
        />

      </div>

    </div>
  );
}