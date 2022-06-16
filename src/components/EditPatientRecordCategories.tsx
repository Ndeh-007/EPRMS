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
import React, { useRef, useState } from "react";

const Finance: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("submitted");
      }}
    >
      <IonList>
        <IonItem lines="full">
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            required
            name="name"
            type="text"
            placeholder="Name of Payer (Bank Card Name, Mobile Money)"
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Amount</IonLabel>
          <IonInput
            required
            name="amount"
            type="number"
            placeholder="Amount to be paid"
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Date</IonLabel>
          <IonInput
            required
            name="date"
            type="date"
            placeholder="Payment Date"
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Status</IonLabel>
          <IonSelect value={"unpaid"}>
            <IonSelectOption value={"unpaid"}>Unpaid</IonSelectOption>
            <IonSelectOption value={"paid"}>Paid</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Mode</IonLabel>
          <IonSelect
            value={paymentMethod}
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
                name="accountNumber"
                type="number"
                placeholder="Account Number"
              ></IonInput>
            </IonItem>
            <IonItem lines="full">
              <IonLabel position="floating">CVC</IonLabel>
              <IonInput
                required
                name="cvcNumber"
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
                name="insuranceNumber"
                type="number"
                placeholder="Insurance Number"
              ></IonInput>
            </IonItem>
            <IonItem lines="full">
              <IonLabel position="floating">Ins Company</IonLabel>
              <IonInput
                required
                name="insuranceCompany"
                type="text"
                placeholder="Insurance Company"
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
                name="mobileMoneyAccountNumber"
                type="tel"
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

