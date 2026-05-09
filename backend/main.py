from datetime import datetime, timezone
import os
from typing import List

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator


SUPPORTED_COMMODITIES = {"Maize", "Soybeans"}
SUPPORTED_MARKETS = {"Dawanau", "Soba"}


class CropMarketPrice(BaseModel):
    crop_name: str = Field(..., description="Commodity name")
    market_name: str = Field(..., description="Regional market name")
    wholesale_price_per_ton_naira: int = Field(..., ge=0)
    price_change_percentage: float
    last_updated_iso_utc: str
    editor_note: str = Field(default="")

    @field_validator("crop_name")
    @classmethod
    def validate_crop_name(cls, value: str) -> str:
        normalized_value = value.strip()
        if normalized_value not in SUPPORTED_COMMODITIES:
            raise ValueError(f"Unsupported commodity: {normalized_value}")
        return normalized_value

    @field_validator("market_name")
    @classmethod
    def validate_market_name(cls, value: str) -> str:
        normalized_value = value.strip()
        if normalized_value not in SUPPORTED_MARKETS:
            raise ValueError(f"Unsupported market: {normalized_value}")
        return normalized_value


class SupplierListing(BaseModel):
    supplier_id: str
    supplier_name: str
    location: str
    available_volume_tons: int = Field(..., ge=0)
    asking_price_per_ton_naira: int = Field(..., ge=0)
    contact_email: str
    commodity_name: str = Field(default="Maize")
    market_reference: str = Field(default="Dawanau")
    contact_phone_e164: str = Field(default="")
    contact_whatsapp_e164: str = Field(default="")
    stock_status: str = Field(default="in_stock")
    last_updated_iso_utc: str = Field(default="")
    editor_note: str = Field(default="")


class DashboardSnapshot(BaseModel):
    generated_at_iso_utc: str
    market_prices: List[CropMarketPrice]
    supplier_listings: List[SupplierListing]


class UpdateMarketPricePayload(BaseModel):
    crop_name: str
    market_name: str
    wholesale_price_per_ton_naira: int = Field(..., ge=0)
    editor_note: str = Field(default="")


class UpdateSupplierPayload(BaseModel):
    supplier_id: str
    stock_status: str
    available_volume_tons: int = Field(..., ge=0)
    editor_note: str = Field(default="")


MOCK_MARKET_PRICES: List[CropMarketPrice] = [
    CropMarketPrice(crop_name="Maize", market_name="Dawanau", wholesale_price_per_ton_naira=510000, price_change_percentage=2.3, last_updated_iso_utc="2026-02-27T09:30:00Z", editor_note="Baseline verified from morning call."),
    CropMarketPrice(crop_name="Maize", market_name="Soba", wholesale_price_per_ton_naira=498000, price_change_percentage=1.1, last_updated_iso_utc="2026-02-27T09:30:00Z"),
    CropMarketPrice(crop_name="Soybeans", market_name="Dawanau", wholesale_price_per_ton_naira=695000, price_change_percentage=-1.2, last_updated_iso_utc="2026-02-27T09:30:00Z"),
    CropMarketPrice(crop_name="Soybeans", market_name="Soba", wholesale_price_per_ton_naira=684000, price_change_percentage=-0.6, last_updated_iso_utc="2026-02-27T09:30:00Z"),
]

MOCK_SUPPLIER_LISTINGS: List[SupplierListing] = [
    SupplierListing(
        supplier_id="SUP-001",
        supplier_name="GreenField Commodities Ltd.",
        location="Kaduna",
        available_volume_tons=240,
        asking_price_per_ton_naira=505000,
        contact_email="sales@greenfieldcommodities.ng",
        commodity_name="Maize",
        market_reference="Dawanau",
        contact_phone_e164="+2348010000001",
        contact_whatsapp_e164="+2348010000001",
        stock_status="in_stock",
        last_updated_iso_utc="2026-02-27T09:30:00Z",
        editor_note="Confirmed by procurement desk.",
    ),
    SupplierListing(
        supplier_id="SUP-002",
        supplier_name="Northern Grain Partners",
        location="Kano",
        available_volume_tons=180,
        asking_price_per_ton_naira=688000,
        contact_email="trade@northerngrain.ng",
        commodity_name="Soybeans",
        market_reference="Soba",
        contact_phone_e164="+2348010000002",
        contact_whatsapp_e164="+2348010000002",
        stock_status="limited",
        last_updated_iso_utc="2026-02-27T09:30:00Z",
        editor_note="Volume fluctuates intra-day.",
    ),
]

app = FastAPI(title="Digital Agri-Hub API", description="MVP API serving gated commodity intelligence.", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


def _require_admin_token(x_admin_token: str | None) -> None:
    expected = os.getenv("ADMIN_TOKEN")
    if not expected:
        raise HTTPException(status_code=503, detail="ADMIN_TOKEN is not configured")
    if x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized admin token")


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


@app.post("/api/v1/admin/market-prices", response_model=CropMarketPrice)
def update_market_price(payload: UpdateMarketPricePayload, x_admin_token: str | None = Header(default=None)) -> CropMarketPrice:
    _require_admin_token(x_admin_token)
    now_iso = datetime.now(timezone.utc).isoformat()

    # Reuse model validators to enforce supported commodity/market combinations.
    validated = CropMarketPrice(
        crop_name=payload.crop_name,
        market_name=payload.market_name,
        wholesale_price_per_ton_naira=payload.wholesale_price_per_ton_naira,
        price_change_percentage=0,
        last_updated_iso_utc=now_iso,
        editor_note=payload.editor_note,
    )

    for idx, price in enumerate(MOCK_MARKET_PRICES):
        if price.crop_name == validated.crop_name and price.market_name == validated.market_name:
            previous = price.wholesale_price_per_ton_naira
            pct_change = 0.0 if previous == 0 else ((validated.wholesale_price_per_ton_naira - previous) / previous) * 100
            updated = validated.model_copy(update={"price_change_percentage": round(pct_change, 2), "last_updated_iso_utc": now_iso})
            MOCK_MARKET_PRICES[idx] = updated
            return updated

    raise HTTPException(status_code=404, detail="Market/crop pair not found")


@app.post("/api/v1/admin/suppliers", response_model=SupplierListing)
def update_supplier_listing(payload: UpdateSupplierPayload, x_admin_token: str | None = Header(default=None)) -> SupplierListing:
    _require_admin_token(x_admin_token)
    now_iso = datetime.now(timezone.utc).isoformat()

    for idx, supplier in enumerate(MOCK_SUPPLIER_LISTINGS):
        if supplier.supplier_id == payload.supplier_id:
            updated = supplier.model_copy(
                update={
                    "available_volume_tons": payload.available_volume_tons,
                    "stock_status": payload.stock_status,
                    "last_updated_iso_utc": now_iso,
                    "editor_note": payload.editor_note,
                }
            )
            MOCK_SUPPLIER_LISTINGS[idx] = updated
            return updated

    raise HTTPException(status_code=404, detail="Supplier not found")


@app.get("/api/v1/dashboard", response_model=DashboardSnapshot)
def get_dashboard_snapshot() -> DashboardSnapshot:
    return DashboardSnapshot(
        generated_at_iso_utc=datetime.now(timezone.utc).isoformat(),
        market_prices=MOCK_MARKET_PRICES,
        supplier_listings=MOCK_SUPPLIER_LISTINGS,
    )
