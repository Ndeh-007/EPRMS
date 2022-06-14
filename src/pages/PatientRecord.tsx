import React, { useRef } from "react";
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
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import "../styles/Page.css";
import "../styles/NewPatient.css";
import { chevronForward, pencil } from "ionicons/icons";
import EditPatientRecord from "../components/EditPatientRecord";

const PatientRecord: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const [isMobileView, setIsMobileView] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editValue, setEditValue] = useState('');

  function closeEditModal(){
    setShowEditModal(false)
  }






  useEffect(() => {
    window.onresize = (e) => { 
      if (window.innerWidth < 768) {
        setIsMobileView(true);
      }else{
        setIsMobileView(false);
      }
    }
  },[window.innerWidth]);
  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>{faker.name.findName()}</span>{" "}
                <span className="fw-light">
                  <IonText>~</IonText>
                </span>{" "}
                <span>
                  <IonText color="medium">[Record ID]</IonText>
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
                    <span>Male</span> ~{" "}
                    <span>{faker.date.recent().toLocaleDateString()}</span>
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase pt-1">
                    <span>{6723339123}</span> ~{" "}
                    <span>{"email@awakedom.com"}</span>
                  </IonCardSubtitle>
                  <IonCardSubtitle className="text-lowercase text-capitalize pt-1">
                    {faker.address.state()}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="primary">Medical</IonCardTitle>
                  <IonCardSubtitle>
                    <b>On Call :</b> Dr. {faker.name.findName()}
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Admission Date :</b>{" "}
                    <IonText>{faker.date.recent().toLocaleString()}</IonText>
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Status :</b>{" "}
                    <IonText color="primary">{"discharged"}</IonText>
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Discharge Date :</b>{" "}
                    <IonText>{faker.date.recent().toLocaleString()}</IonText>
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Discharge Status :</b>{" "}
                    <IonText color="success">Alive</IonText>
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
                      <IonButton color="primary" size="small" onClick={()=>{
                        setEditValue("Finance")
                        setShowEditModal(true)
                      }} >
                        <IonIcon
                          slot="icon-only"
                          icon={pencil}
                          size="small"
                        ></IonIcon>
                      </IonButton>
                    </IonButtons>{" "}
                  </IonToolbar>
                  <IonCardSubtitle>
                    <b>Mode :</b> Bank
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Amount :</b> {Date.now().toLocaleString()} XAF.
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>Details :</b> [Card Number]
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    <b>status :</b> <IonText color="success">complete</IonText>
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">
                      Patient's Complain
                    </IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton color="primary" size="small" onClick={()=>{
                        setEditValue("Patients Complain")
                        setShowEditModal(true)
                      }}>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  cumque distinctio hic. Consequuntur cum aperiam nesciunt
                  ratione fuga voluptates deserunt repudiandae, labore nihil
                  quaerat, beatae nisi accusantium animi exercitationem neque
                  iste soluta blanditiis in voluptatum. Velit provident quasi
                  officiis voluptas fugiat. Possimus voluptatem reiciendis, sunt
                  et dicta nisi est veritatis? Dolorem expedita doloribus
                  adipisci labore. Commodi fugit omnis iure suscipit atque earum
                  voluptates odio pariatur nostrum cupiditate! Ea dolores fugiat
                  mollitia voluptas nihil quis quasi quae corporis voluptatem,
                  unde laborum vitae aut error, magnam expedita doloremque,
                  nostrum repellat exercitationem! Illum adipisci sed rerum,
                  similique officia deleniti tempora velit natus esse.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">Patient History</IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton color="primary" size="small" onClick={()=>{
                        setEditValue("Patient History")
                        setShowEditModal(true)
                      }}>
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
                    <IonAccordion value="Medical History">
                      <IonItem slot="header">
                        <IonLabel>Medication History</IonLabel>
                      </IonItem>
                      <p slot="content" className="p-3">
                        <IonText>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Laudantium itaque dignissimos similique beatae
                          deserunt molestias. Iure, exercitationem? Eius numquam
                          quibusdam sequi, impedit in, illum reiciendis hic,
                          nihil esse ea ratione!
                        </IonText>
                      </p>
                    </IonAccordion>
                    <IonAccordion value="Surgical History">
                      <IonItem slot="header">
                        <IonLabel>Surgical History</IonLabel>
                      </IonItem>
                      <div slot="content" className="p-3 history-attributes">
                        <div className="history-attribute">
                          <IonText>
                            <div className="h6 text-bold history-attribute-heading">
                              {" "}
                              Lorem Section
                            </div>
                          </IonText>
                          <IonText>
                            <div className="ms-2 ps-2 history-attribute-description">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Laudantium itaque dignissimos similique
                              beatae deserunt molestias. Iure, exercitationem?
                              Eius numquam quibusdam sequi, impedit in, illum
                              reiciendis hic, nihil esse ea ratione!
                            </div>
                          </IonText>
                        </div> 
                      </div>
                    </IonAccordion>
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
                      <IonButton color="primary" size="small" onClick={()=>{
                        setEditValue("Physical Exam")
                        setShowEditModal(true)
                      }}>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  cumque distinctio hic. Consequuntur cum aperiam nesciunt
                  ratione fuga voluptates deserunt repudiandae, labore nihil
                  quaerat, beatae nisi accusantium animi exercitationem neque
                  iste soluta blanditiis in voluptatum. Velit provident quasi
                  officiis voluptas fugiat. Possimus voluptatem reiciendis, sunt
                  et dicta nisi est veritatis? Dolorem expedita doloribus
                  adipisci labore. Commodi fugit omnis iure suscipit atque earum
                  voluptates odio pariatur nostrum cupiditate! Ea dolores fugiat
                  mollitia voluptas nihil quis quasi quae corporis voluptatem,
                  unde laborum vitae aut error, magnam expedita doloremque,
                  nostrum repellat exercitationem! Illum adipisci sed rerum,
                  similique officia deleniti tempora velit natus esse.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary"> Diagnostics </IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton color="primary" size="small" onClick={()=>{
                        setEditValue("Diagnostics")
                        setShowEditModal(true)
                      }}>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  cumque distinctio hic. Consequuntur cum aperiam nesciunt
                  ratione fuga voluptates deserunt repudiandae, labore nihil
                  quaerat, beatae nisi accusantium animi exercitationem neque
                  iste soluta blanditiis in voluptatum. Velit provident quasi
                  officiis voluptas fugiat. Possimus voluptatem reiciendis, sunt
                  et dicta nisi est veritatis? Dolorem expedita doloribus
                  adipisci labore. Commodi fugit omnis iure suscipit atque earum
                  voluptates odio pariatur nostrum cupiditate! Ea dolores fugiat
                  mollitia voluptas nihil quis quasi quae corporis voluptatem,
                  unde laborum vitae aut error, magnam expedita doloremque,
                  nostrum repellat exercitationem! Illum adipisci sed rerum,
                  similique officia deleniti tempora velit natus esse.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle color="primary">Lab Results </IonCardTitle>
                    <IonButtons slot="end">
                      <IonButton color="primary" size="small" onClick={()=>{
                        setEditValue("Lab Results")
                        setShowEditModal(true)
                      }}>
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
                  {!isMobileView && (
                    <IonRow className="text-center">
                      <IonCol className="border">Test 1</IonCol>
                      <IonCol className="border">Test result 1</IonCol>
                      <IonCol className="border">Handler 1</IonCol>
                    </IonRow>
                  )}

                  {isMobileView && (
                    <div>
                      <IonItem lines="full" button>
                        <IonLabel slot="start">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Omnis, perferendis.
                        </IonLabel>
                        <IonIcon slot="end" icon={chevronForward}></IonIcon>
                      </IonItem>
                      <IonItem lines="full" button>
                        <IonLabel slot="start">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Omnis, perferendis.
                        </IonLabel>
                        <IonIcon slot="end" icon={chevronForward}></IonIcon>
                      </IonItem>
                      <IonItem lines="full" button>
                        <IonLabel slot="start">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Omnis, perferendis.
                        </IonLabel>
                        <IonIcon slot="end" icon={chevronForward}></IonIcon>
                      </IonItem>
                    </div>
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
                      <IonButton color="primary" size="small" onClick={()=>{
                        setEditValue("Management")
                        setShowEditModal(true)
                      }}>
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
                    <IonRow>
                      <IonCol className="border">
                        Lorem ipsum dolor sit amet.
                      </IonCol>
                      <IonCol className="border">
                        {" "}
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Obcaecati asperiores est natus perferendis soluta
                        dolores.
                      </IonCol>
                    </IonRow>
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
        <EditPatientRecord category={editValue} closeModal={closeEditModal} ></EditPatientRecord>
      </IonModal> 
    </IonPage>
  );
};

export default PatientRecord;
