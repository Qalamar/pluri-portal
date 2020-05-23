import Menu from "./components/Menu";

import Auth from "./pages/Auth";
import Projects from "./pages/Projects";
import Users from "./pages/Users";
import Promo from "./pages/Promo";
import Teams from "./pages/Teams";
import MyTeam from "./student/MyTeam";
import React, { useState } from "react";
import { IonApp, IonRouterOutlet, IonSplitPane, IonButton } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import * as api from "./utils/API";

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("");
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu selectedPage={selectedPage} />
          <IonRouterOutlet id="main">
            <Route
              path="/"
              render={() => <Redirect to="/auth" />}
              exact={true}
            />
            <Route path="/auth" component={Auth} exact={true} />
            <Route path="/projects" component={Projects} exact={true} />
            <Route path="/users" component={Users} exact={true} />
            <Route path="/promo" component={Promo} exact={true} />
            <Route path="/myteam" component={MyTeam} exact={true} />
            <Route path="/teams" component={Teams} exact={true} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
