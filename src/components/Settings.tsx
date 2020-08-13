import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import {
  closeOutline,
  contrastOutline,
  logoGithub,
  mailOutline,
  sunnyOutline,
} from "ionicons/icons";
import React from "react";

const Settings: React.FC = () => {
  const logout = () => {
    localStorage.removeItem("Auth");
    window.location.reload();
  };
  return (
    <div>
      <IonList>
        {/* <IonItem>
          <IonSegment
            color="dark"
            value="light"
            //onIonChange={(e) => console.log("Segment selected", e.detail.value)}
          >
            <IonSegmentButton value="dark">
              <IonIcon size="large" icon={contrastOutline} />
              <IonLabel>Dark</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="light">
              <IonIcon size="large" icon={sunnyOutline} />

              <IonLabel>Light</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonItem> */}

        <IonItem
          class="ion-text-center  ion-justify-content-center"
          lines="none"
        >
          <IonButtons class="cent">
            <IonButton color="dark" fill="outline" onClick={() => logout()}>
              <IonIcon slot="end" icon={closeOutline} />
              LOGOUT
            </IonButton>
            <a href="mailto:contact@tariqhamrit.com" target="_blank">
              <IonButton slot="end" color="dark" fill="outline">
                <IonIcon slot="end" icon={mailOutline} />
                CONTACT
              </IonButton>
            </a>
            <a href="https://github.com/Qalamar/pluri-portal" target="_blank">
              <IonButton slot="end" color="dark" fill="outline">
                <IonIcon slot="end" icon={logoGithub} />
                Github
              </IonButton>
            </a>
          </IonButtons>
        </IonItem>
      </IonList>
    </div>
  );
};
export default Settings;
