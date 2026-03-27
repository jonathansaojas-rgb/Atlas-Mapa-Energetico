import json
from django.http import Http404
from django.shortcuts import render
from .data import ZONES, FACTOR_DATA, COMPLEMENTARIEDAD

VALID_ENERGY = {"eolica": "Eólica", "fotovoltaica": "Fotovoltaica", "fototermica": "Fototérmica"}
VALID_SCALE = {"anual": "Anual", "estacional": "Estacional", "mensual": "Mensual", "diaria": "Diaria"}


def index(request):
    return render(request, 'portal/index.html', {
        'zones_json': json.dumps(ZONES, ensure_ascii=False),
    })


def complementariedad(request):
    return render(request, 'portal/complementariedad.html', {
        'monthly_data_json': json.dumps(COMPLEMENTARIEDAD, ensure_ascii=False),
    })


def plant_factor(request, tipo='eolico'):
    if tipo not in FACTOR_DATA:
        raise Http404('Tipo de factor de planta no válido')
    return render(request, 'portal/factor_planta.html', {
        'tipo': tipo,
        'factor_data_json': json.dumps(FACTOR_DATA, ensure_ascii=False),
        'active_title': FACTOR_DATA[tipo]['title'],
    })


def zone_detail(request, zone_id, energy_type, time_scale):
    zone = next((z for z in ZONES if z['id'] == zone_id), None)
    if not zone or energy_type not in VALID_ENERGY or time_scale not in VALID_SCALE:
        raise Http404('Parámetros de zona no válidos')
    return render(request, 'portal/zone_detail.html', {
        'zone': zone,
        'zone_json': json.dumps(zone, ensure_ascii=False),
        'energy_type': energy_type,
        'time_scale': time_scale,
        'energy_label': VALID_ENERGY[energy_type],
        'scale_label': VALID_SCALE[time_scale],
    })
