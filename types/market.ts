export interface CropMarketPrice {
  crop_name: string;
  market_name: string;
  wholesale_price_per_ton_naira: number;
  price_change_percentage: number;
  last_updated_iso_utc: string;
}

export interface SupplierListing {
  supplier_id: string;
  supplier_name: string;
  location: string;
  available_volume_tons: number;
  commodity_name: string;
  market_reference: string;
  asking_price_per_ton_naira: number;
  contact_phone_e164: string;
  contact_whatsapp_e164: string;
  contact_email?: string;
}

export interface DashboardSnapshot {
  generated_at_iso_utc: string;
  market_prices: CropMarketPrice[];
  supplier_listings: SupplierListing[];
}