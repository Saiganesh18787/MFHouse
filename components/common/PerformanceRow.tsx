interface PerformanceRowProps {
  period: string;
  value: number | null;
  last?: boolean;
}

export default function PerformanceRow({
  period,
  value,
  last = false,
}: PerformanceRowProps) {
  return (
    <div
      className={`grid grid-cols-2 px-5 py-4 ${
        !last ? "border-b border-gray-100" : ""
      }`}
    >
      <p className="text-sm text-gray-700">
        {period}
      </p>

      <p
        className={`text-right text-sm font-semibold ${
          value === null
            ? "text-gray-400"
            : value >= 0
              ? "text-green-600"
              : "text-red-600"
        }`}
      >
        {value !== null
          ? `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
          : "—"}
      </p>
    </div>
  );
}