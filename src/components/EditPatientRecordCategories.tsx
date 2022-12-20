import faker from "@faker-js/faker";
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSlide,
  IonSlides,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  addOutline,
  addSharp,
  arrowBack,
  close,
  closeOutline,
  closeSharp,
  cloudUpload,
  stop,
  trash,
  trashBin,
} from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  PatientContext,
  PatientRecordContext,
  StaffContext,
} from "../context/AppContent";
import { firestore } from "../Firebase";
import {
  HistoryAttribute,
  HistoryInterface,
  Immunity,
  Labs,
  ManagementInterface,
  PatientRecordInterface,
  Payment,
} from "../interfaces/types";
import uniqid from "uniqid";

const Finance: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { patient, setPatient } = useContext(PatientContext);
  const { patientRecord, setPatientRecord } = useContext(PatientRecordContext);
  function updatePaymentInfo(payment: Payment) {
    let q1 = firestore.collection("patients").doc(patient?.id).update({
      payment: payment,
    });
    let q2 = firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(patientRecord?.id)
      .update({ payment: payment });

    return Promise.all([q1, q2]).then(()=>{
      let tr:any = patientRecord;
      tr.payment = payment;
      let tp:any = patient;
      tp.payment = payment;
      setPatientRecord(tr);
      setPatient(tp);
    }).catch((error)=>{
      console.log('updating payment error: ',error);
    });
  }
  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        let data: Payment = {
          date: Date.now().toString(),
          mode: e.target.mode.value,
          amount: e.target.amount.title,
          details: e.target.details.value,
          status: "pending",
          momoNumber: e.target.momoNumber.value || " ",
          cardNumber: e.target.cardNumber.value || " ",
          cvc: e.target.cvc.value || " ",
          expirationDate: e.target.expirationDate.value || " ",
          insuranceID: e.target.insuranceID.value || " ",
        };
        updatePaymentInfo(data);
        alert("submitted");
      }}
    >
      <IonList>
        <IonItem lines="full">
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            required
            value={patient?.name}
            name="name"
            type="text"
            placeholder="Name of Payer (Bank Card Name, Mobile Money)"
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Amount</IonLabel>
          <IonInput
            required
            value={patientRecord?.payment?.amount}
            name="amount"
            type="number"
            placeholder="Amount to be paid"
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Status</IonLabel>
          <IonSelect value={patientRecord?.payment?.status} name='status'>
            <IonSelectOption value={"pending"}>Pending</IonSelectOption>
            <IonSelectOption value={"completed"}>Completed</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Mode</IonLabel>
          <IonSelect
            value={paymentMethod}
            name='mode'
            onIonChange={(e) => {
              setPaymentMethod(e.detail.value);
            }}
          >
            <IonSelectOption value={"bank"}>Bank</IonSelectOption>
            <IonSelectOption value={"insurance"}>Insurance</IonSelectOption>
            <IonSelectOption value={"mobileMoney"}>
              Mobile Money
            </IonSelectOption>
            <IonSelectOption value={"cash"}>Cash</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* dynamic input fields */}

        {paymentMethod === "bank" && (
          <>
            <IonItem lines="full">
              <IonLabel position="floating">Acc Number</IonLabel>
              <IonInput
                required
                value={patientRecord?.payment?.cardNumber}
                name="accountNumber"
                type="number"
                placeholder="Account Number"
              ></IonInput>
            </IonItem>
            <IonItem lines="full">
              <IonLabel position="floating">CVC</IonLabel>
              <IonInput
                required
                value={patientRecord?.payment?.cvc}
                name="cvc"
                type="number"
                placeholder="CVC Number"
              ></IonInput>
            </IonItem>
          </>
        )}

        {paymentMethod === "insurance" && (
          <>
            <IonItem lines="full">
              <IonLabel position="floating">Ins Number</IonLabel>
              <IonInput
                required
                name="insuranceID"
                value={patientRecord?.payment?.insuranceID}
                type="number"
                placeholder="Insurance Number"
              ></IonInput>
            </IonItem> 
          </>
        )}

        {paymentMethod === "mobileMoney" && (
          <>
            <IonItem lines="full">
              <IonLabel position="floating">Account Number</IonLabel>
              <IonInput
                required
                name="momoNumber"
                type="tel"
                value={patientRecord?.payment?.momoNumber}
                placeholder="Account Number"
              ></IonInput>
            </IonItem>
          </>
        )}
      </IonList>
      <div className="text-center pt-2">
        <IonButton type="submit">Submit</IonButton>
      </div>
    </form>
  );
};

