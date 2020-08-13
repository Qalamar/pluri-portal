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
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { closeOutline, logoIonic, logoReact, server } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import Toolbar from "../components/Toolbar";
import { store } from "../stores/Store";
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
      <IonContent>
        <IonGrid>
          <IonRow class="ion-align-items-center ">
            <IonCol></IonCol>
            <IonCol size="12" sizeMd="7" sizeLg="5">
              <IonCard class="ion-text-center shadow">
                <IonCardHeader>
                  <IonTitle color="light" class="title ion-padding">
                    Project Portal
                  </IonTitle>
                </IonCardHeader>

                <IonCardContent class="ion-padding ion-text-center">
                  <IonGrid>
                    <IonRow class="ion-padding">
                      <IonCol>
                        {/* <IonProgressBar type="indeterminate"></IonProgressBar> */}
                        <IonLabel>
                          Project portal is an academic platform for teachers
                          and students , allowing project submission, preview
                          and attribution.
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
                    {/*   <IonLabel>
                      <strong>Contributors</strong>
                    </IonLabel>
                    <IonRow class="ion-justify-content-center">
                      <IonCol size="12">
                        <IonChip outline={false}>
                          <IonIcon icon={personCircleOutline} />
                          <IonLabel>Ilyes Bacha</IonLabel>
                        </IonChip>
                      </IonCol>
                      <IonCol size="12">
                        <IonChip outline={false}>
                          <IonIcon icon={personCircleOutline} />
                          <IonLabel>Souhila Guendozi</IonLabel>
                        </IonChip>
                      </IonCol>
                      <IonCol size="12">
                        <IonChip outline={false}>
                          <IonIcon icon={personCircleOutline} />
                          <IonLabel>Tariq Hamrit</IonLabel>
                        </IonChip>
                      </IonCol>
                      <IonCol size="12">
                        <IonChip outline={false}>
                          <IonIcon icon={personCircleOutline} />
                          <IonLabel>Wided Touhami</IonLabel>
                        </IonChip>
                      </IonCol>
                      <IonCol size="12">
                        <IonChip outline={false}>
                          <IonIcon icon={personCircleOutline} />
                          <IonLabel>Khodja Moses</IonLabel>
                        </IonChip>
                      </IonCol>
                    </IonRow> */}
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
