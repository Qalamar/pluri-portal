import { IonButton, IonButtons, IonIcon, IonItem, IonList } from "@ionic/react";
import { closeOutline, logoGithub, mailOutline } from "ionicons/icons";
import React from "react";

const Settings: React.FC = () => {
  const logout = () => {
    localStorage.removeItem("Auth");
    window.location.reload();
  };
  return (
    <div>
      <IonList>
        <IonItem
          class="ion-text-center  ion-justify-content-center"
          lines="none"
        >
          <IonButtons class="logout">
            <IonButton color="dark" fill="outline" onClick={() => logout()}>
              <IonIcon slot="end" icon={closeOutline} />
              LOGOUT
            </IonButton>
            <a href="mailto:contact@tariqhamrit.com" target="_blank" rel="noopener noreferrer">
              <IonButton slot="end" color="dark" fill="outline">
                <IonIcon slot="end" icon={mailOutline} />
                CONTACT
              </IonButton>
            </a>
            <a href="https://github.com/Qalamar/pluri-portal" target="_blank" rel="noopener noreferrer">
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