/**
 ** Patient's Complaint
 *
 */

const PatientsComplaint: React.FC<{ recordId?: string }> = ({ recordId }) => {
  const [summary, setSummary] = useState<string | null | undefined>("");
  const summaryRef = useRef<HTMLIonTextareaElement>(null);
  const { patient,setPatient } = useContext(PatientContext); 
  const { patientRecord, setPatientRecord } = useContext(PatientRecordContext);

  useEffect(() => {
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(recordId)
      .onSnapshot((snap) => {
        let doc: any = snap.data();
        setSummary(doc.patientComplaint ? doc.patientComplaint : "");
      });
  }, []);

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        firestore
          .collection("patients")
          .doc(patient?.id)
          .collection("records")
          .doc(recordId)
          .update({ patientComplaint: e.target.complaint.value })
          .then(() => {
            console.log("updated");
            let tr: any = patientRecord;
            tr.patientComplaint = e.target.complaint.value;
            setPatientRecord(tr);
          });
      }}
    >
      <IonCard>
        <IonCardContent>{summary}</IonCardContent>
      </IonCard>
      <IonList>
        <IonItem>
          <IonLabel position="floating">Patient's Complaint</IonLabel>
          <IonTextarea
            placeholder="Patient's Complaint"
            required
            name="complaint"
            ref={summaryRef}
            // value={summary}
            onIonChange={(e) => {
              setSummary(summaryRef.current?.value);
            }}
          ></IonTextarea>
        </IonItem>
      </IonList>

      <div className="text-center pt-2">
        <IonButton type="submit">Submit</IonButton>
      </div>
    </form>
  );
};

/**
 * *Patient's History
 *
 */

