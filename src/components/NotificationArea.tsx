import React, { useState } from 'react'
import { IonPopover, IonList, IonItemSliding, IonItem, IonLabel, IonIcon, IonItemOptions, IonItemOption } from '@ionic/react'
import { addCircleOutline, calendarOutline } from 'ionicons/icons'
import { store } from "../stores/Store";
import NotificationItem from './NotificationItem'
import { NotificationInterface } from '../utils/Interfaces'


const NotificationArea: React.FC = () => {

    return (
        <div>
            <IonList>
                {store.Notifications.map((item: NotificationInterface) =>
                    <NotificationItem Item={item} />
                )}
            </IonList>

        </div>
    )
}
export default NotificationArea