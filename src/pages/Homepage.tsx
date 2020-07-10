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
  IonProgressBar,
  IonLabel,
  IonItem,
  IonChip,
  IonIcon,
} from "@ionic/react";
import React from "react";
import Toolbar from "../components/Toolbar";
import "./Auth.css";
import {
  logoReact,
  logoIonic,
  server,
  personCircleOutline,
} from "ionicons/icons";

const Homepage: React.FC = () => {
  return (
    <IonPage>
      <Toolbar page={"Home"} />
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
                          and attrubition.
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
                    <IonLabel>
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
