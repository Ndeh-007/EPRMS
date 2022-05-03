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
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  person,
  personSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "../styles/Menu.css";
import { customIcons, localImages } from "../images/images";
import { useEffect } from "react";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    iosIcon: customIcons.dashboard,
    mdIcon: customIcons.dashboard,
  },
  {
    title: "Patients",
    url: "/admin/patients",
    iosIcon: person,
    mdIcon: personSharp,
  },
  {
    title: "Doctor",
    url: "/admin/doctor",
    iosIcon: customIcons.doctor,
    mdIcon: customIcons.doctor,
  },
  {
    title: "Nurse",
    url: "/admin/nurse",
    iosIcon: customIcons.nurse,
    mdIcon: customIcons.nurse,
  },
  {
    title: "Lab",
    url: "/admin/lab",
    iosIcon: customIcons.labsci,
    mdIcon: customIcons.labsci,
  },
  // {
  //   title: 'Spam',
  //   url: '/admin/Spam',
  //   iosIcon: warningOutline,
  //   mdIcon: warningSharp
  // }
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
