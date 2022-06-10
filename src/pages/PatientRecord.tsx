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

const PatientRecord: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>
                    {faker.name.findName()}</span>{" "}
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
                  <IonCardTitle color="primary">
                  </IonCardTitle>
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
                    </IonCardSubtitle>
                  <IonCardSubtitle><b>On Call :</b> Dr. {faker.name.findName()}</IonCardSubtitle>
                  <IonCardSubtitle><b>Admission Date :</b> <IonText>{faker.date.recent().toLocaleString()}</IonText></IonCardSubtitle>
                  <IonCardSubtitle><b>Discharge Date :</b> <IonText>{faker.date.recent().toLocaleString()}</IonText></IonCardSubtitle>
                  <IonCardSubtitle><b>Discharge Status :</b> <IonText color="success">Alive</IonText></IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle
                    color="primary"
                    // className="ion-padding-start ion-padding-vertical"
                  > 
                  Finance
                  </IonCardTitle>
                  <IonCardSubtitle><b>Mode :</b> Bank</IonCardSubtitle>
                  <IonCardSubtitle><b>Details :</b> [Card Number]</IonCardSubtitle>
                  <IonCardSubtitle><b>status :</b> <IonText color="success">complete</IonText></IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="primary">
                    Patient's Complaint
                  </IonCardTitle>
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
                  <IonCardTitle color="primary">Patient History</IonCardTitle>
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
                  </IonAccordionGroup>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="primary">Physical Exam</IonCardTitle>
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
                  <IonCardTitle color="primary">Diagnosis</IonCardTitle>
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
                  <IonCardTitle color="primary">Lab Results</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonRow className="text-center">
                    <IonCol color="primary">
                      <IonText color="primary">Test</IonText>
                    </IonCol>
                    <IonCol color="primary">
                      <IonText color="primary">Result</IonText>
                    </IonCol>
                    <IonCol color="primary">
                      <IonText color="primary">Handler</IonText>
                    </IonCol>
                  </IonRow>
                  <IonRow className="text-center">
                    <IonCol>Test 1</IonCol>
                    <IonCol>Test result 1</IonCol>
                    <IonCol>Handler 1</IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="primary">Management</IonCardTitle>
                </IonCardHeader>
                <IonCardContent> 
                  <IonGrid> 
                  <IonRow className="text-center">
                    <IonCol color="primary">
                      <IonText color="primary">Problem</IonText>
                    </IonCol>
                    <IonCol color="primary">
                      <IonText color="primary">Solution</IonText>
                    </IonCol> 
                  </IonRow>
                  <IonRow>
                    <IonCol>Lorem ipsum dolor sit amet.</IonCol>
                    <IonCol> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati asperiores est natus perferendis soluta dolores.</IonCol> 
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

export default PatientRecord;
