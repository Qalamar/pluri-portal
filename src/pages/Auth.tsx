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
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonChip,
} from "@ionic/react";
import {
  closeOutline,
  keyOutline,
  mailOutline,
  peopleCircleOutline,
  readerOutline,
  personCircleOutline,
  createOutline,
  logoGithub,
  mailOpenOutline,
  mailOpen,
  send,
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
  const [text, setText] = useState<string>();
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
      <IonContent>
        <IonToolbar class="ion-padding-horizontal main">
          <IonTitle color="light" class="sub-title">
            <strong>Pluri</strong>
          </IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            id="teacher"
            color="dark"
            onClick={(e) => setShowModal(true)}
          >
            <IonLabel color="light">Teachers</IonLabel>
          </IonButton>
          <IonButton
            slot="end"
            color="light"
            onClick={(e) =>
              setShowPopover({ open: true, event: e.nativeEvent })
            }
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
        <section className="container">
          <div className="wave"></div>
        </section>{" "}
        <IonGrid class="ion-margin-top ion-padding-top">
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
        <div className="row red">
          <div>
            <svg
              id=""
              preserveAspectRatio="xMidYMax meet"
              className="svg-separator sep1"
              viewBox="0 0 1600 100"
              data-height="100"
            >
              <path
                style={{ opacity: "1", fill: "#bc4565" }}
                d="M1040,56c0.5,0,1,0,1.6,0c-16.6-8.9-36.4-15.7-66.4-15.7c-56,0-76.8,23.7-106.9,41C881.1,89.3,895.6,96,920,96
C979.5,96,980,56,1040,56z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#bc4565" }}
                d="M1699.8,96l0,10H1946l-0.3-6.9c0,0,0,0-88,0s-88.6-58.8-176.5-58.8c-51.4,0-73,20.1-99.6,36.8
c14.5,9.6,29.6,18.9,58.4,18.9C1699.8,96,1699.8,96,1699.8,96z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#bc4565" }}
                d="M1400,96c19.5,0,32.7-4.3,43.7-10c-35.2-17.3-54.1-45.7-115.5-45.7c-32.3,0-52.8,7.9-70.2,17.8
c6.4-1.3,13.6-2.1,22-2.1C1340.1,56,1340.3,96,1400,96z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#bc4565" }}
                d="M320,56c6.6,0,12.4,0.5,17.7,1.3c-17-9.6-37.3-17-68.5-17c-60.4,0-79.5,27.8-114,45.2
c11.2,6,24.6,10.5,44.8,10.5C260,96,259.9,56,320,56z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#bc4565" }}
                d="M680,96c23.7,0,38.1-6.3,50.5-13.9C699.6,64.8,679,40.3,622.2,40.3c-30,0-49.8,6.8-66.3,15.8
c1.3,0,2.7-0.1,4.1-0.1C619.7,56,620.2,96,680,96z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#bc4565" }}
                d="M-40,95.6c28.3,0,43.3-8.7,57.4-18C-9.6,60.8-31,40.2-83.2,40.2c-14.3,0-26.3,1.6-36.8,4.2V106h60V96L-40,95.6
z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#af3f5d" }}
                d="M504,73.4c-2.6-0.8-5.7-1.4-9.6-1.4c-19.4,0-19.6,13-39,13c-19.4,0-19.5-13-39-13c-14,0-18,6.7-26.3,10.4
C402.4,89.9,416.7,96,440,96C472.5,96,487.5,84.2,504,73.4z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#af3f5d" }}
                d="M1205.4,85c-0.2,0-0.4,0-0.6,0c-19.5,0-19.5-13-39-13s-19.4,12.9-39,12.9c0,0-5.9,0-12.3,0.1
c11.4,6.3,24.9,11,45.5,11C1180.6,96,1194.1,91.2,1205.4,85z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#af3f5d" }}
                d="M1447.4,83.9c-2.4,0.7-5.2,1.1-8.6,1.1c-19.3,0-19.6-13-39-13s-19.6,13-39,13c-3,0-5.5-0.3-7.7-0.8
c11.6,6.6,25.4,11.8,46.9,11.8C1421.8,96,1435.7,90.7,1447.4,83.9z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#af3f5d" }}
                d="M985.8,72c-17.6,0.8-18.3,13-37,13c-19.4,0-19.5-13-39-13c-18.2,0-19.6,11.4-35.5,12.8
c11.4,6.3,25,11.2,45.7,11.2C953.7,96,968.5,83.2,985.8,72z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#af3f5d" }}
                d="M743.8,73.5c-10.3,3.4-13.6,11.5-29,11.5c-19.4,0-19.5-13-39-13s-19.5,13-39,13c-0.9,0-1.7,0-2.5-0.1
c11.4,6.3,25,11.1,45.7,11.1C712.4,96,727.3,84.2,743.8,73.5z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#af3f5d" }}
                d="M265.5,72.3c-1.5-0.2-3.2-0.3-5.1-0.3c-19.4,0-19.6,13-39,13c-19.4,0-19.6-13-39-13
c-15.9,0-18.9,8.7-30.1,11.9C164.1,90.6,178,96,200,96C233.7,96,248.4,83.4,265.5,72.3z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#af3f5d" }}
                d="M1692.3,96V85c0,0,0,0-19.5,0s-19.6-13-39-13s-19.6,13-39,13c-0.1,0-0.2,0-0.4,0c11.4,6.2,24.9,11,45.6,11
C1669.9,96,1684.8,96,1692.3,96z"
              ></path>
              <path
                style={{ opacity: "1", fill: "#af3f5d" }}
                d="M25.5,72C6,72,6.1,84.9-13.5,84.9L-20,85v8.9C0.7,90.1,12.6,80.6,25.9,72C25.8,72,25.7,72,25.5,72z"
              ></path>
              <path
                style={{ fill: "rgb(210, 77, 87)" }}
                d="M-40,95.6C20.3,95.6,20.1,56,80,56s60,40,120,40s59.9-40,120-40s60.3,40,120,40s60.3-40,120-40
s60.2,40,120,40s60.1-40,120-40s60.5,40,120,40s60-40,120-40s60.4,40,120,40s59.9-40,120-40s60.3,40,120,40s60.2-40,120-40
s60.2,40,120,40s59.8,0,59.8,0l0.2,143H-60V96L-40,95.6z"
              ></path>
            </svg>
          </div>
          <div className="full-width">
            <div className="feature">
              <IonCard class=" show">
                <IonGrid>
                  <IonRow>
                    <IonCol size="8">
                      <IonChip color="danger">
                        <IonLabel>Version 0.7.6</IonLabel>
                      </IonChip>
                    </IonCol>
                    <IonCol size="4">
                      <IonButtons class="ion-justify-content-center ion-text-center">
                        <a
                          href="https://github.com/Qalamar/pluri-portal"
                          target="_blank"
                        >
                          <IonButton color="light">
                            <IonIcon slot="icon-only" icon={logoGithub} />
                          </IonButton>
                        </a>
                        <a
                          href="mailto:contact@tariqhamrit.com"
                          target="_blank"
                        >
                          <IonButton color="light">
                            <IonIcon slot="icon-only" icon={mailOpen} />
                          </IonButton>
                        </a>
                      </IonButtons>
                    </IonCol>
                  </IonRow>
                  <IonRow class="ion-justify-content-center">
                    <IonCol>
                      <IonItem
                        color="none"
                        class="ion-text-center"
                        lines="none"
                      >
                        <IonLabel color="light">
                          Subscribe to our newsletter
                        </IonLabel>
                      </IonItem>
                      <IonItem color="none">
                        <IonInput
                          value={text}
                          class="newsletter"
                          placeholder="Email"
                          onIonChange={(e) => setText(e.detail.value!)}
                          clearInput
                        ></IonInput>
                        <IonButtons class="ion-justify-content-center ion-text-center">
                          <IonButton color="light">
                            <IonIcon slot="icon-only" icon={send} />
                          </IonButton>
                        </IonButtons>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Auth;
