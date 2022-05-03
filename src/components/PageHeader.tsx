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
import { add, addCircle, alert, barbell, notifications } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";
import { capitalizeString } from "../Functions/functions";
import { localImages } from "../images/images";
import "../styles/PageHeader.css";
const PageHeader: React.FC<{ name: string }> = (props) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        {/* <IonTitle slot="start">{capitalizeString(props.name)}</IonTitle> */}
        {/* <div className="ripple-action custom-button button-danger">
          <IonRippleEffect></IonRippleEffect>
        </div> */}

        {/*  <IonCard button color="tertiary" mode="ios" className="card-header-button">
           <IonIcon className="ion-padding" icon={addCircle}></IonIcon> 
          <IonText  className="ion-padding text-bold">
            Announcements
          </IonText>
        </IonCard>
          */}
        {/* <IonButton
          slot="start"
          fill="outline"
          color="tertiary"
          className="ion-custom-button"
        >
          <IonLabel className="ion-padding">Announcements</IonLabel>
          <IonIcon slot="start" icon={addCircle}></IonIcon>
        </IonButton> */}

        <IonCard color="light" slot="end" mode="ios">
          <IonButtons>
            <IonButton color="warning">
              <IonIcon icon={notifications}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonCard>

        <IonCard color="light" slot="end" mode="ios">
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
              <IonImg src={localImages.commy}></IonImg>
            </IonAvatar>
          </IonItem>
        </IonCard>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
