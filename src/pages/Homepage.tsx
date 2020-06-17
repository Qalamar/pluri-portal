import {
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCardTitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonIcon,
  IonItem,
  IonText,
  IonButton,
  IonModal,
  IonInput,
  IonLabel,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Anime from "react-anime";
import { mailOutline, personCircleOutline, keyOutline } from "ionicons/icons";
import axios from "axios";
import NotificationArea from "../components/NotificationArea";
import Toolbar from "../components/Toolbar";
import "./Auth.css";
import { useForm, Controller } from "react-hook-form";
import { store } from "../stores/Store";
import { useHistory } from "react-router-dom";

const Homepage: React.FC = () => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  const [isOpen, setisOpen] = useState(false);

  return (
    <IonPage>
      <Toolbar page={"Home"} />
      <IonContent>
        <IonGrid>
          <IonRow class="ion-align-items-center container">
            <IonCol></IonCol>
            <IonCol size="12" sizeMd="7" sizeLg="5">
              <IonCard class="ion-text-center shadow">
                <IonCardHeader>
                  <IonTitle color="light" class="title ion-padding">
                    Home
                  </IonTitle>
                </IonCardHeader>

                <IonCardContent class="ion-padding ion-text-center"></IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Homepage;
