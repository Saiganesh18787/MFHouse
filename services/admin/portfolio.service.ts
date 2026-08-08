import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import {
  PortfolioHolding,
  PortfolioSummary,
} from "@/types/portfolio";

/* ==========================================
    GET PORTFOLIO SUMMARY
========================================== */

export async function getPortfolioSummaries(): Promise<PortfolioSummary[]> {

  const { data, error } = await supabase
    .from("portfolio_summary")
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

  })) as PortfolioSummary[];

}

/* ==========================================
    GET PORTFOLIO SUMMARY BY ID
========================================== */

export async function getPortfolioSummaryById(
  id: string
): Promise<PortfolioSummary | null> {

  const { data, error } = await supabase
    .from("portfolio_summary")
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

  } as PortfolioSummary;

}

/* ==========================================
    CREATE PORTFOLIO SUMMARY
========================================== */

export async function createPortfolioSummary(
  values: Omit<
    PortfolioSummary,
    "id" | "factsheets"
  >
): Promise<PortfolioSummary> {

  const { data, error } = await supabase
    .from("portfolio_summary")
    .insert(values)
    .select()
    .single();

  if (error) {

    throw error;

  }

  return data as PortfolioSummary;

}

/* ==========================================
    UPDATE PORTFOLIO SUMMARY
========================================== */

export async function updatePortfolioSummary(
  id: string,
  values: Partial<PortfolioSummary>
): Promise<void> {

  const { error } = await supabase
    .from("portfolio_summary")
    .update(values)
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    DELETE PORTFOLIO SUMMARY
========================================== */

export async function deletePortfolioSummary(
  id: number
): Promise<void> {

  const { error } = await supabase
    .from("portfolio_summary")
    .delete()
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    FACTSHEETS WITHOUT PORTFOLIO SUMMARY
========================================== */

export async function getFactsheetsWithoutPortfolioSummary() {

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
      portfolio_summary (
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

      const summary =
        factsheet.portfolio_summary ?? [];

      return summary.length === 0;

    })
    .map((factsheet: any) => ({

      id: factsheet.id,

      month: factsheet.month,

      year: factsheet.year,

      funds: factsheet.funds ?? null,

    }));

}

/* ==========================================
    GET PORTFOLIO HOLDINGS
========================================== */

export async function getPortfolioHoldings(): Promise<PortfolioHolding[]> {

  const { data, error } = await supabase
    .from("portfolio_holdings")
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
    .order("rank");

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

  })) as PortfolioHolding[];

}



/* ==========================================
    GET HOLDING BY ID
========================================== */

export async function getPortfolioHoldingById(
  id: string
): Promise<PortfolioHolding | null> {

  const { data, error } = await supabase
    .from("portfolio_holdings")
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

  } as PortfolioHolding;

}

/* ==========================================
    CREATE HOLDING
========================================== */

export async function createPortfolioHolding(
  values: Omit<
    PortfolioHolding,
    "id" | "factsheets"
  >
): Promise<PortfolioHolding> {

  const { data, error } = await supabase
    .from("portfolio_holdings")
    .insert(values)
    .select()
    .single();

  if (error) {

    throw error;

  }

  return data as PortfolioHolding;

}

/* ==========================================
    UPDATE HOLDING
========================================== */

export async function updatePortfolioHolding(
  id: string,
  values: Partial<PortfolioHolding>
): Promise<void> {

  const { error } = await supabase
    .from("portfolio_holdings")
    .update(values)
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    DELETE HOLDING
========================================== */

export async function deletePortfolioHolding(
  id: number
): Promise<void> {

  const { error } = await supabase
    .from("portfolio_holdings")
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