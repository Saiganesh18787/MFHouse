import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { Fund } from "@/types/fund";
import { Factsheet } from "@/types/factsheet";

/* ==========================================
    GET FACTSHEETS
========================================== */

export async function getFactsheets() {

  const { data, error } = await supabase
    .from("factsheets")
    .select(`
      *,
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

  return data;

}

/* ==========================================
    GET FACTSHEET BY ID
========================================== */

export async function getFactsheetById(
  id: string
): Promise<Factsheet | null> {

  const { data, error } = await supabase
    .from("factsheets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {

    console.error(error);

    return null;

  }

  return data as Factsheet;

}

/* ==========================================
    CREATE FACTSHEET
========================================== */

export async function createFactsheet(
  factsheet: Omit<Factsheet, "id">
): Promise<Factsheet> {

  const { data, error } = await supabase
    .from("factsheets")
    .insert(factsheet)
    .select()
    .single();

  if (error) {

    if (error.code === "23505") {

      throw new Error(
        "A factsheet already exists for this fund and month."
      );

    }

    throw error;

  }

  return data as Factsheet;

}

/* ==========================================
    UPDATE FACTSHEET
========================================== */

export async function updateFactsheet(
  id: string,
  values: Partial<Factsheet>
): Promise<void> {

  const { error } = await supabase
    .from("factsheets")
    .update(values)
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    DELETE FACTSHEET
========================================== */

export async function deleteFactsheet(
  id: number
): Promise<void> {

  const { error } = await supabase
    .from("factsheets")
    .delete()
    .eq("id", id);

  if (error) {

    throw error;

  }

}

/* ==========================================
    GET ACTIVE FUNDS
========================================== */

export async function getActiveFunds(): Promise<Fund[]> {

  const { data, error } = await supabase
    .from("funds")
    .select("*")
    .eq("status", "Active")
    .order("name");

  if (error) {

    console.error(error);

    return [];

  }

  return data as Fund[];

}