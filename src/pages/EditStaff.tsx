import React, { useRef } from "react";
import faker from "@faker-js/faker";
import {
  IonAlert,
  IonAvatar,
  IonBadge,
  IonBreadcrumb,
  IonBreadcrumbs,
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
  IonLoading,
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
  IonToast,
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
import {
  chevronForward,
  informationCircle,
  pencil,
  peopleCircle,
  save,
} from "ionicons/icons";

const EditStaff: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  const patientImageInputRef = useRef<HTMLInputElement>(null);
  const [alertDischarge, setAlertDischarge] = useState(false);
  const [alertAdmit, setAlertAdmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [operationSuccessful, setOperationSuccessful] = useState(false);
  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>Jessica Alba</span> -{" "}
                <span className="fs-6">
                  <IonText color="medium">Update Profile</IonText>
                </span>
                <br />
                <span className="text-regular">
                  <IonNote className="text-small">[Staff State]</IonNote>
                </span>
              </p>
            </IonTitle>
          </IonText>
          <IonButton
            color="success"
            slot="end"
            onClick={() => {
              setAlertDischarge(true);
            }}
          >
            Delete
          </IonButton>
          <IonButton
            color="danger"
            slot="end"
            onClick={() => {
              setAlertAdmit(true);
            }}
          >
            Make Admin
          </IonButton>
        </IonToolbar>

        {/* BreadCrumbs */}
        {/* <IonToolbar color="light" className="fw-bold">
          <IonCard mode="ios" slot="end" className="p-2 my-0 mx-1">
            <IonBreadcrumbs mode="md">
              <IonBreadcrumb routerLink="/staff">
                <IonIcon slot="start" icon={peopleCircle}></IonIcon>{" "}
                <IonIcon slot="separator" icon={chevronForward}></IonIcon>
                Staff
              </IonBreadcrumb>
              <IonBreadcrumb routerLink="/edit-staff">
                <IonIcon slot="start" icon={pencil}></IonIcon>edit
                <IonIcon slot="separator" icon={chevronForward}></IonIcon>
              </IonBreadcrumb>
            </IonBreadcrumbs>
          </IonCard>
        </IonToolbar> */} 
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
                              <h6 className="h5 fw-bold">Staff Image</h6>
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
                                  Position
                                </IonLabel>
                                {/* set Value to present value */}
                                <IonSelect>
                                  <IonSelectOption value={"doctor"}>
                                    Doctor
                                  </IonSelectOption>
                                  <IonSelectOption value={"nurse"}>
                                    Nurse
                                  </IonSelectOption>
                                  <IonSelectOption value={"lab-scientist"}>
                                    Lab Scientist
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

      {/* alerts */}
      <IonAlert
        isOpen={alertDischarge}
        onDidDismiss={() => setAlertDischarge(false)}
        cssClass="alert-discharge"
        message={"Discharge [Patient Name]"}
        header={"Discharge Patient"}
        buttons={[
          {
            text: "cancel",
            cssClass: "alert-discharge-cancel",
            handler: () => {
              console.log("Confirm failed");
            },
            role: "cancel",
          },
          {
            text: "Discharge",
            cssClass: "alert-discharge-confirm",
            handler: () => {
              console.log("Patient Discharged");
              setOperationSuccessful(true);
            },
            role: "confirm",
          },
        ]}
      ></IonAlert>
      <IonAlert
        isOpen={alertAdmit}
        onDidDismiss={() => setAlertAdmit(false)}
        cssClass="alert-admit"
        message={"Admit [Patient Name]"}
        header={"Admit Patient"}
        buttons={[
          {
            text: "cancel",
            cssClass: "alert-admit-cancel",
            handler: () => {
              console.log("Confirm failed");
            },
            role: "cancel",
          },
          {
            text: "Admit",
            cssClass: "alert-admit-confirm",
            handler: () => {
              console.log("Patient Admitted");
              setOperationSuccessful(true);
            },
            role: "confirm",
          },
        ]}
      ></IonAlert>

      {/* loading */}
      <IonLoading
        isOpen={loading}
        onDidDismiss={() => {
          setLoading(false);
          setOperationSuccessful(true);
        }}
      ></IonLoading>

      {/* toast */}
      <IonToast
        isOpen={operationSuccessful}
        message={"Operation Successful"}
        icon={informationCircle}
        color="success"
        duration={2000}
        onDidDismiss={() => {
          setOperationSuccessful(false);
        }}
      ></IonToast>
    </IonPage>
  );
};

export default EditStaff;
