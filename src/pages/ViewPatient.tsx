import React, { useContext, useRef } from "react";
import faker from "@faker-js/faker";
import {
  IonAlert,
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenuButton,
  IonModal,
  IonNote,
  IonPage,
  IonPopover,
  IonProgressBar,
  IonRippleEffect,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import "../styles/Page.css";
import "../styles/NewPatient.css";
import {
  add,
  addOutline,
  arrowBack,
  chevronForward,
  informationCircle,
  pencil,
  save,
} from "ionicons/icons";
import { localImages } from "../images/images";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { PatientContext } from "../context/AppContent";
import { firestore } from "../Firebase";
import {
  HistoryAttribute,
  Immunity,
  Overview,
  PatientRecordInterface,
} from "../interfaces/types";
import { calculateAge, convertDate } from "../Functions/functions";
import { PatientImmunity } from "../components/EditPatientRecordCategories";

const ViewPatient: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const history = useHistory();
  const location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const patientImageInputRef = useRef<HTMLInputElement>(null);
  const [alertDischarge, setAlertDischarge] = useState(false);
  const [alertAdmit, setAlertAdmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [operationSuccessful, setOperationSuccessful] = useState(false);
  const [viewImagePopover, setviewImagePopover] = useState(false);
  const [patientRecordsModal, setPatientRecordsModal] = useState(false);
  const { patient, setPatient } = useContext(PatientContext);
  const [patientRecords, setPatientRecords] =
    useState<PatientRecordInterface[]>();
  const [FirstRecord, setFirstRecord] = useState<PatientRecordInterface>();
  const [SecondRecord, setSecondRecord] = useState<PatientRecordInterface>();
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [patientImmninty, setPatientImmninty] = useState<Immunity[]>();
  const [loadingImmninty, setLoadingImmninty] = useState(false);
  const [patientHistory, setPatientHistory] = useState<HistoryAttribute>();
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [patientOverview, setPatientOverview] = useState<Overview[]>();
  const [loadingOverview, setLoadingOverview] = useState(false);

  function getRecords() {
    setLoadingRecords(true);
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        let docs: any = snapshot.docs.map((doc) => doc.data());
        setFirstRecord(docs[0]);
        if (docs[1]) {setSecondRecord(docs[1])}; 
        setPatientRecords(docs);
        setLoadingRecords(false);

      });
  }

  function listenToRecord() {
    let _firstRecord = FirstRecord;
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(_firstRecord?.id)
      .onSnapshot((snap) => {
        let doc: any = snap.data();
        setFirstRecord(doc);
      });
  }

  function viewPatientRecord(value: PatientRecordInterface | undefined) {
    if (value) history.push("/patient-record", value);
    else history.push("/patient-record");
  }

  function getPatientImmunity() {
    setLoadingImmninty(true);
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("immunity")
      .onSnapshot((snapshot) => {
        let docs: any = snapshot.docs.map((doc) => doc.data());
        setPatientImmninty(docs);
        setLoadingImmninty(false);
      });
  }

  function getPatientHistory() {
    setLoadingHistory(true);
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(FirstRecord?.id)
      .collection("history")
      .onSnapshot((snapshot) => {
        let docs: any = snapshot.docs.map((doc) => doc.data());
        setPatientHistory(docs);
        setLoadingHistory(false);
      });
  }

  function getPatientOverview() {
    setLoadingOverview(true);
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(patientRecords?.[0]?.id)
      .collection("overview")
      .onSnapshot((snapshot) => {
        let docs: any = snapshot.docs.map((doc) => doc.data());
        setPatientOverview(docs);
        setLoadingOverview(false);
      });
  }
  
  useEffect(() => {  
    if(location.state){
      let temp:any = location.state
      console.log(temp)
      setPatient(temp.patient);
      getRecords();
      getPatientImmunity();
      getPatientOverview(); 
    }else{ 
      getRecords();
      getPatientImmunity();
      getPatientOverview();
    }
  }, [location]);

  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary"></IonText>
          <IonButton
            color="success"
            slot="end"
            onClick={() => {
              setAlertDischarge(true);
            }}
            className="m-3"
            size="small"
            hidden={FirstRecord?.discharged && FirstRecord?.discharged ? true : false}
          >
            Discharge Patient
          </IonButton>
         {
          FirstRecord?.discharged?"": <IonButton
          color="danger"
          slot="end"
          onClick={() => {
            setAlertAdmit(true);
          }}
          hidden={
          FirstRecord?.admitted ? true : false
          }
          size="small"
          className="me-3"
        >
          Admit Patient
        </IonButton>
         }
        </IonToolbar>

        <div className="px-1">
          <IonList color="clear">
            {loadingRecords && (
              <IonProgressBar type="indeterminate"></IonProgressBar>
            )}
            <IonItem lines="none">
              <IonLabel>Patient Records</IonLabel>
              <IonChip
                slot="end"
                color="success"
                onClick={() => {
                  // setPatientRecordsModal(true);
                  history.push("/new-record");
                }}
              >
                <IonIcon icon={addOutline}></IonIcon>
                <IonLabel>New Record</IonLabel>
              </IonChip>
              <IonChip
                slot="end"
                color="primary"
                onClick={() => { 
                  setPatientRecordsModal(true);
                }}
              >
                <IonLabel>View All</IonLabel>
                <IonIcon icon={chevronForward}></IonIcon>
              </IonChip>
            </IonItem>
            <IonItem
              lines="none"
              button
              onClick={() => {
                viewPatientRecord(FirstRecord);
              }}
            >
              <IonCardHeader>
                <IonCardTitle className="text-bold">
                  {FirstRecord?.id}
                </IonCardTitle>
                <IonCardSubtitle>
                  {convertDate(FirstRecord?.date)}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonButtons slot="end">
                <IonButton>
                  <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonItem>
          </IonList>
        </div>
        <IonModal
          isOpen={patientRecordsModal}
          onDidDismiss={() => {
            setPatientRecordsModal(false);
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  color="primary"
                  onClick={() => {
                    setPatientRecordsModal(false);
                  }}
                >
                  <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
                </IonButton>
              </IonButtons>
              <IonTitle>Patient Record</IonTitle>

              <IonButtons slot="end">
                <IonButton
                  color="primary"
                  disabled
                  onClick={() => {
                    // setPatientRecordsModal(false);
                  }}
                >
                  <IonLabel>{patientRecords?.length}</IonLabel>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {patientRecords?.map((record, index) => {
              return (
                <IonItem
                  lines="full"
                  button
                  onClick={() => {
                    setPatientRecordsModal(false);
                    history.push("/patient-record");
                  }}
                  key={index}
                >
                  <IonCardHeader>
                    <IonCardTitle className="text-bold">
                      {record.id}
                    </IonCardTitle>
                    <IonCardSubtitle>
                      {convertDate(record?.date)}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonButtons slot="end">
                    <IonButton>
                      <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonItem>
              );
            })}
          </IonContent>
        </IonModal>
        <IonGrid>
          <IonRow>
            <IonCol size="6" sizeLg="5" sizeXs="12" sizeMd="5" sizeSm="12">
              <IonCard>
                {/* <IonAvatar className="ion-float-end br-2">
            </IonAvatar> */}
                <IonItem lines="none">
                  <IonText className="h2 text-bold">{patient?.name}</IonText>
                  <IonButtons slot="end">
                    <IonButton
                      color="primary"
                      size="small"
                      routerLink="/edit-patient"
                    >
                      <IonIcon
                        icon={pencil}
                        size="small"
                        slot="icon-only"
                      ></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <IonThumbnail
                    className="rounded-4"
                    slot="end"
                    onClick={() => {
                      setviewImagePopover(true);
                    }}
                  >
                    <IonImg src={patient?.image}></IonImg>
                  </IonThumbnail>
                </IonItem>
                <IonPopover
                  isOpen={viewImagePopover}
                  onDidDismiss={() => setviewImagePopover(false)}
                >
                  <TransformWrapper>
                    <TransformComponent>
                      <IonImg src={patient?.image}></IonImg>
                    </TransformComponent>
                  </TransformWrapper>
                </IonPopover>
                <IonCardHeader>
                  <IonCardSubtitle className="">
                    <span>
                      {patient?.sex} {calculateAge(patient?.dateOfBirth)}
                    </span>
                    ,{" "}
                    <span>
                      <span className="text-bold">Intake Date</span>
                      {convertDate(patient?.dateOfBirth)}
                    </span>
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase ">
                    <span>{patient?.name}</span>, <span>{patient?.email}</span>
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase text-capitalize ">
                    {patient?.religion}, {patient?.address}
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase text-capitalize "></IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase text-capitalize ">
                    {patient?.bloodGroup}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" sizeLg="7" sizeXs="12" sizeMd="7" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Patient Wishes & Protocols</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <div>
                      <span className="text-bold">
                        Durable Power of Attorney:{" "}
                      </span>
                      {patient?.powerOfAttorney}
                    </div>
                    <div>
                      <span className="text-bold">Health Care Proxy: </span>
                      {patient?.healthCareProxy}
                    </div>
                    <div>
                      <span className="text-bold">Emergency Contact: </span>
                      {patient?.emergencyContact}
                    </div>
                  </IonText>
                  <IonToolbar>
                    {patient?.wishes?.map((wish, index) => {
                      return (
                        <IonChip color="primary" key={index}>
                          <IonLabel>{wish}</IonLabel>
                        </IonChip>
                      );
                    })}{" "}
                    {patient?.wishes?.length === 0 && (
                      <IonChip color="medium">
                        <IonLabel>All Permitted</IonLabel>
                      </IonChip>
                    )}
                  </IonToolbar>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <hr />

        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>Medical History & Current Status</span>
              </p>
            </IonTitle>
          </IonText>
        </IonToolbar>

        <IonGrid>
          <IonRow>
            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Current Medical Conditions</IonCardTitle>
                  <IonCardSubtitle>
                    Diagnosis and Medical Issues
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>{FirstRecord?.diagnosis}</IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Previous Medical Conditions</IonCardTitle>
                  <IonCardSubtitle>
                    Past condition and mode of treatment
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Past Condition</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText>{SecondRecord?.diagnosis}</IonText>
                    </IonCardContent>
                  </IonCard>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Method of Treatment</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText>{SecondRecord?.treatment}</IonText>
                    </IonCardContent>
                  </IonCard>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Immunity & Immunizations</IonCardTitle>
                  <IonCardSubtitle>Name and Date</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  {patientImmninty?.map((immunity, index) => {
                    return (
                      <IonItem lines="full" key={index}>
                        <IonText slot="start">{immunity.name}</IonText>
                        <IonText slot="end">
                          {convertDate(immunity.date)}
                        </IonText>
                      </IonItem>
                    );
                  })}
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Previous Hospitalizations</IonCardTitle>
                  <IonCardSubtitle>Reason and Date</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  {patientRecords
                    ?.filter((record) => record.hasOwnProperty("admission"))
                    .map((record, index) => {
                      return (
                        <IonCard className="ion-no-border mt-2" key={index}>
                          <IonCardHeader>
                            <IonCardTitle>
                              {record.admission?.reason}
                            </IonCardTitle>
                            <IonCardSubtitle>
                              {convertDate(record.admission?.date)}
                            </IonCardSubtitle>
                          </IonCardHeader>
                          <IonCardContent>
                            {record.admission?.description}
                          </IonCardContent>
                        </IonCard>
                      );
                    })}
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Previous Surgeries</IonCardTitle>
                  <IonCardSubtitle>Reason and Date</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonCard className="ion-no-border mt-2">
                    <IonCardHeader>
                      <IonCardTitle>Reason for Surgery</IonCardTitle>
                      <IonCardSubtitle>
                        {faker.date.recent().toLocaleDateString()}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi, sunt!
                    </IonCardContent>
                  </IonCard>
                </IonCardContent>
              </IonCard>
            </IonCol> */}
          </IonRow>
        </IonGrid>

        <hr />

        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>Functioning</span>
              </p>
            </IonTitle>
          </IonText>
        </IonToolbar>

        <IonGrid>
          <IonRow>
            {patientOverview?.map((overview, index) => {
              return (
                <IonCol
                  size="6"
                  sizeLg="4"
                  sizeXs="12"
                  sizeMd="6"
                  sizeSm="12"
                  key={index}
                >
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{overview.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {overview.attribute.map((attribute, _index) => {
                        return (
                          <IonItem lines="full" key={_index}>
                            <IonText slot="start">{attribute.value}</IonText>
                            <IonText slot="end">
                              {attribute.description}
                            </IonText>
                          </IonItem>
                        );
                      })}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* alerts */}
      <IonAlert
        isOpen={alertDischarge}
        onDidDismiss={() => setAlertDischarge(false)}
        cssClass="alert-discharge"
        message={"Discharge " + patient?.name}
        header={"Discharge Patient"}
        buttons={[
          {
            text: "cancel",
            cssClass: "alert-discharge-cancel",
            handler: () => {
              console.log("Confirm failed");
            },
            role: "cancel",
          },
          {
            text: "Discharge",
            cssClass: "alert-discharge-confirm",
            handler: () => {
              console.log("Patient Discharged");
              setLoading(true)
              let v: any = window.document.getElementById("dischargeStatus");
              let data = {
                status: "discharged",
                discharged: true,
                dischargedDate: Date.now(),
                dischargedStatus: v.value ? v.value : "alive",
              };
              firestore
                .collection("patients")
                .doc(patient?.id)
                .collection("records")
                .doc(FirstRecord?.id)
                .update(data)
                .then(() => {
                  setOperationSuccessful(true);
                  setLoading(false)
                })
                .catch((e) => {
                  console.error(e);
                  setLoading(false)
                  alert("discharge failed");
                });

              firestore.collection('dischargedPatients').doc(patient?.id).set({...data,...patient})
              firestore.collection('patients').doc(patient?.id).update(data)
            },
            role: "confirm",
          },
        ]}
        inputs={[
          {
            placeholder: "Status e.g Alive",
            type: "text",
            id: "dischargeStatus",
          },
        ]}
      ></IonAlert>
      <IonAlert
        isOpen={alertAdmit}
        onDidDismiss={() => setAlertAdmit(false)}
        cssClass="alert-admit"
        message={"Admit " + patient?.name}
        header={"Admit Patient"}
        buttons={[
          {
            text: "cancel",
            cssClass: "alert-admit-cancel",
            handler: () => {
              console.log("Confirm failed");
            },
            role: "cancel",
          },
          {
            text: "Admit",
            cssClass: "alert-admit-confirm",
            handler: () => {
              setLoading(true)
              let inputValue: any =
                window.document.getElementById("ward-input");
              let reason: any = window.document.getElementById("ad-input");
              let data = {
                admission: {
                  date: Date.now(),
                  reason: reason.value ? reason.value : "",
                },
                ward: inputValue.value,
                admitted: true,
                admissionDate: Date.now(),
                status:"admitted"
              };
              console.log(FirstRecord?.id)
              firestore
                .collection("patients")
                .doc(patient?.id)
                .collection("records")
                .doc(FirstRecord?.id)
                .update(data)
                .then(() => {
                  console.log("Patient Admitted");
                  setLoading(false)
                  setOperationSuccessful(true);
                })
                .catch((e) => {
                  console.error(e);
                  alert("admission failed");
                  setLoading(false)
                });

              firestore.collection('admittedPatients').doc(patient?.id).set({...data,...patient})
              firestore.collection('patients').doc(patient?.id).update(data)
            },
            role: "confirm",
          },
        ]}
        inputs={[
          {
            placeholder: "Ward ID",
            type: "text",
            id: "ward-input",
          },
          {
            placeholder: "Reason for admission",
            type: "text",
            id: "ad-input",
          },
        ]}
      ></IonAlert>

      {/* loading */}
      <IonLoading
        isOpen={loading}
        onDidDismiss={() => {
          setLoading(false);
          setOperationSuccessful(true);
        }}
      ></IonLoading>

      {/* toast */}
      <IonToast
        isOpen={operationSuccessful}
        message={"Operation Successful"}
        icon={informationCircle}
        color="success"
        duration={2000}
        onDidDismiss={() => {
          setOperationSuccessful(false);
        }}
      ></IonToast>
    </IonPage>
  );
};

export default ViewPatient;
