from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('complementariedad/', views.complementariedad, name='complementarity'),
    path('factor-planta/', views.plant_factor, {'tipo': 'eolico'}, name='plant_factor_default'),
    path('factor-planta/<slug:tipo>/', views.plant_factor, name='plant_factor'),
    path('zona/<slug:zone_id>/<slug:energy_type>/<slug:time_scale>/', views.zone_detail, name='zone_detail'),
]
