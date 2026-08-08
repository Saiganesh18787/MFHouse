export interface Fund {
  id: number;
  scheme_code: string;
  amfi_code?: string | null;
  name: string;
  amc: string;
  category: string;
  sub_category: string;
  plan?: string | null;
  option?: string | null;
  status?: string | null;
}