const PatientsHistory: React.FC<{ recordId?: string }> = ({ recordId }) => {
  const { patient,setPatient } = useContext(PatientContext); 
  const { patientRecord, setPatientRecord } = useContext(PatientRecordContext);
  const [loading, setLoading] = useState(false);
  const [newHistory, setNewHistory] = useState(false);
  const [newHistoryAttribute, setNewHistoryAttribute] = useState(false);
  const [allHistories, setAllHistories] = useState<HistoryInterface[]>();

  function getHistories() {
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(patientRecord?.id)
      .collection("history")
      .onSnapshot((snap) => {
        let docs: any = snap.docs.map((doc) => doc.data());
        setAllHistories(docs);
      });
  }

  useEffect(() => {
    getHistories();
  }, []);
  return (
    <>
      <IonAccordionGroup>
        {allHistories?.map((_history, index) => {
          return (
            <IonAccordion value={_history.title} key={index}>
              <IonItem slot="header">
                <IonLabel>{_history.title}</IonLabel>
              </IonItem>
              <div slot="content" className="p-3 history-attributes">
                <IonToolbar color="clear">
                  {newHistoryAttribute ? (
                    <IonButton
                      slot="end"
                      color="danger"
                      size="small"
                      onClick={() => {
                        setNewHistoryAttribute(false);
                      }}
                    >
                      <IonIcon icon={closeOutline} slot="start"></IonIcon>
                      <IonLabel>cancel</IonLabel>
                    </IonButton>
                  ) : (
                    <IonButton
                      slot="end"
                      color="medium"
                      size="small"
                      onClick={() => {
                        setNewHistoryAttribute(true);
                      }}
                    >
                      <IonIcon icon={addOutline} slot="start"></IonIcon>
                      <IonLabel>Add Attribute</IonLabel>
                    </IonButton>
                  )}
                </IonToolbar>
                {newHistoryAttribute && (
                  <IonCard className="mb-4" color="light">
                    <form
                      onSubmit={(e: any) => {
                        e.preventDefault();
                        setLoading(true);
                        let data: HistoryAttribute = {
                          date: e.target.date.value,
                          description: e.target.description.value,
                          title: e.target.title.value,
                          id: uniqid(),
                        }; 
                        firestore
                          .collection("patients")
                          .doc(patient?.id)
                          .collection("records")
                          .doc(patientRecord?.id)
                          .collection("history")
                          .doc(_history.id)
                          .update({
                            attributes: [..._history.attributes, data],
                          })
                          .then(() => {
                            setNewHistoryAttribute(false);
                            setLoading(false);
                          });
                      }}
                    >
                      {loading && (
                        <IonProgressBar type="indeterminate"></IonProgressBar>
                      )}
                      <IonCardHeader>
                        <IonCardTitle>New Attribute</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonItem
                          lines="full"
                          fill="outline"
                          className="ion-margin-bottom"
                        >
                          <IonLabel position="floating">title</IonLabel>
                          <IonInput
                            type="text"
                            required
                            placeholder="Title of Attribute"
                            name="title"
                          ></IonInput>
                        </IonItem>
                        <IonItem
                          lines="full"
                          fill="outline"
                          className="ion-margin-bottom"
                        >
                          <IonLabel position="floating">date</IonLabel>
                          <IonInput
                            type="date"
                            name="date"
                            required
                            placeholder="Date of Activity"
                          ></IonInput>
                        </IonItem>
                        <IonItem
                          lines="full"
                          fill="outline"
                          className="ion-margin-bottom"
                        >
                          <IonLabel position="floating">Description</IonLabel>
                          <IonTextarea
                            required
                            name="description"
                          ></IonTextarea>
                        </IonItem>
                      </IonCardContent>

                      <div className="text-center pt-2 pb-2">
                        <IonButton size="small" type="submit">
                          Add Attribute
                        </IonButton>
                      </div>
                    </form>
                  </IonCard>
                )}
                {_history.attributes.map((attribute, key) => {
                  <div className="history-attribute" key={key}>
                    <IonText>
                      <div className="h6 text-bold history-attribute-heading">
                        {attribute.title} <span className="text-muted fw-light fw-h6"> - {attribute.date}</span>
                      </div>
                    </IonText>
                    <IonText>
                      <div className="ms-2 ps-2 history-attribute-description">
                        {attribute.description}
                      </div>
                    </IonText>
                    <IonToolbar color="clear">
                      <IonButtons slot="end">
                        <IonButton
                          color="danger"
                          size="small"
                          onClick={() => {
                            setLoading(true);
                            let index = key;
                            let temp = _history.attributes;
                            temp.splice(index, 1);
                            firestore
                              .collection("patients")
                              .doc(patient?.id)
                              .collection("records")
                              .doc(patientRecord?.id)
                              .collection("history")
                              .doc(_history.id)
                              .update({ attributes: temp });
                            setLoading(false);
                          }}
                        >
                          <IonIcon
                            slot="icon-only"
                            icon={trash}
                            size="small"
                          ></IonIcon>
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                    <hr />
                  </div>;
                })}
              </div>
            </IonAccordion>
          );
        })}
      </IonAccordionGroup>

      {newHistory && (
        <IonCard color="light">
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              setLoading(true);
              let data: HistoryInterface = {
                id: e.target.title.value,
                title: e.target.title.value,
                attributes: [],
              };
              firestore
                .collection("patients")
                .doc(patient?.id)
                .collection("records")
                .doc(patientRecord?.id)
                .collection("history")
                .doc(data.id)
                .set(data)
                .then(() => {
                  setLoading(false);
                  setNewHistory(false);
                });
            }}
          >
            {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
            <IonCardHeader>
              <IonToolbar color="light">
                <IonCardTitle>New History</IonCardTitle>
                <IonButton
                  slot="end"
                  color="danger"
                  size="small"
                  onClick={() => {
                    setNewHistory(false);
                  }}
                >
                  <IonIcon icon={closeOutline} slot="start"></IonIcon>
                  cancel
                </IonButton>
              </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
              <IonItem fill="outline" lines="full">
                <IonLabel position="floating">History Title</IonLabel>
                <IonInput
                  placeholder="e.g Hospitalization History"
                  name="title"
                ></IonInput>
              </IonItem>
              <div className="text-center pt-2">
                <IonButton size="small" type="submit">
                  Create
                </IonButton>
              </div>
            </IonCardContent>
          </form>
        </IonCard>
      )}

      <div className="text-center pt-2">
        {!newHistory && (
          <IonButton
            size="small"
            onClick={() => {
              setNewHistory(true);
            }}
            color="success"
          >
            <IonIcon slot="start" icon={addOutline}></IonIcon> New History
          </IonButton>
        )}
      </div>
    </>
  );
};

