import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settingsSharp } from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useState } from "react";
import Settings from "./Settings";

interface PageProps {
  page: string;
}

const Toolbar: React.FC<PageProps> = observer(({ page }) => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>
          <strong>{page}</strong>
        </IonTitle>
        <IonButtons slot="end">
          <IonButton
            size="large"
            color="dark"
            onClick={(e) =>
              setShowPopover({ open: true, event: e.nativeEvent })
            }
          >
            <IonIcon
              slot="icon-only"
              class="icons"
              size="large"
              icon={settingsSharp}
            />
          </IonButton>

          <IonPopover
            isOpen={showPopover.open}
            event={showPopover.event}
            onDidDismiss={(e) =>
              setShowPopover({ open: false, event: undefined })
            }
          >
            <Settings />
          </IonPopover>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
});

export default Toolbar;
