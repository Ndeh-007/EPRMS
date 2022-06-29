import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Patient } from "../interfaces/types";

const DoughnutChart: React.FC<{ patients?: Patient[] }> = ({ patients }) => {
  const [femaleCount, setFemaleCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);

  console.log(patients);

  // count males and females
  function countPeople() {
    let female = 0,
      male = 0;
    patients?.map((patient) => {
      if (patient.sex.toLocaleLowerCase() == "male") {
        female++;
      } else {
        male++;
      }
    });

    setMaleCount(male);
    setFemaleCount(female);
  }

  useEffect(()=>{
    countPeople()
  })

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        // label: "# of Votes",
        data: [maleCount, femaleCount],
        backgroundColor: ["#5260ff", "#cf3c4f"],
        borderColor: ["#f4f5f8", "#f4f5f8"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div>
      <div className="p-3">
        <Doughnut data={data} options={options} />
      </div>
      <IonGrid>
        <IonRow>
          <IonCol size="6" className="ion-text-center">
            <IonCardHeader>
              <IonCardTitle className="fw-bold fs-3">
                {femaleCount}
              </IonCardTitle>
              <IonCardSubtitle color="danger">Female</IonCardSubtitle>
            </IonCardHeader>
          </IonCol>
          <IonCol size="6" className="ion-text-center">
            <IonCardHeader>
              <IonCardTitle className="fw-bold fs-3">{maleCount}</IonCardTitle>
              <IonCardSubtitle color="primary">Male</IonCardSubtitle>
            </IonCardHeader>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default DoughnutChart;
