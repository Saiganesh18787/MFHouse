import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { Factsheet } from "@/types/factsheet";
import { Performance } from "@/types/performance";

/* ==========================================
    GET PERFORMANCE
========================================== */

export async function getPerformance(): Promise<Performance[]> {

  const { data, error } = await supabase
    .from("performance")
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
    .order("id");

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

  })) as Performance[];

}

/* ==========================================
    GET PERFORMANCE BY ID
========================================== */

export async function getPerformanceById(
  id: string
): Promise<Performance | null> {

  const { data, error } = await supabase
    .from("performance")
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

  } as Performance;

}

/* ==========================================
    CREATE PERFORMANCE
========================================== */

export async function createPerformance(
  values: Omit<Performance, "id">
): Promise<Performance> {

  const { data, error } = await supabase
    .from("performance")
    .insert(values)
    .select()
    .single();

  if (error) {

    throw error;

  }

  return data as Performance;

}

/* ==========================================
    UPDATE PERFORMANCE
========================================== */

export async function updatePerformance(
  id: string,
  values: Partial<Performance>
): Promise<void> {

  const { error } = await supabase
    .from("performance")
    .update(values)
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    DELETE PERFORMANCE
========================================== */

export async function deletePerformance(
  id: number
): Promise<void> {

  const { error } = await supabase
    .from("performance")
    .delete()
    .eq("id", id);

  if (error) {

    throw error;

  }

}

export async function getFactsheetsWithoutPerformance() {

  const { data, error } = await supabase
    .from("factsheets")
    .select(`
      id,
      month,
      year,
      funds (
        id,
        name
      ),
      performance (
        id
      )
    `)
    .order("year", { ascending: false })
    .order("publication_date", { ascending: false });

  if (error) {

    console.error(error);

    return [];

  }

  return (data ?? [])
    .filter((factsheet: any) => {

      const performance =
        factsheet.performance ?? [];

      return performance.length === 0;

    })
    .map((factsheet: any) => ({

      id: factsheet.id,

      month: factsheet.month,

      year: factsheet.year,

      funds: factsheet.funds ?? null,

    }));

}