import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { Fund } from "@/types/fund";

export async function getFunds(): Promise<Fund[]> {

  const { data, error } = await supabase
    .from("funds")
    .select("*")
    .eq("status", "Active")
    .order("name");

  if (error) {

    console.error("Error fetching funds:", error);

    return [];

  }

  return data as Fund[];

}

export async function getFundById(
  id: string
): Promise<Fund | null> {

  const { data, error } = await supabase
    .from("funds")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {

    console.error("Error fetching fund:", error);

    return null;

  }

  return data as Fund;

}