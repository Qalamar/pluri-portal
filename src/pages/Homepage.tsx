import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Toolbar from "../components/Toolbar";
import "./Auth.css";
import * as api from "../utils/API";

const Homepage: React.FC = () => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  useEffect(() => {}, []);

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
