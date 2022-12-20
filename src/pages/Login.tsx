import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonModal,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack, lockClosed, lockClosedSharp, logoAlipay } from "ionicons/icons";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { StaffContext } from "../context/AppContent";
import { auth, firestore } from "../Firebase";
import { GetUserData, sendEmail, StoreUserData } from "../Functions/functions";
import { localImages } from "../images/images";
import "../styles/Login.css";

const Login: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const [loadingReset, setloadingReset] = React.useState(false);
  const [showmodal, setshowmodal] = React.useState(false);
  const context = useContext(StaffContext);

  function AuthenticateUser(username: string, password: string) {

    firestore
      .collection("staff")
      .where("username", "==", username)
      .where("password", "==", password)
      .get().then((Snapshot) => {
        if (Snapshot.empty) {
          console.log("No user found");
          alert("Invalid Username or Password");
          setloading(false);
          return;
        }
        let doc = Snapshot.docs[0];
        let data: any = doc.data();
        let _lastSeen = Date.now().toString()
        context.setStaff({ ...data, lastSeen: _lastSeen });
        firestore.collection("staff").doc(data.id).update({ lastSeen: _lastSeen }).catch((e) => { console.log("failed to update last seen", e) })
        StoreUserData(data);
        console.log(data);
        setloading(false);
        history.push("/dashboard");
      });
  }

  useEffect(() => {
    GetUserData().then((data) => {
      if (data) {
        context.setStaff(data);
        history.push("/dashboard");
      }
    });
  }, []);

  return (
    <IonPage>
      <IonContent>
        <div className="main-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setloading(true);
              AuthenticateUser(username, password);
            }}
          >
            <IonGrid>
              <IonRow className="ion-justify-content-center ion-align-items-center">
                <IonCol size="12" sizeLg="5" sizeMd="7" sizeSm="7">
                  <div className="login-box p-4">
                    <div className="login-box-header text-center">
                      <IonGrid>
                        <IonRow className="ion-justify-content-center ion-align-items-center">
                          <IonCol
                            size="12"
                            sizeSm="6"
                            sizeXs="6"
                            sizeLg="2"
                            sizeMd="6"
                          >
                            <div className="logo">
                              <img src={localImages.logo} alt="logo" />
                            </div>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <div className="text-center">
                              <IonText color="dark">
                                <div className="display-5 text-bold pt-2">
                                  Login
                                </div>
                              </IonText>
                            </div>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </div>
                    <div className="login-box-body">
                      <IonGrid>
                        <IonRow className="ion-justify-content-center ion-align-items-center">
                          <IonCol size="12"></IonCol>
                        </IonRow>
                      </IonGrid>
                      <IonItem fill="outline" color="primary" className="pb-2">
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput
                          type="text"
                          name="username"
                          placeholder="Enter username"
                          required
                          onIonChange={(e) => setUsername(e.detail.value!)}
                        ></IonInput>
                      </IonItem>
                      <IonItem fill="outline" color="primary">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                          required
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          onIonChange={(e) => setPassword(e.detail.value!)}
                        ></IonInput>
                      </IonItem>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center ion-align-items-center">
                <IonCol
                  size="12"
                  sizeSm="2"
                  sizeLg="2"
                  sizeMd="2"
                  sizeXs="3"
                  sizeXl="2"
                >
                  {loading ? (
                    <IonButton expand="block">
                      <IonSpinner name="dots"></IonSpinner>
                    </IonButton>
                  ) : (
                    <IonButton expand="block" type="submit">
                      Login
                    </IonButton>
                  )}
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center ion-align-items-center">
                <IonCol size="12">
                  <IonButton fill="clear" expand="block" size="small" onClick={() => { setshowmodal(true) }}>
                    Forgotten Password?
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonModal isOpen={showmodal} onDidDismiss={() => setshowmodal(false)}>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot='start' > 
                  <IonButton onClick={()=>{setshowmodal(false)}} color='primary'>
                    <IonIcon icon={arrowBack} slot="icon-only"></IonIcon>
                  </IonButton>
                  </IonButtons>
                  <IonTitle color="primary">Reset Password</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <div className="main-center">
                  <form className="mx-5" onSubmit={(e: any) => {
                    e.preventDefault();
                    setloadingReset(true)
                    let email = e.target.email.value;
                    let username = e.target.username.value;
                    let _pswd = Math.random().toString(36).slice(-8);
                    firestore.collection("staff").where("username", "==", username).get().then((Snapshot) => {
                      let id = Snapshot.docs[0].id;
                      firestore.collection('staff').doc(id).update({ password: _pswd }).then(() => {
                        let data={
                          email, username, name:username, password: _pswd
                        }
                        sendEmail(data,true).then(()=>{
                          alert("Password has been reset. Please check your email");
                          setloadingReset(false)
                          setshowmodal(false);
                        }).catch((e) => {
                          console.log(e);
                          alert("Failed to reset password");
                          setloadingReset(false)
                          setshowmodal(false);
                        })
                      }).catch((e) => {
                        console.log(e);
                        alert("Failed to reset password");
                        setloadingReset(false)
                        setshowmodal(false);
                      })
                    }).catch((e) => {
                      console.log(e);
                      alert("Failed to reset password");
                      setloadingReset(false)
                      setshowmodal(false);
                    })
                  }}>
                    <div className="text-center">
                      <div>
                        <IonIcon icon={lockClosedSharp} size='large' color="primary"></IonIcon>
                      </div>
                      <IonCardContent>

                        <IonText>
                          <p>A new password will be sent to the email address entered. Please enter a secure email.</p>
                        </IonText>
                      </IonCardContent>
                    </div>
                    <IonItem fill="outline">
                      <IonLabel position="floating">Username</IonLabel>
                      <IonInput type="text" required placeholder="Your account Username" name="username"></IonInput>
                    </IonItem>
                    <IonItem fill="outline" className="mt-2">
                      <IonLabel position="floating">Email</IonLabel>
                      <IonInput type="email" required placeholder="example@email.com" name="email"></IonInput>
                    </IonItem>
                    <div className="text-center pt-3">
                      <IonButton type="submit">Reset Password</IonButton>
                    </div>
                  </form>
                  <IonLoading isOpen={loadingReset} onDidDismiss={()=>setloadingReset(false)} message="Resetting Password"></IonLoading>
                </div>
              </IonContent>
            </IonModal>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
