import Container from "@/components/layout/Container";
import FundExplorer from "@/components/fund/FundExplorer";
import { getFunds } from "@/services/fund.service";

export default async function FundsPage() {
  const funds = await getFunds();

  return (
    <Container>
      <section className="py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Mutual Funds
          </h1>

          <p className="mt-2 text-gray-600">
            Browse and analyze mutual funds.
          </p>
        </div>

        <FundExplorer funds={funds} />
      </section>
    </Container>
  );
}