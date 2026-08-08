export interface FundMetadata {

  id: number;

  fund_id: number;

  investment_objective: string;

  benchmark_name: string;

  risk_level: string;

  funds?: {

    id: number;

    name: string;

    amc?: string;

    category?: string;

    sub_category?: string;

  } | null;

}