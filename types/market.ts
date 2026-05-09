export interface CropMarketPrice {
  crop_name: string;
  market_name: string;
  wholesale_price_per_ton_naira: number;
  price_change_percentage: number;
  last_updated_iso_utc: string;
  editor_note: string;
}

export interface SupplierListing {
  supplier_id: string;
  supplier_name: string;
  location: string;
  available_volume_tons: number;
  asking_price_per_ton_naira: number;
  contact_email: string;
  commodity_name: string;
  market_reference: string;
  contact_phone_e164: string;
  contact_whatsapp_e164: string;
  stock_status: string;
  last_updated_iso_utc: string;
  editor_note: string;
}

export interface DashboardSnapshot {
  generated_at_iso_utc: string;
  market_prices: CropMarketPrice[];
  supplier_listings: SupplierListing[];
}
