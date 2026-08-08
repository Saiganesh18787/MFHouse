import InfoCard from "@/components/common/InfoCard";

import { FundMetadata } from "@/types/fund-metadata";
import { ExitLoad } from "@/types/exit-load";

interface MetadataTabProps {
  metadata: FundMetadata | null;
  exitLoads: ExitLoad[];
}

export default function MetadataTab({
  metadata,
  exitLoads,
}: MetadataTabProps) {
  return (
    <div className="space-y-8">

      {/* =====================================
          INVESTMENT OBJECTIVE
      ===================================== */}

      <section>

        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Investment Objective
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-6">

          <p className="leading-7 text-gray-700">
            {metadata?.investment_objective ??
              "No investment objective available."}
          </p>

        </div>

      </section>

      {/* =====================================
          FUND METADATA
      ===================================== */}

      <section>

        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Fund Metadata
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">

          <InfoCard
            label="Benchmark"
            value={
              metadata?.benchmark_name ??
              "—"
            }
          />

          <InfoCard
            label="Risk Level"
            value={
              metadata?.risk_level ??
              "—"
            }
          />

        </div>

      </section>

      {/* =====================================
          EXIT LOAD
      ===================================== */}

      <section>

        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Exit Load
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-6">

          {exitLoads.length > 0 ? (

            <ul className="space-y-4">

              {exitLoads.map((exitLoad) => (

                <li
                  key={exitLoad.id}
                  className="border-b border-gray-100 pb-4 last:border-b-0"
                >

                  <p className="font-medium text-gray-900">
                    {exitLoad.description}
                  </p>

                  <div className="mt-2 grid gap-3 sm:grid-cols-2">

                    <InfoCard
                      label="Exit Load"
                      value={`${exitLoad.exit_load_percentage}%`}
                    />

                    <InfoCard
                      label="Applicable Within"
                      value={
                        exitLoad.redemption_within_days !== null
                          ? `${exitLoad.redemption_within_days} Days`
                          : "No Time Limit"
                      }
                    />

                  </div>

                </li>

              ))}

            </ul>

          ) : (

            <p className="text-gray-500">
              No exit load information available.
            </p>

          )}

        </div>

      </section>

    </div>
  );
}