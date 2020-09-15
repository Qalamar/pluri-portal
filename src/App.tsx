import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Auth from "./pages/Auth";
import Home from "./pages/Homepage";
import Projects from "./pages/Projects";
import Promo from "./pages/Promo";
import Students from "./pages/Students";
import Techers from "./pages/Teachers";
import { store } from "./utils/Store";
//import MyTeam from "./student/MyTeam";
import "./theme/variables.css";

const App: React.FC = observer(() => {
  const [selectedPage, setSelectedPage] = useState("");

  const isAuth = () => {
    var session = JSON.parse(localStorage.getItem("Auth")!);
    if (session != null) {
      store.isAuth.access = session.access;
      store.isAuth.state = session.state;
      store.isAuth.token = session.token;
      store.isAuth.id = session.id;

      return true;
    } else return false;
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
                render={() => <Redirect to="/about" />}
                exact={true}
              />
              <Route path="/about" component={Home} exact={true} />
              <Route path="/projects" component={Projects} exact={true} />
              <Route path="/teachers" component={Techers} exact={true} />
              <Route path="/students" component={Students} exact={true} />
              <Route path="/promo" component={Promo} exact={true} />
              <Route path="/home" component={Home} exact={true} />
            </IonRouterOutlet>
          </IonSplitPane>
        ) : (
            <IonRouterOutlet id="main">
              <Route path="/home" component={Auth} exact={true} />
              <Redirect to="/home" />
            </IonRouterOutlet>
          )}
      </IonReactRouter>
    </IonApp>
  );
});

export default App;
