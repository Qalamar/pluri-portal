import Menu from "./components/Menu";

import Auth from "./pages/Auth";
import Projects from "./pages/Projects";
import Users from "./pages/Users";
import Promo from "./pages/Promo";
import Teams from "./pages/Teams";
import Home from "./pages/Homepage";
import MyTeam from "./student/MyTeam";
import React, { useState, useEffect } from "react";
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
import { store } from "./stores/Store";

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("");

  const isAuth = () => {
    var session = JSON.parse(localStorage.getItem("Auth")!);
    if (session != null) {
      store.isAuth.access = session.state;
      store.isAuth.state = session.state;
      return true;
    }
  };
  return (
    <IonApp>
      <IonReactRouter>
        {isAuth() ? (
          <IonSplitPane contentId="main">
            <Menu selectedPage={selectedPage} />
            <IonRouterOutlet id="main">
              <Route
                path="/"
                render={() => <Redirect to="/home" />}
                exact={true}
              />
              <Route path="/home" component={Home} exact={true} />
              <Route path="/projects" component={Projects} exact={true} />
              <Route path="/users" component={Users} exact={true} />
              <Route path="/promo" component={Promo} exact={true} />
              <Route path="/myteam" component={MyTeam} exact={true} />
              <Route path="/teams" component={Teams} exact={true} />
            </IonRouterOutlet>
          </IonSplitPane>
        ) : (
          <IonRouterOutlet id="main">
            <Route path="/auth" component={Auth} exact={true} />
            <Route
              path="/"
              render={() => <Redirect to="/auth" />}
              exact={true}
            />
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
