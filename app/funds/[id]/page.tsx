import { notFound } from "next/navigation";

import Container from "@/components/layout/Container";
import InfoCard from "@/components/common/InfoCard";
import FundTabs from "@/components/fund/FundTabs";

import { getFundById } from "@/services/fund.service";
import { getLatestFactsheet } from "@/services/factsheet.service";
import { getFactsheetMetrics } from "@/services/factsheet-metrics.service";
import { getPerformance } from "@/services/performance.service";
import {
  getPortfolioSummary,
  getPortfolioHoldings,
} from "@/services/portfolio.service";
import { getSectorAllocations } from "@/services/sector-allocation.service";
import { getFundManager } from "@/services/fund-manager.service";
import { getFundMetadata } from "@/services/fund-metadata.service";
import { getExitLoads } from "@/services/exit-load.service";
import { getMarketCap } from "@/services/market-cap.service";
export const dynamic = "force-dynamic";

interface FundPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FundPage({
  params,
}: FundPageProps) {
  const { id } = await params;

  // ==========================================
  // GET FUND
  // ==========================================

  const fund = await getFundById(id);

  if (!fund) {
    notFound();
  }

  // ==========================================
  // GET FACTSHEET
  // ==========================================

  const factsheet = await getLatestFactsheet(id);

  // ==========================================
  // GET METRICS
  // ==========================================

  const metrics = factsheet
    ? await getFactsheetMetrics(factsheet.id)
    : null;

  // ==========================================
  // GET PERFORMANCE
  // ==========================================

  const performance = factsheet
    ? await getPerformance(factsheet.id)
    : null;


  

  // ==========================================
  // GET PORTFOLIO
  // ==========================================

  const portfolioSummary = factsheet
    ? await getPortfolioSummary(factsheet.id)
    : null;

  const portfolioHoldings = factsheet
    ? await getPortfolioHoldings(factsheet.id)
    : [];

  // ==========================================
  // GET SECTOR ALLOCATION
  // ==========================================

  const sectorAllocations = factsheet
    ? await getSectorAllocations(factsheet.id)
    : [];


  // ==========================================
  // GET FUND MANAGER
  // ========================================== 
  const fundManager = await getFundManager(id);

  const fundMetadata = await getFundMetadata(id);

  const exitLoads = factsheet
  ? await getExitLoads(factsheet.id)
  : [];

  const marketCap = factsheet
  ? await getMarketCap(factsheet.id)
  : null;


  return (
    <Container>
      <section className="py-10">

        {/* =====================================
            FUND HEADER
        ===================================== */}

        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            {fund.category}
            {fund.sub_category &&
              ` • ${fund.sub_category}`}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            {fund.name}
          </h1>

          <p className="mt-2 text-gray-600">
            {fund.amc}
          </p>

          {factsheet && (
            <p className="mt-2 text-sm text-gray-500">
              Factsheet: {factsheet.month}{" "}
              {factsheet.year}
            </p>
          )}
        </div>

        {/* =====================================
            QUICK STATS
        ===================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <InfoCard
            label="Direct Growth NAV"
            value={
              metrics
                ? `₹${metrics.direct_growth_nav.toFixed(
                    2
                  )}`
                : "—"
            }
          />

          <InfoCard
            label="Regular Growth NAV"
            value={
              metrics
                ? `₹${metrics.regular_growth_nav.toFixed(
                    2
                  )}`
                : "—"
            }
          />

          <InfoCard
            label="AUM"
            value={
              metrics
                ? `₹${metrics.aum.toLocaleString(
                    "en-IN"
                  )} Cr`
                : "—"
            }
          />

          <InfoCard
            label="Direct Expense Ratio"
            value={
              metrics
                ? `${metrics.direct_expense_ratio}%`
                : "—"
            }
          />

        </div>

        {/* =====================================
            TABS
        ===================================== */}

        <FundTabs
          fund={fund}
          factsheet={factsheet}
          metrics={metrics}
          performance={performance}
          portfolioSummary={portfolioSummary}
          portfolioHoldings={portfolioHoldings}
          sectorAllocations={sectorAllocations}
          fundManager={fundManager}
          fundMetadata={fundMetadata}
          exitLoads={exitLoads}
          marketCap={marketCap}
        />

        {/* =====================================
            NO FACTSHEET
        ===================================== */}

        {!factsheet && (
          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="font-semibold text-gray-900">
              No factsheet available
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Factsheet data has not been added
              for this fund yet.
            </p>
          </div>
        )}

      </section>
    </Container>
  );
}
