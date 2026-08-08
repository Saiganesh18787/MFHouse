import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { SectorAllocation } from "@/types/sector-allocation";

export async function getSectorAllocations(
  factsheetId: number
): Promise<SectorAllocation[]> {
  const { data, error } = await supabase
    .from("sector_allocations")
    .select("*")
    .eq("factsheet_id", factsheetId)
    .order("allocation_percentage", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Error fetching sector allocations:",
      error
    );

    return [];
  }

  return (data ?? []) as SectorAllocation[];
}