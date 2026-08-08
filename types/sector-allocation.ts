export interface SectorAllocation {

  id: number;

  factsheet_id: number;

  sector_name: string;

  allocation_percentage: number;

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