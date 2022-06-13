import faker from "@faker-js/faker";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
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
  IonSlide,
  IonSlides,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import React, { useRef } from "react";
import PageHeader from "../components/PageHeader";
import StaffActivity from "../components/StaffActivity";
import { localImages } from "../images/images";
import "../styles/Page.css";
import EditPatient from "./EditPatient";
import EditStaff from "./EditStaff";

const ViewStaff: React.FC = () => {
  const [segmentButtonValue, setsegmentButtonValue] =
    React.useState("biography");
  const slidesRef = useRef<HTMLIonSlidesElement>(null);

  function slideTo(value: any) {
    if (value === "biography") {
      slidesRef.current!.slideTo(0);
    }
    if (value === "activity") {
      slidesRef.current!.slideTo(1);
    }
    if (value === "settings") {
      slidesRef.current!.slideTo(2);
    }
  }
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
          <IonSegment
            value={segmentButtonValue}
            onIonChange={(e) => {
              slideTo(e.detail.value);
            }}
          >
            <IonSegmentButton value="biography">Biography</IonSegmentButton>
            <IonSegmentButton value="activity">Activity</IonSegmentButton>
            <IonSegmentButton value="settings">Settings</IonSegmentButton>
          </IonSegment>

          <IonToolbar color="light">
            <IonSlides className="slides" ref={slidesRef}>
              <IonSlide className="slide">
                <IonCard mode="ios">
                  <IonCardContent>
                    <IonText>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consectetur non eum deserunt sed autem consequatur
                      repellat harum vero sit. Enim reiciendis impedit illum qui
                      praesentium eveniet labore quod laboriosam deleniti! Optio
                      maxime, porro distinctio architecto consequatur quaerat
                      quae, a reiciendis fugit mollitia tenetur quia quasi vel
                      impedit hic, officiis numquam?
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide className="slide">
                <StaffActivity></StaffActivity>
              </IonSlide>
              <IonSlide className="slide">
                <EditStaff />
              </IonSlide>
            </IonSlides>
          </IonToolbar>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default ViewStaff;
