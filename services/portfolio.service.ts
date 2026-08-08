import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import {
  PortfolioSummary,
  PortfolioHolding,
} from "@/types/portfolio";

export async function getPortfolioSummary(
  factsheetId: number
): Promise<PortfolioSummary | null> {
  const { data, error } = await supabase
    .from("portfolio_summary")
    .select("*")
    .eq("factsheet_id", factsheetId)
    .maybeSingle();

  if (error) {
    console.error(
      "Error fetching portfolio summary:",
      error
    );

    return null;
  }

  return data as PortfolioSummary | null;
}

export async function getPortfolioHoldings(
  factsheetId: number
): Promise<PortfolioHolding[]> {
  const { data, error } = await supabase
    .from("portfolio_holdings")
    .select("*")
    .eq("factsheet_id", factsheetId)
    .order("rank", {
      ascending: true,
      nullsFirst: false,
    });

  if (error) {
    console.error(
      "Error fetching portfolio holdings:",
      error
    );

    return [];
  }

  return (data ?? []) as PortfolioHolding[];
}