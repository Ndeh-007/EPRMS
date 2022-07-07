import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Patient } from "../interfaces/types";

const LineChart: React.FC<{
  patients?: Patient[];
  dischargedPatients?: any[];
  admittedPatients?: any[];
}> = ({ patients, dischargedPatients, admittedPatients }) => {
  const [combinedDates, setCombinedDates] = useState<string[]>([]);
  const [cumulativeAdmitted, setCumulativeAdmitted] = useState<number[]>();
  const [cumulativeDischarged, setCumulativeDischarged] = useState<number[]>();
  const [cumulativeOutPatients, setCumulativeOutPatients] = useState<number[]>();

  let allDates: any[] = [];
  let admittedValues: any[] = [];
  let dischargedValues: any[] = [];
  let outPatientValues: any[] = [];

  function initGraph() {
    let tempPatients: any = patients;
    let dates: any = tempPatients?.map((patient: any) =>
      patient.date
    );

    let tempDischargedPatients: any = dischargedPatients?.reverse();
    let dischargedDates: any = tempDischargedPatients?.map((patient: any) =>
      patient.dischargedDate
    );


    let tempAdmittedPatients: any = admittedPatients;
    let admittedDates: any = tempAdmittedPatients?.map((patient: any) =>
      patient.admissionDate
    );

    let tempDATES = [...dates, ...dischargedDates, ...admittedDates];

    tempDATES.sort(); 
    allDates = tempDATES.map((date: any) => new Date(date).toDateString());
    // admittedPatients?.reverse();
    let uniqueDates = allDates.filter((element, index) => {
      return allDates.indexOf(element) === index;
    });
    setCombinedDates(uniqueDates);
    // Object created
    var obj: any = {};
    var objAdmitted: any = {};
    var objDischarged: any = {};
    var objOutPatient: any = {};

    let allPatients: any[] = [
      ...tempPatients,
      ...tempDischargedPatients,
      ...tempAdmittedPatients,
    ];

    let uniquePatientsId: any = [];
    let uniquePatients: any = [];

    let unique = allPatients.filter((element) => {
      const isDuplicate = uniquePatientsId.includes(element.id);
      if (!isDuplicate) {
        uniquePatientsId.push(element.id);
        uniquePatients.push(element);
        return true;
      }

      return false;
    });
    /* Creating an object with the date as the key and the number of patients as the value. */
    allPatients.forEach((patient: any) => {
      // console.log(patient.status, patient.name, patient.admissionDate)
      if (patient.status == "admitted") {
        objAdmitted[new Date(Number(patient.admissionDate)).toDateString()] =
          objAdmitted[new Date(Number(patient.admissionDate)).toDateString()]
            ? objAdmitted[
            new Date(Number(patient.admissionDate)).toDateString()
            ] + 1
            : 1; // If the key exists, increment the value. If not, set the value to 1.
      }

      if (patient.status == "discharged") {
        objDischarged[new Date(Number(patient.dischargedDate)).toDateString()] =
          objDischarged[new Date(Number(patient.dischargedDate)).toDateString()]
            ? objDischarged[
            new Date(Number(patient.dischargedDate)).toDateString()
            ] + 1
            : 1; // If the key exists, increment the value. If not, set the value to 1.
      }

      if (patient.status == "out-patient") {
        objOutPatient[new Date(Number(patient.date)).toDateString()] =
          objOutPatient[new Date(Number(patient.date)).toDateString()]
            ? objOutPatient[new Date(Number(patient.date)).toDateString()] + 1
            : 1; // If the key exists, increment the value. If not, set the value to 1.
      }
    });

    for (let i = 0; i < uniqueDates.length; i++) {
      if (objAdmitted.hasOwnProperty(uniqueDates[i])) {
        admittedValues.push(objAdmitted[uniqueDates[i]]);
      }
      if (objDischarged.hasOwnProperty(uniqueDates[i])) {
        dischargedValues.push(objDischarged[uniqueDates[i]]);
      }
      if (objOutPatient.hasOwnProperty(uniqueDates[i])) {
        outPatientValues.push(objOutPatient[uniqueDates[i]]);
      }
    }

    console.log(uniqueDates)
    console.log(dischargedValues)

    setCumulativeAdmitted(admittedValues);
    setCumulativeDischarged(dischargedValues);
    setCumulativeOutPatients(outPatientValues);
  }

  useEffect(() => {
    if (
      patients != undefined &&
      dischargedPatients != undefined &&
      admittedPatients != undefined
    ) {
      initGraph();
    }
  }, [patients, dischargedPatients, admittedPatients]);

  const labels = combinedDates;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Out Patients",
        backgroundColor: "#ffc409",
        borderColor: "#ffc409",
        data: cumulativeOutPatients,
        tension: 0.3,
        point: {
          backgroundColor: "#ffffff",
        },
        fill: {
          target: "origin",
          above: "#ffc4093f",
        },
        pointHoverBackgroundColor: "#ffc409",
      },
      {
        label: "Admitted",
        backgroundColor: "#eb445a",
        borderColor: "#eb445a",
        data: cumulativeAdmitted,
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
        data: cumulativeDischarged,
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
    <div className="p-lg-3 p-none">
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default LineChart;
