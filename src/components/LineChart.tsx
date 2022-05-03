import React, { useRef } from "react";
import { Line } from "react-chartjs-2";

const LineChart: React.FC = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Patients",
        backgroundColor: "#3880ff",
        borderColor: "#3880ff",
        data: [40, 10, 12, 20, 26, 37],
        tension: 0.3,
        point: {
          backgroundColor: "#ffffff",
        },
        fill: {
          target: "origin",
          above: "#00ade03f",
        },
        pointHoverBackgroundColor: "#3880ff",
      },
      {
        label: "Admitted",
        backgroundColor: "#eb445a",
        borderColor: "#eb445a",
        data: [0, 32, 5, 2, 55, 30],
        tension: 0.3,
        point: {
          backgroundColor: "#ffffff",
        },
        fill: {
          target: "origin",
          above: "#ed576b3f",
        },
        pointHoverBackgroundColor: "#eb445a",
      },
      {
        label: "Discharged",
        backgroundColor: "#28ba62",
        borderColor: "#28ba62",
        data: [30, 20, 15, 22, 25, 17],
        tension: 0.3,
        point: {
          backgroundColor: "#ffffff",
        },
        fill: {
          target: "origin",
          above: "#81dd203f",
        },
        pointHoverBackgroundColor: "#28ba62",
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "transparent",
        },
      },
      x: {
        grid: {
          color: "#d7d8da3f",
        },
        time: {
          unit: "month",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
    },
    ticks: {
      font: {
        weight: "bolder",
        color: "var(--ion-color-dark)",
      },
    },
    responsive: true,
    pointBorderColor: "#ffffff",
  };

  return (
    <div className="p-3">
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default LineChart;
