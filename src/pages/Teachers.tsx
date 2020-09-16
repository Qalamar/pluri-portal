import {
  IonAlert,
  IonButton,
  IonButtons,
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
} from "@ionic/react";
import {
  addCircleOutline,
  closeOutline,
  createOutline,
  filterOutline,
  personCircleOutline,
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Anime from "react-anime";
import Toolbar from "../components/Toolbar";
import AddTeacher from "../forms/teacher/AddTeacher";
import EditTeacher from "../forms/teacher/EditTeacher";
import * as api from "../utils/API";
import { store } from "../utils/Store";

let initialValues = {
  id: 0,
  firstName: "",
  lastName: "",
  password: "",
  email: "",
};

const Techers: React.FC = observer(() => {
  const [teachers, setTeachers] = useState([]);
  const [Id, setId] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setshowToast] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [teacher, setTeacher] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const getUsers = async () => {
    async function fetchTeachers() {
      await api.getProffessors();
      setTeachers(teachers);
    }
    fetchTeachers();
  };

  const searchHandle = (input: string) => {
    store.searchList = input;
  };

  const addUser = () => {
    setShowModal(true);
  };

  const edit = (data: any) => {
    teacher.id = data.id;
    teacher.firstName = data.firstName;
    teacher.lastName = data.lastName;
    teacher.email = data.email;
    teacher.password = data.password;
    setShowEdit(true);
  };

  useEffect(() => {
    setTeacher(initialValues)
    store.page = "teachers";
    getUsers();
  }, []);

  return (
    <IonPage>
      <Toolbar page={"Teachers"} />
      <IonContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={"Confirm?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",

              handler: () => { },
            },
            {
              cssClass: "del",
              text: "Delete",
              handler: () => {
                api.deleteProfessor(Id);
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
          <AddTeacher />
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
          <EditTeacher teacher={teacher} />
        </IonModal>
        <IonGrid>
          <IonRow class="ion-align-items-center">
            <IonCol size="12">
              <IonCard class="neum holder">
                <IonCardContent>
                  <IonGrid>
                    <IonRow class="ion-text-center ion-margin ion-justify-content-center">
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
                        <IonButton fill="clear" size="default" color="dark">
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
                      {store.teachers.length === 0 ? (
                        <div>Loading...</div>
                      ) : (
                          store.teachers.map((e: any, i) => {
                            if (
                              e.firstName
                                .toLowerCase()
                                .includes(store.searchList.toLowerCase())
                            )
                              return (
                                <IonCol
                                  key={e.title}
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
                                    <IonCard class="shadow holder ion-text-center">
                                      <IonCardHeader>
                                        <IonIcon
                                          icon={personCircleOutline}
                                          class="ico"
                                          color="dark"
                                        ></IonIcon>
                                      </IonCardHeader>
                                      <IonCardTitle
                                        color="dark"
                                        className="ion-padding-horizontal "
                                      >
                                        <strong>
                                          {e.firstName + " " + e.lastName}
                                        </strong>
                                      </IonCardTitle>
                                      <IonChip outline={false} color="dark">
                                        <IonLabel>{e.email}</IonLabel>
                                      </IonChip>

                                      <IonCardContent>
                                        <IonButtons class="ion-justify-content-center ion-text-center">
                                          <IonButton
                                            color="dark"
                                            onClick={() => edit(e)}
                                          >
                                            <IonIcon
                                              slot="icon-only"
                                              icon={createOutline}
                                            />
                                          </IonButton>
                                          <IonButton
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
