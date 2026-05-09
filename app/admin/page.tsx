"use client";

import { FormEvent, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [marketStatus, setMarketStatus] = useState("");
  const [supplierStatus, setSupplierStatus] = useState("");

  const submitMarket = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      crop_name: String(formData.get("crop_name")),
      market_name: String(formData.get("market_name")),
      wholesale_price_per_ton_naira: Number(formData.get("wholesale_price_per_ton_naira")),
      editor_note: String(formData.get("editor_note") || ""),
    };

    const res = await fetch(`${API_BASE}/api/v1/admin/market-prices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify(payload),
    });

    const body = await res.json();
    setMarketStatus(res.ok ? `Saved at ${body.last_updated_iso_utc}` : body.detail || "Failed to save");
  };

  const submitSupplier = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      supplier_id: String(formData.get("supplier_id")),
      stock_status: String(formData.get("stock_status")),
      available_volume_tons: Number(formData.get("available_volume_tons")),
      editor_note: String(formData.get("editor_note") || ""),
    };

    const res = await fetch(`${API_BASE}/api/v1/admin/suppliers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify(payload),
    });

    const body = await res.json();
    setSupplierStatus(res.ok ? `Saved at ${body.last_updated_iso_utc}` : body.detail || "Failed to save");
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Admin Data Controls (Pilot)</h1>
      <p className="text-sm text-gray-600">Plain internal form for manual updates only. Automation is postponed to post-pilot.</p>

      <label className="block">
        <span className="text-sm font-medium">Shared Admin Token</span>
        <input className="w-full border rounded p-2" value={token} onChange={(e) => setToken(e.target.value)} type="password" />
      </label>

      <section className="border rounded p-4 space-y-3">
        <h2 className="font-semibold">Update Market Prices (Dawanau / Soba)</h2>
        <form onSubmit={submitMarket} className="space-y-3">
          <select name="crop_name" className="w-full border rounded p-2" defaultValue="Maize">
            <option>Maize</option>
            <option>Soybeans</option>
          </select>
          <select name="market_name" className="w-full border rounded p-2" defaultValue="Dawanau">
            <option>Dawanau</option>
            <option>Soba</option>
          </select>
          <input name="wholesale_price_per_ton_naira" type="number" min={0} placeholder="Price per ton (NGN)" className="w-full border rounded p-2" required />
          <textarea name="editor_note" placeholder="Editor note (source/context before trading window)" className="w-full border rounded p-2" rows={2} />
          <button className="bg-black text-white px-4 py-2 rounded" type="submit">Save Market Update</button>
        </form>
        {marketStatus && <p className="text-sm text-gray-700">{marketStatus}</p>}
      </section>

      <section className="border rounded p-4 space-y-3">
        <h2 className="font-semibold">Update Supplier Stock + Volume</h2>
        <form onSubmit={submitSupplier} className="space-y-3">
          <select name="supplier_id" className="w-full border rounded p-2" defaultValue="SUP-001">
            <option>SUP-001</option>
            <option>SUP-002</option>
          </select>
          <select name="stock_status" className="w-full border rounded p-2" defaultValue="in_stock">
            <option value="in_stock">in_stock</option>
            <option value="limited">limited</option>
            <option value="out_of_stock">out_of_stock</option>
          </select>
          <input name="available_volume_tons" type="number" min={0} placeholder="Estimated volume (tons)" className="w-full border rounded p-2" required />
          <textarea name="editor_note" placeholder="Editor note (why this changed)" className="w-full border rounded p-2" rows={2} />
          <button className="bg-black text-white px-4 py-2 rounded" type="submit">Save Supplier Update</button>
        </form>
        {supplierStatus && <p className="text-sm text-gray-700">{supplierStatus}</p>}
      </section>
    </main>
  );
}
