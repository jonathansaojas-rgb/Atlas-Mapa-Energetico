(() => {
  const key = window.ACTIVE_FACTOR;
  const dataset = (window.FACTOR_DATA || {})[key];
  if (!dataset) return;
  new Chart(document.getElementById('factor-chart'), {
    type: 'bar',
    data: {
      labels: dataset.data.map(x => x.region),
      datasets: [{ label: 'Factor de planta (%)', data: dataset.data.map(x => x.factor), backgroundColor: dataset.color }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: { legend: { labels: { color: '#e8eef6' } } },
      scales: { x: { ticks: { color: '#99a8ba' } }, y: { ticks: { color: '#99a8ba' } } }
    }
  });
})();
