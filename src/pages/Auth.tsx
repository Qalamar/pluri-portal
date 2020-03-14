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
  IonCardTitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonIcon,
  IonItem,
  IonText,
  IonButton,
  IonModal,
  IonInput
} from "@ionic/react";
import React, { useState } from "react";
import Anime from "react-anime";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import axios from "axios";
import "./Auth.css";

const Auth: React.FC = () => {
  const [isOpen, setisOpen] = useState(false);
  const showProfile = () => {
    axios.get("/employees?id=1").then(function(response) {
      let data = response.data;

      // handle success
      console.log(data[0].email);
    });
  };
  const [image, setimage] = useState();
  const handleImageChange = (e: any) => {
    setimage(e.target.files[0]);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(image);
    let form_data = new FormData();
    form_data.append("image", image, "Test");
    let url = "http://localhost:3000/employees/";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <strong>Authentication</strong>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonModal
          cssClass="popup"
          isOpen={isOpen}
          onDidDismiss={() => setisOpen(false)}
        >
          <IonContent color="dark" class="ion-padding ion-text-center">
            <IonCard color="dark">
              <IonCardTitle class="ion-padding title">
                <strong>INFO</strong>
              </IonCardTitle>
              <IonCardContent class="ion-padding">
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      {" "}
                      <IonText color="light">Simple Modal</IonText>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol class="ion-text-center ion-margin-top ion-align-items-baseline"></IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>

            <IonButton
              class="ion-margin"
              color="danger"
              onClick={() => setisOpen(false)}
            >
              Close Preview
            </IonButton>
          </IonContent>
        </IonModal>

        <Anime opacity={[0, 1]} duration={2000} easing="easeOutElastic">
          <IonGrid>
            <IonRow class="ion-align-items-center container">
              <IonCol></IonCol>
              <IonCol size="12" sizeMd="6">
                <IonCard class="ion-text-center shadow">
                  <IonCardHeader>
                    <IonTitle color="light" class="title ion-padding">
                      Auth
                    </IonTitle>
                  </IonCardHeader>
                  <IonCardContent class="ion-padding ion-text-center">
                    <IonItem class="ion-margin ">
                      <IonIcon slot="start" icon={mailOutline}></IonIcon>
                      <IonInput placeholder="Email"></IonInput>
                    </IonItem>
                    <IonItem class="ion-margin">
                      <IonIcon slot="start" icon={lockClosedOutline}></IonIcon>
                      <IonInput
                        type="password"
                        placeholder="Password"
                      ></IonInput>
                    </IonItem>

                    <IonButton color="dark" type="submit">
                      Login
                    </IonButton>
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

export default Auth;
