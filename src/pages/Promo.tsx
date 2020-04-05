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
  IonIcon,
  IonAlert,
  IonToast,
  IonText
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Anime from "react-anime";
import "./Promo.css";
import axios from "axios";
import { store } from "../stores/Store";
import PromoForm from "../components/PromoForm";
import PromoFormEditing from "../components/PromoFormEditing";
import { addCircleOutline, filterOutline } from "ionicons/icons";
import * as api from "../utils/api";

export interface promotion {
  id: number;
  codePromotion: string;
  description:string;
  cycle: string;
  level: string;
  academicYear: string;
  specialtyCode: string;
}

const Promo: React.FC = () => {
  const [Id, setId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalEditing, setShowModalEditing] = useState(false);
  const [promos, setpromos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [editpromo, setEditpromo] = useState<promotion>({
    id: 0,
    codePromotion: "",
    description:"",
    cycle: "",
    level: "",
    academicYear: "",
    specialtyCode: "",
  });
  const [showToast, setshowToast] = useState(false);
  const addPromo = () => {
    setShowModal(true);
  };
  const getPromos = async () => {
    let res = await api.getPromotions();
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
                api.deletePromotion(Id);
                setshowToast(true);
              },
            },
          ]}
        />

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
                                <Anime
                                  opacity={[0, 1]}
                                  duration={2000}
                                  easing="easeOutElastic"
                                >
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
                                    {promo.specialityCode !== "" && (
                                      <IonChip outline={true} color="dark">
                                        <IonLabel>
                                          {promo.specialtyCode}
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

            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Promo;
