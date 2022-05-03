import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import Menu from "../components/Menu";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Page from "../pages/Page";

const Routes: React.FC = () => {
  return (
    <IonSplitPane contentId="main">
      <Menu></Menu>
      <IonRouterOutlet id="main">
        <Route path="/" exact={true}>
          <Redirect to="/login" />
        </Route>
        {/* <Route path="/admin/:name" exact={true}>
          <Page />
        </Route> */}
        <Route path="/admin/dashboard" exact={true}>
          <Dashboard />
        </Route>
        <Route path={"/login"} exact={true}>
          <Login></Login>
        </Route>
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export default Routes;
