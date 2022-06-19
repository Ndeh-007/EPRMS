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
  IonLoading,
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
import { ellipsisVertical, trash, trashBin } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import PageHeader from "../components/PageHeader";
import StaffActivity from "../components/StaffActivity";
import { firestore, storage } from "../Firebase";
import { localImages } from "../images/images";
import { Staff } from "../interfaces/types";
import "../styles/Page.css";
import EditPatient from "./EditPatient";
import EditStaff from "./EditStaff";

const ViewStaff: React.FC = () => {
  const location = useLocation();
  const history= useHistory();
  const [StaffDetails, setStaffDetails] = useState<Staff>();
  const [loading,setloading] = useState(false)
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

  function DeleteStaff(){
    setloading(true)
    firestore.collection("staff").doc(StaffDetails?.id).delete().then(()=>{
      setloading(false)
      // storage.refFromURL(StaffDetails?.image).delete()
      history.push("/staff")
    }).catch((e)=>{console.log(e)})
  }

  useEffect(()=>{
    if(location.state){
      let temp:any = location.state
      console.log(temp)
      setStaffDetails(temp)
    }
  },[])
  return (
    <IonPage>
      <PageHeader name="header"></PageHeader>
      <IonContent>
        <IonLoading 
        isOpen={loading}
        message="deleting..."
        onDidDismiss={()=>{setloading(false)}}
        ></IonLoading>
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
                <IonButton size="small" color="danger" mode="md" onClick={()=>DeleteStaff()}>
                  <IonIcon
                    icon={trash}
                    size="small"
                    slot="icon-only"
                  ></IonIcon>
                </IonButton>
              </IonButtons>
            </div>
            <IonItem lines="none" className="custom-height">
              <IonImg
                src={StaffDetails?.image}
                slot="start"
                className="thumbnail"
              ></IonImg>
              <div slot="start" className="ion-padding-horizontal">
                <IonCardTitle mode="ios" color="dark">
                  {StaffDetails?.name}
                </IonCardTitle>
                <IonCardSubtitle mode="ios" className="pt-sm-4">
                  {StaffDetails?.position}
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
            <IonSlides className="slides" color="clear" ref={slidesRef}>
              <IonSlide className="slide">
                <IonCard mode="ios">
                  <IonCardContent>
                    <IonText>
                     {StaffDetails?.biography}
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide className="slide">
                <StaffActivity details={StaffDetails}></StaffActivity>
              </IonSlide>
              <IonSlide className="slide">
                <EditStaff staffDetails={StaffDetails} />
              </IonSlide>
            </IonSlides>
          </IonToolbar>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default ViewStaff;
