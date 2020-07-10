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
  return (
    <div>
      <IonList>
        <IonItem>
          <IonSegment
            color="dark"
            value="friends"
            //onIonChange={(e) => console.log("Segment selected", e.detail.value)}
          >
            <IonSegmentButton value="friends">
              <IonIcon size="large" icon={contrastOutline} />
              <IonLabel>Dark</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="enemies">
              <IonIcon size="large" icon={sunnyOutline} />

              <IonLabel>Light</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Contact us</IonLabel>
          <IonIcon size="large" icon={mailOutline} />
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Check the code</IonLabel>
          <IonIcon size="large" icon={logoGithub} />
        </IonItem>
        <IonItem lines="none">
          <IonButtons class="ion-text-center">
            <IonButton
              color="dark"
              fill="outline"
              //  onClick={() => edit(promo)}
            >
              <IonIcon slot="end" icon={closeOutline} />
              LOGOUT
            </IonButton>
            <IonButton
              class=" ion-padding-start"
              color="dark"
              fill="outline"
              //  onClick={() => edit(promo)}
            >
              <IonIcon slot="end" icon={mailOutline} />
              CONTACT
            </IonButton>
          </IonButtons>
        </IonItem>
      </IonList>
    </div>
  );
};
export default Settings;
