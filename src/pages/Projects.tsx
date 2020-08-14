import {
  IonAlert,
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
  IonToast,
  IonButtons,
} from "@ionic/react";
import {
  addCircleOutline,
  closeOutline,
  createOutline,
  filterOutline,
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Anime from "react-anime";
import AddProject from "../forms/project/AddProject";
import EditProject from "../forms/project/EditProject";
import Toolbar from "../components/Toolbar";
import { store } from "../utils/Store";
import * as api from "../utils/API";
import "./Projects.css";

const Projects: React.FC = observer(() => {
  const [projects, setProjects] = useState([]);
  const [Id, setId] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setshowToast] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [project, setProject] = useState({
    id: 0,
    title: "",
    domain: "",
    professor: "",
    tools: "",
    requiredDocuments: "",
    promo: "",
  });
  const edit = (data: any) => {
    project.id = data.id;
    project.title = data.title;
    project.domain = data.domain;
    project.professor = data.professor;
    project.tools = data.tools;
    project.requiredDocuments = data.requiredDocuments;
    project.promo = data.promo;

    setShowEdit(true);
  };

  const getUsers = async () => {
    async function fetchPromotion() {
      await api.getProjects();
      setProjects(store.projects);
    }
    fetchPromotion();
  };

  const searchHandle = (input: string) => {
    store.searchList = input;
  };

  const addUser = () => {
    setShowModal(true);
  };

  useEffect(() => {
    store.page = "projects";
    getUsers();
  }, []);

  return (
    <IonPage>
      <Toolbar page={"Projects"} />
      <IonContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={"Confirm?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",

              handler: () => {},
            },
            {
              cssClass: "del",
              text: "Delete",
              handler: () => {
                api.deleteProject(Id);
                setshowToast(true);
              },
            },
          ]}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setshowToast(false)}
          message="Deleted"
          duration={400}
        />
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <div className="ion-text-end">
            <IonButton
              class="ion-text-end"
              color="dark"
              fill="clear"
              onClick={() => setShowModal(false)}
            >
              <IonIcon color="dark" slot="end" icon={closeOutline} />
              Dismiss
            </IonButton>
          </div>
          <AddProject />
        </IonModal>
        <IonModal isOpen={showEdit} onDidDismiss={() => setShowEdit(false)}>
          <div className="ion-text-end">
            <IonButton
              class="ion-text-end"
              color="dark"
              fill="clear"
              onClick={() => setShowEdit(false)}
            >
              <IonIcon color="dark" slot="end" icon={closeOutline} />
              Dismiss
            </IonButton>
          </div>
          <EditProject data={project} />
        </IonModal>
        <IonGrid>
          <IonRow class="ion-align-items-center">
            <IonCol size="12">
              <IonCard class="neum holder">
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
                    <IonRow class="ion-justify-content-center">
                      {projects.length === 0 ? (
                        <div>Loading...</div>
                      ) : (
                        projects.map((e: any, i) => {
                          {
                            if (
                              e.title
                                .toLowerCase()
                                .includes(store.searchList.toLowerCase())
                            )
                              return (
                                <IonCol
                                  size="12"
                                  sizeSm="6"
                                  sizeMd="4"
                                  sizeXl="3"
                                  class=" ion-text-center"
                                >
                                  <Anime
                                    opacity={[0, 1]}
                                    duration={2000}
                                    easing="easeOutElastic"
                                  >
                                    <IonCard class="shadow user holder ion-text-center">
                                      <IonCardHeader>
                                        <IonCardTitle
                                          color="light"
                                          className="title"
                                        >
                                          {e.domain}
                                        </IonCardTitle>
                                      </IonCardHeader>
                                      <IonCardTitle
                                        color="dark"
                                        className="ion-padding "
                                      >
                                        <IonLabel>{e.tools}</IonLabel>
                                      </IonCardTitle>
                                      <IonChip outline={false} color="dark">
                                        <IonLabel>{e.title}</IonLabel>
                                      </IonChip>

                                      <IonCardContent>
                                        <IonButtons class="ion-justify-content-center ion-text-center">
                                          <IonButton
                                            class="ion-text-end"
                                            color="danger"
                                            key={e.id}
                                            onClick={() => {
                                              setId(e.id);
                                              setShowAlert(true);
                                            }}
                                          >
                                            <IonIcon
                                              slot="icon-only"
                                              icon={closeOutline}
                                            />
                                          </IonButton>
                                        </IonButtons>
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

export default Projects;
