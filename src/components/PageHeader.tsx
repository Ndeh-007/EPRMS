import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonPopover,
  IonRippleEffect,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  addCircle,
  alert,
  arrowBack,
  barbell,
  logOut,
  mail,
  notifications,
  person,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { capitalizeString } from "../Functions/functions";
import { localImages } from "../images/images";
import "../styles/PageHeader.css";
const PageHeader: React.FC<{ name: string }> = (props) => {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [backButton, setShowBackButton] = useState(true);
  const location = useLocation();
  const history = useHistory();

  function goBack() {
    if (location.pathname !== "/dashboard") {
      history.goBack();
    }
  }

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setShowBackButton(false);
    }
  }, [location]);

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        {backButton && (
          <IonButtons slot="start" className="d-lg-block d-none">
            <IonButton
              color="primary"
              onClick={() => {
                goBack();
              }}
            >
              <IonIcon icon={arrowBack} slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
        )}
        {/* <IonTitle slot="start">{capitalizeString(props.name)}</IonTitle> */}

        {/*  <IonCard button color="tertiary" mode="ios" className="card-header-button">
           <IonIcon className="ion-padding" icon={addCircle}></IonIcon> 
          <IonText  className="ion-padding text-bold">
            Announcements
          </IonText>
        </IonCard>
          */}
        {!backButton && (
          <IonButton
            slot="start"
            className="ion-padding-start"
            color="primary"
            routerLink="/new-patient"
          >
            <IonLabel slot="end" className="ion-padding d-none d-md-block">
              New Patient
            </IonLabel>
            <IonIcon slot="icon-only" icon={add}></IonIcon>
          </IonButton>
        )}

        <IonCard color="light" slot="end" mode="md">
          <IonButtons>
            <IonButton color="warning">
              <IonIcon icon={notifications}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonCard>

        <IonCard
          color="light"
          slot="end"
          mode="md"
          button
          onClick={(e: any) => {
            e.persist();
            setShowPopover({ showPopover: true, event: e });
          }}
        >
          <IonToolbar color="light">
            <IonLabel className="d-none d-md-block px-3">
              <span className="text-bold">Ns. Comfort</span> <br />
              <span>
                <IonNote
                  className="ion-float-right"
                  style={{ fontSize: "0.81rem", paddingTop: "5px" }}
                >
                  Admin
                </IonNote>
              </span>
            </IonLabel>
            <IonAvatar slot="end">
              <IonImg className="br-2" src={localImages.commy}></IonImg>
            </IonAvatar>
          </IonToolbar>
        </IonCard>
      </IonToolbar>
      <IonPopover
        mode="ios"
        arrow
        // showBackdrop={false}
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
      > 
      <IonContent>
        <IonList mode="md">
          <IonItem lines="full" button>
            <IonIcon icon={person} slot="start" size="small"></IonIcon>
            <IonLabel>Profile</IonLabel>
          </IonItem>
          <IonItem lines="full" button>
            <IonIcon icon={mail} slot="start" size="small"></IonIcon>
            <IonLabel>Mail</IonLabel>
          </IonItem>
          <IonItem lines="none" button>
            <IonIcon icon={logOut} slot="start" size="small"></IonIcon>
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      </IonPopover>
    </IonHeader>
  );
};

export default PageHeader;
