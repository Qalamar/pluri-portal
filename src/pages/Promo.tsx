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
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonToast,
} from "@ionic/react";
import axios from "axios";
import { addCircleOutline, filterOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import Anime from "react-anime";
import PromoForm from "../components/PromoForm";
import PromoFormEditing from "../components/PromoFormEditing";
import Toolbar from "../components/Toolbar";
import { store } from "../stores/Store";
import * as api from "../utils/API";
import "./Promo.css";

export interface promotion {
  id: number;
  description: string;
  cycle: string;
  year: string;
  specialityName: string;
  minTeamMembers: number;
  maxTeamMembers: number;
  maxProjects: number;
}

const Promo: React.FC = () => {
  const [Id, setId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalEditing, setShowModalEditing] = useState(false);
  const [promos, setpromos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [editpromo, setEditpromo] = useState<promotion>({
    id: 0,
    description: "",
    cycle: "",
    year: "",
    specialityName: "",
    minTeamMembers: 0,
    maxTeamMembers: 0,
    maxProjects: 0,
  });

  const [showToast, setshowToast] = useState(false);
  const addPromo = () => {
    setShowModal(true);
  };
  const getPromos = async () => {
    let res = await axios.get("/promo/");
    let data = res.data;
    setpromos(data);
  };
  const searchHandle = (input: string) => {
    store.searchList = input;
  };
  useEffect(() => {
    getPromos();
  }, []);
  const edit = (promos: promotion) => {
    setEditpromo(promos);
    setShowModalEditing(true);
  };
  return (
    <IonPage>
      <Toolbar page={"Promos"} />
      <IonContent class="bg">
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setshowToast(false)}
          message="Promo Deleted"
          duration={400}
        />
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <PromoForm />
        </IonModal>

        <IonModal
          isOpen={showModalEditing}
          onDidDismiss={() => setShowModalEditing(false)}
        >
          <PromoFormEditing promo={editpromo} />
        </IonModal>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={"Do you Confirm your demand ?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",

              handler: () => {
                console.log("Confirm cancel");
              },
            },
            {
              cssClass: "del",
              text: "Delete",
              handler: () => {
                console.log(Id);
                api.deletePromotion(Id);
                setshowToast(true);
              },
            },
          ]}
        />

        <Anime opacity={[0, 1]} duration={2000} easing="easeOutElastic">
          <IonGrid>
            <IonRow class="ion-align-items-center">
              <IonCol></IonCol>
              <IonCol size="12">
                <IonCard class="neum">
                  <IonCardHeader class="head">
                    <IonCardTitle color="light" className="title">
                      Promos
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow class="ion-justify-content-center ion-text-center ion-align-items-center">
                        <IonCol size="12" sizeMd="5">
                          <IonSearchbar
                            placeholder="Search for a promotion"
                            onIonChange={(e: CustomEvent) =>
                              searchHandle(e.detail.value)
                            }
                          />
                        </IonCol>
                      </IonRow>
                      <IonRow class="ion-text-center ion-align-items-center ion-justify-content-center">
                        <IonCol>
                          <IonButton
                            size="default"
                            fill="clear"
                            onClick={() => addPromo()}
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
                      <IonRow></IonRow>
                      <IonRow>
                        {" "}
                        {promos.length === 0 ? (
                          <div>Loading...</div>
                        ) : (
                          promos.map((promo: any, i) => {
                            {
                              return (
                                <IonCol
                                  size="12"
                                  sizeMd="6"
                                  class=" ion-text-center"
                                >
                                  <IonCard
                                    key={i + 1}
                                    class="shadow ion-text-center"
                                  >
                                    <IonCardHeader class="ion-margin-bottom">
                                      <IonCardTitle
                                        color="light"
                                        className="ion-padding title"
                                      >
                                        <strong>
                                          {promo.year}
                                          {promo.cycle}
                                          {promo.specialityName.localeCompare(
                                            ""
                                          ) !== 0 && (
                                            <strong>
                                              {" "}
                                              -{promo.specialityName}-{" "}
                                            </strong>
                                          )}
                                        </strong>
                                      </IonCardTitle>
                                    </IonCardHeader>
                                    {promo.cycle.localeCompare("CPI") === 0 ? (
                                      <IonChip outline={true} color="dark">
                                        <IonLabel>Preparatory</IonLabel>
                                      </IonChip>
                                    ) : (
                                      <IonChip outline={true} color="dark">
                                        <IonLabel>Secondary</IonLabel>
                                      </IonChip>
                                    )}
                                    {promo.minTeamMembers !== 0 && (
                                      <IonChip outline={true} color="dark">
                                        <IonLabel>
                                          Min Team Members &nbsp;
                                          {promo.minTeamMembers}{" "}
                                        </IonLabel>
                                      </IonChip>
                                    )}
                                    {promo.maxTeamMembers !== 0 && (
                                      <IonChip outline={true} color="dark">
                                        <IonLabel>
                                          Max Team Members &nbsp;
                                          {promo.maxTeamMembers}{" "}
                                        </IonLabel>
                                      </IonChip>
                                    )}
                                    {promo.maxProjects !== 0 && (
                                      <IonChip outline={true} color="dark">
                                        <IonLabel>
                                          Max Projects &nbsp;
                                          {promo.maxProjects}{" "}
                                        </IonLabel>
                                      </IonChip>
                                    )}
                                    <IonCardContent>
                                      <IonText>{promo.description}</IonText>

                                      <IonList>
                                        <IonButton
                                          onClick={() => edit(promo)}
                                          target="_blank"
                                          color="danger"
                                        >
                                          <IonLabel class="ion-margin">
                                            Edit
                                          </IonLabel>
                                        </IonButton>
                                        <IonButton
                                          key={i + 1}
                                          onClick={() => {
                                            setId(promo.id);
                                            setShowAlert(true);
                                          }}
                                          target="_blank"
                                          color="dark"
                                        >
                                          <IonLabel class="ion-margin">
                                            Delete
                                          </IonLabel>
                                        </IonButton>
                                      </IonList>
                                    </IonCardContent>
                                  </IonCard>{" "}
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

              <IonCol></IonCol>
            </IonRow>
          </IonGrid>
        </Anime>
      </IonContent>
    </IonPage>
  );
};

export default Promo;
