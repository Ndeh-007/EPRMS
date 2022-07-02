import React, { useContext, useRef } from "react";
import faker from "@faker-js/faker";
import {
  IonAccordion,
  IonAccordionGroup,
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
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon, 
  IonItem,
  IonLabel, 
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle, 
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import "../styles/Page.css";
import "../styles/NewPatient.css";
import { arrowBack, chevronForward, pencil, recording } from "ionicons/icons";
import EditPatientRecord from "../components/EditPatientRecord";
import {
  HistoryInterface,
  Labs,
  ManagementInterface,
  OverviewAttribute,
  PatientRecordInterface,
} from "../interfaces/types";
import { PatientContext, PatientRecordContext } from "../context/AppContent";
import { convertDate } from "../Functions/functions";
import { firestore } from "../Firebase";

const PatientRecord: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const [isMobileView, setIsMobileView] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editValue, setEditValue] = useState("");
  const { patient } = useContext(PatientContext);
  const [appearance, setappearance] = useState<OverviewAttribute[]>();
  const [adl, setadl] = useState<OverviewAttribute[]>();
  const [iadl, setiadl] = useState<OverviewAttribute[]>();
  const [continence, setcontinence] = useState<OverviewAttribute[]>();
  const [histories, sethistories] = useState<HistoryInterface[]>();
  const [managements, setmanagements] = useState<ManagementInterface[]>();
  const {patientRecord,setPatientRecord} =  useContext(PatientRecordContext);
  // const [patientRecord, _setPatientRecord] = useState<PatientRecordInterface>();
  const [labs, setlabs] = useState<Labs[]>();
  const location = useLocation();

  function closeEditModal() {
    setShowEditModal(false);
  }

  async function getAttributes() { 

    let q5 = firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(patientRecord?.id)
      .collection("history")
      .onSnapshot((docs) => {
        let temp: any = docs.docs.map((doc) => doc.data());
        sethistories(temp);
      });

    let q6 = firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(patientRecord?.id)
      .collection("management")
      .onSnapshot((docs) => {
        let temp: any = docs.docs.map((doc) => doc.data());
        setmanagements(temp);
      });

    let q7 = firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(patientRecord?.id)
      .collection("labs")
      .onSnapshot((docs) => {
        let temp: any = docs.docs.map((doc) => doc.data()); 
        setlabs(temp);
      });

    await Promise.all([q5, q6, q7]).then(()=>{
      console.log("fetch successful")
    }).catch((e)=>{
      console.error(e)
    });
  }

  useEffect(() => { 
    getAttributes();
  }, [location]);

  useEffect(() => {
    window.onresize = (e) => {
      if (window.innerWidth < 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };
  }, [window.innerWidth]);
  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>{patient?.name}</span>{" "}
                <span className="fw-light">
                  <IonText>~</IonText>
                </span>{" "}
                <span>
                  <IonText color="medium">{patientRecord?.id}</IonText>
                </span>
              </p>
            </IonTitle>
          </IonText>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeLg="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="primary"></IonCardTitle>
                  <IonCardSubtitle className="pt-1">
                    <span>{patient?.sex}</span>,{" "}
                    <span>{convertDate(patient?.dateOfBirth)}</span>
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase pt-1">
                    <span>{patient?.tel}</span>, <span>{patient?.email}</span>
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase text-capitalize pt-1">
                    {patient?.address}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="primary">Medical</IonCardTitle>
                  <IonCardSubtitle>
                    <b>On Call :</b>{" "}
                    {patient?.handlers?.map((handler) => handler).join(", ")}
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Admission Date :</b>{" "}
                    <IonText>{convertDate(patient?.date, true)}</IonText>
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Status :</b>{" "}
                    <IonText color="primary">{patient?.status}</IonText>
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Discharge Date :</b>{" "}
                    <IonText>
                      {convertDate(Number(patient?.dischargedDate))}
                    </IonText>
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Discharge Status :</b>{" "}
                    <IonText color="success">
                      {patient?.dischargeStatus}
                    </IonText>
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Ward :</b>{" "}
                    <IonText color="secondary">{patient?.ward}</IonText>
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="4">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle
                      color="primary"
                      // className="ion-padding-start ion-padding-vertical"
                    >
                      Finance
                    </IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          setEditValue("Finance");
                          setShowEditModal(true);
                        }}
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={pencil}
                          size="small"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>{" "}
                  </IonToolbar>
                  <IonCardSubtitle>
                    <b>Mode :</b> {patient?.cardNumber}
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Amount :</b> {Date.now().toLocaleString()} XAF.
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Details :</b> {patient?.cardNumber}
                  </IonCardSubtitle>
                  {/* <IonCardSubtitle>
                    <b>Details :</b> {patient?.cardNumber}
                  </IonCardSubtitle> */}
                  <IonCardSubtitle>
                    <b>status :</b> <IonText color="warning">pending</IonText>
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="8">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">
                      Patient's Complaint
                    </IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          setEditValue("Patients Complain");
                          setShowEditModal(true);
                        }}
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={pencil}
                          size="small"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>{" "}
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                  {patientRecord?.patientComplaint}
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">Appearance</IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setEditValue("Appearance");
                          setShowEditModal(true);
                        }}
                      >
                        <IonIcon
                          icon={pencil}
                          slot="icon-only"
                          size="small"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                  {patientRecord?.appearance?.map((_appearance, index) => {
                    return (
                      <IonItem lines="full" key={index}>
                        <IonText slot="start">{_appearance.value}</IonText>
                        <IonText slot="end">{_appearance.description}</IonText>
                      </IonItem>
                    );
                  })}
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">
                      Instrumental Activities of Daily Living (IADL)
                    </IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setEditValue("IADL");
                          setShowEditModal(true);
                        }}
                      >
                        <IonIcon
                          icon={pencil}
                          size="small"
                          slot="icon-only"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                  {patientRecord?.iadl?.map((_iadl, index) => {
                    return (
                      <IonItem lines="full" key={index}>
                        <IonText slot="start">{_iadl.value}</IonText>
                        <IonText slot="end">{_iadl.description}</IonText>
                      </IonItem>
                    );
                  })}
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">
                      Activities of Daily Living (ADL)
                    </IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setEditValue("ADL");
                          setShowEditModal(true);
                        }}
                      >
                        <IonIcon
                          icon={pencil}
                          size="small"
                          slot="icon-only"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                  {patientRecord?.adl?.map((_adl, index) => {
                    return (
                      <IonItem lines="full" key={index}>
                        <IonText slot="start">{_adl.value}</IonText>
                        <IonText slot="end">{_adl.description}</IonText>
                      </IonItem>
                    );
                  })}
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeLg="4" sizeXs="12" sizeMd="6" sizeSm="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">Continence</IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        onClick={() => {
                          setEditValue("Continence");
                          setShowEditModal(true);
                        }}
                        size="small"
                        color="primary"
                      >
                        <IonIcon
                          icon={pencil}
                          slot="icon-only"
                          size="small"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                  {patientRecord?.continence?.map((_continence, index) => {
                    return (
                      <IonItem lines="full" key={index}>
                        <IonText slot="start">{_continence.value}</IonText>
                        <IonText slot="end">{_continence.description}</IonText>
                      </IonItem>
                    );
                  })}
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="8">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">Patient History</IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          setEditValue("Patient History");
                          setShowEditModal(true);
                        }}
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={pencil}
                          size="small"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>{" "}
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                  <IonAccordionGroup>
                    {histories?.map((history, index) => { 
                      return (
                        <IonAccordion value={history.title} key={index}>
                          <IonItem slot="header">
                            <IonLabel>{history.title}</IonLabel>
                          </IonItem>
                          <div
                            slot="content"
                            className="p-3 history-attributes"
                          >
                            {history.attributes.map((attribute, index) => {
                              return (
                                <div className="history-attribute">
                                  <IonText>
                                    <div className="h6 text-bold history-attribute-heading">
                                      {attribute.title}
                                    </div>
                                  </IonText>
                                  <IonText>
                                    <div className="ms-2 ps-2 history-attribute-description">
                                      {attribute.description}
                                    </div>
                                  </IonText>
                                </div>
                              );
                            })}
                          </div>
                        </IonAccordion>
                      );
                    })}
                  </IonAccordionGroup>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">Physical Exam</IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          setEditValue("Physical Exam");
                          setShowEditModal(true);
                        }}
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={pencil}
                          size="small"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>{" "}
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>{patientRecord?.physicalExam}</IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary"> Diagnosis </IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          setEditValue("Diagnostics");
                          setShowEditModal(true);
                        }}
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={pencil}
                          size="small"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>{" "}
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>{patientRecord?.diagnosis}</IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">Lab Results </IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          setEditValue("Lab Results");
                          setShowEditModal(true);
                        }}
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={pencil}
                          size="small"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>{" "}
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                  {!isMobileView && (
                    <IonRow className="text-center row-header">
                      <IonCol className="border">
                        <IonText>Test</IonText>
                      </IonCol>
                      <IonCol className="border">
                        <IonText>Result</IonText>
                      </IonCol>
                      <IonCol className="border">
                        <IonText>Handler</IonText>
                      </IonCol>
                    </IonRow>
                  )}
                  {!isMobileView ? (
                    <>
                      {labs?.map((lab, index) => {
                      return  <IonRow className="text-center" key={index}>
                          <IonCol className="border">{lab.test}</IonCol>
                          <IonCol className="border">{lab.result}</IonCol>
                          <IonCol className="border">{lab.handler}</IonCol>
                        </IonRow>
                      })}
                    </>
                  ) : (
                    ""
                  )}

                  {isMobileView && (
                    <IonAccordionGroup>
                      {labs?.map((lab, index) => { 
                        return (
                          <IonAccordion key={index}>
                            <IonItem lines="full" button slot="header">
                              <IonLabel slot="start">{lab.test}</IonLabel>
                            </IonItem>
                            <div
                              slot="content"
                              className="p-3 history-attributes"
                            >
                              <div className="history-attribute">
                                <IonText>
                                  <div className="h6 text-bold history-attribute-heading">
                                    {lab.test}
                                  </div>
                                </IonText>
                                <IonText>
                                  <div className="ms-2 ps-2 history-attribute-description">
                                    {lab.result}
                                  </div>
                                </IonText>
                              </div>
                            </div>
                          </IonAccordion>
                        );
                      })}
                    </IonAccordionGroup>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary"> Management </IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          setEditValue("Management");
                          setShowEditModal(true);
                        }}
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={pencil}
                          size="small"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>{" "}
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow className="text-center row-header">
                      <IonCol className="border">
                        <IonText>Problem</IonText>
                      </IonCol>
                      <IonCol className="border">
                        <IonText>Solution</IonText>
                      </IonCol>
                    </IonRow>
                    {managements?.map((management, index) => {
                      return (
                        <IonRow key={index}>
                          <IonCol className="border">
                            {management.problem}
                          </IonCol>
                          <IonCol className="border">
                            {management.solution}
                          </IonCol>
                        </IonRow>
                      );
                    })}
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonModal
        isOpen={showEditModal}
        onDidDismiss={() => setShowEditModal(false)}
      >
        <EditPatientRecord
          category={editValue}
          closeModal={closeEditModal}
          recordId={patientRecord?.id}
        ></EditPatientRecord>
      </IonModal>
    </IonPage>
  );
};

export default PatientRecord;
