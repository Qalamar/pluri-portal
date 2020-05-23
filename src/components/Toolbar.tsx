import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonPopover,
} from "@ionic/react";
import { notificationsCircleOutline } from "ionicons/icons";
import NotificationArea from "./NotificationArea";
import { store } from "../stores/Store";
import { observer } from "mobx-react";

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
              size="small"
              icon={notificationsCircleOutline}
            />
          </IonButton>

          <IonPopover
            isOpen={showPopover.open}
            event={showPopover.event}
            onDidDismiss={(e) =>
              setShowPopover({ open: false, event: undefined })
            }
          >
            <NotificationArea />
          </IonPopover>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
});

export default Toolbar;
