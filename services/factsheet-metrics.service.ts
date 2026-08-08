import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { Metric } from "@/types/metric";

export async function getFactsheetMetrics(
  factsheetId: number
): Promise<Metric | null> {
  const { data, error } = await supabase
    .from("factsheet_metrics")
    .select("*")
    .eq("factsheet_id", factsheetId)
    .maybeSingle();

  if (error) {
    console.error(
      "Error fetching factsheet metrics:",
      error
    );
    return null;
  }

  return data as Metric | null;
}