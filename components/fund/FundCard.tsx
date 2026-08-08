import Link from "next/link";
import { Fund } from "@/types/fund";

interface FundCardProps {
  fund: Fund;
}

export default function FundCard({
  fund,
}: FundCardProps) {
  return (
    <Link
      href={`/funds/${fund.id}`}
      className="block"
    >
      <article className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {fund.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {fund.amc}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {fund.category && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {fund.category}
            </span>
          )}

          {fund.sub_category && (
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              {fund.sub_category}
            </span>
          )}
        </div>

        {fund.plan && (
          <div className="mt-5 border-t pt-4">
            <p className="text-xs text-gray-500">
              Plan
            </p>

            <p className="mt-1 text-sm font-medium text-gray-700">
              {fund.plan}
              {fund.option
                ? ` • ${fund.option}`
                : ""}
            </p>
          </div>
        )}
      </article>
    </Link>
  );
}