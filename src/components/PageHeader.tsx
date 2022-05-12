import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonNote,
  IonRippleEffect,
  IonText,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  addCircle,
  alert,
  arrowBack,
  barbell,
  notifications,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { capitalizeString } from "../Functions/functions";
import { localImages } from "../images/images";
import "../styles/PageHeader.css";
const PageHeader: React.FC<{ name: string }> = (props) => {
  const [backButton, setShowBackButton] = useState(true);
  const location = useLocation();
  const history = useHistory();

  function goBack() {
    if (location.pathname !== "/dashboard") {
      history.goBack();
      setShowBackButton(false);
    }
  }

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setShowBackButton(false);
    }
  }, []);

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
          <IonButton slot="start" className="ion-padding-start" color="primary">
            <IonLabel className="ion-padding">New Patient</IonLabel>
            <IonIcon slot="start" icon={add}></IonIcon>
          </IonButton> 
        )}

        <IonCard color="light" slot="end" mode="md">
          <IonButtons>
            <IonButton color="warning">
              <IonIcon icon={notifications}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonCard>

        <IonCard color="light" slot="end" mode="md">
          <IonItem lines="none" color="light">
            <IonLabel>
              <span>Ns. Comfort</span> <br />
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
          </IonItem>
        </IonCard>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
