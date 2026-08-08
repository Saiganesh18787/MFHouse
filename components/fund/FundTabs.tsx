"use client";

import { useState } from "react";

import OverviewTab from "@/components/fund/tabs/OverviewTab";
import PerformanceTab from "@/components/fund/tabs/PerformanceTab";
import PortfolioTab from "@/components/fund/tabs/PortfolioTab";
import SectorAllocationTab from "@/components/fund/tabs/SectorAllocationTab";
import RiskTab from "@/components/fund/tabs/RiskTab";
import CompareTab from "@/components/fund/tabs/CompareTab";
import { Fund } from "@/types/fund";
import { Factsheet } from "@/types/factsheet";
import { Metric } from "@/types/metric";
import { Performance } from "@/types/performance";
import {
  PortfolioHolding,
  PortfolioSummary,
} from "@/types/portfolio";
import { SectorAllocation } from "@/types/sector-allocation";
import MetadataTab from "@/components/fund/tabs/MetadataTab";
import { FundManager } from "@/types/fund-manager";
import { FundMetadata } from "@/types/fund-metadata";
import { ExitLoad } from "@/types/exit-load";
import { MarketCap } from "@/types/market-cap";

type Tab =
  | "overview"
  | "performance"
  | "portfolio"
  | "sector"
  | "compare"
  | "risk"
  | "metadata";

interface FundTabsProps {
  fund: Fund;
  factsheet: Factsheet | null;
  metrics: Metric | null;
  performance: Performance | null;

  fundManager: FundManager | null;
  fundMetadata: FundMetadata | null;

  portfolioSummary: PortfolioSummary | null;
  portfolioHoldings: PortfolioHolding[];
  sectorAllocations: SectorAllocation[];

  exitLoads: ExitLoad[];
  marketCap: MarketCap | null;
}

const tabs: {
  id: Tab;
  label: string;
}[] = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "performance",
    label: "Performance",
  },
  {
    id: "portfolio",
    label: "Portfolio",
  },
  {
    id: "sector",
    label: "Sector Allocation",
  },
  {
  id: "compare",
  label: "Compare",
  },
  {
    id: "risk",
    label: "Risk",
  },
  {
    id: "metadata",
    label: "Metadata",
  },
  
];

export default function FundTabs({
  fund,
  factsheet,
  metrics,
  performance,
  portfolioSummary,
  portfolioHoldings,
  sectorAllocations,
  fundManager,
  fundMetadata,
  exitLoads,
  marketCap,
}: FundTabsProps) {
  const [activeTab, setActiveTab] =
    useState<Tab>("overview");

  return (
    <div className="mt-10">

      {/* TAB NAVIGATION */}

      <div className="overflow-x-auto border-b border-gray-200">

        <div className="flex min-w-max gap-6">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`border-b-2 px-1 pb-3 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}

        </div>

      </div>

      {/* TAB CONTENT */}

      <div className="pt-8">

        {activeTab === "overview" && (
  <OverviewTab
    fund={fund}
    factsheet={factsheet}
    metrics={metrics}
    fundManager={fundManager}
  />
)}

        {activeTab === "performance" && (
  <PerformanceTab
    performance={performance}
  />
)}

        {activeTab === "portfolio" && (
          <PortfolioTab
            summary={portfolioSummary}
            holdings={portfolioHoldings}
            marketCap={marketCap}
          />
        )}

        {activeTab === "sector" && (
          <SectorAllocationTab
            sectors={sectorAllocations}
          />
        )}
        {activeTab === "compare" && (
          <CompareTab
            fundId={fund.id}
          />
        )}
       

        {activeTab === "risk" && (
          <RiskTab
            metrics={metrics}
          />
        )}

        {activeTab === "metadata" && (
        <MetadataTab
          metadata={fundMetadata}
          exitLoads={exitLoads}
        />
        )}

        

      </div>

    </div>
  );
}

