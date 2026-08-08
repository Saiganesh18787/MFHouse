import CompareHeader from "@/components/compare/CompareHeader";

import { ComparisonResponse } from "@/types/comparison";
import KPICard from "./KPICard";
import ComparisonChart from "@/components/compare/ComparisonChart";
import TopMoversCard from "@/components/compare/TopMoversCard";
import AddedRemovedCard from "@/components/compare/AddedRemovedCard";
import ComparisonTable from "@/components/compare/ComparisonTable";

interface CompareDashboardProps {
  comparison: ComparisonResponse;

  onPreviousComparison: () => void;

  onNextComparison: () => void;

  canGoPrevious: boolean;

  canGoNext: boolean;
}

export default function CompareDashboard({
  comparison,
  onPreviousComparison,
  onNextComparison,
  canGoPrevious,
  canGoNext,
}: CompareDashboardProps) {
  return (
    <div className="space-y-8">

      {/* ==========================================
          HEADER
      ========================================== */}

      <CompareHeader
        previousMonth={
          comparison.previousMonth
        }
        currentMonth={
          comparison.currentMonth
        }
        onPreviousComparison={onPreviousComparison}
        onNextComparison={onNextComparison}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />
      

      {/* ==========================================
          KPI SECTION
      ========================================== */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

            <KPICard
                title="Added Holdings"
                value={
                comparison.summary.addedHoldings
                }
                description="New holdings introduced"
                color="green"
            />

            <KPICard
                title="Removed Holdings"
                value={
                comparison.summary.removedHoldings
                }
                description="Holdings removed"
                color="red"
            />

            <KPICard
                title="Increased"
                value={
                comparison.summary.increasedHoldings
                }
                description="Allocation increased"
                color="blue"
            />

            <KPICard
                title="Decreased"
                value={
                comparison.summary.decreasedHoldings
                }
                description="Allocation decreased"
                color="orange"
            />

            <KPICard
                title="Total Holdings"
                value={
                comparison.summary.totalHoldings
                }
                description="Compared holdings"
                color="gray"
            />

</section>
      

      {/* ==========================================
          CHART
      ========================================== */}

      {/* ==========================================
    CHART
========================================== */}

<section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

  <ComparisonChart
    data={comparison.chartData}
    previousMonth={comparison.previousMonth}
    currentMonth={comparison.currentMonth}
  />

</section>

{/* ==========================================
    TOP MOVERS
========================================== */}

<section className="grid gap-6 lg:grid-cols-2">

  <TopMoversCard
    title="Top Increased Holdings"
    holdings={comparison.topIncreased}
    type="increase"
  />

  <TopMoversCard
    title="Top Decreased Holdings"
    holdings={comparison.topDecreased}
    type="decrease"
  />

</section>

      {/* ==========================================
          ADDED / REMOVED
      ========================================== */}

      <section className="grid gap-6 lg:grid-cols-2">

  <AddedRemovedCard
    title="Added Holdings"
    holdings={comparison.addedHoldings}
    type="added"
  />

  <AddedRemovedCard
    title="Removed Holdings"
    holdings={comparison.removedHoldings}
    type="removed"
  />

</section>

      {/* ==========================================
          TABLE
      ========================================== */}

      <ComparisonTable
        holdings={comparison.holdings}
      />

    </div>
  );
}