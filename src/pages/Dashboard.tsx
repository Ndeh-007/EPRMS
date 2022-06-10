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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { useParams } from "react-router";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import ExploreContainer from "../components/ExploreContainer";
import LineChart from "../components/LineChart";
import PageHeader from "../components/PageHeader";
import { capitalizeString } from "../Functions/functions";
import { customIcons, localImages } from "../images/images";
import "../styles/Page.css";

const Dashboard: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();

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

  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-top ion-padding-horizontal">
              <p className="text-bold">
                <span>Good Morning Ns. Comfort</span>
                <br />
                <span className="text-regular">
                  <IonNote className="text-small">
                    [Random Daily quote/greeting]
                  </IonNote>
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
                        <span className="h4">
                          {Number("10236").toLocaleString()}
                        </span>
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
                        <span className="text-bold">Admitted</span>
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <span className="h4 fw-bold">
                          {Number("336").toLocaleString()}
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
                        <span className="h4">
                          {Number("9026").toLocaleString()}
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
                        <span className="text-bold">Waiting</span>
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <span className="h4">
                          {Number("30").toLocaleString()}
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
                  <LineChart></LineChart>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="4">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Today's Patients
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <IonList>
                    {Array.from(Array(8).keys()).map(
                      (patient: any, index: number) => {
                        let number = Math.floor((Math.random() * 10) / 2);
                        return (
                          <IonItem lines="inset" key={index} button routerLink="/view-patient">
                            <IonAvatar slot="start">
                              <IonImg src={localImages.doc}></IonImg>
                            </IonAvatar>
                            <div>
                              <IonLabel color="dark" className="fw-bold">
                                {faker.name.findName()}
                              </IonLabel>
                              <IonLabel color="medium">
                                <span className="text-small">
                                  <IonText
                                    color={checkPatientState(number)?.color}
                                    className="fw-bold"
                                  >
                                    {checkPatientState(number)?.state}
                                  </IonText>{" "}
                                  - Dr. {faker.name.findName()}
                                </span>
                              </IonLabel>
                            </div>
                            <IonButtons slot="end">
                              <IonButton>
                                <IonIcon icon={chevronForward} slot="icon-only"></IonIcon>
                              </IonButton>
                            </IonButtons>
                          </IonItem>
                        );
                      }
                    )}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="4">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Top Diseases
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <DoughnutChart></DoughnutChart>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="8">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Patients Per Day
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <BarChart></BarChart>
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
                      return (
                        <IonToolbar key={index}> 

                        </IonToolbar>
                      );
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
