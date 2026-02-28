import { SupplierListing } from '../../types/market';

interface SupplierMatchingTableProps {
  suppliers: SupplierListing[];
}

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

export default function SupplierMatchingTable({
  suppliers,
}: SupplierMatchingTableProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-slate-900">Supplier Matching</h2>
        <p className="text-sm text-slate-600">
          Verified suppliers with bulk inventory and live asking prices.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Supplier</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Volume (Tons)</th>
              <th className="px-4 py-3 font-medium">Asking Price</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
            {suppliers.map((supplier) => (
              <tr key={supplier.supplier_id}>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {supplier.supplier_name}
                </td>
                <td className="px-4 py-3">{supplier.location}</td>
                <td className="px-4 py-3">{supplier.available_volume_tons}</td>
                <td className="px-4 py-3">
                  {nairaFormatter.format(supplier.asking_price_per_ton_naira)}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`mailto:${supplier.contact_email}`}
                    className="inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-800 hover:text-slate-900"
                  >
                    Contact
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
