export interface ExitLoad {

  id: number;

  factsheet_id: number;

  rule_order: number;

  redemption_within_days: number | null;

  exit_load_percentage: number;

  description: string;

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