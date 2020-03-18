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
  IonChip,
  IonLabel,
  IonButton,
  IonList,
  IonModal,
  IonSearchbar,
  IonIcon
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Anime from "react-anime";
import "./Promo.css";
import axios from "axios";
import PromoForm from "../components/PromoForm";
import PromoFormEditing from "../components/PromoFormEditing";
import { addCircleOutline, filterOutline } from "ionicons/icons";

const Promo: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEditing, setShowModalEditing] = useState(false);
  const [promos, setpromos] = useState([]);
  const [editpromo, setEditpromo] = useState();
  const addPromo = () => {
    setShowModal(true);
  };
  const getPromos = async () => {
    let res = await axios.get("/promotion");
    let data = res.data;
    setpromos(data);
  };
  useEffect(() => {
    getPromos();
  }, []);
  const edit = (promos: any) => {
    setShowModalEditing(true);
    setEditpromo(promos);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>
            <strong>Promos</strong>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="bg">
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <PromoForm />
        </IonModal>

        <IonModal
          isOpen={showModalEditing}
          onDidDismiss={() => setShowModalEditing(false)}
        >
          <PromoFormEditing promo={editpromo} />
        </IonModal>

        <Anime opacity={[0, 1]} duration={2000} easing="easeOutElastic">
          <IonGrid>
            <IonRow class="ion-align-items-center">
              <IonCol></IonCol>
              <IonCol size="12" sizeMd="10">
                <IonCard class="neum">
                  <IonCardHeader class="head">
                    <IonCardTitle color="light" className="title">
                      Promos
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow class="ion-justify-content-center ion-text-center ion-align-items-center">
                        <IonCol size="12" sizeMd="8">
                          <IonSearchbar placeholder="Search for a promotion" />
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
                          promos.map((promo: any) => {
                            return (
                              <IonCol>
                                <IonCard class="shadow ion-text-center">
                                  <IonCardHeader class="ion-margin-bottom">
                                    <IonCardTitle
                                      color="light"
                                      className="ion-padding title"
                                    >
                                      <strong>{promo.codePromotion}</strong>
                                    </IonCardTitle>
                                  </IonCardHeader>

                                  <IonChip outline={true} color="dark">
                                    <IonLabel>{promo.level} </IonLabel>
                                  </IonChip>
                                  <IonChip outline={true} color="dark">
                                    <IonLabel>{promo.cycle}</IonLabel>
                                  </IonChip>
                                  <IonChip outline={true} color="dark">
                                    <IonLabel>{promo.academicYear}</IonLabel>
                                  </IonChip>
                                  {promo.specialityCode.length > 0 && (
                                    <IonChip outline={true} color="dark">
                                      <IonLabel>
                                        {promo.specialityCode}{" "}
                                      </IonLabel>
                                    </IonChip>
                                  )}

                                  <IonCardContent>
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
                                      <IonButton target="_blank" color="dark">
                                        <IonLabel class="ion-margin">
                                          Delete
                                        </IonLabel>
                                      </IonButton>
                                    </IonList>
                                  </IonCardContent>
                                </IonCard>{" "}
                              </IonCol>
                            );
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
