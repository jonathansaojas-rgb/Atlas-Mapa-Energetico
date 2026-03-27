# Energy Portal en Django

Versión migrada a Django, lista para correr en macOS.

## Requisitos
- Python 3.11+ recomendado
- macOS con Terminal

## Instalación rápida
```bash
cd energy_portal_django_mac
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Luego abre:
- http://127.0.0.1:8000/

## Qué se corrigió respecto al intento anterior
- Todas las plantillas que usan archivos estáticos cargan `{% load static %}`.
- Las rutas de `factor-planta` aceptan un parámetro `tipo` válido y consistente: `eolico`, `fotovoltaico`, `fototermico`.
- Los enlaces del template usan `{% url 'plant_factor' 'eolico' %}` con el slug correcto.
- La app incluye `portal` en `INSTALLED_APPS`, por lo que el tag `static` queda disponible y las URL nombradas existen.

## Estructura
- `portal/` contiene vistas, rutas, templates y static.
- `portal/static/portal/data/lineas_transmision_mx.geojson` conserva el archivo GeoJSON original.

## Nota
Los mapas y gráficos se renderizan del lado del cliente con Leaflet y Chart.js vía CDN para que el proyecto sea más simple de correr localmente.
