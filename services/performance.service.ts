import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { Performance } from "@/types/performance";

export async function getPerformance(
  factsheetId: number
): Promise<Performance | null> {
  const { data, error } = await supabase
    .from("performance")
    .select("*")
    .eq("factsheet_id", factsheetId)
    .maybeSingle();

  if (error) {
    console.error(
      "Error fetching performance:",
      error
    );

    return null;
  }

  return data as Performance | null;
}