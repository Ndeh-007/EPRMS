import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import faker from "@faker-js/faker";
import { Patient } from "../interfaces/types";

const BarChart: React.FC<{
  patients?: Patient[];
  dischargedPatients?: any[];
  admittedPatients?: any[];
}> = ({ patients, dischargedPatients, admittedPatients }) => {
  const [combinedDates, setCombinedDates] = useState<string[]>([]);
  const [cumulativeAdmitted, setCumulativeAdmitted] = useState<number>(0);
  const [cumulativeDischarged, setCumulativeDischarged] = useState<number>(0);
  const [cumulativeOutPatients, setCumulativeOutPatients] = useState<number>(0);
  const [cumulativeArrayAdmitted, setCumulativeArrayAdmitted] = useState<number[]>();
  const [cumulativeArrayDischarged, setCumulativeArrayDischarged] = useState<number[]>();
  const [cumulativeArrayOutPatients, setCumulativeArrayOutPatients] = useState<number[]>();

  let allDates: any[] = [];
  let admittedValues: any[] = [];
  let dischargedValues: any[] = [];
  let outPatientValues: any[] = [];

  function initGraph() {

  const options:any = { month: 'long' };
    let tempPatients: any = patients?.reverse();
    let dates: any = tempPatients?.map((patient: any) =>
      new Intl.DateTimeFormat('en-US',options).format(Number(patient.date)).toString()
    );

    let tempDischargedPatients: any = dischargedPatients?.reverse();
    let dischargedDates: any = tempDischargedPatients?.map((patient: any) =>
      new Intl.DateTimeFormat('en-US',options).format(Number(patient.dischargedDate)).toString()
    );

    // admittedPatients?.reverse();

    let tempAdmittedPatients: any = admittedPatients;
    let admittedDates: any = tempAdmittedPatients?.map((patient: any) =>
      new Intl.DateTimeFormat('en-US',options).format(Number(patient.admissionDate)).toString()
    );

    allDates = [...dates, ...dischargedDates, ...admittedDates];
    allDates.sort().reverse();
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
    uniquePatients.forEach((patient: any) => {
      // console.log(patient.status, patient.name, patient.admissionDate)
      if (patient.status == "admitted") {
        objAdmitted[ new Intl.DateTimeFormat('en-US',options).format(Number(patient.admissionDate)).toString()] =
          objAdmitted[ new Intl.DateTimeFormat('en-US',options).format(Number(patient.admissionDate)).toString()]
            ? objAdmitted[
                 new Intl.DateTimeFormat('en-US',options).format(Number(patient.admissionDate)).toString()
              ] + 1
            : 1; // If the key exists, increment the value. If not, set the value to 1.
      }

      if (patient.status == "discharged") {
        objDischarged[ new Intl.DateTimeFormat('en-US',options).format(Number(patient.dischargedDate)).toString()] =
          objDischarged[ new Intl.DateTimeFormat('en-US',options).format(Number(patient.dischargedDate)).toString()]
            ? objDischarged[
                 new Intl.DateTimeFormat('en-US',options).format(Number(patient.dischargedDate)).toString()
              ] + 1
            : 1; // If the key exists, increment the value. If not, set the value to 1.
      }

      if (patient.status == "out-patient") {
        objOutPatient[new Intl.DateTimeFormat('en-US',options).format(Number(patient.date)).toString()] =
          objOutPatient[new Intl.DateTimeFormat('en-US',options).format(Number(patient.date)).toString()]
            ? objOutPatient[new Intl.DateTimeFormat('en-US',options).format(Number(patient.date)).toString()] + 1
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

    setCumulativeArrayAdmitted(admittedValues);
    setCumulativeArrayDischarged(dischargedValues);
    setCumulativeArrayOutPatients(outPatientValues);

    var sumAdmitted = admittedValues.reduce((accumulator, value) => { 
      return accumulator + value;
    }, 0);
    var sumDischarged = dischargedValues.reduce((accumulator, value) => { 
      return accumulator + value;
    }, 0);

    var sumOutPatient = outPatientValues.reduce((accumulator, value) => { 
      return accumulator + value;
    }, 0);
 
   
    setCumulativeAdmitted(sumAdmitted);
    setCumulativeDischarged(sumDischarged);
    setCumulativeOutPatients(sumOutPatient);
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
 

  const options = {
    responsive: true,
    plugins: {
      legend: { 
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
   ...combinedDates 
  ]; 
  const data = {
    labels,
    datasets: [
      {
        label: "Admitted",
        data: cumulativeArrayAdmitted,
        backgroundColor: "#eb445a",
      },
      {
        label: "discharged",
        data: cumulativeArrayDischarged,
        backgroundColor: "#28ba62",
      },
      {
        label: "out-patient",
        data: cumulativeArrayOutPatients,
        backgroundColor: "#3880ff",
      },
    ],
  };

  return (
    <div className="p-lg-3 p-none">
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarChart;
