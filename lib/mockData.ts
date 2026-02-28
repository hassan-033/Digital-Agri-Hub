import { CropMarketPrice, SupplierListing } from '../types/market';

export const marketPriceRows: CropMarketPrice[] = [
  {
    crop_name: 'Maize',
    market_name: 'Kaduna',
    wholesale_price_per_ton_naira: 510000,
    price_change_percentage: 2.3,
    last_updated_iso_utc: '2026-02-27T09:30:00Z',
  },
  {
    crop_name: 'Soybeans',
    market_name: 'Kano',
    wholesale_price_per_ton_naira: 695000,
    price_change_percentage: -1.2,
    last_updated_iso_utc: '2026-02-27T09:30:00Z',
  },
  {
    crop_name: 'Cassava',
    market_name: 'Lagos',
    wholesale_price_per_ton_naira: 420000,
    price_change_percentage: 0.8,
    last_updated_iso_utc: '2026-02-27T09:30:00Z',
  },
];

export const supplierListings: SupplierListing[] = [
  {
    supplier_id: 'SUP-001',
    supplier_name: 'GreenField Commodities Ltd.',
    location: 'Kaduna',
    available_volume_tons: 240,
    asking_price_per_ton_naira: 505000,
    contact_email: 'sales@greenfieldcommodities.ng',
  },
  {
    supplier_id: 'SUP-002',
    supplier_name: 'Northern Grain Partners',
    location: 'Kano',
    available_volume_tons: 180,
    asking_price_per_ton_naira: 688000,
    contact_email: 'trade@northerngrain.ng',
  },
  {
    supplier_id: 'SUP-003',
    supplier_name: 'West Coast Agro Suppliers',
    location: 'Lagos',
    available_volume_tons: 320,
    asking_price_per_ton_naira: 415000,
    contact_email: 'contact@westcoastagro.ng',
  },
];
