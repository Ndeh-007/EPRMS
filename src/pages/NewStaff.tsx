import React, { useContext, useRef } from "react";
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
import { useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import PatientItem from "../components/PatientItem";
import { capitalizeString, generatePassword } from "../Functions/functions";
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
import uniqid from "../interfaces/uniqid";
import { firestore, storage } from "../Firebase";
import { StaffContext } from "../context/AppContent";

const NewStaff: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  const patientImageInputRef = useRef<HTMLInputElement>(null);
  const maritalStatusRef = useRef<HTMLIonSelectElement>(null);
  const positionRef = useRef<HTMLIonSelectElement>(null);
  const biographyRef = useRef<HTMLIonTextareaElement>(null);

  const [staffBiography, setStaffBiography] = useState<
    string | null | undefined
  >("");
  const [maritalStatus, setMaritalStatus] = useState<string | null | undefined>(
    ""
  );
  const [staffPosition, setStaffPosition] = useState<string | null | undefined>(
    ""
  );

  const [staffSex, setStaffSex] = useState<string | null | undefined>("");

  const [staffTel, setStaffTel] = useState<string | null | undefined>("");
  const [staffName, setStaffName] = useState<string | null | undefined>("");
  const [staffAddress, setStaffAddress] = useState<string | null | undefined>(
    ""
  );
  const [staffEmail, setStaffEmail] = useState<string | null | undefined>("");
  const [staffRole, setStaffRole] = useState<string | null | undefined>("");
  const [staffDOB, setStaffDOB] = useState<string | null | undefined>("");
  const [staffImage, setStaffImage] = useState<any>(undefined);

  const [staffUsername, setStaffUsername] = useState<string | null | undefined>(
    ""
  );
  const [staffPassword, setStaffPassword] = useState<string | null | undefined>(
    ""
  );
  const [staffConfirmPassword, setStaffConfirmPassword] = useState<
    string | null | undefined
  >("");

  const [profilePicture, setProfilePicture] = useState<File>();

  const [alertDischarge, setAlertDischarge] = useState(false);
  const [alertAdmit, setAlertAdmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [operationSuccessful, setOperationSuccessful] = useState({
    state: false,
    message: "",
    color: "",
  });

  const context = useContext(StaffContext)

  function InitializeImage(file: File | null | undefined) {
    let i: any = file;
    setProfilePicture(i);
    const reader = new FileReader();

    reader.onloadend = () => {
      setStaffImage(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  }

  async function CreateStaff() {
    let names: any = staffName?.split(" ");
    let prefix = names[0] + "-";
    let suffix = "-" + names[1];
    let data: Staff = {
      name: staffName,
      tel: staffTel,
      address: staffAddress,
      biography: staffBiography,
      dateOfBirth: staffDOB,
      email: staffEmail,
      id: uniqid(prefix, suffix),
      image: staffImage,
      maritalStatus: maritalStatus,
      password: Math.random().toString(36).slice(-8),
      role: "staff",
      sex: staffSex,
      username: names[0],
      position:"Ns",
      date: Date.now(),
    };

    var storageRef = storage.ref(`staff/${data.id}/${data.id}-image.jpg`);
    let response = await fetch(staffImage);
    let blob = await response.blob();
    let query1 = storageRef.put(blob).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        data.image = url;
        firestore.collection("staff").doc(data.id).set(data);
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

  function ModfifyAccess() {
    setLoading(true);

    // check Passwords
    if (staffPassword !== staffConfirmPassword) {
      alert("Make Sure passwords match");
      setLoading(false);
      return;
    }

    // check if username is taken
    firestore.collection("staff").where("username", "==", staffUsername).onSnapshot((snapshot)=>{
      if(snapshot.docs.length > 0){
        alert("Username already taken");
        setLoading(false);
        return;
      }
    })
    
    let data:StaffAccess = {
      username: staffUsername,
      password: staffPassword,
      role: staffRole,
      position: staffPosition,
    }

    firestore.collection("staff").doc(context.staff?.id).update(data).then(()=>{
      setLoading(false);
      setOperationSuccessful({
        state:true, message:"Access Modified Successfully", color:"success"
      })
    })

    setOperationSuccessful({
      state: true,
      message: "Staff Creation Failed",
      color: "danger",
    });
  }

  return (
    <IonPage>
      <PageHeader name="name"></PageHeader>
      <IonContent>
        <div color="light">
          <form
            action=""
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              CreateStaff();
            }}
          >
            <IonGrid className="pt-0 mt-0">
              {loading && (
                <IonLoading
                  isOpen={loading}
                  message="Creating Staff"
                  onDidDismiss={() => setLoading(false)}
                  backdropDismiss
                ></IonLoading>
              )}
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
                            {!staffImage && (
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
                            {staffImage && (
                              <IonImg
                                src={staffImage}
                                style={{ width: "100%" }}
                                onClick={() =>
                                  patientImageInputRef.current?.click()
                                }
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
                                    value={staffName}
                                    onIonChange={(e) => {
                                      setStaffName(e.detail.value);
                                    }}
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
                                    required
                                    value={staffDOB}
                                    onIonChange={(e) => {
                                      setStaffDOB(e.detail.value);
                                    }}
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
                                    required
                                    value={staffEmail}
                                    onIonChange={(e) =>
                                      setStaffEmail(e.detail.value)
                                    }
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
                                    required
                                    value={staffTel}
                                    onIonChange={(e) =>
                                      setStaffTel(e.detail.value)
                                    }
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
                                    Address
                                  </IonLabel>
                                  <IonInput
                                    type="text"
                                    name="address"
                                    value={staffAddress}
                                    required
                                    onIonChange={(e) =>
                                      setStaffAddress(e.detail.value)
                                    }
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
                                    value={staffSex}
                                    required
                                    onIonChange={(e) =>
                                      setStaffSex(e.detail.value)
                                    }
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
                                    ref={maritalStatusRef}
                                    value={maritalStatus}
                                    onIonChange={(e) => {
                                      setMaritalStatus(e.detail.value);
                                    }}
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
                                    ref={positionRef}
                                    value={staffPosition}
                                    onIonChange={(e) => {
                                      setStaffPosition(e.detail.value);
                                    }}
                                  >
                                    <IonSelectOption value={"doctor"}>
                                      Doctor
                                    </IonSelectOption>
                                    <IonSelectOption value={"nurse"}>
                                      Nurse
                                    </IonSelectOption>
                                    <IonSelectOption value={"lab-scientist"}>
                                      Lab Scientist
                                    </IonSelectOption>
                                  </IonSelect>
                                </IonItem>
                              </IonCol>

                              <IonCol size="12" sizeLg="12">
                                <IonItem
                                  fill="outline"
                                  color="primary"
                                  lines="full"
                                >
                                  <IonLabel position="floating">
                                    Biography
                                  </IonLabel>
                                  <IonTextarea
                                    placeholder="About staff"
                                    ref={biographyRef}
                                    value={staffBiography}
                                    required
                                    onIonChange={(e) => {
                                      setStaffBiography(e.detail.value);
                                    }}
                                  ></IonTextarea>
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
            onSubmit={(e) => {
              e.preventDefault();
              ModfifyAccess();
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
                                    required
                                    value={staffUsername}
                                    onIonChange={(e) => {
                                      setStaffUsername(e.detail.value);
                                    }}
                                  ></IonInput>
                                </IonItem>
                              </IonCol>
                              <IonCol size="12" sizeLg="6">
                                <IonItem fill="outline" lines="full">
                                  <IonLabel position="stacked">
                                    Password
                                  </IonLabel>
                                  <IonInput
                                    type="text"
                                    required
                                    value={staffPassword}
                                    onIonChange={(e) => {
                                      setStaffPassword(e.detail.value);
                                    }}
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
                                    required
                                    value={staffConfirmPassword}
                                    onIonChange={(e) =>
                                      setStaffConfirmPassword(e.detail.value)
                                    }
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
                                  <IonSelect value={staffRole} onIonChange={e=>setStaffRole(e.detail.value)}>
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
                                  <IonSelect value={staffPosition} onIonChange={e=>setStaffPosition(e.detail.value)}>
                                    <IonSelectOption value={"doctor"}>
                                      Doctor
                                    </IonSelectOption>
                                    <IonSelectOption value={"nurse"}>
                                      Nurse
                                    </IonSelectOption>
                                    <IonSelectOption value={"lab-scientist"}>
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
          </form>
        </div>
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

export default NewStaff;
