import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
} from "@ionic/react";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { StaffContext } from "../context/AppContent";
import { firestore } from "../Firebase";
import { GetUserData, StoreUserData } from "../Functions/functions";
import { localImages } from "../images/images";
import "../styles/Login.css";

const Login: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const context = useContext(StaffContext);

  async function AuthenticateUser(username: string, password: string) {
    firestore
      .collection("staff")
      .where("username", "==", username)
      .where("password", "==", password)
      .onSnapshot((Snapshot) => {
        if (Snapshot.empty) {
          console.log("No user found");
          alert("Invalid Username or Password");
          setloading(false);
          return;
        }
        let doc = Snapshot.docs[0];
        let data: any = doc.data();
        context.setStaff(data);
        StoreUserData(data);
        console.log(data);
        setloading(false);
        history.push("/dashboard");
      });
  }

  useEffect(() => { 
    GetUserData().then((data)=>{
      if(data){
        context.setStaff(data); 
        history.push("/dashboard");
      }
    })
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
                  <IonButton fill="clear" expand="block" size="small">
                    Forgotten Password?
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
