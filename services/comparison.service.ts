import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import {
  ComparisonHolding,
  ComparisonResponse,
  ComparisonChartData,
} from "@/types/comparison";


/* ==========================================
   GET COMPARISON
========================================== */

export async function getComparison(
  previousFactsheetId: number,
  currentFactsheetId: number
): Promise<ComparisonResponse | null> {

  /* ==========================================
   GET FACTSHEET DETAILS
========================================== */

const {
  data: previousFactsheet,
  error: previousFactsheetError,
} = await supabase
  .from("factsheets")
  .select(`
    id,
    month,
    year,
    publication_date
  `)
  .eq("id", previousFactsheetId)
  .single();

if (previousFactsheetError) {

  console.error(previousFactsheetError);

  return null;

}

const {
  data: currentFactsheet,
  error: currentFactsheetError,
} = await supabase
  .from("factsheets")
  .select(`
    id,
    month,
    year,
    publication_date
  `)
  .eq("id", currentFactsheetId)
  .single();

if (currentFactsheetError) {

  console.error(currentFactsheetError);

  return null;

}

  /* ==========================================
     GET CURRENT HOLDINGS
  ========================================== */

  const {
    data: currentHoldings,
    error: currentError,
  } = await supabase
    .from("portfolio_holdings")
    .select(`
      security_name,
      sector,
      allocation_percentage
    `)
    .eq(
      "factsheet_id",
      currentFactsheet.id
    );

  if (currentError) {
    console.error(currentError);
    return null;
  }

  /* ==========================================
     GET PREVIOUS HOLDINGS
  ========================================== */

  const {
    data: previousHoldings,
    error: previousError,
  } = await supabase
    .from("portfolio_holdings")
    .select(`
      security_name,
      sector,
      allocation_percentage
    `)
    .eq(
      "factsheet_id",
      previousFactsheet.id
    );

  if (previousError) {
    console.error(previousError);
    return null;
  }

  /* ==========================================
     CREATE LOOKUP MAPS
  ========================================== */

  const previousMap = new Map(
    previousHoldings?.map((holding) => [
      holding.security_name,
      holding,
    ])
  );

  const currentMap = new Map(
    currentHoldings?.map((holding) => [
      holding.security_name,
      holding,
    ])
  );

  
  /* ==========================================
     GET UNIQUE HOLDINGS
  ========================================== */

  const holdingNames = new Set<string>();

  previousHoldings?.forEach((holding) =>
    holdingNames.add(
      holding.security_name
    )
  );

  currentHoldings?.forEach((holding) =>
    holdingNames.add(
      holding.security_name
    )
  );

  /* ==========================================
     BUILD COMPARISON
  ========================================== */

  const comparison: ComparisonHolding[] =
    [];

  let added = 0;

  let removed = 0;

  let increased = 0;

  let decreased = 0;

  holdingNames.forEach((name) => {

    const previous =
      previousMap.get(name);

    const current =
      currentMap.get(name);

       

    const previousAllocation =
      previous?.allocation_percentage ??
      0;

    const currentAllocation =
      current?.allocation_percentage ??
      0;

    const changePP =
      currentAllocation -
      previousAllocation;

    let status:
      | "added"
      | "removed"
      | "increased"
      | "decreased"
      | "unchanged";

    if (!previous && current) {

      status = "added";

      added++;

    } else if (
      previous &&
      !current
    ) {

      status = "removed";

      removed++;

    } else if (changePP > 0) {

      status = "increased";

      increased++;

    } else if (changePP < 0) {

      status = "decreased";

      decreased++;

    } else {

      status = "unchanged";

    }

    comparison.push({

      securityName: name,

      previousAllocation,

      currentAllocation,

      changePP,

      status,

    });

  });

  /* ==========================================
     SORT
  ========================================== */

  comparison.sort(
    (a, b) =>
      b.currentAllocation -
      a.currentAllocation
  );

  const topIncreased = [...comparison]
  .filter(
    (holding) =>
      holding.status === "increased"
  )
  .sort(
    (a, b) =>
      b.changePP - a.changePP
  )
  .slice(0, 5);

const topDecreased = [...comparison]
  .filter(
    (holding) =>
      holding.status === "decreased"
  )
  .sort(
    (a, b) =>
      a.changePP - b.changePP
  )
  .slice(0, 5);

const addedHoldings = comparison.filter(
  (holding) =>
    holding.status === "added"
);

const removedHoldings = comparison.filter(
  (holding) =>
    holding.status === "removed"
);
  /* ==========================================
   CHART DATA
========================================== */

const chartData: ComparisonChartData[] =
  comparison
    .slice(0, 50)
    .map((holding) => ({
      holding: holding.securityName,
      previousAllocation:
        holding.previousAllocation,
      currentAllocation:
        holding.currentAllocation,
      changePP: holding.changePP,
    }));

  /* ==========================================
   RESPONSE
========================================== */

return {

   previousFactsheetId:
    previousFactsheet.id,

  currentFactsheetId:
    currentFactsheet.id,

  previousMonth:
    `${previousFactsheet.month} ${previousFactsheet.year}`,

  currentMonth:
    `${currentFactsheet.month} ${currentFactsheet.year}`,

  summary: {

    totalHoldings:
      comparison.length,

    addedHoldings:
      added,

    removedHoldings:
      removed,

    increasedHoldings:
      increased,

    decreasedHoldings:
      decreased,

  },

  chartData,

  topIncreased,

  topDecreased,

  addedHoldings,

  removedHoldings,

  holdings:
    comparison,

};

}
