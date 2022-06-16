import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import CheckList from "../components/CheckList";
import {
  PatientImmunity,
  PatientsHistory,
} from "../components/EditPatientRecordCategories";
import PageHeader from "../components/PageHeader";
import {
  ADL,
  ADL_States,
  Appearance,
  AppearanceStates,
  Continence,
  ContinenceStates,
  IADL,
} from "../interfaces/data";

const NewRecord: React.FC = () => {
  return (
    <IonPage>
      <PageHeader name="name"></PageHeader>
      <IonToolbar color="clear" className="pt-4">
        <IonText slot="start" color="primary">
          <IonTitle className="ion-padding-horizontal">
            <p className="text-bold">
              <span>New Record</span> -{" "}
              <span className="text-muted">Patient Name</span>
              <br />
              <span className="text-regular">
                <IonNote className="text-small">
                  Creating a New Patient Record
                </IonNote>
              </span>
            </p>
          </IonTitle>
        </IonText>
      </IonToolbar>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeLg="6">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Vital Signs
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <IonGrid>
                    <IonRow>
                      <IonCol size="12" sizeSm="12" sizeLg="6">
                        <IonItem fill="outline">
                          <IonLabel position="floating">Pulse</IonLabel>
                          <IonInput type="text"></IonInput>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12" sizeSm="12" sizeLg="6">
                        <IonItem fill="outline" color="primary" lines="full">
                          <IonLabel position="floating">Weight</IonLabel>
                          <IonInput type="number"></IonInput>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12" sizeSm="12" sizeLg="6">
                        <IonItem fill="outline" color="primary" lines="full">
                          <IonLabel position="floating">
                            Blood Pressure
                          </IonLabel>
                          <IonInput type="text"></IonInput>
                        </IonItem>
                      </IonCol>
                      <IonCol size="12" sizeSm="12" sizeLg="6">
                        <IonItem fill="outline" color="primary" lines="full">
                          <IonLabel position="floating">Temperature</IonLabel>
                          <IonInput type="number"></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
                <div className="text-center p-2">
                  <IonButton mode="md">submit</IonButton>
                </div>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="6">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Patient History
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <PatientsHistory></PatientsHistory>
                </IonCardContent>
                <hr className="p-none m-0" />
                <div className="text-center py-3">
                  <IonButton mode="md">Submit</IonButton>
                </div>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="4">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Immunity & Immunizations
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <PatientImmunity></PatientImmunity>
                </IonCardContent>
                <hr className="p-none m-0" />
                <div className="text-center py-3">
                  <IonButton mode="md">Submit</IonButton>
                </div>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="12">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Appearance
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <CheckList
                    data={Appearance}
                    states={AppearanceStates} 
                  ></CheckList>
                </IonCardContent>
                <hr className="p-none m-0" />
                <div className="text-center py-3">
                  <IonButton mode="md">Submit</IonButton>
                </div>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="12">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Activities of Daily Living
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <CheckList data={ADL} states={ADL_States}></CheckList>
                </IonCardContent>
                <hr className="p-none m-0" />
                <div className="text-center py-3">
                  <IonButton mode="md">Submit</IonButton>
                </div>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="12">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Continence
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <CheckList
                    data={Continence}
                    states={ContinenceStates}
                    catheter
                  ></CheckList>
                </IonCardContent>
                <hr className="p-none m-0" />
                <div className="text-center py-3">
                  <IonButton mode="md">Submit</IonButton>
                </div>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="12">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonCardTitle className="pt-2 fw-bold">
                    Instrumental Activities of Daily Living
                  </IonCardTitle>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <CheckList
                    data={IADL}
                    states={ADL_States} 
                  ></CheckList>
                </IonCardContent>
                <hr className="p-none m-0" />
                <div className="text-center py-3">
                  <IonButton mode="md">Submit</IonButton>
                </div>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewRecord;
