import React from "react";
import { useContext } from "react";
import { Staff } from "../interfaces/types";

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
  },
  setStaff: () => {},
};

// const PatientDefaul:{patient:Patient; setPatien}

const StaffContext = React.createContext<{
  staff: Staff | undefined;
  setStaff: Function;
}>({
  staff: StaffDefault.staff,
  setStaff: StaffDefault.setStaff,
});



export { StaffContext };
