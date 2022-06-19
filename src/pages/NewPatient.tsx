import React, { useContext, useRef } from "react";
import faker from "@faker-js/faker";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
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
  IonLoading,
  IonMenuButton,
  IonNote,
  IonPage,
  IonRippleEffect,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import ExploreContainer from "../components/ExploreContainer";
import LineChart from "../components/LineChart";
import PageHeader from "../components/PageHeader";
import PatientItem from "../components/PatientItem";
import { capitalizeString } from "../Functions/functions";
import { customIcons, localImages } from "../images/images";
import { MPI, Patient } from "../interfaces/types";
import "../styles/Page.css";
import "../styles/NewPatient.css";
import { save } from "ionicons/icons";
import uniqid from "../interfaces/uniqid";
import { firestore, storage } from "../Firebase";
import { PatientContext } from "../context/AppContent";

const NewPatient: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  const {patient,setPatient} = useContext(PatientContext)
  const patientImageInputRef = useRef<HTMLInputElement>(null);
  const [loading, setloading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<any>();
  const [patientImage, setPatientImage] = useState<any>("");
  const [operationSuccessful, setOperationSuccessful] = useState({
    state: false,
    message: "",
    color: "",
  });
  const history = useHistory();
  const [ID, setID] = useState("");

  function InitializeImage(file: File | null | undefined) {
    let i: any = file;
    setProfilePicture(i);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPatientImage(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  }

  async function CreatePatient(data: Patient) {
    var storageRef = storage.ref(`patient/${data.id}/${data.id}-image.jpg`);
    let response = await fetch(patientImage);
    let blob = await response.blob();
    let holder: any = "";

    let query1 = storageRef.put(blob).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        data.image = url;
        holder = data;
        setPatient(data)
        firestore.collection("patients").doc(data.id).set(data); 
      });
    });
    setPatient(data)
    let recordID = uniqid("record-");
    let initRecordData = {
      id: recordID,
      date: Date.now(),
      patient: data,
    };
    let query2 = firestore
      .collection("patients")
      .doc(data.id)
      .collection("records")
      .doc(initRecordData.id)
      .set(initRecordData);

    await Promise.all([query1, query2])
      .then(() => {
        setloading(false);
        setOperationSuccessful({
          state: true,
          message: "Patient Created Successfully",
          color: "success",
        });
        console.log(patient);
        history.push("/view-patient", holder);
      })
      .catch((e) => {
        console.error(e);
        setloading(false);
        setOperationSuccessful({
          state: true,
          message: "Patient Creation Failed",
          color: "danger",
        });
      });
  }
  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonLoading
        isOpen={loading}
        onDidDismiss={() => {
          setloading(false);
        }}
        message="Creating Patient..."
      ></IonLoading>
      <IonContent color="light">
        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>New Patient</span>
                <br />
                <span className="text-regular">
                  <IonNote className="text-small">
                    Enter Patient Information
                  </IonNote>
                </span>
              </p>
            </IonTitle>
          </IonText>
        </IonToolbar>

        <IonGrid className="pt-0 mt-0">
          <form
            action=""
            ref={formRef}
            onSubmit={(e: any) => {
              e.preventDefault();
              setloading(true);
              let names = e.target.name.value;
              let prefix = names.split(" ")[0];
              let _id = uniqid(prefix + "-");
              setID(_id);
              let temp: string[] = [
                e.target.dnr.value ? "DNR" : "",
                e.target.antibiotics.value ? "No Antibiotics" : "",
                e.target.iv.value ? "No IVs" : "",
                e.target.hospitalize.value ? "No Hospitalization" : "",
                e.target.comfortCare.value ? "Only Comfort Care" : "",
              ];
              let wishes = temp.filter((item) => item.length > 0);
              let data: Patient = {
                address: e.target.address.value,
                bloodGroup: e.target.bloodGroup.value,
                dateOfBirth: e.target.dob.value,
                email: e.target.email.value,
                name: e.target.name.value,
                maritalStatus: e.target.maritalStatus.value,
                occupation: e.target.occupation.value,
                sex: e.target.sex.value,
                tel: e.target.tel.value,
                tribe: e.target.tribe.value,
                id: _id,
                image: "",
                cardNumber: e.target.cardNumber.value,
                condition: e.target.condition.value,
                expirationDate: e.target.cardExpiryDate.value,
                momoNumber: e.target.momo.value,
                insurance: e.target.insuranceID.value,
                wishes: wishes.length > 0 ? wishes : [],
                healthCareProxy: e.target.healthProxy.value,
                powerOfAttorney: e.target.attorney.value,
                date: Date.now(),
                religion:e.target.religion.value,
                emergencyContact:e.target.emergencyContact.value, 
              };
              CreatePatient(data);
            }}
          >
            <IonRow>
              <IonCol size="12">
                <IonCard mode="ios">
                  <IonCardHeader mode="md">
                    <IonToolbar>
                      <IonCardTitle slot="start" className="pt-2 fw-bold">
                        Personal Information
                      </IonCardTitle>
                    </IonToolbar>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeLg="3" color="medium">
                          {!patientImage && (
                            <div
                              className="drag-n-drop rounded p-5 ion-activatable ripple-parent"
                              onClick={() => {
                                patientImageInputRef.current?.click();
                              }}
                            >
                              <p
                                onClick={() => {
                                  patientImageInputRef.current?.click();
                                }}
                              >
                                <h6 className="h5 fw-bold">Patient Image</h6>
                                <p>click or Drag and drop to upload file</p>
                              </p>
                              <IonRippleEffect type="bounded"></IonRippleEffect>
                            </div>
                          )}
                          <input
                            hidden
                            type={"file"}
                            ref={patientImageInputRef}
                            accept={"image/*"}
                            onChange={(e) => {
                              InitializeImage(e.target.files?.item(0));
                            }}
                          ></input>
                          {patientImage && (
                            <IonImg
                              src={patientImage}
                              onClick={() =>
                                patientImageInputRef.current?.click()
                              }
                              style={{ width: "100%" }}
                            ></IonImg>
                          )}
                        </IonCol>
                        <IonCol>
                          <IonRow>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="floating">Name</IonLabel>
                                <IonInput
                                  type="text"
                                  name="name"
                                  required
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="stacked">
                                  Date of Birth
                                </IonLabel>
                                <IonInput type="date" required name="dob"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel
                                  position="floating"
                                  placeholder="e.g Student"
                                >
                                  Occupation
                                </IonLabel>
                                <IonInput
                                  type="text"
                                  name="occupation"
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="floating">Tribe</IonLabel>
                                <IonInput
                                  type="text"
                                  placeholder="e.g Mankon"
                                  name="tribe"
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput type="email" name="email"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">
                                  Phone Number
                                </IonLabel>
                                <IonInput type="tel" name="tel"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Address</IonLabel>
                                <IonInput type="text" name="address"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Religion</IonLabel>
                                <IonInput type="text" name="religion"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Sex</IonLabel>
                                <IonInput type="text" name="sex"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Emergency Contact</IonLabel>
                                <IonInput type="text" name="emergencyContact"></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">
                                  Marital Status
                                </IonLabel>
                                <IonSelect name="maritalStatus">
                                  <IonSelectOption value={"married"}>
                                    Married
                                  </IonSelectOption>
                                  <IonSelectOption value={"unmarried"}>
                                    UnMarried
                                  </IonSelectOption>
                                </IonSelect>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeLg="6">
                <IonCard mode="ios">
                  <IonCardHeader mode="md">
                    <IonToolbar>
                      <IonCardTitle slot="start" className="pt-2 fw-bold">
                        Medical Information
                      </IonCardTitle>
                    </IonToolbar>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeLg="6">
                          <IonItem fill="outline" color="primary" lines="full">
                            <IonLabel position="floating">Blood Group</IonLabel>
                            <IonSelect name="bloodGroup">
                              <IonSelectOption value={"a+"}>A+</IonSelectOption>
                              <IonSelectOption value={"a-"}>A-</IonSelectOption>
                              <IonSelectOption value={"b+"}>B+</IonSelectOption>
                              <IonSelectOption value={"b-"}>B-</IonSelectOption>
                              <IonSelectOption value={"o-"}>O-</IonSelectOption>
                              <IonSelectOption value={"o+"}>O+</IonSelectOption>
                              <IonSelectOption value={"ab+"}>
                                AB+
                              </IonSelectOption>
                              <IonSelectOption value={"ab-"}>
                                AB-
                              </IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="6">
                          <IonItem fill="outline">
                            <IonLabel position="floating">Condition</IonLabel>
                            <IonTextarea
                              placeholder="e.g blind, deaf, mute etc"
                              name="condition"
                            ></IonTextarea>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeLg="6">
                <IonCard mode="ios">
                  <IonCardHeader mode="md">
                    <IonToolbar>
                      <IonCardTitle slot="start" className="pt-2 fw-bold">
                        Legal
                      </IonCardTitle>
                    </IonToolbar>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeLg="6">
                          <IonItem fill="outline">
                            <IonLabel position="floating">
                              Health Care Proxy
                            </IonLabel>
                            <IonTextarea
                              placeholder="contact details"
                              name="healthProxy"
                            ></IonTextarea>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="6">
                          <IonItem fill="outline">
                            <IonLabel position="floating">
                              Power of Attorney
                            </IonLabel>
                            <IonTextarea
                              placeholder="contact details"
                              name="attorney"
                            ></IonTextarea>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeLg="6">
                <IonCard mode="ios">
                  <IonCardHeader mode="md">
                    <IonToolbar>
                      <IonCardTitle slot="start" className="pt-2 fw-bold">
                        Wishes
                      </IonCardTitle>
                    </IonToolbar>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeLg="12">
                          <IonItem fill="outline">
                            <IonLabel>DNR</IonLabel>
                            <IonCheckbox name="dnr"></IonCheckbox>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="12">
                          <IonItem fill="outline">
                            <IonLabel>No Antibiotics</IonLabel>
                            <IonCheckbox name="antibiotics"></IonCheckbox>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="12">
                          <IonItem fill="outline">
                            <IonLabel>No IVs</IonLabel>
                            <IonCheckbox name="iv"></IonCheckbox>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="12">
                          <IonItem fill="outline">
                            <IonLabel>No Hospitalisation</IonLabel>
                            <IonCheckbox name="hospitalize"></IonCheckbox>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="12">
                          <IonItem fill="outline">
                            <IonLabel>Only Comfort Care</IonLabel>
                            <IonCheckbox name="comfortCare"></IonCheckbox>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol sizeLg="6" size="12">
                <IonCard mode="ios">
                  <IonCardHeader mode="md">
                    <IonToolbar>
                      <IonCardTitle slot="start" className="pt-2 fw-bold">
                        Finance
                      </IonCardTitle>
                    </IonToolbar>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeLg="12">
                          <IonItem fill="outline">
                            <IonLabel position="floating">
                              Insurance ID
                            </IonLabel>
                            <IonInput type="text" name="insuranceID"></IonInput>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="12">
                          <IonItem fill="outline">
                            <IonLabel position="floating">Momo Number</IonLabel>
                            <IonInput type="text" name="momo"></IonInput>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="12">
                          <IonItem fill="outline">
                            <IonLabel position="floating">Card Number</IonLabel>
                            <IonInput
                              type="number"
                              name="cardNumber"
                            ></IonInput>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeLg="12">
                          <IonItem fill="outline">
                            <IonLabel position="stacked">
                              Card Expiration Date
                            </IonLabel>
                            <IonInput
                              type="date"
                              name="cardExpiryDate"
                            ></IonInput>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow className="text-center">
              <IonCol></IonCol>
              <IonCol>
                <IonButton className="mx-auto" type="submit">
                  {/* <IonIcon icon={save} slot="start"></IonIcon> */}
                  <IonLabel>Save</IonLabel>
                </IonButton>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
      <IonToast
        isOpen={operationSuccessful.state}
        message={operationSuccessful.message}
        color={operationSuccessful.color}
        duration={2000}
        onDidDismiss={() =>
          setOperationSuccessful({ state: false, message: "", color: "" })
        }
      ></IonToast>
    </IonPage>
  );
};

export default NewPatient;
