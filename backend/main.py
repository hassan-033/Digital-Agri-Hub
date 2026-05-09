from datetime import datetime, timezone
from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


class CropMarketPrice(BaseModel):
    crop_name: str = Field(..., description="Commodity name")
    market_name: str = Field(..., description="Regional market name")
    wholesale_price_per_ton_naira: int = Field(..., ge=0)
    price_change_percentage: float
    last_updated_iso_utc: str


class SupplierListing(BaseModel):
    supplier_id: str
    supplier_name: str
    location: str
    commodity_type: str
    available_volume_tons: int = Field(..., ge=0)
    stock_status: str
    asking_price_per_ton_naira: int = Field(..., ge=0)


class DashboardSnapshot(BaseModel):
    generated_at_iso_utc: str
    market_prices: List[CropMarketPrice]
    supplier_listings: List[SupplierListing]


MOCK_MARKET_PRICES: List[CropMarketPrice] = [
    CropMarketPrice(
        crop_name="Maize",
        market_name="Kaduna",
        wholesale_price_per_ton_naira=510000,
        price_change_percentage=2.3,
        last_updated_iso_utc="2026-02-27T09:30:00Z",
    ),
    CropMarketPrice(
        crop_name="Soybeans",
        market_name="Kano",
        wholesale_price_per_ton_naira=695000,
        price_change_percentage=-1.2,
        last_updated_iso_utc="2026-02-27T09:30:00Z",
    ),
    CropMarketPrice(
        crop_name="Cassava",
        market_name="Lagos",
        wholesale_price_per_ton_naira=420000,
        price_change_percentage=0.8,
        last_updated_iso_utc="2026-02-27T09:30:00Z",
    ),
]

MOCK_SUPPLIER_LISTINGS: List[SupplierListing] = [
    SupplierListing(
        supplier_id="SUP-001",
        supplier_name="GreenField Commodities Ltd.",
        location="Kaduna",
        commodity_type="Maize",
        available_volume_tons=240,
        stock_status="available",
        asking_price_per_ton_naira=505000,
    ),
    SupplierListing(
        supplier_id="SUP-002",
        supplier_name="Northern Grain Partners",
        location="Kano",
        commodity_type="Soybeans",
        available_volume_tons=0,
        stock_status="depleted",
        asking_price_per_ton_naira=688000,
    ),
]

app = FastAPI(
    title="Digital Agri-Hub API",
    description="MVP API serving gated commodity intelligence.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def get_health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/v1/market-prices", response_model=List[CropMarketPrice])
def get_market_prices() -> List[CropMarketPrice]:
    if not MOCK_MARKET_PRICES:
        raise HTTPException(status_code=404, detail="Market prices are unavailable")

    return MOCK_MARKET_PRICES


@app.get("/api/v1/suppliers", response_model=List[SupplierListing])
def get_supplier_listings() -> List[SupplierListing]:
    if not MOCK_SUPPLIER_LISTINGS:
        raise HTTPException(status_code=404, detail="Supplier listings are unavailable")

    return MOCK_SUPPLIER_LISTINGS


@app.get("/api/v1/dashboard", response_model=DashboardSnapshot)
def get_dashboard_snapshot() -> DashboardSnapshot:
    return DashboardSnapshot(
        generated_at_iso_utc=datetime.now(timezone.utc).isoformat(),
        market_prices=MOCK_MARKET_PRICES,
        supplier_listings=MOCK_SUPPLIER_LISTINGS,
    )
