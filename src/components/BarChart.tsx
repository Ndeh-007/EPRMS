import React from "react";
import { Bar } from "react-chartjs-2";
import faker from "@faker-js/faker";

const BarChart: React.FC = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: "bottom" as const,
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "transparent",
        },
      },
      x: {
        grid: {
          color: "transparent",
        },
        time: {
          unit: "month",
        },
      },
    },
    ticks: {
      font: {
        weight: "bolder",
        color: "var(--ion-color-dark)",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Admitted",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1500 })),
        backgroundColor: "#eb445a",
      },
      {
        label: "Treated",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1500 })),
        backgroundColor: "#2dd36f",
      },
    ],
  };

  return (
    <div className="p-3">
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarChart;
