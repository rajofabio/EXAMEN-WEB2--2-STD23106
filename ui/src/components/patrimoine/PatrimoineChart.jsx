import React from 'react';
import { Line } from 'react-chartjs-2';

function PatrimoineChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Valeur du Patrimoine',
      data: data.values,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
    }]
  };

  return <Line data={chartData} />;
}

export default PatrimoineChart;
