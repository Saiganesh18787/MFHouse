import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { Metric } from "@/types/metric";

/* ==========================================
    GET METRICS
========================================== */

export async function getMetrics(): Promise<Metric[]> {

  const { data, error } = await supabase
    .from("factsheet_metrics")
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

  })) as Metric[];

}

/* ==========================================
    GET METRIC BY ID
========================================== */

export async function getMetricById(
  id: string
): Promise<Metric | null> {

  const { data, error } = await supabase
    .from("factsheet_metrics")
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

  } as Metric;

}

/* ==========================================
    CREATE METRIC
========================================== */

export async function createMetric(
  values: Omit<Metric, "id" | "factsheets">
): Promise<Metric> {

  const { data, error } = await supabase
    .from("factsheet_metrics")
    .insert(values)
    .select()
    .single();

  if (error) {

    throw error;

  }

  return data as Metric;

}

/* ==========================================
    UPDATE METRIC
========================================== */

export async function updateMetric(
  id: string,
  values: Partial<Metric>
): Promise<void> {

  const { error } = await supabase
    .from("factsheet_metrics")
    .update(values)
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    DELETE METRIC
========================================== */

export async function deleteMetric(
  id: number
): Promise<void> {

  const { error } = await supabase
    .from("factsheet_metrics")
    .delete()
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    FACTSHEETS WITHOUT METRICS
========================================== */

export async function getFactsheetsWithoutMetrics() {

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
      factsheet_metrics (
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

      const metrics =
        factsheet.factsheet_metrics ?? [];

      return metrics.length === 0;

    })
    .map((factsheet: any) => ({

      id: factsheet.id,

      month: factsheet.month,

      year: factsheet.year,

      funds: factsheet.funds ?? null,

    }));

}