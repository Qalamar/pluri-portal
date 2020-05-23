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
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonModal,
  IonItemDivider,
  IonChip,
} from "@ionic/react";
import React, { useState } from "react";
import {
  linkOutline,
  imageOutline,
  logoGithub,
  personCircleOutline,
} from "ionicons/icons";
import Image, { Shimmer } from "react-shimmer";
import "./Projects.css";
import Anime from "react-anime";
import Toolbar from "../components/Toolbar";

const Projects: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <Toolbar page={"Projects"} />
      <IonContent>
        <IonModal
          cssClass="popup"
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        >
          <IonContent color="dark" class="ion-padding ion-text-center">
            <IonCard color="dark">
              <IonCardTitle class="ion-padding title">
                <strong>Gameplay</strong>
              </IonCardTitle>
              <IonItem color="dark" class="ion-margin">
                <iframe
                  src="https://www.youtube.com/embed/7SZBsMOm2Ow"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />
              </IonItem>
            </IonCard>

            <IonCard color="dark">
              <IonCardTitle class="title ion-padding">
                <strong>Pictures</strong>
              </IonCardTitle>
              <IonItem color="dark">
                {" "}
                <img alt="" src={require("../images/background.png")} />
              </IonItem>
              <IonItemDivider color="dark"></IonItemDivider>
              <IonItem color="dark">
                <img alt="" src={require("../images/background.png")} />
              </IonItem>
              <IonItemDivider color="dark"></IonItemDivider>
              <IonItem color="dark">
                <img alt="" src={require("../images/background.png")} />
              </IonItem>
            </IonCard>
            <IonButton
              class="ion-margin"
              color="danger"
              onClick={() => setShowModal(false)}
            >
              Close Preview
            </IonButton>
          </IonContent>
        </IonModal>

        <Anime opacity={[0, 1]} duration={2000} easing="easeOutElastic">
          <IonGrid>
            <IonRow class="ion-align-items-center">
              <IonCol></IonCol>
              <IonCol size="12" sizeSm="11">
                <IonCard class="shadow">
                  <IonCardHeader class="ion-text-center ion-padding titleHeader">
                    <IonCardTitle color="light" className="title">
                      PROJECTS
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeMd="6" sizeLg="4">
                          <IonCard class="shadow ion-text-center">
                            <IonCardHeader>
                              <IonCardTitle
                                color="light"
                                className="ion-padding project"
                              >
                                E-Health
                              </IonCardTitle>
                            </IonCardHeader>
                            <div className="ion-padding"></div>
                            <IonChip outline={true} color="dark">
                              <IonLabel>1CS</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>MySQL</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>Security</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>Mobile</IonLabel>
                            </IonChip>

                            <IonCardContent>
                              <IonText>
                                A project concerning the ongoing COVID-19
                                pandemic directed towards the younger population
                                (Children)
                              </IonText>
                              <IonList class="ion-padding-top">
                                <IonButton
                                  color="dark"
                                  onClick={() => setShowModal(true)}
                                >
                                  <IonIcon icon={imageOutline}></IonIcon>
                                  <IonLabel class="ion-margin">
                                    Documents
                                  </IonLabel>
                                </IonButton>
                                <IonItem
                                  lines="none"
                                  class="ion-text-center ion-padding-top"
                                >
                                  <IonLabel class="ion-margin">
                                    <h1>
                                      <strong>Authors</strong>
                                    </h1>
                                  </IonLabel>
                                </IonItem>
                                <IonItem class="ion-text-center">
                                  <IonIcon
                                    size="large"
                                    icon={personCircleOutline}
                                  ></IonIcon>
                                  <IonLabel>Bacha Bragdy</IonLabel>
                                </IonItem>
                                <IonItem lines="none" class="ion-text-center">
                                  <IonIcon
                                    size="large"
                                    icon={personCircleOutline}
                                  ></IonIcon>
                                  <IonLabel>MCZ Dono</IonLabel>
                                </IonItem>
                              </IonList>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                        <IonCol size="12" sizeMd="6" sizeLg="4">
                          <IonCard class="shadow ion-text-center">
                            <IonCardHeader>
                              <IonCardTitle
                                color="light"
                                className="ion-padding project"
                              >
                                E-Health
                              </IonCardTitle>
                            </IonCardHeader>
                            <div className="ion-padding"></div>
                            <IonChip outline={true} color="dark">
                              <IonLabel>1CS</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>MySQL</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>Security</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>Mobile</IonLabel>
                            </IonChip>

                            <IonCardContent>
                              <IonText>
                                A project concerning the ongoing COVID-19
                                pandemic directed towards the younger population
                                (Children)
                              </IonText>
                              <IonList class="ion-padding-top">
                                <IonButton
                                  color="dark"
                                  onClick={() => setShowModal(true)}
                                >
                                  <IonIcon icon={imageOutline}></IonIcon>
                                  <IonLabel class="ion-margin">
                                    Documents
                                  </IonLabel>
                                </IonButton>
                                <IonItem
                                  lines="none"
                                  class="ion-text-center ion-padding-top"
                                >
                                  <IonLabel class="ion-margin">
                                    <h1>
                                      <strong>Authors</strong>
                                    </h1>
                                  </IonLabel>
                                </IonItem>
                                <IonItem class="ion-text-center">
                                  <IonIcon
                                    size="large"
                                    icon={personCircleOutline}
                                  ></IonIcon>
                                  <IonLabel>Bacha Bragdy</IonLabel>
                                </IonItem>
                                <IonItem lines="none" class="ion-text-center">
                                  <IonIcon
                                    size="large"
                                    icon={personCircleOutline}
                                  ></IonIcon>
                                  <IonLabel>MCZ Dono</IonLabel>
                                </IonItem>
                              </IonList>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonGrid>
        </Anime>
      </IonContent>
    </IonPage>
  );
};

export default Projects;
