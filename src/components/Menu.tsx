import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonThumbnail,
  IonToolbar,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import { 
  peopleCircleSharp,
  peopleSharp,
  person,
  personAddSharp,
  personCircleSharp,
  personSharp, 
} from "ionicons/icons";
import "../styles/Menu.css";
import { customIcons, localImages } from "../images/images";
import { useEffect } from "react";
import { AppPage } from "../interfaces/types";


const appPages: AppPage[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    iosIcon: customIcons.dashboard,
    mdIcon: customIcons.dashboard,
  },
  {
    title: "Patients",
    url: "/patients",
    iosIcon: personCircleSharp,
    mdIcon: personCircleSharp,
  },
  {
    title: "Staff",
    url: "/staff",
    iosIcon: peopleCircleSharp,
    mdIcon: peopleCircleSharp,
  },
  // {
  //   title: 'New Patient',
  //   url: '/new-patient',
  //   iosIcon: personAddSharp,
  //   mdIcon: personAddSharp
  // },
  // {
  //   title: "Doctor",
  //   url: "/doctor",
  //   iosIcon: customIcons.doctor,
  //   mdIcon: customIcons.doctor,
  // },
  // {
  //   title: "Nurse",
  //   url: "/nurse",
  //   iosIcon: customIcons.nurse,
  //   mdIcon: customIcons.nurse,
  // },
  // {
  //   title: "Lab",
  //   url: "/lab",
  //   iosIcon: customIcons.labsci,
  //   mdIcon: customIcons.labsci,
  // },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();

  useEffect(() => {}, [location.pathname]);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonToolbar>
        <div className="menu-logo">
          <IonImg alt="" src={localImages.logo}></IonImg>
        </div>
      </IonToolbar>
      <IonContent>
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    color={location.pathname === appPage.url ? "primary" : ""}
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
          <IonIcon icon={customIcons.dashboard} color='danger'></IonIcon>
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
