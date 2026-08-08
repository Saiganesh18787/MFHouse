import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { FundMetadata } from "@/types/fund-metadata";

export async function getFundMetadata(
  fundId: string
): Promise<FundMetadata | null> {
  const { data, error } = await supabase
    .from("fund_metadata")
    .select("*")
    .eq("fund_id", fundId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}