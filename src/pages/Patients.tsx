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
  IonProgressBar,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, chevronForward } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import ExploreContainer from "../components/ExploreContainer";
import LineChart from "../components/LineChart";
import PageHeader from "../components/PageHeader";
import PatientItem from "../components/PatientItem";
import { firestore } from "../Firebase";
import { capitalizeString } from "../Functions/functions";
import { customIcons, localImages } from "../images/images";
import { MPI, Patient } from "../interfaces/types";
import "../styles/Page.css";

const Patients: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const [fakeMPI, setFakeMPI] = useState<MPI[]>([]);
  const [allPatients, setallPatients] = useState<Patient[]>();
  const [loading, setLoading] = useState(false);
  const searchBarRef = useRef<HTMLIonSearchbarElement>(null);
  const [tempAllPatients, setTempAllPatients] = useState<Patient[]>();

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

  /**
   * It takes a string value as an argument and filters the patients based on the search value
   * @param {string | undefined | null} value - string | undefined
   */
  function searchPatient(value: string | undefined | null) {
    let temp = tempAllPatients;
    if (value) {
      const filteredPatients = temp?.filter((patient) =>
        patient.name.toLowerCase().includes(value.toLowerCase())
      ); // filter the patients based on the search value
      setallPatients(filteredPatients);
    } else {
      setallPatients(temp);
    }
  }

  /**
   * We're using the firestore.collection() method to get all the patients from the database.
   *
   * The onSnapshot() method is a listener that listens for changes in the database.
   *
   * The snapshot.docs.map() method is used to map the data from the database to the docs array.
   *
   * The setallPatients() method is used to set the state of the allPatients array.
   *
   * The setTempAllPatients() method is used to set the state of the tempAllPatients array.
   *
   * The setLoading() method is used to set the state of the loading variable.
   */
  function getPatients() {
    setLoading(true);
    firestore.collection("patients").onSnapshot((snapshot) => {
      let docs: any[] = snapshot.docs.map((doc) => doc.data());
      setLoading(false);
      setallPatients(docs);
      setTempAllPatients(docs);
    });
  }

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonGrid color="light" className="pt-4">
          <IonRow>
            <IonCol>
              <IonText color="primary">
                <IonTitle className="ion-padding-horizontal">
                  <p className="text-bold">
                    <IonText>
                      <span className="display-6 text-bold">All Patients</span>
                    </IonText>
                    <br />
                    <span className="text-regular">
                      <IonNote className="text-small">
                        {allPatients?.length} Patients
                      </IonNote>
                    </span>
                  </p>
                </IonTitle>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <IonSearchbar
                mode="md"
                onIonChange={(e) => {
                  searchPatient(e.detail.value);
                }}
                ref={searchBarRef}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    searchPatient(searchBarRef.current?.value);
                  }
                }}
              ></IonSearchbar>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className="pt-0 mt-0">
          <IonRow>
            <IonCol size="12">
              <IonCard mode="ios">
                {loading && (
                  <IonProgressBar type="indeterminate"></IonProgressBar>
                )}
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
                          <IonIcon
                            slot="icon-only"
                            icon={chevronForward}
                          ></IonIcon>
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
                  return (
                    <PatientItem
                      patient={patient}
                      key={index}
                      color={color}
                    ></PatientItem>
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
