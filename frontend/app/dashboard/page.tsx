import MarketIntelligence from '../../components/dashboard/MarketIntelligence';
import SupplierMatchingTable from '../../components/dashboard/SupplierMatchingTable';
import { marketPriceRows, supplierListings } from '../../lib/mockData';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Digital Agri-Hub
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Executive Commodity Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Monitor regional market prices and identify verified suppliers in one
            secure view.
          </p>
        </header>

        <MarketIntelligence marketPrices={marketPriceRows} />
        <SupplierMatchingTable suppliers={supplierListings} />
      </div>
    </main>
  );
}
