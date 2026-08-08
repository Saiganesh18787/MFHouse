export interface MarketCap {

  id: number;

  factsheet_id: number;

  large_cap: number;

  mid_cap: number;

  small_cap: number;

  created_at?: string;

  factsheets?: {

    id: number;

    month: string;

    year: number;

    funds?: {

      id: number;

      name: string;

    } | null;

  };

}