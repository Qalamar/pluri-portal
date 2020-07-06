import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
} from "@ionic/react";
import axios from "axios";
import {
  addCircleOutline,
  filterOutline,
  personCircleOutline,
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Anime from "react-anime";
import Toolbar from "../components/Toolbar";
import UserForm from "../components/UserForm";
import { store } from "../stores/Store";
import * as api from "../utils/API";

import "./Users.css";

const Techers: React.FC = observer(() => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getUsers = async () => {
    async function fetchPromotion() {
      await api.getProffessors();
      setTeachers(store.teachers);
    }
    fetchPromotion();
    console.log(teachers);
  };

  const searchHandle = (input: string) => {
    store.searchList = input;
  };

  const addUser = () => {
    setShowModal(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <IonPage>
      <Toolbar page={"Teachers"} />
      <IonContent>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <UserForm />
        </IonModal>

        <IonGrid>
          <IonRow class="ion-align-items-center">
            <IonCol size="12">
              <IonCard class="neum">
                <IonCardHeader class="ion-text-center ion-padding">
                  <IonCardTitle color="light" className="title">
                    Teachers
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonRow class="ion-text-center ion-align-items-center ion-justify-content-center">
                      <IonCol size="12" sizeMd="10">
                        <IonItem lines="none">
                          <IonSearchbar
                            placeholder="Search"
                            onIonChange={(e: CustomEvent) =>
                              searchHandle(e.detail.value)
                            }
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    <IonRow class="ion-text-center ion-align-items-center ion-justify-content-center">
                      <IonCol>
                        <IonButton
                          size="default"
                          fill="clear"
                          onClick={() => addUser()}
                          color="danger"
                        >
                          <IonIcon
                            icon={addCircleOutline}
                            slot="start"
                            size="large"
                          ></IonIcon>
                          Add
                        </IonButton>
                        <IonButton
                          fill="clear"
                          size="default"
                          onClick={() => addUser()}
                          color="dark"
                        >
                          <IonIcon
                            icon={filterOutline}
                            slot="start"
                            size="large"
                          ></IonIcon>
                          Filter
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      {teachers.length === 0 ? (
                        <div>Loading...</div>
                      ) : (
                        teachers.map((e: any, i) => {
                          {
                            if (
                              e.firstName
                                .toLowerCase()
                                .includes(store.searchList.toLowerCase())
                            )
                              return (
                                <IonCol
                                  size="12"
                                  sizeMd="4"
                                  sizeLg="3"
                                  class=" ion-text-center"
                                >
                                  <Anime
                                    opacity={[0, 1]}
                                    duration={2000}
                                    easing="easeOutElastic"
                                  >
                                    <IonCard
                                      className="user"
                                      class="shadow ion-text-center"
                                    >
                                      <IonCardHeader>
                                        <IonIcon
                                          icon={personCircleOutline}
                                          class="ico"
                                          color="light"
                                        ></IonIcon>
                                      </IonCardHeader>
                                      <IonCardTitle
                                        color="dark"
                                        className="ion-padding "
                                      >
                                        <strong>
                                          {e.firstName + " " + e.lastName}
                                        </strong>
                                      </IonCardTitle>
                                      <IonChip outline={false} color="dark">
                                        <IonLabel>{e.promotion}</IonLabel>
                                      </IonChip>

                                      <IonCardContent>
                                        <IonText>A simple user.</IonText>
                                      </IonCardContent>
                                    </IonCard>
                                  </Anime>
                                </IonCol>
                              );
                          }
                        })
                      )}
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
});

export default Techers;