/**
 ** Patient's Diagnosis
 *
 */

const Diagnostics: React.FC<{ recordId?: string }> = ({ recordId }) => {
  const [diagnosis, setdiagnosis] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const { patient,setPatient } = useContext(PatientContext); 
  const { patientRecord, setPatientRecord } = useContext(PatientRecordContext);
  const diagnosisRef = useRef<HTMLIonTextareaElement>(null);

  function fetchDiagnosis() {
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(recordId)
      .onSnapshot((snapshot) => {
        let docs: any = snapshot.data();
        setdiagnosis(docs.diagnosis);
      });
  }

  useEffect(() => {
    fetchDiagnosis();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        firestore
          .collection("patients")
          .doc(patient?.id)
          .collection("records")
          .doc(recordId)
          .update({ diagnosis: diagnosis })
          .then(() => {
            setLoading(false);
            let tr:any = patientRecord;
            tr.diagnosis = diagnosis;
            setPatientRecord(tr);
          })
          .catch((e) => {
            console.error(e);
            setLoading(false);
          });
      }}
    >
      <IonCard>
        {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
        <IonCardContent>{diagnosis}</IonCardContent>
      </IonCard>
      <IonList>
        <IonItem>
          <IonLabel position="floating">diagnosis</IonLabel>
          <IonTextarea
            placeholder="diagnosis"
            required
            name="diagnosis"
            ref={diagnosisRef}
            onIonChange={(e) => {
              setdiagnosis(diagnosisRef.current?.value);
            }}
          ></IonTextarea>
        </IonItem>
      </IonList>

      <div className="text-center pt-2">
        <IonButton type="submit">Submit</IonButton>
      </div>
    </form>
  );
};

/**
 ** Physical Examination
 *
 */

