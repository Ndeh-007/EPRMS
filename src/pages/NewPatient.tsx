import React, { useRef } from "react";
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
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonPage,
  IonRippleEffect,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
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
import "../styles/NewPatient.css";
import { save } from "ionicons/icons";

const NewPatient: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  const patientImageInputRef = useRef<HTMLInputElement>(null);
  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>New Patient</span>
                <br />
                <span className="text-regular">
                  <IonNote className="text-small">
                    Enter Patient Information
                  </IonNote>
                </span>
              </p>
            </IonTitle>
          </IonText>
        </IonToolbar>

        <form
          action=""
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <IonGrid className="pt-0 mt-0">
            <IonRow>
              <IonCol size="12">
                <IonCard mode="ios">
                  <IonCardHeader mode="md">
                    <IonToolbar>
                      <IonCardTitle slot="start" className="pt-2 fw-bold">
                        Personal Information
                      </IonCardTitle>
                    </IonToolbar>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeLg="3" color="medium">
                          <div
                            className="drag-n-drop rounded p-5 ion-activatable ripple-parent"
                            onClick={() => {
                              patientImageInputRef.current?.click();
                            }}
                          >
                            <p
                              onClick={() => {
                                patientImageInputRef.current?.click();
                              }}
                            >
                              <h6 className="h5 fw-bold">Patient Image</h6>
                              <p>click or Drag and drop to upload file</p>
                            </p>
                            <IonRippleEffect type="bounded"></IonRippleEffect>
                          </div>
                          <input
                            hidden
                            type={"file"}
                            ref={patientImageInputRef}
                            accept={"image/*"}
                          ></input>
                        </IonCol>
                        <IonCol>
                          <IonRow>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="floating">Name</IonLabel>
                                <IonInput type="text"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="stacked">
                                  Date of Birth
                                </IonLabel>
                                <IonInput type="date"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="floating" placeholder="e.g Student">
                                 Occupation
                                </IonLabel>
                                <IonInput type="text"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="floating">
                                  Tribe
                                </IonLabel>
                                <IonInput type="text" placeholder="e.g Mankon"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput type="email"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">
                                  Phone Number
                                </IonLabel>
                                <IonInput type="tel"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Address</IonLabel>
                                <IonInput type="text"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Sex</IonLabel>
                                <IonInput type="text"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">
                                  Marital Status
                                </IonLabel>
                                <IonSelect>
                                  <IonSelectOption value={"married"}>
                                    Married
                                  </IonSelectOption>
                                  <IonSelectOption value={"unmarried"}>
                                    UnMarried
                                  </IonSelectOption>
                                </IonSelect>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">
                                  Blood Group
                                </IonLabel>
                                <IonSelect>
                                  <IonSelectOption value={"a+"}>
                                    A+
                                  </IonSelectOption>
                                  <IonSelectOption value={"a-"}>
                                    A-
                                  </IonSelectOption>
                                  <IonSelectOption value={"b+"}>
                                    B+
                                  </IonSelectOption>
                                  <IonSelectOption value={"b-"}>
                                    B-
                                  </IonSelectOption>
                                  <IonSelectOption value={"o-"}>
                                    O-
                                  </IonSelectOption>
                                  <IonSelectOption value={"o+"}>
                                    O+
                                  </IonSelectOption>
                                  <IonSelectOption value={"ab+"}>
                                    AB+
                                  </IonSelectOption>
                                  <IonSelectOption value={"ab-"}>
                                    AB-
                                  </IonSelectOption>
                                </IonSelect>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard mode="ios">
                  <IonCardHeader mode="md">
                    <IonToolbar>
                      <IonCardTitle slot="start" className="pt-2 fw-bold">
                        Medical Information
                      </IonCardTitle>
                    </IonToolbar>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeLg="6">
                          <IonItem fill="outline">
                            <IonLabel position="floating">
                              Patient's complaint
                            </IonLabel>
                            <IonTextarea placeholder="Patient's Complaint"></IonTextarea>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="6">
                          <IonItem fill="outline">
                            <IonLabel position="floating">
                              Patient's History
                            </IonLabel>
                            <IonTextarea placeholder="Patient's Complaint"></IonTextarea>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="6">
                          <IonItem fill="outline" color="primary" lines="full">
                            <IonLabel position="floating">
                              Patient"s Weight
                            </IonLabel>
                            <IonInput type="number"></IonInput>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="6">
                          <IonItem fill="outline" color="primary" lines="full">
                            <IonLabel position="floating">
                              Patient Blood Pressure
                            </IonLabel>
                            <IonInput type="text"></IonInput>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="6">
                          <IonItem fill="outline" color="primary" lines="full">
                            <IonLabel position="floating">
                              Patient Temperature
                            </IonLabel>
                            <IonInput type="number"></IonInput>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow className="text-center">
              <IonCol></IonCol>
              <IonCol>
                <IonButton className="mx-auto">
                  {/* <IonIcon icon={save} slot="start"></IonIcon> */}
                  <IonLabel>Save</IonLabel>
                </IonButton>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default NewPatient;
