import {
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonPopover,
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
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>

      <IonButtons slot="end">
        <IonButton
          size="large"
          color="dark"
          onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}
        >
          <IonIcon slot="icon-only" class="icons" icon={settingsSharp} />
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
  );
});

export default Toolbar;
