(() => {
  const zones = window.PORTAL_ZONES || [];
  const popupEl = document.getElementById('zone-popup');
  const factorToggle = document.getElementById('factor-toggle');
  const factorMenu = document.getElementById('factor-menu');
  const rasterLegend = document.getElementById('raster-legend');
  const rasterTitle = document.getElementById('raster-legend-title');
  const rasterUnits = document.getElementById('raster-legend-units');
  const rasterScale = document.getElementById('raster-scale');
  const rasterMin = document.getElementById('raster-min');
  const rasterMax = document.getElementById('raster-max');

  factorToggle?.addEventListener('click', () => factorMenu.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!factorToggle?.contains(e.target) && !factorMenu?.contains(e.target)) factorMenu?.classList.remove('open');
  });

  const map = L.map('map', {
    center: [23.6345, -102.5528],
    zoom: 5,
    minZoom: 4,
    maxZoom: 10,
    zoomControl: true,
    attributionControl: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19,
  }).addTo(map);

  let activeLayer = 'viento';
  let selectedEnergy = null;
  let resourceOverlay = null;
  let mexicoOutline = null;
  let zoneLayer = L.layerGroup().addTo(map);

  const transmissionLayer = L.layerGroup().addTo(map);

  function getVoltageColor(voltage) {
    if (!voltage) return '#ff9f43';
    const main = parseInt(String(voltage).split(';')[0], 10);
    if (main >= 400000) return '#2346ff';
    if (main >= 230000) return '#ff7a00';
    return '#7a1fa2';
  }

  function getVoltageWeight(voltage) {
    if (!voltage) return 1.25;
    const main = parseInt(String(voltage).split(';')[0], 10);
    if (main >= 400000) return 3.3;
    if (main >= 230000) return 2.2;
    return 1.4;
  }

  fetch('/static/portal/data/lineas_transmision_mx.geojson')
    .then(r => r.json())
    .then(data => {
      L.geoJSON(data, {
        style: feature => ({
          color: getVoltageColor(feature?.properties?.voltage),
          weight: getVoltageWeight(feature?.properties?.voltage),
          opacity: 0.88,
          lineCap: 'round',
          lineJoin: 'round',
        })
      }).addTo(transmissionLayer);
    })
    .catch(err => console.warn('No se pudo cargar el GeoJSON de transmisión:', err));

  fetch('/static/portal/data/MEX_oficial.geojson')
    .then(r => r.json())
    .then(data => {
      mexicoOutline = L.geoJSON(data, {
        style: {
          color: '#ffffff',
          weight: 1.2,
          opacity: 0.7,
          fillOpacity: 0,
        }
      }).addTo(map);
    })
    .catch(err => console.warn('No se pudo cargar el contorno de México:', err));

  const layerMetaPromise = fetch('/static/portal/data/raster_layers.json').then(r => r.json());

  function updateLegend(layerKey, legend) {
    if (!legend || !rasterLegend) return;
    rasterTitle.textContent = legend.label;
    rasterUnits.textContent = legend.units;
    const stops = legend.stops.map(stop => `${stop.color}`).join(', ');
    rasterScale.style.background = `linear-gradient(90deg, ${stops})`;
    rasterMin.textContent = legend.min;
    rasterMax.textContent = legend.max;
    rasterLegend.dataset.layer = layerKey;
  }

  function drawLayer(layerKey) {
    layerMetaPromise.then(meta => {
      const layer = meta[layerKey];
      if (!layer) return;
      if (resourceOverlay) map.removeLayer(resourceOverlay);
      resourceOverlay = L.imageOverlay(layer.image, layer.bounds, {
        opacity: 0.82,
        interactive: false,
        crossOrigin: true,
        className: 'resource-raster',
      }).addTo(map);
      resourceOverlay.bringToBack();
      updateLegend(layerKey, layer.legend);
      transmissionLayer.bringToFront();
      zoneLayer.bringToFront();
      if (mexicoOutline) mexicoOutline.bringToFront();
    });
  }

  function buildZoneUrl(zoneId, energy, scale) {
    return `/zona/${zoneId}/${energy}/${scale}/`;
  }

  function renderPopup(zone) {
    popupEl.innerHTML = `
      <div class="popup-head"><strong>${zone.name}</strong><button type="button" id="popup-close">✕</button></div>
      <div class="popup-body">
        <div class="muted">Tipo de energía</div>
        <div class="energy-grid">
          <button class="energy-btn" data-energy="eolica">Eólica</button>
          <button class="energy-btn" data-energy="fotovoltaica">Fotovoltaica</button>
          <button class="energy-btn" data-energy="fototermica">Fototérmica</button>
        </div>
        <div class="muted">Escala temporal</div>
        <div class="timescale-grid">
          <button class="time-btn" data-scale="anual">Anual</button>
          <button class="time-btn" data-scale="estacional">Estacional</button>
          <button class="time-btn" data-scale="mensual">Mensual</button>
          <button class="time-btn" data-scale="diaria">Diaria</button>
        </div>
      </div>`;
    popupEl.classList.remove('hidden');
    popupEl.querySelector('#popup-close').addEventListener('click', () => popupEl.classList.add('hidden'));
    popupEl.querySelectorAll('.energy-btn').forEach(btn => btn.addEventListener('click', () => {
      selectedEnergy = btn.dataset.energy;
      popupEl.querySelectorAll('.energy-btn').forEach(x => x.classList.toggle('active', x === btn));
    }));
    popupEl.querySelectorAll('.time-btn').forEach(btn => btn.addEventListener('click', () => {
      if (!selectedEnergy) {
        alert('Primero selecciona un tipo de energía.');
        return;
      }
      window.location.href = buildZoneUrl(zone.id, selectedEnergy, btn.dataset.scale);
    }));
  }

  const iconHtml = `<div class="zone-marker"><span>⚡</span></div>`;
  const icon = L.divIcon({ html: iconHtml, iconSize: [18, 18], iconAnchor: [9, 9], className: 'zone-marker-wrap' });

  zones.forEach(zone => {
    const marker = L.marker([zone.lat, zone.lng], { icon }).addTo(zoneLayer);
    marker.on('click', () => renderPopup(zone));
  });

  map.on('click', () => popupEl.classList.add('hidden'));

  document.querySelectorAll('.toolbar-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.toolbar-btn').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    activeLayer = btn.dataset.layer;
    drawLayer(activeLayer);
  }));

  drawLayer(activeLayer);
})();
