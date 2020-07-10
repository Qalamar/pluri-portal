import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import { keyOutline, mailOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import * as api from "../utils/API";
import "./Auth.css";

let initialValues = {
  email: "",
  password: "",
};
interface login {
  email: string;
  password: string;
}
let Log: login = {
  email: "",
  password: "",
};

const Auth: React.FC = () => {
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    /*     const rest = JSON.parse(localStorage.getItem("Auth")!);
    if (rest === null) store.isAuth.state = false;
    else {
      store.isAuth.access = rest.access;
      store.isAuth.token = rest.token;
      store.isAuth.id = rest.id;
      
    } */
  }, []);

  const [image, setimage] = useState();

  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange",
  });

  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red" }}>{error.message || "Field Is Required"}</div>
    ) : null;
  };

  const history = useHistory();

  const onSubmit = (data: any) => {
    let mail = data.email;
    let pass = data.password;
    /*  axios
      .post("/login", {
        email: data.email,
        userName: data.userName,
        password: data.password,
      })
      .then(function (response) {
        
        localStorage.setItem("Auth", JSON.stringify(response.data));
      })
      .catch(function (error) {
        
      }); */
    // Awaiting API Changes
    api.userLogin(mail, pass);
    history.push("/home");
  };

  return (
    <IonPage>
      <Toolbar page={"Authentication"} />
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

        <IonGrid>
          <IonRow class="ion-align-items-center container">
            <IonCol></IonCol>
            <IonCol size="12" sizeMd="7" sizeLg="5">
              <IonCard class="ion-text-center shadow">
                <IonCardHeader>
                  <IonTitle color="light" class="title ion-padding">
                    Auth
                  </IonTitle>
                </IonCardHeader>

                <IonCardContent class="ion-padding ion-text-center">
                  <form
                    onSubmit={handleSubmit(() => onSubmit(Log))}
                    style={{ padding: 38 }}
                  >
                    <IonLabel>
                      <strong>Email:</strong> throwaway@test.com <br></br>
                      <strong>Password:</strong> throwaway1@
                    </IonLabel>
                    <IonItem>
                      <IonIcon slot="start" icon={mailOutline}></IonIcon>
                      <Controller
                        as={IonInput}
                        placeholder="Email"
                        inputmode="email"
                        control={control}
                        onChangeName="onIonChange"
                        onChange={([selected]) => {
                          Log.email = selected.detail.value;
                          return selected.detail.value;
                        }}
                        name="email"
                        rules={{
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid email address",
                          },
                        }}
                      />
                    </IonItem>
                    {showError("email")}
                    {/* <IonItem class="">
                      <IonIcon
                        slot="start"
                        icon={personCircleOutline}
                      ></IonIcon>

                      <Controller
                        as={IonInput}
                        placeholder="UserName"
                        control={control}
                        onChangeName="onIonChange"
                        onChange={([selected]) => {
                          
                          Log.userName = selected.detail.value;
                          return selected.detail.value;
                        }}
                        name="userName"
                        rules={{
                          required: true,
                        }}
                      />
                    </IonItem>
                    {showError("userName")} */}
                    <IonItem class="ion-margin-bottom">
                      <IonIcon slot="start" icon={keyOutline}></IonIcon>

                      <Controller
                        as={IonInput}
                        type="password"
                        placeholder="Password"
                        control={control}
                        onChangeName="onIonChange"
                        onChange={([selected]) => {
                          Log.password = selected.detail.value;
                          return selected.detail.value;
                        }}
                        name="password"
                        rules={{ required: true }}
                      />
                    </IonItem>
                    {showError("password")}
                    <IonButton
                      color="success"
                      type="submit"
                      // disabled={formState.isValid === false}
                    >
                      Register
                    </IonButton>
                    <IonButton
                      color="dark"
                      type="submit"
                      disabled={formState.isValid === false}
                    >
                      Login
                    </IonButton>
                  </form>
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
export default Auth;
