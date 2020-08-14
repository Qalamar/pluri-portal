import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { closeOutline, logoIonic, logoReact, server } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import Toolbar from "../components/Toolbar";
import "../forms/promotion/PromoForm.css";
import { store } from "../utils/Store";
import "./Auth.css";

const Homepage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    store.page = "about";
    if (store.isAuth.access === "2") setShowModal(true);
  }, []);
  return (
    <IonPage>
      <Toolbar page={"About"} />
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <div className="ion-text-end">
          <IonButton
            class="ion-text-end"
            color="dark"
            fill="clear"
            onClick={() => setShowModal(false)}
          >
            <IonIcon color="dark" slot="end" icon={closeOutline} />
            Dismiss
          </IonButton>
        </div>
        <IonContent>
          <div className="centered ion-text-center">
            <IonLabel class="teacher ion-text-center ion-padding ion-justify-content-center">
              <strong>Guest Access</strong>
            </IonLabel>
            <IonLabel class="ion-margin-top">
              You will not be able to preview or modify any data.
            </IonLabel>
          </div>
        </IonContent>
      </IonModal>
      <IonContent className="showcase">
        <IonGrid>
          <IonRow class="ion-align-items-center ">
            <IonCol></IonCol>
            <IonCol size="12" sizeMd="7" sizeXl="5">
              <IonCard class="ion-text-center shadow holder">
                <IonCardHeader>
                  <IonTitle color="dark" class="title">
                    Pluri Portal
                  </IonTitle>
                </IonCardHeader>

                <IonCardContent class="ion-padding ion-text-center">
                  <IonGrid>
                    <IonRow class="ion-padding">
                      <IonCol>
                        <IonLabel>
                          Pluri portal is an academic platform for teachers and
                          students , allowing project submission, preview and
                          attribution.
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonLabel>
                      <strong>Technologies</strong>
                    </IonLabel>
                    <IonRow class="ion-padding ion-justify-content-center">
                      <IonCol>
                        <IonChip outline={false} color="danger">
                          <IonIcon icon={logoReact} />
                          <IonLabel>React</IonLabel>
                        </IonChip>
                        <IonChip outline={false} color="primary">
                          <IonIcon icon={logoIonic} />
                          <IonLabel>Ionic</IonLabel>
                        </IonChip>
                        <IonChip outline={false} color="success">
                          <IonIcon icon={server} />
                          <IonLabel>Django</IonLabel>
                        </IonChip>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
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
