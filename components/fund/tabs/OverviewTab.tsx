import InfoCard from "@/components/common/InfoCard";
import MetricCard from "@/components/common/MetricCard";

import { Fund } from "@/types/fund";
import { Factsheet } from "@/types/factsheet";
import { Metric } from "@/types/metric";
import { FundManager } from "@/types/fund-manager";

interface OverviewTabProps {
  fund: Fund;
  factsheet: Factsheet | null;
  metrics: Metric | null;
  fundManager: FundManager | null;
}

export default function OverviewTab({
  fund,
  factsheet,
  metrics,
  fundManager,
}: OverviewTabProps) {
  return (
    <div className="space-y-10">

      {/* FUND INFORMATION */}

      <section>

        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Fund Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <InfoCard
            label="Scheme Code"
            value={fund.scheme_code}
          />

          <InfoCard
            label="AMC"
            value={fund.amc}
          />

          <InfoCard
            label="Category"
            value={fund.category}
          />

          <InfoCard
            label="Sub Category"
            value={fund.sub_category}
          />

          <InfoCard
            label="Plan"
            value={fund.plan}
          />

          <InfoCard
            label="Option"
            value={fund.option}
          />

          <InfoCard
            label="Status"
            value={fund.status}
          />

          <InfoCard
            label="Publication Date"
            value={
              factsheet
                ? formatDate(
                    factsheet.publication_date
                  )
                : "—"
            }
          />

        </div>

      </section>
      <section>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Fund Manager
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">

        <InfoCard
          label="Manager"
          value={
            fundManager?.manager_name ??
            "—"
          }
        />

        <InfoCard
          label="Managing Since"
          value={
            fundManager
              ? formatDate(
                  fundManager.managing_since
                )
              : "—"
          }
        />

        <InfoCard
          label="Experience"
          value={
            fundManager?.total_experience ??
            "—"
          }
        />

      </div>

      </section>

      {/* EXPENSE RATIOS */}

      <section>

        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Expense Ratios
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <InfoCard
            label="Direct Expense Ratio"
            value={
              metrics
                ? `${metrics.direct_expense_ratio}%`
                : "—"
            }
          />

          <InfoCard
            label="Regular Expense Ratio"
            value={
              metrics
                ? `${metrics.regular_expense_ratio}%`
                : "—"
            }
          />

          <MetricCard
            label="Portfolio Turnover"
            value={
              metrics?.portfolio_turnover ??
              null
            }
          />

        </div>

      </section>

    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}