const PhysicalExam: React.FC<{ recordId?: string }> = ({ recordId }) => {
  const [physicalExam, setPhysicalExam] = useState<string | null | undefined>(
    ""
  );
  const physicalExamRef = useRef<HTMLIonTextareaElement>(null);
  const [loading, setLoading] = useState(false);
  const { patient,setPatient } = useContext(PatientContext); 
  const { patientRecord, setPatientRecord } = useContext(PatientRecordContext);
  useEffect(() => {
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(recordId)
      .onSnapshot((doc) => {
        let _doc: any = doc.data();
        setPhysicalExam(_doc.physicalExam);
      });
  }, []);

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        alert("submitted");
        let data = physicalExamRef.current?.value;

        firestore
          .collection("patients")
          .doc(patient?.id)
          .collection("records")
          .doc(recordId)
          .update({ physicalExam: data })
          .then(() => {
            setLoading(false);
            let tr:any = patientRecord;
            tr.physicalExam = data;
            setPatientRecord(tr);
            console.log("completed");
          })
          .catch((e) => {
            console.error(e);
            setLoading(false);
          });
      }}
    >
      <IonCard>
        {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
        <IonCardContent>{physicalExam}</IonCardContent>
      </IonCard>
      <IonList>
        <IonItem>
          <IonLabel position="floating">Physical Exam</IonLabel>
          <IonTextarea
            placeholder="Physical Exam"
            required
            ref={physicalExamRef}
            name={"physicalExam"}
            onIonChange={(e) => {
              setPhysicalExam(physicalExamRef.current?.value); 
            }}
          ></IonTextarea>
        </IonItem>
      </IonList>

      <div className="text-center pt-2">
        <IonButton type="submit">Submit</IonButton>
      </div>
    </form>
  );
};

const LabResults: React.FC<{ recordId?: string }> = ({ recordId }) => {
  const [newTest, setNewTest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [LabResults, setLabResults] = useState<Labs[]>();
  const { staff } = useContext(StaffContext);
  const { patient } = useContext(PatientContext);

  useEffect(() => {
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(recordId)
      .collection("labs")
      .onSnapshot((snap) => {
        let docs: any = snap.docs.map((doc) => {
          return doc.data();
        });
        setLabResults(docs);
      });
  }, []);
  return (
    <>
      {LabResults?.map((labs, index) => {
        return (
          <IonCard key={index}>
            <IonCardHeader>
              <IonToolbar>
                <IonCardTitle>{labs?.test}</IonCardTitle>
                <IonCardSubtitle>{labs?.handler}</IonCardSubtitle>
                <IonButtons slot="end">
                  <IonButton color="danger">
                    <IonIcon
                      icon={trash}
                      slot="icon-only"
                      size="small"
                    ></IonIcon>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonCardHeader>
            <IonCardContent>{labs?.result}</IonCardContent>
          </IonCard>
        );
      })}

      {newTest && (
        <IonCard>
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              setLoading(true);
              let _handler = e.target.handler.value
                ? e.target.handler.value
                : staff?.name;
              let data: Labs = {
                date: Date.now(),
                test: e.target.test.value,
                handler: _handler,
                result: e.target.results.value,
              };
              firestore
                .collection("patients")
                .doc(patient?.id)
                .collection("records")
                .doc(recordId)
                .collection("labs")
                .doc(data.test)
                .set(data)
                .then(() => {
                  setLoading(false);
                })
                .catch((e) => {
                  setLoading(false);
                  console.error(e);
                });
            }}
          >
            {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
            <IonCardHeader>
              <IonToolbar>
                <IonCardTitle>New Test</IonCardTitle>
                <IonButton
                  size="small"
                  slot="end"
                  color="danger"
                  onClick={() => {
                    setNewTest(false);
                  }}
                >
                  <IonIcon slot="start" icon={closeSharp}></IonIcon>
                  <IonLabel>Close</IonLabel>
                </IonButton>
              </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="full" fill="outline">
                <IonLabel position="floating">Title</IonLabel>
                <IonInput
                  type="text"
                  name="test"
                  required
                  placeholder="Title"
                ></IonInput>
              </IonItem>
              <IonItem lines="full" fill="outline" className="ion-padding-top">
                <IonLabel position="floating">Handler</IonLabel>
                <IonInput
                  type="text"
                  name="handler"
                  placeholder="Handler"
                ></IonInput>
              </IonItem>
              <IonItem lines="full" fill="outline" className="ion-padding-top">
                <IonLabel position="floating">Result</IonLabel>
                <IonTextarea
                  required
                  name="results"
                  placeholder="Test Results"
                ></IonTextarea>
              </IonItem>
            </IonCardContent>
            <div className="text-center pt-2 pb-2">
              <IonButton size="small" type="submit">
                {" "}
                <IonIcon icon={addOutline} slot="start"></IonIcon> Create
              </IonButton>
            </div>
          </form>
        </IonCard>
      )}

      {!newTest && (
        <div className="text-center pt-2 pb-2">
          <IonButton size="small" onClick={() => setNewTest(true)}>
            {" "}
            <IonIcon icon={addOutline} slot="start"></IonIcon> Add Test
          </IonButton>
        </div>
      )}
    </>
  );
};

