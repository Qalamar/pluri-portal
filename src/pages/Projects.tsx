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
  IonChip
} from "@ionic/react";
import React, { useState } from "react";
import { linkOutline, imageOutline, logoGithub } from "ionicons/icons";
import "./Projects.css";
import Anime from "react-anime";

const Projects: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <strong>PROJECTS</strong>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
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
                <img alt="" src={require("../images/screenshots/tty1.jpg")} />
              </IonItem>
              <IonItemDivider color="dark"></IonItemDivider>
              <IonItem color="dark">
                <img alt="" src={require("../images/screenshots/tty2.jpg")} />
              </IonItem>
              <IonItemDivider color="dark"></IonItemDivider>
              <IonItem color="dark">
                <img alt="" src={require("../images/screenshots/tty3.jpg")} />
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
                        <IonCol size="12" sizeMd="6">
                          <IonCard class="shadow ion-text-center">
                            <IonCardHeader>
                              <img
                                alt=""
                                className="img-round"
                                src={require("../images/icons/tinygiantr.png")}
                              />
                            </IonCardHeader>
                            <IonCardTitle color="dark" className="ion-padding">
                              <strong>Example project</strong>
                            </IonCardTitle>
                            <IonChip outline={true} color="dark">
                              <IonLabel>Construct2</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>HTML5</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>Canvas</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>Javascript</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>Cordova</IonLabel>
                            </IonChip>
                            <IonCardContent>
                              <IonText>A puzzle-platformer 2D game.</IonText>
                              <IonList>
                                <IonButton
                                  href="https://thetinygiant.netlify.com/"
                                  target="_blank"
                                  color="danger"
                                >
                                  <IonIcon icon={linkOutline}></IonIcon>
                                  <IonLabel class="ion-margin">Demo</IonLabel>
                                </IonButton>
                                <IonButton
                                  color="dark"
                                  onClick={() => setShowModal(true)}
                                >
                                  <IonIcon icon={imageOutline}></IonIcon>
                                  <IonLabel class="ion-margin">
                                    Preview
                                  </IonLabel>
                                </IonButton>
                                <IonItem class="ion-text-center">
                                  <IonLabel>
                                    <strong>Information</strong>
                                  </IonLabel>
                                </IonItem>
                                <IonItem class="ion-text-center">
                                  <IonLabel>
                                    Cross-platform support: iOS, Android and Web
                                    portals.
                                  </IonLabel>
                                </IonItem>
                                <IonItem class="ion-text-center">
                                  <IonLabel>
                                    +150.000 sessions across all platforms.
                                  </IonLabel>
                                </IonItem>
                                <IonItem class="ion-text-center">
                                  <IonLabel>Nominated for 5 awards.</IonLabel>
                                </IonItem>
                              </IonList>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                        <IonCol size="12" sizeMd="6">
                          <IonCard class="shadow ion-text-center">
                            <IonCardHeader>
                              <img
                                alt=""
                                className="img-round"
                                src={require("../images/icons/smartsort.png")}
                              />
                            </IonCardHeader>
                            <IonCardTitle color="dark" className="ion-padding">
                              <strong>Smart Sort: Gallery</strong>
                            </IonCardTitle>
                            <IonChip outline={true} color="dark">
                              <IonLabel>Java</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>Glide</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>Android Studio</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true}>
                              <IonLabel>Material UI</IonLabel>
                            </IonChip>

                            <IonCardContent>
                              <IonText>
                                Picture management and organization tool.{" "}
                                <br></br>
                                This project was done under the context of
                                pluridisciplinary projects as a part of ESI-SBA
                                (University) Curriculum.
                              </IonText>

                              <IonList>
                                <IonButton
                                  href="https://play.google.com/store/apps/details?id=com.esi.smartsort"
                                  target="_blank"
                                  color="danger"
                                >
                                  <IonIcon icon={linkOutline}></IonIcon>
                                  <IonLabel class="ion-margin">Demo</IonLabel>
                                </IonButton>

                                <IonButton
                                  color="dark"
                                  href="https://github.com/Qalamar/smart-sort-gallery"
                                  target="_blank"
                                >
                                  <IonIcon icon={logoGithub}></IonIcon>
                                  <IonLabel class="ion-margin">Code</IonLabel>
                                </IonButton>
                                <IonItem class="ion-text-center">
                                  <IonLabel>
                                    <strong>Information</strong>
                                  </IonLabel>
                                </IonItem>
                                <IonItem class="ion-text-center">
                                  <IonLabel>
                                    Search & Gallery directly in-app
                                  </IonLabel>
                                </IonItem>
                                <IonItem class="ion-text-center">
                                  <IonLabel>Tag and sort pictures</IonLabel>
                                </IonItem>
                                <IonItem class="ion-text-center">
                                  <IonLabel>Attach notes</IonLabel>
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
