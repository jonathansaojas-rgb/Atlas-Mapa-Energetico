ZONES = [
    {"id": "bcs", "name": "BCS", "lat": 25.04, "lng": -111.70, "radius": 90000, "intensity": 0.75},
    {"id": "bcs-sf", "name": "BCS SF", "lat": 30.98, "lng": -114.85, "radius": 80000, "intensity": 0.80},
    {"id": "ceballos", "name": "Ceballos", "lat": 26.59, "lng": -104.01, "radius": 85000, "intensity": 0.70},
    {"id": "ciudad-acuna", "name": "Ciudad Acuña", "lat": 29.27, "lng": -100.97, "radius": 90000, "intensity": 0.85},
    {"id": "dos-arbolitos", "name": "Dos Arbolitos", "lat": 16.51, "lng": -94.94, "radius": 75000, "intensity": 0.60},
    {"id": "mazapil", "name": "Mazapil", "lat": 24.61, "lng": -101.52, "radius": 80000, "intensity": 0.65},
    {"id": "piedras-negras", "name": "Piedras Negras", "lat": 28.72, "lng": -100.62, "radius": 85000, "intensity": 0.90},
    {"id": "tamaulipas-1", "name": "Tamaulipas 1", "lat": 25.91, "lng": -98.28, "radius": 80000, "intensity": 0.70},
    {"id": "tamaulipas-2", "name": "Tamaulipas 2", "lat": 25.81, "lng": -97.37, "radius": 80000, "intensity": 0.75},
    {"id": "tizimin", "name": "Tizimín", "lat": 21.24, "lng": -87.96, "radius": 75000, "intensity": 0.55},
]

FACTOR_DATA = {
    "eolico": {
        "title": "Factor de Planta — Eólico",
        "color": "#40a9ff",
        "data": [
            {"region": "Oaxaca", "factor": 42},
            {"region": "Tamaulipas", "factor": 38},
            {"region": "Baja California", "factor": 35},
            {"region": "Nuevo León", "factor": 32},
            {"region": "Sonora", "factor": 28},
            {"region": "Zacatecas", "factor": 30},
            {"region": "Puebla", "factor": 25},
        ],
    },
    "fotovoltaico": {
        "title": "Factor de Planta — Fotovoltaico",
        "color": "#ffd24a",
        "data": [
            {"region": "Sonora", "factor": 28},
            {"region": "Chihuahua", "factor": 26},
            {"region": "Baja California Sur", "factor": 27},
            {"region": "Durango", "factor": 24},
            {"region": "San Luis Potosí", "factor": 22},
            {"region": "Aguascalientes", "factor": 23},
            {"region": "Coahuila", "factor": 25},
        ],
    },
    "fototermico": {
        "title": "Factor de Planta — Fototérmico",
        "color": "#ff7b54",
        "data": [
            {"region": "Sonora", "factor": 35},
            {"region": "Baja California", "factor": 32},
            {"region": "Chihuahua", "factor": 30},
            {"region": "Coahuila", "factor": 28},
            {"region": "Durango", "factor": 26},
            {"region": "Zacatecas", "factor": 24},
            {"region": "San Luis Potosí", "factor": 22},
        ],
    },
}

COMPLEMENTARIEDAD = [
    {"mes": "Ene", "viento": 7.2, "solar": 4.8, "complementario": 6.0},
    {"mes": "Feb", "viento": 6.8, "solar": 5.5, "complementario": 6.1},
    {"mes": "Mar", "viento": 5.9, "solar": 6.8, "complementario": 6.3},
    {"mes": "Abr", "viento": 4.5, "solar": 7.5, "complementario": 6.0},
    {"mes": "May", "viento": 3.8, "solar": 8.2, "complementario": 6.0},
    {"mes": "Jun", "viento": 3.2, "solar": 8.5, "complementario": 5.8},
    {"mes": "Jul", "viento": 3.5, "solar": 8.0, "complementario": 5.7},
    {"mes": "Ago", "viento": 3.8, "solar": 7.6, "complementario": 5.7},
    {"mes": "Sep", "viento": 4.2, "solar": 6.5, "complementario": 5.3},
    {"mes": "Oct", "viento": 5.8, "solar": 5.8, "complementario": 5.8},
    {"mes": "Nov", "viento": 6.5, "solar": 5.0, "complementario": 5.7},
    {"mes": "Dic", "viento": 7.0, "solar": 4.5, "complementario": 5.7},
]
