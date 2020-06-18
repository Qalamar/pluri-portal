import { IonList } from "@ionic/react";
import React from "react";
import { store } from "../stores/Store";
import { NotificationInterface } from "../utils/Interfaces";
import NotificationItem from "./NotificationItem";

const NotificationArea: React.FC = () => {
  return (
    <div>
      <IonList>
        {store.Notifications.map((item: NotificationInterface) => (
          <NotificationItem Item={item} />
        ))}
      </IonList>
    </div>
  );
};
export default NotificationArea;
