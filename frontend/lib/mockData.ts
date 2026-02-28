import { CropMarketPrice, SupplierListing } from '../types/market';

export const marketPriceRows: CropMarketPrice[] = [
  {
    cropName: 'Maize',
    marketName: 'Kaduna',
    wholesalePricePerTonNaira: 510000,
    priceChangePercentage: 2.3,
    lastUpdatedIsoUtc: '2026-02-27T09:30:00Z',
  },
  {
    cropName: 'Soybeans',
    marketName: 'Kano',
    wholesalePricePerTonNaira: 695000,
    priceChangePercentage: -1.2,
    lastUpdatedIsoUtc: '2026-02-27T09:30:00Z',
  },
  {
    cropName: 'Cassava',
    marketName: 'Lagos',
    wholesalePricePerTonNaira: 420000,
    priceChangePercentage: 0.8,
    lastUpdatedIsoUtc: '2026-02-27T09:30:00Z',
  },
];

export const supplierListings: SupplierListing[] = [
  {
    supplierId: 'SUP-001',
    supplierName: 'GreenField Commodities Ltd.',
    location: 'Kaduna',
    availableVolumeTons: 240,
    askingPricePerTonNaira: 505000,
    contactEmail: 'sales@greenfieldcommodities.ng',
  },
  {
    supplierId: 'SUP-002',
    supplierName: 'Northern Grain Partners',
    location: 'Kano',
    availableVolumeTons: 180,
    askingPricePerTonNaira: 688000,
    contactEmail: 'trade@northerngrain.ng',
  },
  {
    supplierId: 'SUP-003',
    supplierName: 'West Coast Agro Suppliers',
    location: 'Lagos',
    availableVolumeTons: 320,
    askingPricePerTonNaira: 415000,
    contactEmail: 'contact@westcoastagro.ng',
  },
];
