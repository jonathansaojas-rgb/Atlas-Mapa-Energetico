(() => {
  const data = window.COMPLEMENTARIEDAD_DATA || [];
  new Chart(document.getElementById('complement-chart'), {
    type: 'line',
    data: {
      labels: data.map(x => x.mes),
      datasets: [
        { label: 'Viento', data: data.map(x => x.viento), borderColor: '#40a9ff', backgroundColor: 'rgba(64,169,255,.15)', fill: true, tension: .3 },
        { label: 'Solar', data: data.map(x => x.solar), borderColor: '#ffd24a', backgroundColor: 'rgba(255,210,74,.12)', fill: true, tension: .3 },
        { label: 'Complementario', data: data.map(x => x.complementario), borderColor: '#31c48d', backgroundColor: 'rgba(49,196,141,.12)', fill: true, tension: .3 },
      ]
    },
    options: { responsive: true, plugins: { legend: { labels: { color: '#e8eef6' } } }, scales: { x: { ticks: { color: '#99a8ba' } }, y: { ticks: { color: '#99a8ba' } } } }
  });
})();
