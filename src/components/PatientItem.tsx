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
      <IonGrid>
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
    </IonItem>
  );
};

export default PatientItem;
