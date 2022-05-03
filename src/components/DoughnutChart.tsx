import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart: React.FC = () => {
  const data = {
    labels: ["Malaria", "Diarrhea", "Typhoid"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: ["#5260ff", "#cf3c4f", "#ffc409"],
        borderColor: ["#f4f5f8", "#f4f5f8", "#f4f5f8"],
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
          <IonCol size="4" className="ion-text-center">
            <IonCardHeader>
              <IonCardTitle className="fw-bold fs-3">19</IonCardTitle>
              <IonCardSubtitle>Diarrhea</IonCardSubtitle>
            </IonCardHeader>
          </IonCol>
          <IonCol size="4" className="ion-text-center">
            <IonCardHeader>
              <IonCardTitle className="fw-bold fs-3">12</IonCardTitle>
              <IonCardSubtitle>Malaria</IonCardSubtitle>
            </IonCardHeader>
          </IonCol>
          <IonCol size="4" className="ion-text-center">
            <IonCardHeader>
              <IonCardTitle className="fw-bold fs-3">3</IonCardTitle>
              <IonCardSubtitle>Typhoid</IonCardSubtitle>
            </IonCardHeader>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default DoughnutChart;
