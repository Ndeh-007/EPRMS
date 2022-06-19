import React, { useContext } from "react";
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
import { MPI, Patient } from "../interfaces/types";
import "../styles/Patients.css";
import { useHistory } from "react-router";
import { PatientContext } from "../context/AppContent";

const PatientItem: React.FC<{ patient: Patient }> = ({patient}) => {
  const history = useHistory();
  const {setPatient} = useContext(PatientContext)

  function viewPatient(data: Patient) { 
    setPatient(data)
    history.push("/view-patient", { patient: data });
  }

  return (
    <IonItem lines="full" mode="md" onClick={()=>viewPatient(patient)} button>
      <IonGrid className="d-none d-lg-block d-md-none">
        <IonRow className="align-items-center label-color">
          <IonCol sizeLg="1">
            <IonAvatar className="br-2 border-primary">
              <IonImg src={patient?.image}></IonImg>
            </IonAvatar>
          </IonCol>
          <IonCol>
            <IonText>{patient?.name}</IonText>
          </IonCol>
          <IonCol>
            <IonText>{patient?.mothersName}</IonText>
          </IonCol>
          <IonCol>
            <IonText>{patient?.tel}</IonText>
          </IonCol>
          <IonCol className="text-center">
            <IonText>{patient?.dateOfBirth}</IonText>
          </IonCol>
          <IonCol>
            <IonText>{patient?.address}</IonText>
          </IonCol>
          <IonCol className="text-center">
            <IonText>{patient.sex}</IonText>
          </IonCol>
          <IonCol className="text-center">
            <IonText>
              {patient?.ward}
            </IonText>
          </IonCol> 
        </IonRow>
      </IonGrid>
      <IonAvatar slot="start" className="br-2 border-primary d-sm-block d-md-block d-lg-none">
        <IonImg src={patient.image}></IonImg>
      </IonAvatar>
      <IonLabel className="d-block d-sm-block d-md-block d-lg-none">{patient.name}</IonLabel>
      <IonButtons slot="end">
        <IonButton color="primary">
          <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};

export default PatientItem;
