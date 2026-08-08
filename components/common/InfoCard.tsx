interface InfoCardProps {
  label: string;
  value?: string | null;
}

export default function InfoCard({
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 font-semibold text-gray-900">
        {value || "—"}
      </p>
    </div>
  );
}