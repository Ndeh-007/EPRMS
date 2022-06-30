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
  IonModal,
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
  chevronForward,
  logOut,
  mail,
  notifications,
  person,
} from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { StaffContext } from "../context/AppContent";
import {
  capitalizeString,
  DeleteUserData,
  GetUserData,
  refactor,
} from "../Functions/functions";
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
  const [showModal, setShowModal] = useState(false);
  const context = useContext(StaffContext);
  const [modal, setModal] = useState(false);

  const { setStaff, staff } = useContext(StaffContext);

  function logOutUser() {
    setShowPopover({
      showPopover: false,
      event: undefined,
    });
    DeleteUserData()
      .then(() => {
        setStaff(null);
        history.push("/login");
      })
      .catch((e) => {
        console.log("error", e);
      });
  }

  function handleNavigation(_location: string) {
    console.log("location", _location);
    if (_location == "/patient-record") {
      history.push('/view-patient')
    }
    if (_location == "/view-patient") {
      history.push('/patients')
    }
    if (_location == "/new-record") {
      history.push('/view-patient')
    }
    if (_location == "/new-patient") {
      history.push('/patients')
    }
    if (_location == "/edit-patient") {
      history.push('/view-patient')
    }
    if (_location == "/staff") {
      history.push('/dashboard')
    }
    if (_location == "/patients") {
      history.push('/dashboard')
    }
    if (_location == "/new-staff") {
      history.push('/staff')
    }
  }

  function goBack() {
    if (location.pathname !== "/dashboard") {
      handleNavigation(location.pathname);
    }
  }

  function viewProfile() {
    setShowPopover({
      showPopover: false,
      event: undefined,
    });
    history.push("/view-staff");
  }

  function initStaff() {
    GetUserData().then((data) => {
      if (data) {
        context.setStaff(data);
      }
      if(data == null){
        history.push('/login')
      }
    });
  }

  useEffect(() => {
    initStaff();
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
      {/* <IonButton onClick={()=>refactor()}> refactor</IonButton> */}
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
              <span className="text-bold">{context.staff?.name}</span> <br />
              <span>
                <IonNote
                  className="ion-float-right"
                  style={{ fontSize: "0.81rem", paddingTop: "5px" }}
                >
                  {context.staff?.role}
                </IonNote>
              </span>
            </IonLabel>
            <IonAvatar slot="end">
              <IonImg className="br-2" src={context.staff?.image}></IonImg>
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
            <IonItem lines="full" button onClick={() => viewProfile()}>
              <IonIcon icon={person} slot="start" size="small"></IonIcon>
              <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem
              lines="full"
              button
              onClick={() => {
                setShowPopover({
                  showPopover: false,
                  event: undefined,
                });
                setShowModal(true);
              }}
            >
              <IonIcon icon={mail} slot="start" size="small"></IonIcon>
              <IonLabel>Mail</IonLabel>
            </IonItem>
            <IonItem lines="none" button onClick={() => logOutUser()}>
              <IonIcon icon={logOut} slot="start" size="small"></IonIcon>
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowModal(false)} color="primary">
                <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>Mail</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {Array.from(Array(10).keys()).map((i, index) => {
              return (
                <IonItem lines="full" button key={index}>
                  <IonLabel>
                    <IonText>
                      <span className="ion-padding-top">Lorem Subject</span>
                    </IonText>
                    <br />
                    <IonText color="dark" className="text-small">
                      <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nihil, ratione?
                      </span>
                    </IonText>
                  </IonLabel>
                  <IonIcon slot="end" icon={chevronForward}></IonIcon>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
      </IonModal>
    </IonHeader>
  );
};

export default PageHeader;
