import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import {
  ExitLoad,
} from "@/types/exit-load";

/* ==========================================
    GET EXIT LOADS
========================================== */

export async function getExitLoads(): Promise<ExitLoad[]> {

  const { data, error } = await supabase
    .from("exit_loads")
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
    .order("rule_order");

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

  })) as ExitLoad[];

}

/* ==========================================
    GET EXIT LOAD
========================================== */

export async function getExitLoadById(
  id: string
): Promise<ExitLoad | null> {

  const { data, error } = await supabase
    .from("exit_loads")
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

  } as ExitLoad;

}

/* ==========================================
    CREATE EXIT LOAD
========================================== */

export async function createExitLoad(
  values: Omit<
    ExitLoad,
    "id" | "factsheets"
  >
): Promise<ExitLoad> {

  const { data, error } = await supabase
    .from("exit_loads")
    .insert(values)
    .select()
    .single();

  if (error) {

    throw error;

  }

  return data as ExitLoad;

}

/* ==========================================
    UPDATE EXIT LOAD
========================================== */

export async function updateExitLoad(
  id: string,
  values: Partial<ExitLoad>
): Promise<void> {

  const { error } = await supabase
    .from("exit_loads")
    .update(values)
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    DELETE EXIT LOAD
========================================== */

export async function deleteExitLoad(
  id: number
): Promise<void> {

  const { error } = await supabase
    .from("exit_loads")
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
    .order("year", { ascending: false })
    .order("publication_date", { ascending: false });

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