import faker from "@faker-js/faker";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import ExploreContainer from "../components/ExploreContainer";
import LineChart from "../components/LineChart";
import PageHeader from "../components/PageHeader";
import PatientItem from "../components/PatientItem";
import { capitalizeString } from "../Functions/functions";
import { customIcons, localImages } from "../images/images";
import { MPI } from "../interfaces/types";
import "../styles/Page.css";

const Patients: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const [fakeMPI, setFakeMPI] = useState<MPI[]>([]);

  function checkPatientState(value: number) {
    if (value === 0) {
      return { color: "success", state: "Discharged" };
    } else if (value === 1) {
      return { color: "danger", state: "Admitted" };
    } else if (value === 2) {
      return { color: "warning", state: "Waiting" };
    } else {
      return { color: "warning", state: "Waiting" };
    }
  }

  function createDummy() {
    let res = Array.from(Array(20).keys()).map((e, i) => {
      let patientMPI: MPI = {
        name: faker.name.findName(),
        tel: faker.phone.phoneNumber(),
        address: faker.address.city(),
        dateOfBirth: faker.date.recent().toLocaleDateString(),
        sex: "",
      };
      let temp = [];
      temp.push(patientMPI);
      return temp[0];
    });
    console.log(res);
    setFakeMPI([...res]);
  }

  useEffect(() => {
    createDummy();
  }, []);

  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>All Patients</span>
                <br />
                <span className="text-regular">
                  <IonNote className="text-small">
                    [Total Number of Patients]
                  </IonNote>
                </span>
              </p>
            </IonTitle>
          </IonText>
          <IonGrid>
            <IonRow>
              <IonCol></IonCol>
              <IonCol></IonCol>
              <IonCol sizeLg="3">
                <IonSearchbar mode="ios"></IonSearchbar>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
        <IonGrid className="pt-0 mt-0">
          <IonRow>
            <IonCol size="12">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonToolbar>
                    <IonCardTitle slot="start" className="pt-2 fw-bold">
                      All Patients
                    </IonCardTitle>
                    <IonButton slot="end" className="ion-text-capitalize" routerLink="/new-patient">
                      New Patient
                    </IonButton>
                  </IonToolbar>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonItem color="primary" lines="full" className="table-title">
                  <IonGrid>
                    <IonRow className="align-items-center label-color">
                      <IonCol sizeLg="1"> 
                      </IonCol>
                      <IonCol>
                        <IonText>Name</IonText>
                      </IonCol>
                      <IonCol>
                        <IonText>Contact</IonText>
                      </IonCol>
                      <IonCol className="text-center">
                        <IonText>Date of Birth</IonText>
                      </IonCol>
                      <IonCol>
                        <IonText>Address</IonText>
                      </IonCol>
                      <IonCol className="text-center">
                        <IonText>Sex</IonText>
                      </IonCol>
                      <IonCol></IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
                {fakeMPI.map((patient: MPI, index: number) => {
                  return (
                    <PatientItem patient={patient} key={index}></PatientItem>
                  );
                })}
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Patients;
