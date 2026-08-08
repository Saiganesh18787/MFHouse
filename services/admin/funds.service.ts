import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import { Fund } from "@/types/fund";

/* ==========================================
    CREATE FUND
========================================== */

export async function createFund(
  fund: Omit<Fund, "id">
): Promise<Fund> {

  const { data, error } = await supabase
    .from("funds")
    .insert(fund)
    .select()
    .single();

  if (error) {

    throw error;

  }

  return data as Fund;

}

/* ==========================================
    DELETE FUND
========================================== */

export async function deleteFund(
  id: number
) {

  const { error } = await supabase
    .from("funds")
    .delete()
    .eq("id", id);

  if (error) {

    throw error;

  }

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

    console.error(error);

    return null;

  }

  return data as Fund;

}

export async function updateFund(
  id: string,
  values: Partial<Fund>
): Promise<void> {

  const { error } = await supabase
    .from("funds")
    .update(values)
    .eq("id", id);

  if (error) {

    throw error;

  }

}

export async function getFunds(): Promise<Fund[]> {

  const { data, error } = await supabase
    .from("funds")
    .select("*")
    .order("name");

  if (error) {

    console.error(error);

    return [];

  }

  return data as Fund[];

}