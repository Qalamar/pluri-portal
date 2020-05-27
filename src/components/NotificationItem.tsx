import React from 'react'
import { IonItemSliding, IonItem, IonLabel, IonIcon, IonItemOptions, IonItemOption } from '@ionic/react'
import { addCircleOutline } from 'ionicons/icons'
import { NotificationInterface } from '../utils/Interfaces'

interface Notification {
    Item: NotificationInterface
}

const NotificationItem: React.FC<Notification> = ({ Item }) => {
    return (
        <div>
            <IonItemSliding>
                <IonItem lines='none'>
                    <IonLabel>{Item.Desciption}</IonLabel>
                    <IonIcon icon={Item.Icon}></IonIcon>
                </IonItem>

                <IonItemOptions side="end">
                    <IonItemOption color="danger" expandable>
                        Delete
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        </div>
    )
}
export default NotificationItem