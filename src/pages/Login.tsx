import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import ExploreContainer from "../components/ExploreContainer";

const Login:React.FC = ()=>{
    return (
        <IonPage>
            <IonContent>
                <ExploreContainer name="login"></ExploreContainer>
            </IonContent>
        </IonPage>
    )
}

export default Login