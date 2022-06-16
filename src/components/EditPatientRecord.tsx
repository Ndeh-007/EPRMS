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
import React, { useEffect, useState } from "react";
import {
  ADL,
  ADL_States,
  Appearance,
  AppearanceStates,
  Continence,
  ContinenceStates,
  IADL,
} from "../interfaces/data";
import CheckList from "./CheckList";
import {
  Diagnostics,
  Finance,
  LabResults,
  Management,
  PatientImmunity,
  PatientsComplaint,
  PatientsHistory,
  PhysicalExam,
} from "./EditPatientRecordCategories";

const EditPatientRecord: React.FC<{
  category: string;
  closeModal: Function;
}> = ({ category, closeModal }) => {
  const [content, setContent] = useState<any>();

  useEffect(() => {
    if (category === "Finance") {
      let temp = <Finance />;
      setContent(temp);
    }
    if (category === "Patients Complain") {
      let temp = <PatientsComplaint />;
      setContent(temp);
    }
    if (category === "Patient History") {
      let temp = <PatientsHistory />;
      setContent(temp);
    }
    if (category === "Diagnostics") {
      let temp = <Diagnostics />;
      setContent(temp);
    }
    if (category === "Physical Exam") {
      let temp = <PhysicalExam />;
      setContent(temp);
    }
    if (category === "Lab Results") {
      let temp = <LabResults />;
      setContent(temp);
    }
    if (category === "Management") {
      let temp = <Management />;
      setContent(temp);
    }

    if (category === "Immunity") {
      let temp = <PatientImmunity />;
      setContent(temp);
    }

    if (category === "Appearance") {
      let temp = <CheckList edit data={Appearance} states={AppearanceStates} />;
      setContent(temp);
    }
    if (category === "IADL") {
      let temp = <CheckList edit data={IADL} states={ADL_States} />;
      setContent(temp);
    }
    if (category === "ADL") {
      let temp = <CheckList edit data={ADL} states={ADL_States} />;
      setContent(temp);
    }
    if (category === "Continence") {
      let temp = (
        <CheckList edit data={Continence} states={ContinenceStates} catheter />
      );
      setContent(temp);
    }
  }, []);

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
      <IonContent>{content}</IonContent>
    </>
  );
};

export default EditPatientRecord;
