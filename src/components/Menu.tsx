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
  IonToggle,
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
import { useContext, useEffect, useState } from "react";
import { AppPage } from "../interfaces/types";
import { StaffContext } from "../context/AppContent";
import { AdminAppPages, StaffAppPages } from "../interfaces/data";
import { StoreAppColor } from "../Functions/functions";


const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();
  const { setStaff, staff } = useContext(StaffContext);
  const [appPages, setAppPages] = useState<AppPage[]>();


  // function Toogle() {
  //   document.body.classList.toggle(`dark`)
  //   if (document.body.classList.contains(`dark`)) {
  //     Plugins.StatusBar.setBackgroundColor({ color: `#152b4d` }).catch(console.log)
  //     Plugins.Storage.set({ key: `dark`, value: `true` })
  //     setdarkmode(true)
  //   } else {
  //     Plugins.StatusBar.setBackgroundColor({ color: `#0d2c6d` }).catch(console.log)
  //     Plugins.Storage.set({ key: `dark`, value: `false` })
  //     setdarkmode(false)
  //   }
  // }

  useEffect(() => {
    if (staff?.role?.toLocaleLowerCase() === "staff") {
      setAppPages(StaffAppPages);
    }
    if (staff?.role?.toLocaleLowerCase() === "admin") {
      setAppPages(AdminAppPages);
    }
  }, [staff]);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonToolbar>
        <div className="menu-logo">
          <IonImg alt="" src={localImages.logo}></IonImg>
        </div>
      </IonToolbar>
      <IonContent>
        <IonList id="inbox-list">
          {appPages?.map((appPage, index) => {
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
