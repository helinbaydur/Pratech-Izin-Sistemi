from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import date
import uuid
import json
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Frontend-Backend bağlantı izni
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JSON_FILE = "veritabani.json"

# Veritabanı fonksiyonları
def verileri_oku():
    if not os.path.exists(JSON_FILE): return []
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        try: return json.load(f)
        except: return []

def verileri_yaz(veriler):
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(veriler, f, ensure_ascii=False, indent=4)

class IzinTalebi(BaseModel):
    ad_soyad: str
    izin_turu: str
    baslangic_tarihi: date
    bitis_tarihi: date
    aciklama: str

ADMIN_KEY = "pratech_admin_2026"

@app.post("/izin-talep")
async def izin_talep_et(talep: IzinTalebi):
    veriler = verileri_oku()
    yeni = talep.dict()
    yeni["id"] = str(uuid.uuid4())
    yeni["durum"] = "Beklemede"
    yeni["gun_sayisi"] = (talep.bitis_tarihi - talep.baslangic_tarihi).days
    yeni["baslangic_tarihi"] = str(yeni["baslangic_tarihi"])
    yeni["bitis_tarihi"] = str(yeni["bitis_tarihi"])
    veriler.append(yeni)
    verileri_yaz(veriler)
    return {"status": "success"}

@app.get("/izinler") # Burası 'izinler' olarak sabitlendi
async def izinleri_listele():
    return verileri_oku()

@app.put("/izin-durum/{id}")
async def durum_guncelle(id: str, yeni_durum: str, key: str):
    if key != ADMIN_KEY: raise HTTPException(status_code=403)
    veriler = verileri_oku()
    for k in veriler:
        if k["id"] == id:
            k["durum"] = yeni_durum
            verileri_yaz(veriler)
            return {"status": "updated"}
    raise HTTPException(status_code=404)