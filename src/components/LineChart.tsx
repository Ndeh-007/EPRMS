import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Patient } from "../interfaces/types";

const LineChart: React.FC<{
  patients?: Patient[];
  dischargedPatients?: any[];
  admittedPatients?: any[];
}> = ({ patients, dischargedPatients, admittedPatients }) => {
 
  function initGraph(){
    let tempPatients: any = patients?.reverse();
    let dates: any = tempPatients?.map((patient: any) =>
      new Date(patient.date).toDateString()
    );
  
    console.log(dates)
  
    let tempDischargedPatients: any = dischargedPatients?.reverse();
    let dischargedDates: any = tempDischargedPatients?.map((patient: any) =>
      new Date(patient.dischargedDate).toDateString()
    );
  
    let tempAdmittedPatients: any = admittedPatients?.reverse();
    let admittedDates: any = tempAdmittedPatients?.map((patient: any) =>
      new Date(patient.admissionDate).toDateString()
    );
  
    let allDates = [...dates, ...dischargedDates, ...admittedDates];
    // allDates.sort();
  
    // Object created
    var obj: any = {};
    var objAdmitted: any = {};
    var objDischarged: any = {};
    var objOutPatient: any = {};
  
    let allPatients = [
      ...tempPatients,
      ...tempDischargedPatients,
      ...tempAdmittedPatients,
    ];
  
  
    let admittedValues=[];
    let dischargedValues=[];
    let outPatientValues=[];
   
  /* Creating an object with the date as the key and the number of patients as the value. */
    allPatients.forEach((patient: any) => {
      if (patient.status == 'admitted') {
        objAdmitted[new Date(patient.admissionDate).toDateString()] = objAdmitted[
          new Date(patient.admissionDate).toDateString()
        ]
          ? objAdmitted[new Date(patient.admissionDate).toDateString()] + 1
          : 1;
      }
  
      if (patient.status == "discharged") {
        objDischarged[new Date(patient.dischargedDate).toDateString()] = objDischarged[
          new Date(patient.dischargedDate).toDateString()
        ]
          ? objDischarged[new Date(patient.dischargedDate).toDateString()] + 1
          : 1;
      }
  
      if (patient.status == "out-patient") {
        objOutPatient[new Date(patient.date).toDateString()] = objOutPatient[
          new Date(patient.date).toDateString()
        ]
          ? objOutPatient[new Date(patient.date).toDateString()] + 1
          : 1;
      } 
    });
  
  }

  console.log(patients)

  useEffect(()=>{
    if(patients !== undefined || dischargedPatients !== undefined || admittedPatients !== undefined){
      initGraph();
    } 
  },[0])

  const labels = Array.from(new Array(5).keys());
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
