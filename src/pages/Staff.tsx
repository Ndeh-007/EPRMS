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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  addOutline,
  chevronForward,
  pencil,
  peopleCircle,
} from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import ExploreContainer from "../components/ExploreContainer";
import LineChart from "../components/LineChart";
import PageHeader from "../components/PageHeader";
import { StaffContext } from "../context/AppContent";
import { firestore } from "../Firebase";
import { capitalizeString } from "../Functions/functions";
import { customIcons, localImages } from "../images/images";
import { Staff } from "../interfaces/types";
import "../styles/Page.css";

const Staffs: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const [allStaff, setAllStaff] = useState<Staff[]>();
  const location = useLocation();
  const history = useHistory();
  const STAFF = useContext(StaffContext);
  const [loading,setloading] = useState(false)

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

  function fetchStaff() {
    setloading(true)
    firestore.collection("staff").onSnapshot((snapshot) => {
      let docs: any = snapshot.docs.map((doc) => doc.data());
      setAllStaff(docs);
      setloading(false)
    });
  }

  function viewStaffProfile(data:Staff) {
    history.push("/view-staff",data);
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
        {
          loading && <IonProgressBar type="indeterminate"></IonProgressBar>
        }
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
                  <IonNote className="text-small">Manage Staff Access</IonNote>
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
                          {allStaff?.length}
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
                          {allStaff?.filter((staff) => staff.role === "Doctor").length}
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
                          {allStaff?.filter((staff) => staff.role === "Nurse").length}
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
                        
                        {allStaff?.filter((staff) => staff.role === "Lab").length}
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
          <IonTitle className="ion-padding-top ion-padding-horizontal">
            All Staff
          </IonTitle>
          <IonButton slot="end" routerLink="/new-staff" className="pe-3">
            <IonIcon slot="start" icon={addOutline}></IonIcon>
            <IonLabel>New Staff</IonLabel>
          </IonButton>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            {allStaff?.map((staff, index) => {
              return (
                <IonCol size="12" sizeLg="3" key={index}>
                  <IonCard button onClick={() => viewStaffProfile(staff)}>
                    <IonItem lines="none">
                      <IonAvatar slot="start">
                        <IonImg src={staff.image}></IonImg>
                      </IonAvatar>
                      <IonText slot="start">{staff.name}</IonText>
                    </IonItem>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Staffs;
