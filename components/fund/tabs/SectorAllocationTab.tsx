import SectorAllocationChart from "@/components/charts/SectorAllocationChart";

import { SectorAllocation } from "@/types/sector-allocation";

interface SectorAllocationTabProps {
  sectors: SectorAllocation[];
}

export default function SectorAllocationTab({
  sectors,
}: SectorAllocationTabProps) {
  return (
    <div className="space-y-8">

      {/* CHART */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Sector Allocation
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Portfolio exposure across different sectors.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <SectorAllocationChart
            sectors={sectors}
          />
        </div>
      </section>

      {/* TABLE */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Sector Details
          </h2>
        </div>

        <SectorTable sectors={sectors} />
      </section>

    </div>
  );
}

function SectorTable({
  sectors,
}: {
  sectors: SectorAllocation[];
}) {
  if (sectors.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <p className="text-sm text-gray-500">
          No sector allocation data available.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

      <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50 px-5 py-3">

        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Sector
        </p>

        <p className="text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
          Allocation
        </p>

      </div>

      {sectors.map((sector) => (
        <div
          key={sector.id}
          className="grid grid-cols-2 border-b border-gray-100 px-5 py-4 last:border-b-0"
        >

          <p className="text-sm font-medium text-gray-900">
            {sector.sector_name}
          </p>

          <p className="text-right text-sm font-semibold text-gray-900">
            {sector.allocation_percentage.toFixed(2)}%
          </p>

        </div>
      ))}

    </div>
  );
}