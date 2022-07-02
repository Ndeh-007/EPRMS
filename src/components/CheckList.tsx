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
import React, { useContext, useRef, useState } from "react";
import { PatientContext, PatientRecordContext } from "../context/AppContent";
import { firestore } from "../Firebase";
import { OverviewAttribute } from "../interfaces/types";
import PatientRecord from "../pages/PatientRecord";

const CheckList: React.FC<{
  data: string[];
  states: string[];
  catheter?: boolean;
  edit?: boolean;
  recordId?: string;
  title: string;
}> = ({ data, states, catheter, edit, recordId, title }) => {
  const [loading, setloading] = useState(false);
  const {patientRecord, setPatientRecord}  = useContext(PatientRecordContext);
  const { patient,setPatient } = useContext(PatientContext);
  const listRef = useRef<HTMLIonListElement>(null);
  const [overview, setOverview] = useState<OverviewAttribute[]>([]);

  function setBorder(length: number, checker: number) {
    if (checker === length - 1) {
      return "pt-2 m-0";
    } else {
      return "border-bottom pt-2 m-0";
    }
  }

  function assignValues(value:string, index:number) {
    let temp:OverviewAttribute[]=[];
    let obj: OverviewAttribute = {
      value: data[index],
      description:value,
      id:data[index]+value,
    }; 
    temp = [...overview, obj];
    let uA:any=[];
    let tUA:any=[] 

    let t = temp.filter((item,index)=>{  
      const isDuplicate = uA.includes(item.id);   
      if (!isDuplicate) {
        uA.push(item.id);  
        tUA.push(item);
        return true;
      } 
      return false;
    })  
   
    let r = tUA.filter((i:any)=> i.value === obj.value && i.description === obj.description);
    let h = tUA.filter((i:any)=> i.value !== obj.value)
    let res = [...r, ...h];
    console.log(res)
    setOverview(res) 
  }
  return (
    <IonList className={edit ? "px-3" : ""} ref={listRef}>
      {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          setloading(true); 
          let object:any={}
          object[title] = overview;
          let tArr = [object]
          firestore.collection('patients').doc(patient?.id).collection('records').doc(patientRecord?.id).update(tArr[0]).then(()=>{
            let temp:any = patientRecord;
            temp[title] = overview;
            console.log(temp)
            setPatientRecord(temp);
            console.log('update successful')
            setloading(false)
          }).catch((e)=>{
            console.log("error_",e);
            setloading(false)
          })
        }}
      >
        {data.map((item, index) => {
          // console.log(item)
          return (
            <div key={index} className={setBorder(data.length, index)}>
              <IonLabel>{item}</IonLabel>
              <IonRadioGroup
                name={item}
                className="radioGroup"
                onIonChange={(e) => { 
                  assignValues(e.detail.value, index);
                }}
              >
                <IonRow>
                  {states.map((state, stateIndex) => {
                    return (
                      <IonCol key={stateIndex}>
                        <IonItem lines="none">
                          <IonLabel>{state}</IonLabel>
                          <IonRadio value={state}></IonRadio>
                        </IonItem>
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonRadioGroup>
              {catheter && data.length === index + 1 && (
                <IonItem lines="none" className="border-top">
                  <IonLabel>Catheter</IonLabel>
                  <IonCheckbox name="catheter" onIonChange={(e)=>{if(e.detail.checked){
                    let t = overview;
                    t.push({value:'Catheter',description:'Catheter'});
                    setOverview(t);
                  }}}></IonCheckbox>
                </IonItem>
              )}
            </div>
          );
        })}
        {edit && (
          <div className="text-center py-2 border-top">
            <IonButton color="success" type="submit">
              Save
            </IonButton>
          </div>
        )}
      </form>
    </IonList>
  );
};

export default CheckList;
