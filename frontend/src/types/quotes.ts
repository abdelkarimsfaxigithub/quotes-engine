// types/quote.ts

export type Quote = {
  id: number;
  opportunity_number: string;
  client_name: string;
  created_at: string;
  start_date: string;
  end_date: string;
  guarantee_type: "DO" | "TRC" | "DUO";
  destination: "housing" | "non_housing";
  work_type: "light_reno" | "heavy_reno" | "new_build";
  has_existing_building: boolean;
  is_vip_client: boolean;
  wants_rcmo: boolean;
  construction_cost: string;
  proposed_price: string;
};

export type QuoteResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Quote[];
};

export type GuaranteeType = "DO" | "TRC" | "DUO";

export type Destination = "housing" | "non_housing";

export type WorkType = "light_reno" | "heavy_reno" | "new_build";

export type Filters = {
  guarantee_type?: GuaranteeType | "";
  destination?: Destination | "";
  work_type?: WorkType | "";
  client_name?: string;
  cost_range?: "<100000" | "100000-500000" | "500000-1000000" | ">1000000" | "";
};

export type CreateQuote = {
    client_name: string;
    guarantee_type: "DO" | "TRC" | "DUO";
    destination: "housing" | "non_housing";
    work_type: "light_reno" | "heavy_reno" | "new_build";
    has_existing_building: boolean;
    is_vip_client: boolean;
    wants_rcmo: boolean;
    construction_cost: string;
  };
