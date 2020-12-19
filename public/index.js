window.addEventListener('load', setup);
//Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

async function getData() {
  const years = [];
  const mRate = [];
  const fRate = [];
  const response = await fetch('/api/sexUnemployment');
  const data = await response.json();
  data.forEach((row) => {
    years.push(row.Year);
    if (row.Sex === 'Male') {
      mRate.push(row.percentOfLaborForceUnemployed);
    }
    if (row.Sex === 'Women') {
      fRate.push(row.percentOfLaborForceUnemployed);
    }
  });
  let unique_array = [];
  for (let i = 0; i < years.length; i++) {
    if (unique_array.indexOf(years[i]) == -1) {
      unique_array.push(years[i]);
    }
  }
  return { unique_array, mRate, fRate };
}

async function setup() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const sexUnemployment = await getData();
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sexUnemployment.unique_array,
      datasets: [
        {
          label: 'Men',
          data: sexUnemployment.mRate,
          backgroundColor: 'transparent',
          borderWidth: 4,
          borderColor: 'blue',
          hoverBorderWidth: 3,
          hoverBorderColor: '#333',
        },
        {
          label: 'Women',
          data: sexUnemployment.fRate,
          backgroundColor: 'transparent',
          borderWidth: 4,
          borderColor: 'pink',
          hoverBorderWidth: 3,
          hoverBorderColor: '#333',
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Unemployment by Sex',
        fontSize: 25,
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontColor: '#000',
        },
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          Top: 0,
        },
      },
      tooltips: {
        enabled: true,
      },
    },
  });
}

getData();
