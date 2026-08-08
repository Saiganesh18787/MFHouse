import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { Factsheet } from "@/types/factsheet";

export async function getLatestFactsheet(
  fundId: string
): Promise<Factsheet | null> {
  const { data, error } = await supabase
    .from("factsheets")
    .select("*")
    .eq("fund_id", fundId)
    .order("publication_date", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(
      "Error fetching latest factsheet:",
      error
    );
    return null;
  }

  return data as Factsheet | null;
}

export async function getFactsheetsByFund(
  fundId: number
) {
  const { data, error } = await supabase
    .from("factsheets")
    .select(`
      id,
      month,
      year,
      publication_date
    `)
    .eq("fund_id", fundId)
    .order("publication_date", {
      ascending: false,
    })
    .order("id", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}