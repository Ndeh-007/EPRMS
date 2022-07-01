import faker from "@faker-js/faker";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { add, chevronForward } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { firestore } from "../Firebase";
import { MPI, Patient, Staff } from "../interfaces/types";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import PatientItem from "./PatientItem";

const StaffActivity: React.FC<{ details?: Staff }> = ({ details }) => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const [fakeMPI, setFakeMPI] = useState<MPI[]>([]);
  const [allPatients, setallPatients] = useState<Patient[]>();

  function getPatients() {
    const patientMPI: MPI[] = [];
    firestore.collection("patients").onSnapshot((snapshot) => {
      let docs: any[] = snapshot.docs.map((doc) => doc.data());
      setallPatients(docs);
    });
  }

  useEffect(() => {
    getPatients();
  }, []);
  return (
    <IonGrid className="pt-0 mt-0">
      <IonRow>
        <IonCol size="12">
          <IonCard mode="ios">
            <IonCardHeader mode="md" className="sticky-top">
              <IonToolbar>
                <IonCardTitle slot="start" className="pt-2 fw-bold">
                  All Patients
                </IonCardTitle>
                <IonButton
                  slot="end"
                  className="ion-text-capitalize"
                  routerLink="/new-patient"
                >
                  <IonIcon slot="start" icon={add}></IonIcon>
                  New Patient
                </IonButton>
              </IonToolbar>
            </IonCardHeader>
            <hr className="p-none m-0" />
            <IonItem
              color="primary"
              lines="full"
              className="table-title d-lg-block d-none"
            >
              <IonGrid>
                <IonRow className="align-items-center label-color">
                  <IonCol sizeLg="1"></IonCol>
                  <IonCol>
                    <IonText>Name</IonText>
                  </IonCol>
                  <IonCol>
                    <IonText>Mother's Name</IonText>
                  </IonCol>
                  <IonCol className="">
                    <IonText>Contact</IonText>
                  </IonCol>
                  <IonCol className="text-center ">
                    <IonText>Date of Birth</IonText>
                  </IonCol>
                  <IonCol className="">
                    <IonText>Address</IonText>
                  </IonCol>
                  <IonCol className="text-center ">
                    <IonText>Sex</IonText>
                  </IonCol>
                  <IonCol className="text-center ">
                    <IonText>Ward</IonText>
                  </IonCol>
                  {/* <IonCol></IonCol> */}

                  <IonButtons className="px-4">
                    <IonButton color="primary">
                      <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonRow>
              </IonGrid>
            </IonItem>
            {allPatients?.map((patient, index: number) => {
              let color: string = "danger";
              if (patient.ward === "discharged") {
                color = "success";
              }
              if (patient.ward === "out-patient") {
                color = "primary";
              }  
              return <PatientItem patient={patient} key={index} color={color}></PatientItem>;
            })}
          </IonCard>
        </IonCol>

        <IonCol size="12" sizeLg="4">
          <IonCard mode="ios">
            <IonCardHeader mode="md">
              <IonCardTitle className="pt-2 fw-bold">
                Patient Activity
              </IonCardTitle>
            </IonCardHeader>
            <hr className="p-none m-0" />
            <IonCardContent mode="md">
              <DoughnutChart></DoughnutChart>
            </IonCardContent>
          </IonCard>
        </IonCol>

        <IonCol size="12" sizeLg="8">
          <IonCard mode="ios">
            <IonCardHeader mode="md">
              <IonCardTitle className="pt-2 fw-bold">
                Patients Per Day
              </IonCardTitle>
            </IonCardHeader>
            <hr className="p-none m-0" />
            <IonCardContent mode="md">
              <BarChart></BarChart>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default StaffActivity;
