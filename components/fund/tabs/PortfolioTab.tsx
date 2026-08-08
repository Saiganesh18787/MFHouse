import AssetAllocationChart from "@/components/charts/AssetAllocationChart";
import HoldingsChart from "@/components/charts/HoldingsChart";
import { MarketCap } from "@/types/market-cap";
import MarketCapChart from "@/components/charts/MarketCapChart";

import {
  PortfolioHolding,
  PortfolioSummary,
} from "@/types/portfolio";

interface PortfolioTabProps {
  summary: PortfolioSummary | null;
  holdings: PortfolioHolding[];
  marketCap: MarketCap | null;
}

export default function PortfolioTab({
  summary,
  holdings,
  marketCap,
}: PortfolioTabProps) {
  return (
    <div className="space-y-8">

      {/* ASSET ALLOCATION */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Asset Allocation
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Distribution of the portfolio across
            asset classes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <AssetAllocationChart
              summary={summary}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <AllocationCard
              label="Equity"
              value={summary?.equity ?? null}
            />

            <AllocationCard
              label="Debt"
              value={summary?.debt ?? null}
            />

            <AllocationCard
              label="Cash & Equivalents"
              value={
                summary?.cash_and_cash_equivalents ??
                null
              }
            />

            <AllocationCard
              label="Others"
              value={summary?.others ?? null}
            />

          </div>
        </div>
      </section>

      {/* TOP HOLDINGS */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Top Holdings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Largest securities in the portfolio by
            allocation.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <HoldingsChart holdings={holdings} />
        </div>
      </section>

      {/* ALL HOLDINGS */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Portfolio Holdings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Detailed securities held by the fund.
          </p>
        </div>

        <HoldingsTable holdings={holdings} />
      </section>

      {/* =====================================
    MARKET CAP ALLOCATION
===================================== */}

        <section>

          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Market Cap Allocation
          </h2>

          <MarketCapChart
            data={marketCap}
          />

        </section>
    </div>
  );
}

function AllocationCard({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-gray-900">
        {value !== null
          ? `${value.toFixed(2)}%`
          : "—"}
      </p>

    </div>
  );
}

function HoldingsTable({
  holdings,
}: {
  holdings: PortfolioHolding[];
}) {
  if (holdings.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <p className="text-sm text-gray-500">
          No portfolio holdings available.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">

      <table className="min-w-full">

        <thead className="bg-gray-50">
          <tr>

            <TableHeading>
              Rank
            </TableHeading>

            <TableHeading>
              Security
            </TableHeading>

            <TableHeading>
              Sector
            </TableHeading>

            <TableHeading>
              Instrument
            </TableHeading>

            <TableHeading align="right">
              Allocation
            </TableHeading>

          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">

          {holdings.map((holding) => (
            <tr
              key={holding.id}
              className="hover:bg-gray-50"
            >

              <TableCell>
                {holding.rank ?? "—"}
              </TableCell>

              <TableCell>
                <span className="font-medium text-gray-900">
                  {holding.security_name}
                </span>
              </TableCell>

              <TableCell>
                {holding.sector ?? "—"}
              </TableCell>

              <TableCell>
                {holding.instrument_type}
              </TableCell>

              <TableCell align="right">
                <span className="font-semibold text-gray-900">
                  {holding.allocation_percentage.toFixed(
                    2
                  )}
                  %
                </span>
              </TableCell>

            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}

function TableHeading({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${
        align === "right"
          ? "text-right"
          : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function TableCell({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <td
      className={`whitespace-nowrap px-5 py-4 text-sm text-gray-600 ${
        align === "right"
          ? "text-right"
          : "text-left"
      }`}
    >
      {children}
    </td>
  );
}