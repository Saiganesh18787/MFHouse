export interface PortfolioSummary {

  id: number;

  factsheet_id: number;

  equity: number;

  debt: number;

  cash_and_cash_equivalents: number;

  others: number;

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

export interface PortfolioHolding {

  id: number;

  factsheet_id: number;

  security_name: string;

  sector: string | null;

  instrument_type: string;

  allocation_percentage: number;

  quantity: number | null;

  market_value: number | null;

  rank: number | null;

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