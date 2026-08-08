import { Fund } from "@/types/fund";
import FundCard from "./FundCard";

interface FundGridProps {
  funds: Fund[];
}

export default function FundGrid({
  funds,
}: FundGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {funds.map((fund) => (
        <FundCard
          key={fund.id}
          fund={fund}
        />
      ))}
    </div>
  );
}