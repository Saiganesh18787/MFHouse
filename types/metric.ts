export interface Metric {

  id: number;

  factsheet_id: number;

  regular_growth_nav: number;

  direct_growth_nav: number;

  aum: number;

  regular_expense_ratio: number;

  direct_expense_ratio: number;

  beta?: number | null;

  alpha?: number | null;

  sharpe_ratio?: number | null;

  sortino_ratio?: number | null;

  standard_deviation?: number | null;

  tracking_error?: number | null;

  portfolio_turnover?: number | null;

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