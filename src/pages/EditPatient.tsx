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
import { useHistory, useLocation, useParams } from "react-router";
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
import { informationCircle, save, trashSharp } from "ionicons/icons";
import { Wishes } from "../interfaces/data";
import { PatientContext, StaffContext } from "../context/AppContent";
import { PatientImmunity } from "../components/EditPatientRecordCategories";
import { firestore, storage } from "../Firebase";

const EditPatient: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  const { patient, setPatient } = useContext(PatientContext);
  const { staff, setStaff } = useContext(StaffContext);
  const patientImageInputRef = useRef<HTMLInputElement>(null);
  const [alertDischarge, setAlertDischarge] = useState(false);
  const [alertAdmit, setAlertAdmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [operationSuccessful, setOperationSuccessful] = useState({
    state: false,
    message: "",
    color: "",
  });
  const [staffImage, setStaffImage] = useState<any>(undefined);
  const [p, sp] = useState<Patient>();
  const location = useLocation();
  const history = useHistory();

  function InitializeImage(file: File | null | undefined) {
    let i: any = file;
    const reader = new FileReader();

    reader.onloadend = () => {
      setStaffImage(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  }

  async function updatePatientDetails(data: any) {
    setLoading(true);

    let img: any = patient?.image;
    var storageRef = storage.refFromURL(img);
    let response = await fetch(staffImage);
    let blob = await response.blob();
    storageRef
      .put(blob)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          data.image = url;
          firestore
            .collection("patients")
            .doc(patient?.id)
            .update(data)
            .then(() => {
              let temp: any = patient;
              for (let att in data) {
                temp[att] = data[att];
              }
              console.log(temp);
              setPatient(temp);
              setLoading(false);
              setOperationSuccessful({
                state: true,
                message: "Patient Updated Successfully",
                color: "success",
              });
            })
            .catch((e) => {
              console.error(e);
              setLoading(false);
              setOperationSuccessful({
                state: true,
                message: "Patient Update Failed",
                color: "danger",
              });
            });
        });
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
        setOperationSuccessful({
          state: true,
          message: "Patient Update Failed, Image Error",
          color: "danger",
        });
      });
  }

  function deletePatient() {
    setLoading(true);
    firestore
      .collection("patients")
      .doc(patient?.id)
      .delete()
      .then(() => {
        setLoading(false);
        setOperationSuccessful({
          state: true,
          message: "Patient Deleted Successfully",
          color: "success",
        });
        history.push("/patients");
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
        setOperationSuccessful({
          state: true,
          message: "Patient Delete Failed",
          color: "danger",
        });
      });
  }

  useEffect(() => {
    if (location.state) {
      let temp: any = location.state;
      sp(temp);
      setPatient(temp);
    }
  }, [location]);

  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent color="light">
        <IonToolbar color="light" className="pt-4">
          <IonText slot="start" color="primary">
            <IonTitle className="ion-padding-horizontal">
              <p className="text-bold">
                <span>Patient Information</span> <br />
                <span className="text-regular">
                  <IonNote className="text-small">
                    Change Values accordingly
                  </IonNote>
                </span>
              </p>
            </IonTitle>
          </IonText>
          <IonButtons slot="end" className="px-2" hidden={staff?.role!= "admin"?true:false}>
            <IonButton
              color="danger"
              size="small"
              onClick={() => deletePatient()}
            >
              <IonIcon
                size="small"
                icon={trashSharp}
                slot="icon-only"
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonGrid className="pt-0 mt-0">
          <IonRow>
            <IonCol size="12">
              <IonCard mode="ios">
                <form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    let data: any = {
                      address: e.target.address.value,
                      mothersName: e.target.mothersName.value,
                      dateOfBirth: e.target.dob.value,
                      emergencyContact: e.target.emergencyContact.value,
                      image: staffImage,
                      email: e.target.email.value,
                      name: e.target.name.value,
                      tel: e.target.tel.value,
                      maritalStatus: e.target.maritalStatus.value,
                      sex: e.target.sex.value,
                      tribe: e.target.tribe.value,
                    };

                    updatePatientDetails(data);
                  }}
                >
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
                          {patient?.image?.length! > 0 ? (
                            <IonImg
                              src={staffImage || patient?.image}
                              onClick={() => {
                                patientImageInputRef.current?.click();
                              }}
                            ></IonImg>
                          ) : (
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
                              console.log(patient, 0);
                              InitializeImage(e.target.files?.item(0));
                            }}
                          ></input>
                        </IonCol>
                        <IonCol>
                          <IonRow>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="floating">Name</IonLabel>
                                <IonInput
                                  type="text"
                                  name="name"
                                  value={patient?.name}
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="floating">
                                  Mother's Name
                                </IonLabel>
                                <IonInput
                                  type="text"
                                  name="mothersName"
                                  value={patient?.mothersName}
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="stacked">
                                  Date of Birth
                                </IonLabel>
                                <IonInput
                                  type="date"
                                  name="dob"
                                  value={patient?.dateOfBirth}
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
                                <IonInput
                                  type="email"
                                  name="email"
                                  value={patient?.email}
                                ></IonInput>
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
                                <IonInput
                                  type="tel"
                                  name="tel"
                                  value={patient?.tel}
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Address</IonLabel>
                                <IonInput
                                  type="text"
                                  name="address"
                                  value={patient?.address}
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Sex</IonLabel>
                                <IonInput
                                  type="text"
                                  name="sex"
                                  value={patient?.sex}
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Tribe</IonLabel>
                                <IonInput
                                  type="text"
                                  name="tribe"
                                  value={patient?.tribe}
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">
                                  Emergency Contact
                                </IonLabel>
                                <IonInput
                                  type="tel"
                                  name="emergencyContact"
                                  value={patient?.emergencyContact}
                                ></IonInput>
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
                                <IonSelect
                                  name="maritalStatus"
                                  value={patient?.maritalStatus}
                                >
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
                    </IonGrid>
                  </IonCardContent>
                </form>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="6">
              <IonCard mode="ios">
                <form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    let data: any = {
                      bloodGroup: e.target.bloodGroup.value,
                      condition: e.target.condition.value,
                    };

                    updatePatientDetails(data);
                  }}
                >
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
                        <IonCol size="12">
                          <IonItem fill="outline" color="primary" lines="full">
                            <IonLabel position="floating">Blood Group</IonLabel>
                            <IonSelect
                              name="bloodGroup"
                              value={patient?.bloodGroup}
                            >
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
                        <IonCol size="12">
                          <IonItem fill="outline">
                            <IonLabel position="floating">Condition</IonLabel>
                            <IonInput
                              placeholder="e.g cripple, blind"
                              name="condition"
                              value={patient?.condition}
                            ></IonInput>
                          </IonItem>
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
                    </IonGrid>
                  </IonCardContent>
                </form>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="6">
              <IonCard mode="ios">
                <form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    let data: any = {
                      powerOfAttorney: e.target.powerOfAttorney.value,
                      healthCareProxy: e.target.healthCareProxy.value,
                    };

                    updatePatientDetails(data);
                  }}
                >
                  <IonCardHeader mode="md">
                    <IonToolbar>
                      <IonCardTitle slot="start" className="pt-2 fw-bold">
                        Legal Information
                      </IonCardTitle>
                    </IonToolbar>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12">
                          <IonItem fill="outline">
                            <IonLabel position="floating">
                              Power of Attorney
                            </IonLabel>
                            <IonInput
                              placeholder="Contact Information"
                              name="powerOfAttorney"
                              value={patient?.powerOfAttorney}
                            ></IonInput>
                          </IonItem>
                        </IonCol>
                        <IonCol size="12">
                          <IonItem fill="outline" color="primary" lines="full">
                            <IonLabel position="floating">
                              Health Care Proxy
                            </IonLabel>
                            <IonInput
                              type="text"
                              placeholder="Contact Information"
                              name="healthCareProxy"
                              value={patient?.healthCareProxy}
                            ></IonInput>
                          </IonItem>
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
                    </IonGrid>
                  </IonCardContent>
                </form>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="6">
              <IonCard mode="ios">
                <form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    let v: any = window.document.getElementsByName("wish");
                    let checkedArray: any = [];
                    v.forEach((element: any) => {
                      if (element.ariaChecked === "true") {
                        checkedArray.push(element.value);
                      }
                    });
                    console.log(checkedArray);
                    let data: any = {
                      wishes: checkedArray,
                    };
                    updatePatientDetails(data);
                  }}
                >
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
                        <IonCol size="12">
                          <IonList>
                            {Wishes.map((wish, index) => {
                              let _wishes = patient?.wishes;
                              let ch = false;
                              if (_wishes?.includes(wish)) {
                                ch = true;
                              }
                              return (
                                <IonItem key={index}>
                                  <IonLabel>{wish}</IonLabel>
                                  <IonCheckbox
                                    value={wish}
                                    className="wish"
                                    checked={ch}
                                    name={"wish"}
                                  ></IonCheckbox>
                                </IonItem>
                              );
                            })}
                          </IonList>
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
                    </IonGrid>
                  </IonCardContent>
                </form>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeLg="6">
              <IonCard mode="ios">
                <IonCardHeader mode="md">
                  <IonToolbar>
                    <IonCardTitle slot="start" className="pt-2 fw-bold">
                      Immunity & Immunisations
                    </IonCardTitle>
                  </IonToolbar>
                </IonCardHeader>
                <hr className="p-none m-0" />
                <IonCardContent mode="md">
                  <PatientImmunity></PatientImmunity>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* loading */}
      <IonLoading
        isOpen={loading}
        onDidDismiss={() => {
          setLoading(false);
        }}
      ></IonLoading>

      {/* toast */}
      <IonToast
        isOpen={operationSuccessful.state}
        message={operationSuccessful.message}
        icon={informationCircle}
        color={operationSuccessful.color}
        duration={2000}
        onDidDismiss={() => {
          setOperationSuccessful({ state: false, message: "", color: "" });
        }}
      ></IonToast>
    </IonPage>
  );
};

export default EditPatient;
