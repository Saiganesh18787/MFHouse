import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import {
  SectorAllocation,
} from "@/types/sector-allocation";

/* ==========================================
    GET SECTOR ALLOCATIONS
========================================== */

export async function getSectorAllocations(): Promise<SectorAllocation[]> {

  const { data, error } = await supabase
    .from("sector_allocations")
    .select(`
      *,
      factsheets (
        id,
        month,
        year,
        funds (
          id,
          name
        )
      )
    `)
    .order("factsheet_id")
    .order("allocation_percentage", {
      ascending: false,
    });

  if (error) {

    console.error(error);

    return [];

  }

  return (data ?? []).map((record: any) => ({

    ...record,

    factsheets: {

      ...record.factsheets,

      funds: record.factsheets?.funds ?? null,

    },

  })) as SectorAllocation[];

}

/* ==========================================
    GET SECTOR ALLOCATION BY ID
========================================== */

export async function getSectorAllocationById(
  id: string
): Promise<SectorAllocation | null> {

  const { data, error } = await supabase
    .from("sector_allocations")
    .select(`
      *,
      factsheets (
        id,
        month,
        year,
        funds (
          id,
          name
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) {

    console.error(error);

    return null;

  }

  return {

    ...data,

    factsheets: {

      ...data.factsheets,

      funds: data.factsheets?.funds ?? null,

    },

  } as SectorAllocation;

}

/* ==========================================
    CREATE SECTOR ALLOCATION
========================================== */

export async function createSectorAllocation(
  values: Omit<
    SectorAllocation,
    "id" | "factsheets"
  >
): Promise<SectorAllocation> {

  const { data, error } = await supabase
    .from("sector_allocations")
    .insert(values)
    .select()
    .single();

  if (error) {

    throw error;

  }

  return data as SectorAllocation;

}

/* ==========================================
    UPDATE SECTOR ALLOCATION
========================================== */

export async function updateSectorAllocation(
  id: string,
  values: Partial<SectorAllocation>
): Promise<void> {

  const { error } = await supabase
    .from("sector_allocations")
    .update(values)
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    DELETE SECTOR ALLOCATION
========================================== */

export async function deleteSectorAllocation(
  id: number
): Promise<void> {

  const { error } = await supabase
    .from("sector_allocations")
    .delete()
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    GET FACTSHEETS
========================================== */

export async function getFactsheets() {

  const { data, error } = await supabase
    .from("factsheets")
    .select(`
      id,
      month,
      year,
      funds (
        id,
        name
      )
    `)
    .order("year", {
      ascending: false,
    })
    .order("publication_date", {
      ascending: false,
    });

  if (error) {

    console.error(error);

    return [];

  }

  return (data ?? []).map((factsheet: any) => ({

    id: factsheet.id,

    month: factsheet.month,

    year: factsheet.year,

    funds: factsheet.funds ?? null,

  }));

}