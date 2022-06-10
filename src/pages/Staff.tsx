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
import { chevronForward, pencil, peopleCircle } from "ionicons/icons";
import { useHistory, useLocation, useParams } from "react-router";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import ExploreContainer from "../components/ExploreContainer";
import LineChart from "../components/LineChart";
import PageHeader from "../components/PageHeader";
import { capitalizeString } from "../Functions/functions";
import { customIcons, localImages } from "../images/images";
import "../styles/Page.css";

const Staff: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const location = useLocation();
  const history = useHistory();

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

  function viewStaffProfile() {
    history.push("/view-staff");
  }

  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-top ion-padding-horizontal">
              <p className="text-bold">
                <IonText>
                <span className="display-6 text-bold">Staff</span>
                </IonText>
                <br />
                <span className="text-regular">
                  <IonNote className="text-small">
                    [Manage Staff Access]
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
                <IonItem lines="none" color="dark">
                  <IonButtons>
                    <IonButton slot="start">
                      <IonIcon size="large" icon={peopleCircle}></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <div>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        <span className="text-bold">Total Staff</span>
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <span className="h1 fw-bolder">
                          {Number("2361").toLocaleString()}
                        </span>
                      </IonCardTitle>
                    </IonCardHeader>
                  </div>
                </IonItem>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="3" sizeMd="4">
              <IonCard color="primary">
                <IonItem lines="none" color="primary">
                  <IonButtons>
                    <IonButton slot="start">
                      <IonIcon size="large" icon={customIcons.doctor}></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <div>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        <span className="text-bold">Doctors</span>
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <span className="h1 fw-bolder">
                          {Number("36").toLocaleString()}
                        </span>
                      </IonCardTitle>
                    </IonCardHeader>
                  </div>
                  <IonButtons slot="end" color="dark">
                    <IonButton>
                      <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonItem>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="3" sizeMd="4">
              <IonCard color="primary">
                <IonItem lines="none" color="secondary">
                  <IonButtons>
                    <IonButton slot="start">
                      <IonIcon size="large" icon={customIcons.nurse}></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <div>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        <span className="text-bold">Nurses</span>
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <span className="h1 fw-bolder">
                          {Number("1025").toLocaleString()}
                        </span>
                      </IonCardTitle>
                    </IonCardHeader>
                  </div>
                  <IonButtons slot="end" color="dark">
                    <IonButton>
                      <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonItem>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="3" sizeMd="4">
              <IonCard color="primary">
                <IonItem lines="none" color="tertiary">
                  <IonButtons>
                    <IonButton slot="start">
                      <IonIcon size="large" icon={customIcons.labsci}></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <div>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        <span className="text-bold">Lab Scientists</span>
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <span className="h1 fw-bolder">
                          {Number("126").toLocaleString()}
                        </span>
                      </IonCardTitle>
                    </IonCardHeader>
                  </div>
                  <IonButtons slot="end" color="dark">
                    <IonButton>
                      <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonItem>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <hr />

        <IonToolbar color="light">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-top ion-padding-horizontal">
              <p className="">
                <span>All Staff</span>
                <br />
                <span className="text-regular">
                  <IonNote className="text-small">
                    In Alphabetical Order
                  </IonNote>
                </span>
              </p>
            </IonTitle>
          </IonText>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeLg="3">
              <IonCard button onClick={()=>viewStaffProfile()}>
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <IonImg src={localImages.doc}></IonImg>
                  </IonAvatar>
                  <IonText slot="start">
                    <h6>{"Dr. "+faker.name.findName()}</h6>
                  </IonText>
                  <IonButtons slot="end">
                    <IonButton routerLink="/edit-staff">
                      <IonIcon slot="icon-only" icon={pencil} size="small"></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonItem> 
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Staff;
