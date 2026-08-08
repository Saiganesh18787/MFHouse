export type HoldingStatus =
  | "added"
  | "removed"
  | "increased"
  | "decreased"
  | "unchanged";

export interface ComparisonHolding {
  securityName: string;

  previousAllocation: number;

  currentAllocation: number;

  changePP: number;

  status: HoldingStatus;
}
export interface ComparisonChartData {
  holding: string;

  previousAllocation: number;

  currentAllocation: number;

  changePP: number;
}

export interface ComparisonSummary {
  totalHoldings: number;

  addedHoldings: number;

  removedHoldings: number;

  increasedHoldings: number;

  decreasedHoldings: number;
}

export interface ComparisonResponse {
   previousFactsheetId: number;

  currentFactsheetId: number;

  previousMonth: string;

  currentMonth: string;

  summary: ComparisonSummary;

  chartData: ComparisonChartData[];

  topIncreased: ComparisonHolding[];

  topDecreased: ComparisonHolding[];

  addedHoldings: ComparisonHolding[];

  removedHoldings: ComparisonHolding[];

  holdings: ComparisonHolding[];
}