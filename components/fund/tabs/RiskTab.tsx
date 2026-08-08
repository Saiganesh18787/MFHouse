import MetricCard from "@/components/common/MetricCard";

import { Metric } from "@/types/metric";

interface RiskTabProps {
  metrics: Metric | null;
}

export default function RiskTab({
  metrics,
}: RiskTabProps) {
  return (
    <div>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Risk Metrics
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <MetricCard
          label="Alpha"
          value={metrics?.alpha ?? null}
        />

        <MetricCard
          label="Beta"
          value={metrics?.beta ?? null}
        />

        <MetricCard
          label="Sharpe Ratio"
          value={metrics?.sharpe_ratio ?? null}
        />

        <MetricCard
          label="Sortino Ratio"
          value={metrics?.sortino_ratio ?? null}
        />

        <MetricCard
          label="Standard Deviation"
          value={
            metrics?.standard_deviation ??
            null
          }
        />

        <MetricCard
          label="Tracking Error"
          value={
            metrics?.tracking_error ?? null
          }
        />

      </div>

    </div>
  );
}