import { ArrowRight } from "lucide-react";

interface CompareHeaderProps {
  previousMonth: string;

  currentMonth: string;

  onPreviousComparison: () => void;

  onNextComparison: () => void;

  canGoPrevious: boolean;

  canGoNext: boolean;
}

export default function CompareHeader({
  previousMonth,
  currentMonth,
  onPreviousComparison,
  onNextComparison,
  canGoPrevious,
  canGoNext,
}: CompareHeaderProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Previous Button */}

        <button
          onClick={onPreviousComparison}
          disabled={!canGoPrevious}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        >
          ◀ Previous Comparison
        </button>

        {/* Comparison */}

        <div className="text-center">

          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Portfolio Comparison
          </p>

          <div className="mt-5 flex items-center justify-center gap-4">

            {/* Previous Month */}

            <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 shadow-sm">

              <p className="text-xs uppercase tracking-wide text-gray-500">
                Previous
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                {previousMonth}
              </p>

            </div>

            {/* Arrow */}

            <ArrowRight
              size={30}
              strokeWidth={2.5}
              className="text-blue-600"
            />

            {/* Current Month */}

            <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-3 shadow-sm">

              <p className="text-xs uppercase tracking-wide text-blue-600">
                Current
              </p>

              <p className="mt-1 text-xl font-bold text-blue-700">
                {currentMonth}
              </p>

            </div>

          </div>

        </div>

        {/* Next Button */}

        <button
          onClick={onNextComparison}
          disabled={!canGoNext}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        >
          Next Comparison ▶
        </button>

      </div>

    </div>
  );
}