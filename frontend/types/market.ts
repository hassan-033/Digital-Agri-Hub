export interface CropMarketPrice {
  cropName: string;
  marketName: string;
  wholesalePricePerTonNaira: number;
  priceChangePercentage: number;
  lastUpdatedIsoUtc: string;
}

export interface SupplierListing {
  supplierId: string;
  supplierName: string;
  location: string;
  availableVolumeTons: number;
  askingPricePerTonNaira: number;
  contactEmail: string;
}
