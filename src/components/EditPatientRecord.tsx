import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useState } from "react";
import { Finance, PatientsComplaint } from "./EditPatientRecordCategories";

const EditPatientRecord: React.FC<{
  category: string;
  closeModal: Function;
}> = ({ category, closeModal }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="primary"
              onClick={() => {
                closeModal();
              }}
            >
              <IonIcon icon={arrowBack} slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{category}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent> 
          <PatientsComplaint></PatientsComplaint>
      </IonContent>
    </>
  );
};

export default EditPatientRecord;
