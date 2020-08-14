import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonPopover,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import {
  closeOutline,
  keyOutline,
  mailOutline,
  peopleCircleOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
//@ts-ignore
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";
import TextLoop from "react-text-loop";
import animationData from "../assets/Logo.json";
import * as api from "../utils/API";
import "./Auth.css";

let initialValues = {
  email: "throwaway@test.com",
  password: "throwaway1@",
};
interface login {
  email: string;
  password: string;
}
let defaultLogin: login = {
  email: "",
  password: "",
};

const Auth: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [showModal, setShowModal] = useState(false);
  const [showToast, setshowToast] = useState(false);
  const [login, setLogin] = useState("Login");

  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  const { control, handleSubmit, formState, errors } = useForm({
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
    let mail = initialValues.email;
    let pass = initialValues.password;
    api.userLogin(mail, pass);
    history.push("/home");
  };

  return (
    <IonPage>
      <IonToolbar class="ion-padding">
        <IonTitle>
          <h1>
            <strong>Pluri</strong>
          </h1>
        </IonTitle>
        <IonButton
          slot="end"
          fill="clear"
          id="teacher"
          color="dark"
          onClick={(e) => setShowModal(true)}
        >
          <IonLabel>Teachers</IonLabel>
        </IonButton>
        <IonButton
          slot="end"
          fill="outline"
          color="dark"
          onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}
        >
          <IonLabel>Login</IonLabel>
        </IonButton>
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
          <IonContent>
            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setshowToast(false)}
              message="Your request will be processed soon."
              duration={1000}
            />
            <div className="centered">
              <IonLabel class="teacher ion-text-center ion-justify-content-center">
                <strong>Application Form</strong>
              </IonLabel>
              <form
                onSubmit={handleSubmit(() => setshowToast(true))}
                style={{ padding: 10, margin: 15, height: "auto" }}
              >
                <IonItem>
                  <IonIcon slot="start" icon={peopleCircleOutline}></IonIcon>
                  <Controller
                    as={IonInput}
                    placeholder="Full Name"
                    className="firstCapital"
                    control={control}
                    onChangeName="onIonChange"
                    onChange={([selected]) => {
                      return selected.detail.value;
                    }}
                    name="firstName"
                    rules={{
                      required: true,
                    }}
                  />
                  {showError("firstName")}
                </IonItem>
                <IonItem>
                  <IonIcon slot="start" icon={mailOutline}></IonIcon>
                  <Controller
                    as={IonInput}
                    placeholder="Email"
                    control={control}
                    onChangeName="onIonChange"
                    onChange={([selected]) => {
                      return selected.detail.value;
                    }}
                    name="email"
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    }}
                  />
                  {showError("email")}
                </IonItem>
                <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
                  <IonButton
                    color="dark"
                    type="submit"
                    onClick={() =>
                      setTimeout(function () {
                        setShowModal(false);
                      }, 1000)
                    }
                    disabled={formState.isValid === false}
                  >
                    Request Access
                  </IonButton>
                </IonButtons>
              </form>
            </div>
          </IonContent>
        </IonModal>
        <IonPopover
          isOpen={showPopover.open}
          event={showPopover.event}
          onDidDismiss={(e) =>
            setShowPopover({ open: false, event: undefined })
          }
        >
          <IonCard class="ion-text-center login shadow">
            <div className="ion-text-end">
              <IonButton
                class="ion-text-end"
                color="dark"
                fill="clear"
                onClick={(e) =>
                  setShowPopover({ open: false, event: undefined })
                }
              >
                <IonIcon color="dark" slot="end" icon={closeOutline} />
                Dismiss
              </IonButton>
            </div>

            <IonCardContent class=" ion-text-center">
              <form
                onSubmit={handleSubmit(() => onSubmit(defaultLogin))}
                style={{ padding: 38 }}
              >
                <IonItem>
                  <IonIcon slot="start" icon={mailOutline}></IonIcon>
                  <Controller
                    as={IonInput}
                    placeholder="Email"
                    inputmode="email"
                    control={control}
                    onChangeName="onIonChange"
                    onChange={([selected]) => {
                      defaultLogin.email = selected.detail.value;
                      return selected.detail.value;
                    }}
                    name="email"
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    }}
                  />
                </IonItem>
                {showError("email")}

                <IonItem>
                  <IonIcon slot="start" icon={keyOutline}></IonIcon>

                  <Controller
                    as={IonInput}
                    type="password"
                    placeholder="Password"
                    control={control}
                    onChangeName="onIonChange"
                    onChange={([selected]) => {
                      defaultLogin.password = selected.detail.value;
                      return selected.detail.value;
                    }}
                    name="password"
                    rules={{ required: true }}
                  />
                </IonItem>
                {showError("password")}

                <IonButton
                  class="ion-margin-top"
                  color="dark"
                  type="submit"
                  onClick={() => setLogin("Checking...")}
                  disabled={formState.isValid === false}
                >
                  {login}
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </IonPopover>
      </IonToolbar>
      <IonContent>
        <IonGrid>
          <IonRow class="ion-align-items-center ion-justify-content-between">
            <IonCol size="0.5"></IonCol>
            <IonCol class="ion-padding" size="12" sizeMd="6" sizeLg="5">
              <div className="title">
                The Academic Project Platform for{" "}
                <TextLoop>
                  <IonLabel color="primary">Students</IonLabel>
                  <IonLabel color="danger">Teachers</IonLabel>
                </TextLoop>
              </div>

              <h3>
                Pluri-project is a platform aimed at teachers and students to
                showcase and attribute academic projects in accordance with
                university curriculums
              </h3>
            </IonCol>

            <IonCol size="12" sizeMd="4" sizeLg="3">
              <Lottie options={defaultOptions} height={600} width={600} />
            </IonCol>
            <IonCol size="1.5"></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Auth;
