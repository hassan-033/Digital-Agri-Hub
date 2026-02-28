import React from 'react';
import { CropMarketPrice } from '../../types/market';

interface Props {
  marketData: CropMarketPrice[];
}

export const MarketIntelligence = ({ marketData }: Props) => {
  if (!marketData || marketData.length === 0) {
    return <p className="text-gray-500">No market data available.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Market Intelligence</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3">Commodity</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Price / Ton (NGN)</th>
              <th className="px-6 py-3">Trend (24h)</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((data, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{data.crop_name}</td>
                <td className="px-6 py-4 text-gray-700">{data.market_name}</td>
                <td className="px-6 py-4 font-semibold">₦{data.wholesale_price_per_ton_naira.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    data.price_change_percentage > 0 ? 'bg-red-100 text-red-700' :
                    data.price_change_percentage < 0 ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {data.price_change_percentage > 0 ? '+' : ''}{data.price_change_percentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};