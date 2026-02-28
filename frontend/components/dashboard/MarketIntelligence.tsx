import { CropMarketPrice } from '../../types/market';

interface MarketIntelligenceProps {
  marketPrices: CropMarketPrice[];
}

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

function formatPriceTrend(priceChangePercentage: number): string {
  const trendPrefix = priceChangePercentage > 0 ? '+' : '';

  return `${trendPrefix}${priceChangePercentage.toFixed(1)}%`;
}

export default function MarketIntelligence({
  marketPrices,
}: MarketIntelligenceProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-slate-900">Market Intelligence</h2>
        <p className="text-sm text-slate-600">
          Current wholesale prices across priority agricultural markets.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Crop</th>
              <th className="px-4 py-3 font-medium">Market</th>
              <th className="px-4 py-3 font-medium">Price / Ton</th>
              <th className="px-4 py-3 font-medium">24h Trend</th>
              <th className="px-4 py-3 font-medium">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
            {marketPrices.map((priceRow) => {
              const isTrendPositive = priceRow.priceChangePercentage >= 0;

              return (
                <tr key={`${priceRow.cropName}-${priceRow.marketName}`}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {priceRow.cropName}
                  </td>
                  <td className="px-4 py-3">{priceRow.marketName}</td>
                  <td className="px-4 py-3">
                    {nairaFormatter.format(priceRow.wholesalePricePerTonNaira)}
                  </td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      isTrendPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {formatPriceTrend(priceRow.priceChangePercentage)}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(priceRow.lastUpdatedIsoUtc).toLocaleString('en-NG', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
