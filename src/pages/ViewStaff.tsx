import faker from "@faker-js/faker";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonNote,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import React from "react";
import PageHeader from "../components/PageHeader";
import { localImages } from "../images/images";
import "../styles/Page.css";

const ViewStaff: React.FC = () => {
  return (
    <IonPage>
      <PageHeader name="header"></PageHeader>
      <IonContent>
        <IonText color="primary">
          <IonTitle className="ion-padding">
            <p className="text-bold">
              <IonText>
                <span className="display-6 text-bold">Staff Profile</span>
              </IonText>
              <br />
              <span className="text-regular">
                <IonNote className="text-small">Statistics About Staff</IonNote>
              </span>
            </p>
          </IonTitle>
        </IonText>
        <IonCard mode="ios">
          <IonCardHeader mode="md">
            <div className="ion-float-end">
              <IonButtons>
                <IonButton size="small" color="primary" mode="md">
                  <IonIcon
                    icon={ellipsisVertical}
                    size="small"
                    slot="icon-only"
                  ></IonIcon>
                </IonButton>
              </IonButtons>
            </div>
            <IonItem lines="none" className="custom-height">
              <IonImg
                src={localImages.commy}
                slot="start"
                className="thumbnail"
              ></IonImg>
              <div slot="start" className="ion-padding-horizontal">
                <IonCardTitle mode="ios" color="dark">
                  {faker.name.findName()}
                </IonCardTitle>
                <IonCardSubtitle mode="ios" className="pt-sm-4">
                  Doctor
                </IonCardSubtitle>
                <IonCardSubtitle mode="md" className="pt-sm-2 fst-italic">
                  <span className="text-bold">Last Seen:</span> {Date()}
                </IonCardSubtitle>
              </div>
            </IonItem>
          </IonCardHeader>
        </IonCard>

        <IonToolbar>
            <IonSegment value={'jekk'}>
                <IonSegmentButton value="jekk">hello</IonSegmentButton>
            </IonSegment>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default ViewStaff;
