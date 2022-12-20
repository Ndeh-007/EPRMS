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
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AnyObject } from "chart.js/types/basic";
import { terminalSharp } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import CheckList from "../components/CheckList";
import {
  PatientImmunity,
  PatientsHistory,
} from "../components/EditPatientRecordCategories";
import PageHeader from "../components/PageHeader";
import { PatientContext, PatientRecordContext } from "../context/AppContent";
import { firestore } from "../Firebase";
import {
  ADL,
  ADL_States,
  Appearance,
  AppearanceStates,
  Continence,
  ContinenceStates,
  IADL,
} from "../interfaces/data";
import { PatientRecordInterface, VitalSigns } from "../interfaces/types";
import uniqid from "uniqid";

const NewRecord: React.FC = () => {
  const location = useLocation();
  const { patient } = useContext(PatientContext);
  const {patientRecord, setPatientRecord} =  useContext(PatientRecordContext);
  const [_patientRecord, _setPatientRecord] = useState<PatientRecordInterface>();
  const [recordId, setRecordId] = useState<string>();
  const [startRecord, setStartRecord] = useState<boolean>(false);
  const [loading, setloading] = useState(false);
  async function updatePatientRecord(section: string, data: AnyObject) {}

  function createRecord() {
    let rID = uniqid("record-");
    let _date = Date.now();
    let data:PatientRecordInterface={
      id: rID,
      date: _date,
      diagnosis: "",
      patientComplaint: "",
      treatment: "",
      vitals:{
        bloodPressure: "", 
        temperature: "",
        weight: "",
        pulse: "",
      }
    }
    setRecordId(rID);
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(rID)
      .set(data).then(()=>{
        setPatientRecord(data);
      });
    setStartRecord(true);
  }

  useEffect(() => {
    setStartRecord(false);
  }, []);
  return (
    <IonPage>
      <PageHeader name="name"></PageHeader>
      <IonToolbar color="clear" className="pt-4">
        <IonText slot="start" color="primary">
          <IonTitle className="ion-padding-horizontal">
            <p className="text-bold">
              <span>New Record</span> -{" "}
              <span className="text-muted">{patient?.name}</span>
              <br />
              <span className="text-regular">
                <IonNote className="text-small">
                  Creating a New Patient Record
                </IonNote>
              </span>
            </p>
          </IonTitle>
        </IonText>
        {!startRecord && (
          <IonButton
            slot="end"
            onClick={() => {
              createRecord();
            }}
          >
            start record
          </IonButton>
        )}
      </IonToolbar>
      {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      <IonContent>
        {startRecord && (
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeLg="6">
                <IonCard mode="ios">
                  <form
                    onSubmit={(e: any) => {
                      setloading(true);
                      e.preventDefault();
                      let data: VitalSigns = {
                        bloodPressure: e.target.bp.value,
                        pulse: e.target.pulse.value,
                        temperature: e.target.temp.value,
                        weight: e.target.weight.value,
                      };

                      firestore
                        .collection("patients")
                        .doc(patient?.id)
                        .collection("records")
                        .doc(patientRecord?.id)
                        .update({ vitals: data })
                        .then(() => setloading(false)).catch(()=>setloading(false));
                    }}
                  >
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
                              <IonInput type="text" name="pulse"></IonInput>
                            </IonItem>
                          </IonCol>
                          <IonCol size="12" sizeSm="12" sizeLg="6">
                            <IonItem
                              fill="outline"
                              color="primary"
                              lines="full"
                            >
                              <IonLabel position="floating">Weight</IonLabel>
                              <IonInput type="number" name="weight"></IonInput>
                            </IonItem>
                          </IonCol>
                          <IonCol size="12" sizeSm="12" sizeLg="6">
                            <IonItem
                              fill="outline"
                              color="primary"
                              lines="full"
                            >
                              <IonLabel position="floating">
                                Blood Pressure
                              </IonLabel>
                              <IonInput type="text" name="bp"></IonInput>
                            </IonItem>
                          </IonCol>
                          <IonCol size="12" sizeSm="12" sizeLg="6">
                            <IonItem
                              fill="outline"
                              color="primary"
                              lines="full"
                            >
                              <IonLabel position="floating">
                                Temperature
                              </IonLabel>
                              <IonInput type="number" name="temp"></IonInput>
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                    <div className="text-center p-2">
                      <IonButton mode="md" type="submit">
                        submit
                      </IonButton>
                    </div>
                  </form>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeLg="6">
                <form
                  onSubmit={(e: any) => {
                    setloading(true);
                    e.preventDefault();
                    let data = {
                      patientComplaint: e.target.patientComplaint.value,
                    };
                    firestore
                      .collection("patients")
                      .doc(patient?.id)
                      .collection("records")
                      .doc(patientRecord?.id)
                      .update({ patientComplaint: data.patientComplaint })
                      .then(() => {
                        setloading(false);
                      });
                  }}
                >
                  <IonCard mode="ios">
                    <IonCardHeader mode="md">
                      <IonCardTitle className="pt-2 fw-bold">
                        Patient's Complaint
                      </IonCardTitle>
                    </IonCardHeader>
                    <hr className="p-none m-0" />
                    <IonCardContent mode="md">
                      <IonItem lines="full" fill="outline">
                        <IonLabel position="floating">
                          Patient's Complaint
                        </IonLabel>
                        <IonTextarea
                          placeholder="Write Patient's Complaint"
                          name="patientComplaint"
                        ></IonTextarea>
                      </IonItem>
                    </IonCardContent>
                    <hr className="p-none m-0" />
                    <div className="text-center py-3">
                      <IonButton mode="md" type="submit">
                        Submit
                      </IonButton>
                    </div>
                  </IonCard>
                </form>
              </IonCol>

              <IonCol size="12" sizeLg="6">
                <form
                  onSubmit={(e: any) => {
                    setloading(true);
                    e.preventDefault();
                    let data: any = {
                      diagnosis: e.target.diagnosis.value,
                    };
                    firestore
                      .collection("patients")
                      .doc(patient?.id)
                      .collection("records")
                      .doc(patientRecord?.id)
                      .update({ diagnosis: data.diagnosis })
                      .then(() => {
                        setloading(false);
                      });
                  }}
                >
                  <IonCard mode="ios">
                    <IonCardHeader mode="md">
                      <IonCardTitle className="pt-2 fw-bold">
                        Diagnosis
                      </IonCardTitle>
                    </IonCardHeader>
                    <hr className="p-none m-0" />
                    <IonCardContent mode="md">
                      <IonItem lines="full" fill="outline">
                        <IonLabel position="floating">Diagnosis</IonLabel>
                        <IonTextarea
                          placeholder="Write Diagnosis"
                          name="diagnosis"
                        ></IonTextarea>
                      </IonItem>
                    </IonCardContent>
                    <hr className="p-none m-0" />
                    <div className="text-center py-3">
                      <IonButton mode="md" type="submit">
                        Submit
                      </IonButton>
                    </div>
                  </IonCard>
                </form>
              </IonCol>

              <IonCol size="12" sizeLg="6">
                <form
                  onSubmit={(e: any) => {
                    setloading(true);
                    e.preventDefault();
                    let data: any = {
                      treatment: e.target.treatment.value,
                    };
                    firestore
                      .collection("patients")
                      .doc(patient?.id)
                      .collection("records")
                      .doc(patientRecord?.id)
                      .update({ treatment: data.treatment })
                      .then(() => {
                        setloading(false);
                      });
                  }}
                >
                  <IonCard mode="ios">
                    <IonCardHeader mode="md">
                      <IonCardTitle className="pt-2 fw-bold">
                        Treatment
                      </IonCardTitle>
                    </IonCardHeader>
                    <hr className="p-none m-0" />
                    <IonCardContent mode="md">
                      <IonItem lines="full" fill="outline">
                        <IonLabel position="floating">Treatment</IonLabel>
                        <IonTextarea
                          placeholder="Write Treatment"
                          name="treatment"
                        ></IonTextarea>
                      </IonItem>
                    </IonCardContent>
                    <hr className="p-none m-0" />
                    <div className="text-center py-3">
                      <IonButton mode="md" type="submit">
                        Submit
                      </IonButton>
                    </div>
                  </IonCard>
                </form>
              </IonCol>

              <IonCol size="12" sizeLg="12">
                <hr />
              </IonCol>

              <IonCol size="12" sizeLg="6">
                <IonCard mode="ios">
                  <IonCardHeader mode="md">
                    <IonCardTitle className="pt-2 fw-bold">
                      Immunity & Immunizations
                    </IonCardTitle>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <PatientImmunity recordId={recordId}></PatientImmunity>
                  </IonCardContent>
                  <hr className="p-none mx-0" />
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
                    <PatientsHistory recordId={recordId}></PatientsHistory>
                  </IonCardContent>
                  <hr className="p-none mx-0" />
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeLg="12">
                <hr />
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
                      recordId={recordId}
                      title={"appearance"}
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
                    <CheckList
                      data={ADL}
                      states={ADL_States}
                      title={"adl"}
                      recordId={recordId}
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
                      Continence
                    </IonCardTitle>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <CheckList
                      title={"continence"}
                      data={Continence}
                      states={ContinenceStates}
                      recordId={recordId}
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
                      recordId={recordId}
                      title="iadl"
                    ></CheckList>
                  </IonCardContent>
                  <hr className="p-none m-0" />
                  <div className="text-center py-3">
                    <IonButton mode="md" type="submit">
                      Submit
                    </IonButton>
                  </div>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NewRecord;
