"""
Script de sincronización automática entre MyFitnessPal y JGM GOALS (Supabase).
Permite extraer los totales nutricionales (Calorías, Proteína, Carbohidratos, Grasas, Agua)
y enviarlos directamente a la tabla `nutricion_diaria_mfp` en Supabase.
"""

import sys
import datetime
import os
import json

try:
    import myfitnesspal
except ImportError:
    print("⚠️ La librería 'myfitnesspal' no está instalada.")
    print("👉 Instálala ejecutando: pip install myfitnesspal browser_cookie3 requests")

try:
    import requests
except ImportError:
    pass

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "https://ktxbonxgrnpzearsgvtc.supabase.co")
SUPABASE_KEY = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eGJvbnhncm5wemVhcnNndnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyOTI4MDQsImV4cCI6MjEwODg2ODgwNH0.R_lmgkFXALpkmmqbz4rz5XvzqE6VdakUharpVsv-reY")

def sincronizar_hoy():
    print("🔄 Conectando con MyFitnessPal...")
    try:
        # Usa cookies del navegador si está logueado en Chrome
        client = myfitnesspal.Client()
        hoy = datetime.date.today()
        day = client.get_date(hoy)
        
        totales = day.totals
        calorias = totales.get('calories', 0)
        carbs = totales.get('carbohydrates', 0)
        proteina = totales.get('protein', 0)
        grasa = totales.get('fat', 0)
        agua = day.water if hasattr(day, 'water') else 0

        print(f"✅ Datos obtenidos de MyFitnessPal para {hoy}:")
        print(f"   🔥 Calorías: {calorias} kcal")
        print(f"   🥩 Proteína: {proteina} g")
        print(f"   🍞 Carbs:    {carbs} g")
        print(f"   🥑 Grasa:    {grasa} g")
        print(f"   💧 Agua:     {agua} ml")

        # Enviar a Supabase
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates"
        }

        payload = {
            "fecha": str(hoy),
            "calorias": calorias,
            "proteina": proteina,
            "carbs": carbs,
            "grasa": grasa,
            "agua": round(agua / 1000, 2) if agua > 0 else 0
        }

        url = f"{SUPABASE_URL}/rest/v1/nutricion_diaria_mfp"
        resp = requests.post(url, json=payload, headers=headers)
        if resp.status_code in [200, 201]:
            print("🚀 ¡Sincronizado exitosamente con JGM GOALS en Supabase!")
        else:
            print(f"ℹ️ Nota de Supabase ({resp.status_code}): {resp.text}")

    except Exception as e:
        print(f"❌ Error al sincronizar: {e}")
        print("💡 Puedes registrar tus macros en 5 segundos directamente desde la app en Targets ➔ Nutrición MFP.")

if __name__ == "__main__":
    sincronizar_hoy()
