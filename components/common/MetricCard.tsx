interface MetricCardProps {
  label: string;
  value: number | null;
}

export default function MetricCard({
  label,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold text-gray-900">
        {value !== null
          ? value.toFixed(2)
          : "—"}
      </p>
    </div>
  );
}