const Management: React.FC<{ recordId?: string }> = ({ recordId }) => {
  const [loading, setloading] = useState(false);
  const { patient } = useContext(PatientContext);
  const [management, setManagement] = useState<ManagementInterface[]>();
  const [newManagmentItem, setNewManangementItem] = useState(false);

  useEffect(() => {
    firestore
      .collection("patients")
      .doc(patient?.id)
      .collection("records")
      .doc(recordId)
      .collection("management")
      .onSnapshot((snap) => {
        let docs: any = snap.docs.map((doc) => doc.data());
        setManagement(docs);
      });
  }, []);

  function deleteItem(item: ManagementInterface) {
    setloading(true);
    if (item) {
      let _item = item.date.toString();
      firestore
        .collection("patients")
        .doc(patient?.id)
        .collection("records")
        .doc(recordId)
        .collection("management")
        .doc(_item)
        .delete()
        .then(() => {
          console.log("deleted");
          setloading(false);
        });
    }
  }
  return (
    <div>
      {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      {management?.map((mgtItem, index) => {
        return (
          <IonAccordionGroup key={index}>
            <IonAccordion value={mgtItem.problem}>
              <IonItem slot="header" color="clear">
                <IonToolbar color="clear">
                  <IonLabel slot="start">{mgtItem.problem}</IonLabel>
                </IonToolbar>
              </IonItem>
              <div slot="content">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Problem</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText>
                      <p className="p">{mgtItem.problem}</p>
                    </IonText>
                  </IonCardContent>
                </IonCard>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Solution</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText>
                      <p className="p">{mgtItem.solution}</p>
                    </IonText>
                  </IonCardContent>
                </IonCard>
                <IonCardContent className="ion-no-padding-vertical">
                  <IonToolbar color="clear">
                    <IonChip
                      slot="end"
                      color="danger"
                      onClick={() => {
                        deleteItem(mgtItem);
                      }}
                    >
                      <IonIcon icon={trash}></IonIcon>
                      <IonLabel>Delete</IonLabel>
                    </IonChip>
                  </IonToolbar>
                </IonCardContent>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        );
      })}

      {newManagmentItem && (
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            setloading(true);
            let data: ManagementInterface = {
              date: Date.now().toString(),
              problem: e.target.problem.value,
              solution: e.target.solution.value,
            };

            firestore
              .collection("patients")
              .doc(patient?.id)
              .collection("records")
              .doc(recordId)
              .collection("management")
              .doc(data.date)
              .set(data)
              .then(() => {
                setloading(false);
                console.log("management updated");
              })
              .catch((e) => {
                console.error(e);
                setloading(false);
              });
          }}
        >
          <IonCard>
            <IonCardHeader>
              <IonToolbar>
                <IonCardTitle slot="start">New Management Item</IonCardTitle>
                <IonButton
                  slot="end"
                  color="danger"
                  size="small"
                  onClick={() => {
                    setNewManangementItem(false);
                  }}
                >
                  <IonIcon icon={close} slot="start"></IonIcon>
                  <IonLabel>Close</IonLabel>
                </IonButton>
              </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="full" fill="outline">
                <IonLabel position="floating">Problem</IonLabel>
                <IonTextarea
                  placeholder="Enter Problem"
                  required
                  name="problem"
                ></IonTextarea>
              </IonItem>
              <IonItem lines="full" fill="outline" className="ion-padding-top">
                <IonLabel position="floating">Solution</IonLabel>
                <IonTextarea
                  placeholder="Enter Solution"
                  name="solution"
                  required
                ></IonTextarea>
              </IonItem>
              <div className="text-center pt-2 pb-2">
                <IonButton
                  size="small"
                  type="submit"
                  onClick={() => setNewManangementItem(true)}
                >
                  {" "}
                  <IonIcon icon={cloudUpload} slot="start"></IonIcon> submit
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </form>
      )}

      {!newManagmentItem && (
        <div className="text-center pt-2 pb-2">
          <IonButton
            size="small"
            onClick={() => setNewManangementItem(true)}
            color="success"
          >
            {" "}
            <IonIcon icon={addOutline} slot="start"></IonIcon> Add
          </IonButton>
        </div>
      )}
    </div>
  );
};

