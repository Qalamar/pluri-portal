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
  albumsOutline,
  homeOutline,
  peopleCircleOutline,
  personCircleOutline,
  readerOutline,
  schoolOutline,
  informationOutline,
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
    title: "About",
    url: "/about",
    iosIcon: informationOutline,
    mdIcon: informationOutline,
  },
  {
    title: "Teachers",
    url: "/teachers",
    iosIcon: schoolOutline,
    mdIcon: schoolOutline,
  },

  {
    title: "Projects",
    url: "/projects",
    iosIcon: readerOutline,
    mdIcon: readerOutline,
  },
  {
    title: "Promos",
    url: "/promo",
    iosIcon: albumsOutline,
    mdIcon: albumsOutline,
  },
  {
    title: "Teams",
    url: "/teams",
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircleOutline,
  },
  {
    title: "Students",
    url: "/students",
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline,
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
        <IonList class="ion-margin-top" id="inbox-list">
          <IonMenuToggle autoHide={false}>
            <IonItem
              onClick={() =>
                setSelected([true, false, false, false, false, false])
              }
              className={selected[0] ? "selected" : ""}
              routerLink={"/about"}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon slot="start" icon={appPages[0].iosIcon} />
              <IonLabel>{appPages[0].title}</IonLabel>
            </IonItem>
            <IonItem
              onClick={() =>
                setSelected([false, true, false, false, false, false])
              }
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
              onClick={() =>
                setSelected([false, false, true, false, false, false])
              }
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
              onClick={() =>
                setSelected([false, false, false, true, false, false])
              }
              className={selected[3] ? "selected" : ""}
              routerLink={"/Promo"}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon slot="start" icon={appPages[3].iosIcon} />
              <IonLabel>{appPages[3].title}</IonLabel>
            </IonItem>
            {/*  <IonItem
              onClick={() => {
                setSelected([false, false, false, false, true, false]);
              }}
              className={selected[  4] ? "selected" : ""}
              routerLink={"/Teams"}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              {" "}
              <IonIcon slot="start" icon={appPages[4].iosIcon} />
              <IonLabel>{appPages[4].title}</IonLabel>
            </IonItem> */}
            <IonItem
              onClick={() =>
                setSelected([false, false, false, false, false, true])
              }
              className={selected[5] ? "selected" : ""}
              routerLink={"/students"}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon slot="start" icon={appPages[5].iosIcon} />
              <IonLabel>{appPages[5].title}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
