import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRow,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { PatientContext } from "../context/AppContent";
import { firestore } from "../Firebase";
import { OverviewAttribute } from "../interfaces/types";

const CheckList: React.FC<{
  data: string[];
  states: string[];
  catheter?: boolean;
  edit?: boolean;
  recordId?:string;
  title:string
}> = ({ data, states, catheter, edit, recordId,title }) => {
  const [loading,setloading]=useState(false)
  const {patient} = useContext(PatientContext)
  function setBorder(length: number, checker: number) {

    if (checker === length - 1) {
      return "pt-2 m-0";
    } else {
      return "border-bottom pt-2 m-0";
    }
  }

  // function  (){

  // }
  return (
    <IonList className={edit ? "px-3" : ""}>
      {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      <form onSubmit={(e:any)=>{
        e.preventDefault();
        setloading(true);
        let _data:any={};
        let temp:any[]=[];

        for(let i=0;i<data.length;i++){
          let index = states[i]+i
          _data[data[i]]=e.target[index].value;
          temp.push(_data)
          if(i===data.length-1 && catheter){
            _data["catheter"]=e.target["catheter"].value;
            temp.push(_data)
          }

        }

        temp.map((_dt:OverviewAttribute,i:number)=>{

          firestore.collection("patients").doc(patient?.id).collection('records').doc(recordId).collection(title).doc(_dt.value).set(_dt)
        })
        setloading(false);
      }}>
        
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
                        <IonRadio name={state+stateIndex}></IonRadio>
                      </IonItem>
                    </IonCol>
                  );
                })}
              </IonRow>
              {catheter && data.length === index + 1 && (
                <IonItem lines="none" className="border-top">
                  <IonLabel>Catheter</IonLabel>
                  <IonCheckbox name="catheter"></IonCheckbox>
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
      </form>
    </IonList>
  );
};

export default CheckList;
