import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import {
  MarketCap,
} from "@/types/market-cap";

/* ==========================================
    GET MARKET CAPS
========================================== */

export async function getMarketCaps(): Promise<MarketCap[]> {

  const { data, error } = await supabase
    .from("market_caps")
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

  })) as MarketCap[];

}

/* ==========================================
    GET MARKET CAP BY ID
========================================== */

export async function getMarketCapById(
  id: string
): Promise<MarketCap | null> {

  const { data, error } = await supabase
    .from("market_cap_allocations")
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

  } as MarketCap;

}

/* ==========================================
    CREATE MARKET CAP
========================================== */

export async function createMarketCap(
  values: Omit<
    MarketCap,
    "id" | "created_at" | "factsheets"
  >
): Promise<MarketCap> {

  const { data, error } = await supabase
    .from("market_cap_allocations")
    .insert(values)
    .select()
    .single();

  if (error) {

    throw error;

  }

  return data as MarketCap;

}

/* ==========================================
    UPDATE MARKET CAP
========================================== */

export async function updateMarketCap(
  id: string,
  values: Partial<MarketCap>
): Promise<void> {

  const { error } = await supabase
    .from("market_cap_allocations")
    .update(values)
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    DELETE MARKET CAP
========================================== */

export async function deleteMarketCap(
  id: number
): Promise<void> {

  const { error } = await supabase
    .from("market_cap_allocations")
    .delete()
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    FACTSHEETS WITHOUT MARKET CAP
========================================== */

export async function getFactsheetsWithoutMarketCap() {

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
      market_cap_allocations (
        id
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

  return (data ?? [])
    .filter((factsheet: any) => {

      const marketCap =
        factsheet.market_cap_allocations ?? [];

      return marketCap.length === 0;

    })
    .map((factsheet: any) => ({

      id: factsheet.id,

      month: factsheet.month,

      year: factsheet.year,

      funds: factsheet.funds ?? null,

    }));

}