/*
 *Immunity & Immunizations
 */

const PatientImmunity: React.FC<{ recordId?: string }> = ({ recordId }) => {
  const [newImmunity, setNewImmnunity] = useState(false);
  const [loading, setLoading] = useState(false);
  const { patient,setPatient } = useContext(PatientContext);
  const [Immunisations, setImmunisations] = useState<Immunity[]>();

  useEffect(() => { 
  }, []);
  return (
    <div>
      {patient?.immunity?.map((immunisation, index) => {
        <IonItem lines="full" key={index}>
          <IonText slot="start">{immunisation.name}</IonText>
          <IonText slot="end">{immunisation.date}</IonText>
        </IonItem>;
      })}
      {newImmunity && (
        <IonCard mode="md" color="light">
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              setLoading(true);
              let data: Immunity = {
                name: e.target.title.value,
                date: e.target.date.value,
              }; 
              let pT:any = [];
              if(patient?.immunity){
                pT = patient?.immunity;
              }
              let temp = [...pT, data]; 
              firestore
                .collection("patients")
                .doc(patient?.id).update({immunity:temp})
                .then(() => {
                  let t:any = patient;
                  t["immunity"] = temp;
                  setPatient(t);
                  setLoading(false);
                }).catch((e)=>{
                  console.log(e);
                  setLoading(false)
                });
            }}
          >
            {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
            <IonCardHeader>
              <IonToolbar color="light">
                <IonCardTitle>New Immuninty</IonCardTitle>
                <IonCardSubtitle>Name & Date</IonCardSubtitle>
                <IonButton
                  className="text-small"
                  size="small"
                  color="danger"
                  onClick={() => setNewImmnunity(false)}
                  slot="end"
                >
                  <IonIcon slot="start" icon={close}></IonIcon>
                  <IonLabel>Cancel</IonLabel>
                </IonButton>
              </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="full" fill="outline" className="ion-padding-top">
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  required
                  name="title"
                  placeholder="e.g tetanus"
                ></IonInput>
              </IonItem>
              <IonItem lines="full" fill="outline" className="ion-padding-top">
                <IonLabel position="floating">Date Taken</IonLabel>
                <IonInput
                  type="date"
                  required
                  name="date"
                  placeholder="Date Taken"
                ></IonInput>
              </IonItem>
              <div className="text-center py-1">
                <IonButton size="small" type="submit">
                  Create
                </IonButton>
              </div>
            </IonCardContent>
          </form>
        </IonCard>
      )}
      <div className="text-center">
        {!newImmunity && (
          <IonButton
            className="text-small pt-1"
            size="small"
            color="success"
            onClick={() => setNewImmnunity(true)}
          >
            <IonIcon slot="start" icon={addOutline}></IonIcon>
            <IonLabel>New</IonLabel>
          </IonButton>
        )}
      </div>
    </div>
  );
};

export {
  Finance,
  PatientsComplaint,
  PatientsHistory,
  Diagnostics,
  PhysicalExam,
  LabResults,
  Management,
  PatientImmunity,
};
