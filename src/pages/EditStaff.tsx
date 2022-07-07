import React, { useRef } from "react";
import faker from "@faker-js/faker";
import {
  IonAlert,
  IonAvatar,
  IonBadge,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
  IonProgressBar,
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
import { capitalizeString, sendEmail } from "../Functions/functions";
import { customIcons, localImages } from "../images/images";
import { MPI, Staff, StaffAccess } from "../interfaces/types";
import "../styles/Page.css";
import "../styles/NewPatient.css";
import {
  chevronForward,
  informationCircle,
  pencil,
  peopleCircle,
  save,
} from "ionicons/icons";
import { firestore, storage } from "../Firebase";

const EditStaff: React.FC<{ staffDetails: Staff | undefined }> = ({
  staffDetails,
}) => {
  // const { name } = useParams<{ name: string; mode?: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  const patientImageInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [NewImage, setNewImage] = useState(false);
  const [operationSuccessful, setOperationSuccessful] = useState({
    state: false,
    message: "",
    color: "",
  });
  const [staffImage, setStaffImage] = useState<any>(undefined);
  const [tImage, setTempImage] = useState<any>(staffDetails?.image)
  const history = useHistory();

  function InitializeImage(file: File | null | undefined) {
    let i: any = file;
    const reader = new FileReader();

    reader.onloadend = () => {
      setStaffImage(reader.result);
      setNewImage(true);
    };
    if (file) {
      reader.readAsDataURL(file);
    };
  }

  async function updateStaffDetails(data: any) {

    setLoading(true);

    if (NewImage) {


      var storageRef = storage.refFromURL(staffDetails?.image)
      let response = await fetch(staffImage);
      let blob = await response.blob();
      let query1 = storageRef.put(blob).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          data.image = url;
          firestore
            .collection("staff")
            .doc(staffDetails?.id)
            .update(data)
            .catch((error) => {
              console.log("Updating Staff Details Error", error);
            });
        });
      });


      await Promise.all([query1])
        .then(() => {
          setLoading(false);
          setOperationSuccessful({
            state: true,
            message: "Staff Created Successfully",
            color: "success",
          });
          history.goBack()
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          setOperationSuccessful({
            state: true,
            message: "Staff Creation Failed",
            color: "danger",
          });
        });
    } else {
      data.image = tImage;
      firestore
        .collection("staff")
        .doc(staffDetails?.id)
        .update(data)
        .then(() => {
          setLoading(false);
          setOperationSuccessful({
            state: true,
            message: "Staff Created Successfully",
            color: "success",
          });
          history.goBack()
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          setOperationSuccessful({
            state: true,
            message: "Staff Creation Failed",
            color: "danger",
          });
        });
    }

    setLoading(false);
  }


  async function ModifyStaffAccess(data: any) {

    let params = {
      ...data,
      name: staffDetails?.name,
      email: staffDetails?.email,
    }
    let query2 = await sendEmail(params, true)

    // update staff details
    let q1 = firestore
      .collection("staff")
      .doc(staffDetails?.id)
      .update(data)

    await Promise.all([q1, query2])
      .then(() => {
        setLoading(false);
        setOperationSuccessful({
          state: true,
          message: "Staff Access Modified Successfully",
          color: "success",
        });

      })
      .catch((error) => {
        console.log("Updating Staff Details Error", error);
        setLoading(false);
        setOperationSuccessful({
          state: true,
          message: "Staff Access Modification Failed",
          color: "danger",
        });
      });
  }

  return (
    <>
      <div color="light">
        <form
          action=""
          ref={formRef}
          onSubmit={(e: any) => {
            e.preventDefault();
            let _img = staffDetails?.image;
            if (staffImage) {
              _img = staffImage.length > 0 ? staffImage : staffDetails?.image;
            } else {
              _img = staffDetails?.image;
            }
            let data = {
              name: e.target.name.value,
              email: e.target.email.value,
              tel: e.target.tel.value,
              address: e.target.address.value,
              dateOfBirth: e.target.dob.value,
              image: _img,
              biography: e.target.biography.value,
              maritalStatus: e.target.maritalStatus.value,
              sex: e.target.sex.value,
            };

            console.log(data.image)
            updateStaffDetails(data);
          }}
        >
          <IonGrid className="pt-0 mt-0">
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
                          {staffDetails?.image?.length > 0 ? (
                            <IonImg
                              src={staffImage || staffDetails?.image}
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
                                <h6 className="h5 fw-bold">Staff Image</h6>
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
                        </IonCol>
                        <IonCol>
                          <IonRow>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="floating">Name</IonLabel>
                                <IonInput
                                  type="text"
                                  name="name"
                                  value={staffDetails?.name}
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
                                  value={staffDetails?.dateOfBirth}
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
                                  value={staffDetails?.email}
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
                                  value={staffDetails?.tel}
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
                                  value={staffDetails?.address}
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
                                  value={staffDetails?.sex}
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
                                  Biography
                                </IonLabel>
                                <IonTextarea
                                  name="biography"
                                  value={staffDetails?.biography}
                                ></IonTextarea>
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
                                  value={staffDetails?.maritalStatus}
                                  name="maritalStatus"
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
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">
                                  Position
                                </IonLabel>
                                {/* set Value to present value */}
                                <IonSelect
                                  value={staffDetails?.position}
                                  name="staffPosition"
                                >
                                  <IonSelectOption value={"Dr"}>
                                    Doctor
                                  </IonSelectOption>
                                  <IonSelectOption value={"Ns"}>
                                    Nurse
                                  </IonSelectOption>
                                  <IonSelectOption value={"LSc"}>
                                    Lab Scientist
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
            </IonRow>
            <IonRow className="text-center">
              <IonCol></IonCol>
              <IonCol>
                <IonButton className="mx-auto" type="submit">
                  <IonLabel>Save</IonLabel>
                </IonButton>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonGrid>
          <hr />
        </form>

        <form
          action=""
          onSubmit={async (e: any) => {
            e.preventDefault();

            setLoading(true);
            // check Passwords
            if (e.target.password.value !== e.target.confirmPassword.value) {
              alert("Make Sure passwords match");
              setLoading(false);
              return;
            }

            //  collect access data
            let data: StaffAccess = {
              password: e.target.password.value,
              position: e.target.position.value,
              role: e.target.role.value,
              username: e.target.username.value,
            };

            let _un: any = data.username

            //  check user name
            firestore
              .collection("staff")
              .where("username", "==", _un)
              .get().then((snapshot) => {
                if (snapshot.docs.length > 0) {
                  window.alert('username is already taken')
                  setLoading(false);
                }
                else {
                  ModifyStaffAccess(data)
                }
              });

          }}
        >
          <IonGrid className="pt-0 mt-0">
            <IonRow>
              <IonCol size="12">
                <IonCard mode="ios">
                  <IonCardHeader mode="md">
                    <IonToolbar>
                      <IonCardTitle slot="start" className="pt-2 fw-bold">
                        Modify Access
                      </IonCardTitle>
                    </IonToolbar>
                  </IonCardHeader>
                  <hr className="p-none m-0" />
                  <IonCardContent mode="md">
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonRow>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="floating">
                                  UserName
                                </IonLabel>
                                <IonInput
                                  type="text"
                                  value={staffDetails?.username}
                                  name="username"
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem fill="outline" lines="full">
                                <IonLabel position="stacked">Password</IonLabel>
                                <IonInput
                                  type="text"
                                  value={staffDetails?.password}
                                  name="password"
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
                                  Confirm Password
                                </IonLabel>
                                <IonInput
                                  type="text"
                                  name="confirmPassword"
                                ></IonInput>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">Role</IonLabel>
                                <IonSelect
                                  value={staffDetails?.role}
                                  name="role"
                                >
                                  <IonSelectOption value={"admin"}>
                                    Admin
                                  </IonSelectOption>
                                  <IonSelectOption value={"staff"}>
                                    Staff
                                  </IonSelectOption>
                                </IonSelect>
                              </IonItem>
                            </IonCol>
                            <IonCol size="12" sizeLg="6">
                              <IonItem
                                fill="outline"
                                color="primary"
                                lines="full"
                              >
                                <IonLabel position="floating">
                                  Position
                                </IonLabel>
                                {/* set Value to present value */}
                                <IonSelect
                                  value={staffDetails?.position}
                                  name="position"
                                >
                                  <IonSelectOption value={"Dr"}>
                                    Doctor
                                  </IonSelectOption>
                                  <IonSelectOption value={"Ns"}>
                                    Nurse
                                  </IonSelectOption>
                                  <IonSelectOption value={"LSc"}>
                                    Lab Scientist
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
            </IonRow>
            <IonRow className="text-center">
              <IonCol></IonCol>
              <IonCol>
                <IonButton className="mx-auto" type="submit">
                  <IonLabel>Save</IonLabel>
                </IonButton>
              </IonCol>
              <IonCol>
                {/* 
                <IonButton color="danger" onClick={()=>{
                  sendEmail(
                    {
                      password: "pas22af",
                      username:'aiser',
                      email:'ndehngwa@gmail.com',
                      name:'John Doe',
                    }
                  )
                }}>test</IonButton> */}
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </div>



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
          setOperationSuccessful({ state: false, message: "", color: "" })
        }}
      ></IonToast>
    </>
  );
};

export default EditStaff;
