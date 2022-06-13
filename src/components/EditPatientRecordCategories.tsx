import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useState } from "react";

const Finance: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <form onSubmit={(e)=>{
        e.preventDefault()
        alert('submitted')
    }}>
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

export { Finance };
