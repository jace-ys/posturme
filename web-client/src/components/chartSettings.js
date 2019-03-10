const chartSettings = {
  chartData: {
    datasets: [
      {
        label: 'Percentage',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        scaleGridLineColor: 'rgba(220,220,220,1)'
      }
    ]
  },

  chartOptions: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
          min: 0,
          stepSize: 20,
          fontColor: '#fff'
        },
        gridLines: {
          zeroLineColor: '#rgba(220,220,220,0.2)',
          display: true,
          color: 'rgba(220,220,220,0.2)'
        },
      }],
      xAxes: [{
        ticks: {
          fontColor: '#fff'
        },
        gridLines: {
          display: true,
          color: 'rgba(220,220,220,0.2)'
        },
      }]
    },
  }
}

module.exports = chartSettings;
