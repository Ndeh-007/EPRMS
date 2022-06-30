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
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  IonProgressBar,
} from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import ExploreContainer from "../components/ExploreContainer";
import LineChart from "../components/LineChart";
import PageHeader from "../components/PageHeader";
import { StaffContext } from "../context/AppContent";
import { firestore } from "../Firebase";
import { capitalizeString } from "../Functions/functions";
import { customIcons, localImages } from "../images/images";
import { Patient } from "../interfaces/types";
import "../styles/Page.css";
import GREETINGS from "../interfaces/greeting";

const Dashboard: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const STAFF = useContext(StaffContext);
  const [allPatient, setAllPatients] = useState<Patient[]>();
  const [admittedPatients, setAdmittedPatients] = useState<Patient[]>();
  const [dischargedPatients, setDischargedPatients] = useState<Patient[]>();
  const [outPatients, setOutPatients] = useState<Patient[]>();
  const [recentPatients, setRecentPatients] = useState<Patient[]>();
  const [greetings, setGreetings] = useState<string>();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function fetchPatients() {
    console.log("fetching patients");
    firestore
      .collection("patients")
      .orderBy("date", "desc")
      .onSnapshot((snap) => {
        let arr: any[] = [];
        let docs: any[] = snap.docs.map((doc) => {
          return doc.data();
        });
        snap.docs.forEach((sp) => {
          arr.push(sp.data());
        });
        setAllPatients(arr);
        getOutPatients(docs);
        setRecentPatients(docs.splice(0, 8));
      });

      console.log("fetching patients 1");
    firestore.collection("dischargedPatients").onSnapshot((snap) => {
      let docs: any = snap.docs.map((doc) => doc.data());
      setDischargedPatients(docs);
    });

    console.log("fetching patients 2");
    firestore.collection("admittedPatients").onSnapshot((snap) => {
      let docs: any = snap.docs.map((doc) => doc.data());
      setAdmittedPatients(docs);
    });
    console.log('finished fetching patients')
  }

  function getOutPatients(pts: any[]) {
    let docs: any[] = pts.filter((patient) => patient.status == "out-patient");
    setOutPatients(docs);
  }

  function getGreetings() {
    let greeting = GREETINGS(new Date());
    setGreetings(greeting);
    setLoading(false);
  }

  function navigateToPatient(data: Patient) {
    history.push("/view-patient", {patient:data});
  }

  function checkPatientState(value: string | undefined) {
    if (value === "discharged") {
      return { color: "success", state: "Discharged" };
    } else if (value === "admitted") {
      return { color: "danger", state: "Admitted" };
    } else if (value === "out-patient") {
      return { color: "warning", state: "Out Patient" };
    } else {
      return { color: "warning", state: "Out Patient" };
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchPatients();
    getGreetings();
  }, []);

  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-top ion-padding-horizontal">
              <p className="text-bold">
                <span>
                  {greetings} {STAFF.staff?.position}. {STAFF.staff?.name}
                </span>
              </p>
            </IonTitle>
          </IonText>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeLg="3" sizeMd="4">
              <IonCard color="primary">
                <IonItem lines="none" color="primary">
                  <IonButtons>
                    <IonButton slot="start">
                      <IonIcon
                        size="large"
                        icon={customIcons.patient}
                      ></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <div>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        <span className="text-bold">Patients</span>
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <span className="h4 fw-bold">{allPatient?.length}</span>
                      </IonCardTitle>
                    </IonCardHeader>
                  </div>
                </IonItem>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="3" sizeMd="4">
              <IonCard color="primary">
                <IonItem lines="none" color="danger">
                  <IonButtons>
                    <IonButton slot="start">
                      <IonIcon
                        size="large"
                        icon={customIcons.admittedPatient}
                      ></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <div>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        <span className="text-bold">In Patients</span>
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <span className="h4 fw-bold">
                          {admittedPatients?.length.toLocaleString()}
                        </span>
                      </IonCardTitle>
                    </IonCardHeader>
                  </div>
                </IonItem>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="3" sizeMd="4">
              <IonCard color="primary">
                <IonItem lines="none" color="success">
                  <IonButtons>
                    <IonButton slot="start">
                      <IonIcon
                        size="large"
                        icon={customIcons.dischargedPatient}
                      ></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <div>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        <span className="text-bold">Discharged</span>
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <span className="h4 fw-bold">
                          {dischargedPatients?.length.toLocaleString()}
                        </span>
                      </IonCardTitle>
                    </IonCardHeader>
                  </div>
                </IonItem>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="3" sizeMd="4">
              <IonCard color="primary">
                <IonItem lines="none" color="warning">
                  <IonButtons>
                    <IonButton slot="start">
                      <IonIcon
                        size="large"
                        icon={customIcons.pendingPatient}
                      ></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <div>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        <span className="text-bold">Out Patients</span>
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <span className="h4 fw-bold">
                          {outPatients?.length.toLocaleString()}
                        </span>
                      </IonCardTitle>
                    </IonCardHeader>
                  </div>
                </IonItem>
              </IonCard>
            </IonCol>

            {/* charts */}
            <IonCol size="12" sizeLg="8">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="fw-bold pt-2">Activity</IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
                  {!loading && (
                    <LineChart
                      patients={allPatient}
                      admittedPatients={admittedPatients}
                      dischargedPatients={dischargedPatients}
                    ></LineChart>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="4">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Recent Patients
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <IonList>
                    {recentPatients?.map((patient, index) => {
                      return (
                        <IonItem
                          lines="inset"
                          key={index}
                          button
                          onClick={() => navigateToPatient(patient)}
                        >
                          <IonAvatar slot="start">
                            <IonImg src={patient.image}></IonImg>
                          </IonAvatar>
                          <div>
                            <IonLabel color="dark" className="fw-bold">
                              {patient.name}
                            </IonLabel>
                            <IonLabel color="medium">
                              <span className="text-small">
                                <IonText
                                  color={
                                    checkPatientState(patient.status)?.color
                                  }
                                  className="fw-bold"
                                >
                                  {checkPatientState(patient.status)?.state}
                                </IonText>{" "}
                                - {new Date(patient.date).toLocaleDateString()}
                              </span>
                            </IonLabel>
                          </div>
                          <IonButtons slot="end">
                            <IonButton>
                              <IonIcon
                                icon={chevronForward}
                                slot="icon-only"
                              ></IonIcon>
                            </IonButton>
                          </IonButtons>
                        </IonItem>
                      );
                    })}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="4">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Population
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  {loading && <IonProgressBar  type="indeterminate"></IonProgressBar>}
                  {!loading && (
                    <DoughnutChart patients={allPatient}></DoughnutChart>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="8">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Monthly Statistics
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
                  {!loading && <BarChart 
                      patients={allPatient}
                      admittedPatients={admittedPatients}
                      dischargedPatients={dischargedPatients}></BarChart>}
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Recent Patient
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  {Array.from(Array(1).keys()).map(
                    (patient: any, index: number) => {
                      let number = Math.floor((Math.random() * 10) / 2);
                      return <IonToolbar key={index}></IonToolbar>;
                    }
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
