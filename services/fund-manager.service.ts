import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { FundManager } from "@/types/fund-manager";

export async function getFundManager(
  fundId: string
): Promise<FundManager | null> {
  const { data, error } = await supabase
    .from("fund_managers")
    .select("*")
    .eq("fund_id", fundId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}