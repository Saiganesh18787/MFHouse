export interface Factsheet {

  id: number;

  fund_id: number;

  month: string;

  year: number;

  publication_date: string;

  pdf_url?: string | null;

  funds?: {

    id: number;

    name: string;

  };

}