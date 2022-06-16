import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonRow,
} from "@ionic/react";
import React from "react";

const CheckList: React.FC<{
  data: string[];
  states: string[];
  catheter?: boolean;
  edit?: boolean;
}> = ({ data, states, catheter, edit }) => {
  function setBorder(length: number, checker: number) {
    if (checker === length - 1) {
      return "pt-2 m-0";
    } else {
      return "border-bottom pt-2 m-0";
    }
  }
  return (
    <IonList className={edit ? "px-3" : ""}>
      {data.map((item, index) => {
        return (
          <IonItemGroup key={index} className={setBorder(data.length, index)}>
            <IonLabel>{item}</IonLabel>
            <IonRadioGroup>
              <IonRow>
                {states.map((state, stateIndex) => {
                  return (
                    <IonCol key={stateIndex}>
                      <IonItem lines="none">
                        <IonLabel>{state}</IonLabel>
                        <IonRadio></IonRadio>
                      </IonItem>
                    </IonCol>
                  );
                })}
              </IonRow>
              {catheter && data.length === index + 1 && (
                <IonItem lines="none" className="border-top">
                  <IonLabel>Catheter</IonLabel>
                  <IonCheckbox></IonCheckbox>
                </IonItem>
              )}
            </IonRadioGroup>
          </IonItemGroup>
        );
      })}
      {edit && (
        <div className="text-center py-2 border-top">
          <IonButton color="success">Save</IonButton>
        </div>
      )}
    </IonList>
  );
};

export default CheckList;
