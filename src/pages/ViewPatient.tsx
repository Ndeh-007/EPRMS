import React, { useRef } from "react";
import faker from "@faker-js/faker";
import {
  IonAlert,
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
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
  IonListHeader,
  IonLoading,
  IonMenuButton,
  IonModal,
  IonNote,
  IonPage,
  IonPopover,
  IonRippleEffect,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import "../styles/Page.css";
import "../styles/NewPatient.css";
import {
  add,
  addOutline,
  arrowBack,
  chevronForward,
  informationCircle,
  pencil,
  save,
} from "ionicons/icons";
import { localImages } from "../images/images";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ViewPatient: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const history = useHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const patientImageInputRef = useRef<HTMLInputElement>(null);
  const [alertDischarge, setAlertDischarge] = useState(false);
  const [alertAdmit, setAlertAdmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [operationSuccessful, setOperationSuccessful] = useState(false);
  const [viewImagePopover, setviewImagePopover] = useState(false);
  const [patientRecordsModal, setPatientRecordsModal] = useState(false);

  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            {/* <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>Patient Info</span> -{" "}
                <span className="fs-6">
                  <IonText color="medium">Dr. {faker.name.findName()}</IonText>
                </span>
                <br />
                <span className="text-regular">
                  <IonText className="text-small" color="danger">
                    Amitted
                  </IonText>
                </span>
              </p>
            </IonTitle> */}
          </IonText>
          <IonButton
            color="success"
            slot="end"
            onClick={() => {
              setAlertDischarge(true);
            }}
            className="m-3"
            size="small"
          >
            Discharge Patient
          </IonButton>
          <IonButton
            color="danger"
            slot="end"
            onClick={() => {
              setAlertAdmit(true);
            }}
            size="small"
            className="me-3"
          >
            Admit Patient
          </IonButton>
        </IonToolbar>

        <div className="px-1">
          <IonList color="clear">
            <IonItem lines="none">
              <IonLabel>Patient Records</IonLabel>
              <IonChip
                slot="end"
                color="success" 
                onClick={() => {
                  // setPatientRecordsModal(true);
                  history.push('/new-record')
                }}
              >
                <IonIcon icon={addOutline}></IonIcon>
                <IonLabel>New Record</IonLabel>
              </IonChip>
              <IonChip
                slot="end"
                color="primary"
                onClick={() => {
                  setPatientRecordsModal(true);
                }}
              >
                <IonLabel>View All</IonLabel>
                <IonIcon icon={chevronForward}></IonIcon>
              </IonChip>
            </IonItem>
            <IonItem lines="none" button routerLink="/patient-record">
              <IonCardHeader>
                <IonCardTitle className="text-bold">Record ID</IonCardTitle>
                <IonCardSubtitle>[Record Creation Date]</IonCardSubtitle>
              </IonCardHeader>
              <IonButtons slot="end">
                <IonButton>
                  <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonItem>
          </IonList>
        </div>
        <IonModal
          isOpen={patientRecordsModal}
          onDidDismiss={() => {
            setPatientRecordsModal(false);
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  color="primary"
                  onClick={() => {
                    setPatientRecordsModal(false);
                  }}
                >
                  <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
                </IonButton>
              </IonButtons>
              <IonTitle>Patient Record</IonTitle>

              <IonButtons slot="end">
                <IonButton
                  color="primary" 
                  disabled
                  onClick={() => {
                    // setPatientRecordsModal(false);
                  }}
                > 
                <IonLabel>{25}</IonLabel>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {Array.from(Array(5).keys()).map((key, index) => {
              return (
                <IonItem
                  lines="full"
                  button
                  onClick={() => {
                    setPatientRecordsModal(false);
                    history.push("/patient-record");
                  }}
                  key={index}
                >
                  <IonCardHeader>
                    <IonCardTitle className="text-bold">Record ID</IonCardTitle>
                    <IonCardSubtitle>[Record Creation Date]</IonCardSubtitle>
                  </IonCardHeader>
                  <IonButtons slot="end">
                    <IonButton>
                      <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonItem>
              );
            })}
          </IonContent>
        </IonModal>
        <IonGrid>
          <IonRow>
            <IonCol size="6" sizeLg="5" sizeXs="12" sizeMd="5" sizeSm="12">
              <IonCard> 
                  {/* <IonAvatar className="ion-float-end br-2">
            </IonAvatar> */} 
                    <IonItem lines="none">
                      <IonText className="h2 text-bold">{faker.name.findName()} </IonText> 
                      <IonButtons slot="end">
                        <IonButton color="primary" size="small" routerLink="/edit-patient">
                          <IonIcon icon={pencil} size="small" slot="icon-only"></IonIcon>
                        </IonButton>
                      </IonButtons>
                      <IonThumbnail 
                      className="rounded-4"
                        slot="end"
                        onClick={() => {
                          setviewImagePopover(true);
                        }}
                      >
                        <IonImg src={localImages.commy}></IonImg>
                      </IonThumbnail>
                    </IonItem> 
                  <IonPopover
                    isOpen={viewImagePopover}
                    onDidDismiss={() => setviewImagePopover(false)}
                  >
                    <TransformWrapper>
                      <TransformComponent>
                        <IonImg src={localImages.commy}></IonImg>
                      </TransformComponent>
                    </TransformWrapper>
                  </IonPopover>
                  <IonCardHeader> 
                  <IonCardSubtitle className="">
                    <span>Male (26)</span> ~{" "}
                    <span>{faker.date.recent().toLocaleDateString()}</span>
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase text-capitalize ">
                    [Blood Group]
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase ">
                    <span>{6723339123}</span> ~{" "}
                    <span>{"email@awakedom.com"}</span>
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase text-capitalize ">
                    {faker.address.state()}
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase text-capitalize ">
                    {"Catholic"}
                  </IonCardSubtitle> 
                  </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" sizeLg="7" sizeXs="12" sizeMd="7" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Patient Wishes & Protocols</IonCardTitle> 
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <div>
                      <span className="text-bold">
                        Durable Power of Attorney:{" "}
                      </span>
                      [name and contact details]
                    </div>
                    <div>
                      <span className="text-bold">Health Care Proxy: </span>
                      [name and contact details]
                    </div>
                    <div>
                      <span className="text-bold">Emergency Contact: </span>
                      [name and contact details]
                    </div>
                  </IonText>
                  <IonToolbar>
                    <IonChip color="primary">
                      <IonLabel>DNR</IonLabel>
                    </IonChip>
                    <IonChip color="primary">
                      <IonLabel>No Feeding Tube</IonLabel>
                    </IonChip>
                    <IonChip color="primary">
                      <IonLabel>No Antibiotics</IonLabel>
                    </IonChip>
                    <IonChip color="primary">
                      <IonLabel>No IVs</IonLabel>
                    </IonChip>
                    <IonChip color="primary">
                      <IonLabel>No Comfort Care</IonLabel>
                    </IonChip>
                    <IonChip color="primary">
                      <IonLabel>No Hospitalize</IonLabel>
                    </IonChip>
                  </IonToolbar>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <hr />

        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>Medical History & Current Status</span> 
              </p>
            </IonTitle>
          </IonText>
        </IonToolbar>

        <IonGrid>
          <IonRow>
            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Current Medical Conditions</IonCardTitle>
                  <IonCardSubtitle>
                    Diagnosis and Medical Issues
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum dolor sit dignissimos vero numquam sequi quam,
                    corporis dolore voluptatum expedita. Voluptas laboriosam
                    quaerat, rem, dolor voluptatem ducimus, omnis atque
                    repudiandae explicabo culpa perferendis est molestiae hic
                    qui praesentium quasi a enim et mollitia nihil ipsam nostrum
                    ab! Quae, veniam debitis.
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Previous Medical Conditions</IonCardTitle>
                  <IonCardSubtitle>
                    Past condition and mode of treatment
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum dolor sit dignissimos vero numquam sequi quam,
                    corporis dolore voluptatum expedita. Voluptas laboriosam
                    quaerat, rem, dolor voluptatem ducimus, omnis atque
                    repudiandae explicabo culpa perferendis est molestiae hic
                    qui praesentium quasi a enim et mollitia nihil ipsam nostrum
                    ab! Quae, veniam debitis.
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Immunity & Immunizations</IonCardTitle>
                  <IonCardSubtitle>Name and Date</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="full">
                    <IonText slot="start">Flu Shot</IonText>
                    <IonText slot="end">
                      {faker.date.recent().toLocaleDateString()}
                    </IonText>
                  </IonItem>
                  <IonItem lines="full">
                    <IonText slot="start">Tetanus</IonText>
                    <IonText slot="end">
                      {faker.date.recent().toLocaleDateString()}
                    </IonText>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Previous Hospitalizations</IonCardTitle>
                  <IonCardSubtitle>Reason and Date</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonCard className="ion-no-border">
                    <IonCardHeader>
                      <IonCardTitle>Reason for Hospitalizations</IonCardTitle>
                      <IonCardSubtitle>
                        {faker.date.recent().toLocaleDateString()}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi, sunt!
                    </IonCardContent>
                  </IonCard>
                  <IonCard className="ion-no-border mt-2">
                    <IonCardHeader>
                      <IonCardTitle>Reason for Hospitalizations</IonCardTitle>
                      <IonCardSubtitle>
                        {faker.date.recent().toLocaleDateString()}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi, sunt!
                    </IonCardContent>
                  </IonCard>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Previous Surgeries</IonCardTitle>
                  <IonCardSubtitle>Reason and Date</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonCard className="ion-no-border">
                    <IonCardHeader>
                      <IonCardTitle>Reason for Surgery</IonCardTitle>
                      <IonCardSubtitle>
                        {faker.date.recent().toLocaleDateString()}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi, sunt!
                    </IonCardContent>
                  </IonCard>
                  <IonCard className="ion-no-border mt-2">
                    <IonCardHeader>
                      <IonCardTitle>Reason for Surgery</IonCardTitle>
                      <IonCardSubtitle>
                        {faker.date.recent().toLocaleDateString()}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi, sunt!
                    </IonCardContent>
                  </IonCard>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <hr />

        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>Functioning</span> 
              </p>
            </IonTitle>
          </IonText>
        </IonToolbar>

        <IonGrid>
          <IonRow>
            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Appearance</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="full">
                    <IonText slot="start">Communication</IonText>
                    <IonText slot="end">Good</IonText>
                  </IonItem>
                  <IonItem lines="full">
                    <IonText slot="start">Dental Health</IonText>
                    <IonText slot="end">Needs Attention</IonText>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Activities of Daily Living (ADL)</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="full">
                    <IonText slot="start">Bathing</IonText>
                    <IonText slot="end">Independent</IonText>
                  </IonItem>
                  <IonItem lines="full">
                    <IonText slot="start">Eating</IonText>
                    <IonText slot="end">Dependent</IonText>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Continence</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="full">
                    <IonText slot="start">Urine</IonText>
                    <IonText slot="end">Continent</IonText>
                  </IonItem>
                  <IonItem lines="full">
                    <IonText slot="start">Stool</IonText>
                    <IonText slot="end">Continent</IonText>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid> 
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

export default ViewPatient;
