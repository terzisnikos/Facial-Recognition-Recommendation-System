import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);



var menCounter = 0;
var womenCounter = 0;

axios.get('http://localhost:8080/api/faces', {
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    gender: 'male',
  }
})
  .then(function (response) {
    console.log(response);
    menCounter = response.data.count
    console.log('men counter dashboard', response.data.count);
  })

axios.get('http://localhost:8080/api/faces', {
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    gender: 'female',
  }
})
  .then(function (response) {
    console.log(response);
    womenCounter = response.data.count
    console.log('women counter dashboard', response.data.count);
  })


var data = {
  labels: ['Women', 'Men'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 8],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

data.datasets[0].data.push(menCounter, womenCounter)


export function PieChart() {

  return (<Pie data={data} />);
}
