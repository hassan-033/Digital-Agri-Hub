import React, { useEffect, useState } from 'react';
import  { MarketIntelligence }  from '../../components/dashboard/MarketIntelligence';
import { DashboardSnapshot } from '../../types/market';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://agri-hub-api.onrender.com/api/v1/dashboard');
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        const snapshot: DashboardSnapshot = await response.json();
        setData(snapshot);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agri-Hub Executive Portal</h1>
          <p className="text-gray-600 mt-2">Enterprise Supply Chain Intelligence</p>
        </header>
        
        <main>
          {isLoading && <p className="text-gray-500">Loading intelligence data...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          
          {/* You will need to slightly update your MarketIntelligence component 
            to map over 'crop_name' instead of 'crop', and 'wholesale_price_per_ton_naira' 
            instead of 'pricePerTon', matching the new backend data structure.
          */}
          {data && (
            <>
              <p className="text-xs text-gray-400 mb-4">
                Last updated: {new Date(data.generated_at_iso_utc).toLocaleString()}
              </p>
              <MarketIntelligence marketPrices={data.market_prices} />
              {/* <SupplierMatchingTable supplierData={data.supplier_listings} /> */}
            </>
          )}
        </main>
      </div>
    </div>
  );
}