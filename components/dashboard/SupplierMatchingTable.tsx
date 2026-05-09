import { SupplierListing } from '../../types/market';

interface SupplierMatchingTableProps {
  suppliers: SupplierListing[];
}

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

function StockStatusPill({ status }: { status: SupplierListing['stock_status'] }) {
  const isAvailable = status === 'available';

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {status}
    </span>
  );
}

export default function SupplierMatchingTable({ suppliers }: SupplierMatchingTableProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Supplier</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Commodity</th>
              <th className="px-4 py-3 font-medium">Estimated Volume (Tons)</th>
              <th className="px-4 py-3 font-medium">Asking Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
            {suppliers.map((supplier) => (
              <tr key={supplier.supplier_id}>
                <td className="px-4 py-3 font-medium text-slate-900">{supplier.supplier_name}</td>
                <td className="px-4 py-3">{supplier.location}</td>
                <td className="px-4 py-3">{supplier.commodity_type}</td>
                <td className="px-4 py-3">{supplier.available_volume_tons}</td>
                <td className="px-4 py-3">
                  {nairaFormatter.format(supplier.asking_price_per_ton_naira)}
                </td>
                <td className="px-4 py-3">
                  <StockStatusPill status={supplier.stock_status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
