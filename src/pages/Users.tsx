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
  IonButton,
  IonSearchbar,
  IonModal,
  IonInput
} from "@ionic/react";
import React, { useEffect, useState, useReducer } from "react";
import {
  calendarOutline,
  trophyOutline,
  logoWebComponent,
  linkOutline,
  imageOutline
} from "ionicons/icons";
import Anime from "react-anime";
import axios from "axios";
import { observer } from "mobx-react";
import styled from "styled-components";
import { store } from "../stores/Store";
import UserForm from "../components/UserForm";
import "./Accomplishements.css";

const Users: React.FC = observer(() => {
  const [ignored, render] = useReducer(x => x + 1, 0);
  const [students, setstudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getUsers = async () => {
    let res = await axios.get("/students");
    let data = res.data;
    setstudents(data);
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
                    Users
                  </IonCardTitle>
                  <IonInput autoCapitalize="characters"></IonInput>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol></IonCol>
                      <IonCol size="12" sizeMd="8">
                        <IonSearchbar
                          placeholder="Search for a student"
                          onIonChange={(e: CustomEvent) =>
                            searchHandle(e.detail.value)
                          }
                        />
                      </IonCol>
                      <IonCol class="ion-text-center">
                        <IonButton onClick={() => addUser()} color="danger">
                          Add User
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      {students.length === 0 ? (
                        <div>Loading...</div>
                      ) : (
                        students.map((e: any, i) => {
                          {
                            if (
                              e.first_name
                                .toLowerCase()
                                .includes(store.searchList.toLowerCase())
                            )
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
                                    <IonCardHeader>
                                      <img
                                        alt=""
                                        className="img-round"
                                        src={require("../images/icons/tinygiantr.png")}
                                      />
                                    </IonCardHeader>
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

export default Users;
