import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import PageHeader from "../components/PageHeader";

const NewRecord: React.FC = () => {
  return (
    <IonPage>
      <PageHeader name="name"></PageHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeLg="12">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Medical Information
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <IonGrid>
                    <IonRow>
                      <IonCol size="12" sizeLg="6">
                        <IonItem fill="outline">
                          <IonLabel position="floating">
                            Patient's complaint
                          </IonLabel>
                          <IonTextarea placeholder="Patient's Complaint"></IonTextarea>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12" sizeLg="6">
                        <IonItem fill="outline">
                          <IonLabel position="floating">
                            Patient's History
                          </IonLabel>
                          <IonTextarea placeholder="Patient's Complaint"></IonTextarea>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12" sizeLg="6">
                        <IonItem fill="outline" color="primary" lines="full">
                          <IonLabel position="floating">
                            Patient's Weight
                          </IonLabel>
                          <IonInput type="number"></IonInput>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12" sizeLg="6">
                        <IonItem fill="outline" color="primary" lines="full">
                          <IonLabel position="floating">
                            Patient's Blood Pressure
                          </IonLabel>
                          <IonInput type="text"></IonInput>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12" sizeLg="6">
                        <IonItem fill="outline" color="primary" lines="full">
                          <IonLabel position="floating">
                            Patient's Temperature
                          </IonLabel>
                          <IonInput type="number"></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewRecord;
