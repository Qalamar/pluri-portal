import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import {
  archiveOutline,
  archiveSharp,
  lockClosedOutline,
  peopleCircleOutline,
  peopleOutline,
  schoolOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { store } from "../stores/Store";
import "./Menu.css";

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/home",
    iosIcon: lockClosedOutline,
    mdIcon: lockClosedOutline,
  },
  {
    title: "Teachers",
    url: "/teachers",
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircleOutline,
  },
  {
    title: "Projects",
    url: "/projects",
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: "Promos",
    url: "/Promo",
    iosIcon: schoolOutline,
    mdIcon: schoolOutline,
  },
  {
    title: "Teams",
    url: "/Teams",
    iosIcon: peopleOutline,
    mdIcon: peopleOutline,
  },
];

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {
  const [selected, setSelected] = useState([true, false, false, false, false]);

  useEffect(() => {
    store.page = selectedPage;
  }, []);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Ahmed Ahmed</IonListHeader>
          <IonNote>1CS - Student</IonNote>

          <IonMenuToggle autoHide={false}>
            <IonItem
              onClick={() => setSelected([true, false, false, false, false])}
              className={selected[0] ? "selected" : ""}
              routerLink={"/home"}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon slot="start" icon={appPages[0].iosIcon} />
              <IonLabel>{appPages[0].title}</IonLabel>
            </IonItem>
            <IonItem
              onClick={() => setSelected([false, true, false, false, false])}
              className={selected[1] ? "selected" : ""}
              routerLink={"/teachers"}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon slot="start" icon={appPages[1].iosIcon} />
              <IonLabel>{appPages[1].title}</IonLabel>
            </IonItem>
            <IonItem
              onClick={() => setSelected([false, false, true, false, false])}
              className={selected[2] ? "selected" : ""}
              routerLink={"/projects"}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon slot="start" icon={appPages[2].iosIcon} />
              <IonLabel>{appPages[2].title}</IonLabel>
            </IonItem>
            <IonItem
              onClick={() => setSelected([false, false, false, true, false])}
              className={selected[3] ? "selected" : ""}
              routerLink={"/Promo"}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon slot="start" icon={appPages[3].iosIcon} />
              <IonLabel>{appPages[3].title}</IonLabel>
            </IonItem>
            <IonItem
              onClick={() => {
                setSelected([false, false, false, false, true]);
              }}
              className={selected[4] ? "selected" : ""}
              routerLink={"/Teams"}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              {" "}
              <IonIcon slot="start" icon={appPages[4].iosIcon} />
              <IonLabel>{appPages[4].title}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
