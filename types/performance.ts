export interface Performance {

  id: number;

  factsheet_id: number;

  one_month?: number | null;

  three_month?: number | null;

  six_month?: number | null;

  one_year?: number | null;

  three_year?: number | null;

  five_year?: number | null;

  ten_year?: number | null;

  since_inception?: number | null;

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