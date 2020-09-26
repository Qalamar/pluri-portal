import { IonButton, IonButtons, IonIcon, IonItem, IonList } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
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
            <IonButton color="dark" onClick={() => logout()}>
              <IonIcon slot="end" icon={closeOutline} />
              LOGOUT
            </IonButton>
          </IonButtons>
        </IonItem>
      </IonList>
    </div>
  );
};
export default Settings;
