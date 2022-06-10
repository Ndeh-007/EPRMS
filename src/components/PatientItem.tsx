import React from "react";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { localImages } from "../images/images";
import {
  chevronForward,
  cloudDownload,
  download,
  eye,
  pencil,
} from "ionicons/icons";
import faker from "@faker-js/faker";
import { MPI } from "../interfaces/types";
import "../styles/Patients.css";

const PatientItem: React.FC<{ patient: MPI }> = (props) => {
  return (
    <IonItem lines="full" routerLink="/view-patient" mode="md">
      <IonGrid className="d-none d-lg-block d-md-none">
        <IonRow className="align-items-center label-color">
          <IonCol sizeLg="1">
            <IonAvatar className="br-2 border-primary">
              <IonImg src={localImages.commy}></IonImg>
            </IonAvatar>
          </IonCol>
          <IonCol>
            <IonText>{props.patient.name}</IonText>
          </IonCol>
          <IonCol>
            <IonText>{props.patient.tel}</IonText>
          </IonCol>
          <IonCol className="text-center">
            <IonText>{props.patient.dateOfBirth}</IonText>
          </IonCol>
          <IonCol>
            <IonText>{props.patient.address}</IonText>
          </IonCol>
          <IonCol className="text-center">
            <IonText>F</IonText>
          </IonCol>
          <IonCol className="text-center">
            <IonText>
              wm-o
            </IonText>
          </IonCol>
          <IonCol>
            {/* <IonButtons>
                <IonButton mode="md" color="primary">
                  <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
                </IonButton>
               <IonButton color="primary" routerLink="/edit-patient">
                <IonIcon size="small" icon={pencil}></IonIcon>
                </IonButton>
                <IonButton color="primary">
                <IonIcon size="small" icon={cloudDownload}></IonIcon>
              </IonButton> 
              </IonButtons> 
               */}
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonAvatar slot="start" className="br-2 border-priblock d-none d-sm-block d-md-block d-lg-none" >
        <IonImg src={localImages.commy}></IonImg>
      </IonAvatar>
      <IonLabel className="d-block d-sm-block d-md-block d-lg-none">{props.patient.name}</IonLabel>
      <IonButtons slot="end">
        <IonButton color="primary">
          <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};

export default PatientItem;
