import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonChip,
  IonText,
  IonList,
  IonButton
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  calendarOutline,
  trophyOutline,
  logoWebComponent,
  linkOutline,
  imageOutline
} from "ionicons/icons";
import Anime from "react-anime";
import axios from "axios";
import "./Accomplishements.css";

const Users: React.FC = () => {
  const [students, setstudents] = useState([]);

  const getUsers = async () => {
    let res = await axios.get("/students");
    let data = res.data;
    setstudents(data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <strong>USERS</strong>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="bg">
        <Anime opacity={[0, 1]} duration={2000} easing="easeOutElastic">
          <IonGrid>
            <IonRow class="ion-align-items-center">
              <IonCol size="12">
                <IonCard class="neum">
                  <IonCardHeader class="ion-text-center ion-padding">
                    <IonCardTitle color="light" className="title">
                      Users
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        {students.length === 0 ? (
                          <div>Loading...</div>
                        ) : (
                          students.map((e: any, i) => {
                            return (
                              <IonCol
                                size="12"
                                sizeMd="3"
                                class=" ion-text-center"
                              >
                                <IonCard
                                  className="user"
                                  class="shadow ion-text-center"
                                >
                                  <IonCardHeader></IonCardHeader>
                                  <IonCardTitle
                                    color="dark"
                                    className="ion-padding"
                                  >
                                    <strong>
                                      {e.first_name + " " + e.last_name}
                                    </strong>
                                  </IonCardTitle>
                                  <IonChip outline={true} color="dark">
                                    <IonLabel>Group: {e.group}</IonLabel>
                                  </IonChip>
                                  <IonChip color="dark" outline={true}>
                                    <IonLabel>{e.class}</IonLabel>
                                  </IonChip>

                                  <IonCardContent>
                                    <IonText>A simple user.</IonText>
                                  </IonCardContent>
                                </IonCard>
                              </IonCol>
                            );
                          })
                        )}
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Anime>
      </IonContent>
    </IonPage>
  );
};

export default Users;
