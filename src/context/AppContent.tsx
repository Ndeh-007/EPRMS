import React from "react";
import { useContext } from "react";
import { Patient, Staff } from "../interfaces/types";

export const StaffDefault: { staff: Staff; setStaff: () => void } = {
  staff: {
    image: "",
    id: "",
    name: "",
    role: "",
    email: "",
    tel: "",
    biography: "",
    sex: "",
    maritalStatus: "",
    dateOfBirth: "",
    address: "",
    password: "",
    username: "",
    date: "",
    position: "",
  },
  setStaff: () => {},
};

export const PatientDefault: { patient: Patient; setPatient: () => void } = {
  patient: {
    address: "",
    bloodGroup: "",
    cardNumber: "",
    condition: "",
    date: "",
    dateOfBirth: "",
    email: "",
    expirationDate: "",
    healthCareProxy: "",
    id: "",
    image: "",
    insurance: "",
    maritalStatus: "",
    momoNumber: "",
    name: "",
    occupation: "",
    powerOfAttorney: "",
    sex: "",
    tel: "",
    tribe: "",
    wishes: [],
    religion:"",
    emergencyContact:"", 
  },
  setPatient: () => {},
};

const PatientContext = React.createContext<{
  patient: Patient | undefined;
  setPatient: Function;
}>({
  patient: PatientDefault.patient,
  setPatient: PatientDefault.setPatient,
});

// const PatientDefaul:{patient:Patient; setPatien}

const StaffContext = React.createContext<{
  staff: Staff | undefined;
  setStaff: Function;
}>({
  staff: StaffDefault.staff,
  setStaff: StaffDefault.setStaff,
});

export {PatientContext, StaffContext };