const PatientsComplaint: React.FC = () => {
  const [summary, setSummary] = useState<string | null | undefined>("");
  const summaryRef = useRef<HTMLIonTextareaElement>(null);
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        alert("submitted");
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
            ref={summaryRef}
            onIonChange={(e) => {
              setSummary(summaryRef.current?.value);
              let text = summaryRef.current?.value;
              var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
              console.log(text?.match(regex));
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

const PatientsHistory: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [newHistory, setNewHistory] = useState(false);
  const [newHistoryAttribute, setNewHistoryAttribute] = useState(false);
  return (
    <>
      <IonAccordionGroup>
        <IonAccordion value="Medical History">
          <IonItem slot="header">
            <IonLabel>Medication History</IonLabel>
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
                {loading && (
                  <IonProgressBar type="indeterminate"></IonProgressBar>
                )}
                <IonCardHeader>
                  <IonCardTitle>New Attribute</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="full" fill="outline">
                    <IonLabel position="floating">title</IonLabel>
                    <IonInput
                      type="text"
                      required
                      placeholder="Title of Attribute"
                    ></IonInput>
                  </IonItem>
                  <IonItem
                    lines="full"
                    fill="outline"
                    className="ion-padding-top"
                  >
                    <IonLabel position="floating">Description</IonLabel>
                    <IonTextarea required></IonTextarea>
                  </IonItem>
                </IonCardContent>

                <div className="text-center pt-2 pb-2">
                  <IonButton size="small">Add Attribute</IonButton>
                </div>
              </IonCard>
            )}
            <div className="history-attribute">
              <IonText>
                <div className="h6 text-bold history-attribute-heading">
                  {" "}
                  Lorem Section
                </div>
              </IonText>
              <IonText>
                <div className="ms-2 ps-2 history-attribute-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium itaque dignissimos similique beatae deserunt
                  molestias. Iure, exercitationem? Eius numquam quibusdam sequi,
                  impedit in, illum reiciendis hic, nihil esse ea ratione!
                </div>
              </IonText>
              <IonToolbar color="clear">
                <IonButtons slot="end">
                  <IonButton color="danger" size="small">
                    <IonIcon
                      slot="icon-only"
                      icon={trash}
                      size="small"
                    ></IonIcon>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
              <hr />
            </div>
            <div className="history-attribute">
              <IonText>
                <div className="h6 text-bold history-attribute-heading">
                  {" "}
                  Lorem Section
                </div>
              </IonText>
              <IonText>
                <div className="ms-2 ps-2 history-attribute-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium itaque dignissimos similique beatae deserunt
                  molestias. Iure, exercitationem? Eius numquam quibusdam sequi,
                  impedit in, illum reiciendis hic, nihil esse ea ratione!
                </div>
              </IonText>
              <IonToolbar color="clear">
                <IonButtons slot="end">
                  <IonButton color="danger" size="small">
                    <IonIcon
                      slot="icon-only"
                      icon={trash}
                      size="small"
                    ></IonIcon>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
              <hr />
            </div>{" "}
            <div className="history-attribute">
              <IonText>
                <div className="h6 text-bold history-attribute-heading">
                  {" "}
                  Lorem Section
                </div>
              </IonText>
              <IonText>
                <div className="ms-2 ps-2 history-attribute-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium itaque dignissimos similique beatae deserunt
                  molestias. Iure, exercitationem? Eius numquam quibusdam sequi,
                  impedit in, illum reiciendis hic, nihil esse ea ratione!
                </div>
              </IonText>
              <IonToolbar color="clear">
                <IonButtons slot="end">
                  <IonButton color="danger" size="small">
                    <IonIcon
                      slot="icon-only"
                      icon={trash}
                      size="small"
                    ></IonIcon>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
              <hr />
            </div>
          </div>
        </IonAccordion>
      </IonAccordionGroup>

      {newHistory && (
        <IonCard color="light">
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
              <IonInput placeholder="e.g Hospitalization History"></IonInput>
            </IonItem>
            <div className="text-center pt-2">
              <IonButton size="small">Create</IonButton>
            </div>
          </IonCardContent>
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

const Diagnostics: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<string | null | undefined>("");
  const diagnosticsRef = useRef<HTMLIonTextareaElement>(null);
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        alert("submitted");
      }}
    >
      <IonCard>
        <IonCardContent>{diagnostics}</IonCardContent>
      </IonCard>
      <IonList>
        <IonItem>
          <IonLabel position="floating">Diagnostics</IonLabel>
          <IonTextarea
            placeholder="Diagnostics"
            required
            ref={diagnosticsRef}
            onIonChange={(e) => {
              setDiagnostics(diagnosticsRef.current?.value);
              let text = diagnosticsRef.current?.value;
              var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
              console.log(text?.match(regex));
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

const PhysicalExam: React.FC = () => {
  const [physicalExam, setPhysicalExam] = useState<string | null | undefined>(
    ""
  );
  const physicalExamRef = useRef<HTMLIonTextareaElement>(null);
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        alert("submitted");
      }}
    >
      <IonCard>
        <IonCardContent>{physicalExam}</IonCardContent>
      </IonCard>
      <IonList>
        <IonItem>
          <IonLabel position="floating">Physical Exam</IonLabel>
          <IonTextarea
            placeholder="Physical Exam"
            required
            ref={physicalExamRef}
            onIonChange={(e) => {
              setPhysicalExam(physicalExamRef.current?.value);
              let text = physicalExamRef.current?.value;
              var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
              console.log(text?.match(regex));
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

const LabResults: React.FC = () => {
  const [newTest, setNewTest] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonToolbar>
            <IonCardTitle>Malaria</IonCardTitle>
            <IonCardSubtitle>Ns Comfort</IonCardSubtitle>
            <IonButtons slot="end">
              <IonButton color="danger">
                <IonIcon icon={trash} slot="icon-only" size="small"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonCardHeader>
        <IonCardContent>
          Positive Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Delectus provident sint pariatur temporibus quaerat beatae doloribus
          libero debitis eius quas illo, id impedit illum placeat autem minus
          expedita ducimus voluptate?
        </IonCardContent>
      </IonCard>

      {newTest && (
        <IonCard>
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
              <IonInput type="text" required placeholder="Title"></IonInput>
            </IonItem>
            <IonItem lines="full" fill="outline" className="ion-padding-top">
              <IonLabel position="floating">Handler</IonLabel>
              <IonInput type="text" required placeholder="Handler"></IonInput>
            </IonItem>
            <IonItem lines="full" fill="outline" className="ion-padding-top">
              <IonLabel position="floating">Result</IonLabel>
              <IonTextarea required placeholder="Test Results"></IonTextarea>
            </IonItem>
          </IonCardContent>
          <div className="text-center pt-2 pb-2">
            <IonButton size="small">
              {" "}
              <IonIcon icon={addOutline} slot="start"></IonIcon> Create
            </IonButton>
          </div>
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

const Management: React.FC = () => {
  const slidesRef = useRef<HTMLIonSlidesElement>(null);
  const [newManagmentItem, setNewManangementItem] = useState(false);
  return (
    <div>
      <IonAccordionGroup>
        <IonAccordion value="Medical History">
          <IonItem slot="header" color="clear">
            <IonToolbar color="clear">
              <IonLabel slot="start">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
                nulla tempora facere aliquid quisquam,
              </IonLabel>
            </IonToolbar>
          </IonItem>
          <div slot="content">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Problem</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p className="p">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae obcaecati.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Solution</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p className="p">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae obcaecati dolore perspiciatis repellendus dolores
                    maxime. Iure consequatur eaque accusantium fugit repudiandae
                    obcaecati eos, unde blanditiis dicta doloribus laudantium
                    laborum excepturi.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
            <IonCardContent className="ion-no-padding-vertical">
              <IonToolbar color="clear">
                <IonChip slot="end" color="danger">
                  <IonIcon icon={trash}></IonIcon>
                  <IonLabel>Delete</IonLabel>
                </IonChip>
              </IonToolbar>
            </IonCardContent>
          </div>
        </IonAccordion>
      </IonAccordionGroup>

      {newManagmentItem && (
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
              <IonTextarea placeholder="Enter Problem"></IonTextarea>
            </IonItem>
            <IonItem lines="full" fill="outline" className="ion-padding-top">
              <IonLabel position="floating">Solution</IonLabel>
              <IonTextarea placeholder="Enter Solution"></IonTextarea>
            </IonItem>
            <div className="text-center pt-2 pb-2">
              <IonButton
                size="small"
                onClick={() => setNewManangementItem(true)}
              >
                {" "}
                <IonIcon icon={cloudUpload} slot="start"></IonIcon> submit
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      )}

      {!newManagmentItem && (
        <div className="text-center pt-2 pb-2">
          <IonButton size="small" onClick={() => setNewManangementItem(true)} 
            color="success">
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

const PatientImmunity: React.FC = () => {
  const [newImmunity, setNewImmnunity] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <IonItem lines="full" >
        <IonText slot="start">Tetanus</IonText>
        <IonText slot="end">{faker.date.recent().toLocaleDateString()}</IonText>
      </IonItem>
      {newImmunity && (
        <IonCard mode="md" color="light">
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
                placeholder="e.g tetanus"
              ></IonInput>
            </IonItem>
            <IonItem lines="full" fill="outline" className="ion-padding-top">
              <IonLabel position="floating">Date Taken</IonLabel>
              <IonInput
                type="date"
                required
                placeholder="Date Taken"
              ></IonInput>
            </IonItem>
            <div className="text-center py-1">
              <IonButton size="small">Create</IonButton>
            </div>
          </IonCardContent>
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
