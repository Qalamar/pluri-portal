import {
  IonButtons,
  IonContent,
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
  IonInput,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Anime from "react-anime";
import { mailOutline, personCircleOutline, keyOutline } from "ionicons/icons";
import axios from "axios";
import NotificationArea from "../components/NotificationArea";
import Toolbar from "../components/Toolbar";
import "./Auth.css";
import { useForm, Controller } from "react-hook-form";
import { store } from "../stores/Store";

let initialValues = {
  rangeInfo: -100,
  email: "",
  userName: "",
  password: "",
};
interface login {
  email: string;
  userName: string;
  password: string;
}
let Log: login = {
  email: "",
  userName: "",
  password: "",
};

const Auth: React.FC = () => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  const [isOpen, setisOpen] = useState(false);
  const [role, setRole] = useState<string>("student");

  useEffect(() => {
    const rest = JSON.parse(localStorage.getItem("Auth")!);
    !(rest === null)
      ? (store.isAuth.state = true)
      : (store.isAuth.state = false);
  }, []);

  const showProfile = () => {
    axios.get("/employees?id=1").then(function (response) {
      let data = response.data;
      console.log(data[0].email);
    });
  };
  const [image, setimage] = useState();
  const handleImageChange = (e: any) => {
    setimage(e.target.files[0]);
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   console.log(image);
  //   let form_data = new FormData();
  //   form_data.append("image", "Test");
  //   let url = "http://localhost:3000/employees/";
  //   axios
  //     .post(url, form_data, {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

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

  const onSubmit = (data: any) => {
    axios
      .post("/login", {
        email: data.email,
        userName: data.userName,
        password: data.password,
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("Auth", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
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
                    <IonItem class="">
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
                          console.log("UserName", selected.detail.value);
                          Log.userName = selected.detail.value;
                          return selected.detail.value;
                        }}
                        name="userName"
                        rules={{
                          required: true,
                        }}
                      />
                    </IonItem>
                    {showError("userName")}
                    <IonItem class="ion-margin-bottom">
                      <IonIcon slot="start" icon={keyOutline}></IonIcon>

                      <Controller
                        as={IonInput}
                        type="password"
                        placeholder="Password"
                        control={control}
                        onChangeName="onIonChange"
                        onChange={([selected]) => {
                          console.log("Password", selected.detail.value);
                          Log.password = selected.detail.value;
                          return selected.detail.value;
                        }}
                        name="password"
                        rules={{ required: true }}
                      />
                    </IonItem>
                    {showError("password")}
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
