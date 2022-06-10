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
  IonText,
  IonTitle,
} from "@ionic/react";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { localImages } from "../images/images";
import "../styles/Login.css";

const Login: React.FC = () => {
    const history =  useHistory();
    const location = useLocation();

  return (
    <IonPage>
      <IonContent>
        <div className="main-center">
          <form
            onSubmit={(e) => {
              e.preventDefault(); 
              history.push("/dashboard");
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
                        ></IonInput>
                      </IonItem>
                      <IonItem fill="outline" color="primary">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                          required
                          name="password"
                          type="password"
                          placeholder="Enter password"
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
                  <IonButton expand="block" type="submit">
                    Login
                  </IonButton>
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
