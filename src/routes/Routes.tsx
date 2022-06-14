import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import Menu from "../components/Menu";
import Dashboard from "../pages/Dashboard";
import EditPatient from "../pages/EditPatient";
import EditStaff from "../pages/EditStaff";
import Login from "../pages/Login";
import NewPatient from "../pages/NewPatient";
import NewRecord from "../pages/NewRecord";
import Page from "../pages/Page";
import PatientRecord from "../pages/PatientRecord";
import Patients from "../pages/Patients";
import Staff from "../pages/Staff";
import ViewPatient from "../pages/ViewPatient";
import ViewStaff from "../pages/ViewStaff";

const Routes: React.FC = () => {
  return (
    <IonSplitPane contentId="main">
      <Menu></Menu>
      <IonRouterOutlet id="main">
        <Route path="/dashboard" exact={true}>
          <Dashboard />
        </Route>
        <Route path="/patients" exact={true}>
          <Patients />
        </Route>
        <Route path="/new-patient" exact={true}>
          <NewPatient />
        </Route>
        <Route path="/edit-patient" exact={true}>
          <EditPatient></EditPatient>
        </Route>
        <Route path="/view-patient" exact={true}>
          <ViewPatient></ViewPatient>
        </Route>
        <Route path="/patient-record" exact={true}>
          <PatientRecord></PatientRecord>
        </Route>
        <Route path="/staff" exact={true}>
          <Staff/>
        </Route> 
        <Route path={"/view-staff"} exact={true}>
          <ViewStaff/>
        </Route> 
        <Route path={"/new-record"} exact={true}>
          <NewRecord/>
        </Route> 
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export default Routes;
