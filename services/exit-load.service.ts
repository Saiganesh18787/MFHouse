import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { ExitLoad } from "@/types/exit-load";

export async function getExitLoads(
  factsheetId: number
): Promise<ExitLoad[]> {
  const { data, error } = await supabase
    .from("exit_loads")
    .select("*")
    .eq("factsheet_id", factsheetId)
    .order("rule_order");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}