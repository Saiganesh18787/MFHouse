import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { MarketCap } from "@/types/market-cap";

export async function getMarketCap(
  factsheetId: number
): Promise<MarketCap | null> {

  const { data, error } = await supabase
    .from("market_caps")
    .select("*")
    .eq("factsheet_id", factsheetId)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}