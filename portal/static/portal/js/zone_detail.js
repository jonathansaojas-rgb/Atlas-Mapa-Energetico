(() => {
  const ctx = document.getElementById('zone-chart');
  const detail = window.ZONE_DETAIL;
  if (!ctx || !detail) return;

  function seededRandom(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646; }
  function getSeed(zoneId) { return Array.from(zoneId).reduce((a,c)=>((a<<5)-a)+c.charCodeAt(0)|0,0) >>> 0; }
  function colorFor(type) { return type === 'eolica' ? '#40a9ff' : type === 'fotovoltaica' ? '#ffd24a' : '#ff7b54'; }
  const rand = seededRandom(getSeed(detail.zone.id) + detail.energyType.length * 17);
  let labels = [], values = [], chartType = 'line';

  if (detail.timeScale === 'anual') {
    const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const years = [2021,2022,2023,2024,2025];
    years.forEach(y => months.forEach((m,i) => { labels.push(`${m} ${y}`); values.push((4.8 + rand()*2.2 + Math.sin(i/2)*.7).toFixed(2)); }));
  } else if (detail.timeScale === 'mensual') {
    labels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    values = labels.map((_,i) => (4 + rand()*3 + Math.sin(i/2)*1.1).toFixed(2));
  } else if (detail.timeScale === 'estacional') {
    labels = ['Primavera','Verano','Otoño','Invierno'];
    values = labels.map(() => (4.5 + rand()*2.5).toFixed(2));
    chartType = 'bar';
  } else {
    labels = Array.from({length:24}, (_,i)=>`${i}:00`);
    values = labels.map((_,i) => {
      const base = detail.energyType === 'eolica' ? 5 + Math.sin(i * 0.3) * 1.5 : detail.energyType === 'fotovoltaica' ? (i>=6 && i<=18 ? Math.sin((i-6)/12*Math.PI)*8 : 0) : (i>=7 && i<=17 ? Math.sin((i-7)/10*Math.PI)*6 : 0);
      return Math.max(0, base + (rand()-.5)*1.2).toFixed(2);
    });
  }

  new Chart(ctx, {
    type: chartType,
    data: { labels, datasets: [{ label: `${detail.zone.name} — ${detail.energyType}`, data: values, borderColor: colorFor(detail.energyType), backgroundColor: colorFor(detail.energyType), fill: false, tension: .3 }] },
    options: { responsive: true, plugins: { legend: { labels: { color: '#e8eef6' } } }, scales: { x: { ticks: { color: '#99a8ba' } }, y: { ticks: { color: '#99a8ba' } } } }
  });
})();
