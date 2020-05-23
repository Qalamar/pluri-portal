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
  IonInput,
  IonPopover,
  IonList,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState } from "react";
import Anime from "react-anime";
import {
  mailOutline,
  lockClosedOutline,
  notificationsCircleOutline,
  addCircleOutline,
  calendarOutline,
  removeCircleOutline,
  personCircleOutline,
  personOutline,
} from "ionicons/icons";
import axios from "axios";
import NotificationArea from "../components/NotificationArea";
import "./Auth.css";
import { useForm, Controller } from "react-hook-form";

let initialValues = {
  rangeInfo: -100,
  firstName: "",
  lastName: "",
  gender: "",
  class: "",
  email: "",
  promo: "",
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

  const showProfile = () => {
    axios.get("/employees?id=1").then(function (response) {
      let data = response.data;

      // handle success
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
      .post("/students", {
        first_name: data.firstName,
        last_name: data.lastName.toUpperCase(),
        class: data.class,
        email: data.email,
        gender: data.gender,
        promo: data.promo,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
          <IonButtons slot="end">
            <IonButton
              size="large"
              color="dark"
              onClick={(e) =>
                setShowPopover({ open: true, event: e.nativeEvent })
              }
            >
              <IonIcon
                slot="icon-only"
                class="icons"
                size="small"
                icon={notificationsCircleOutline}
              />
            </IonButton>

            <IonPopover
              isOpen={showPopover.open}
              event={showPopover.event}
              onDidDismiss={(e) =>
                setShowPopover({ open: false, event: undefined })
              }
            >
              <NotificationArea />
            </IonPopover>
          </IonButtons>
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
              <IonCol size="12" sizeMd="5">
                <IonCard class="ion-text-center shadow">
                  <IonCardHeader>
                    <IonTitle color="light" class="title ion-padding">
                      Auth
                    </IonTitle>
                  </IonCardHeader>

                  <IonCardContent class="ion-padding ion-text-center">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
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
                          placeholder="First Name"
                          className="firstCapital"
                          control={control}
                          onChangeName="onIonChange"
                          onChange={([selected]) => {
                            console.log("firstName", selected.detail.value);
                            return selected.detail.value;
                          }}
                          name="firstName"
                          rules={{
                            required: true,
                            minLength: {
                              value: 4,
                              message: "Must be 4 chars long",
                            },
                          }}
                        />
                      </IonItem>
                      {showError("firstName")}
                      <IonItem class="ion-margin-bottom">
                        <IonIcon slot="start" icon={personOutline}></IonIcon>
                        <IonLabel>Role</IonLabel>
                        <Controller
                          as={
                            <IonSelect>
                              <IonSelectOption value="student">
                                Student
                              </IonSelectOption>
                              <IonSelectOption value="teacher">
                                Techer
                              </IonSelectOption>
                              <IonSelectOption value="other">
                                Other
                              </IonSelectOption>
                            </IonSelect>
                          }
                          control={control}
                          onChangeName="onIonChange"
                          onChange={([selected]) => {
                            console.log(selected.detail.value);
                            setRole(selected.detail.value);
                            return selected.detail.value;
                          }}
                          name="gender"
                          rules={{ required: true }}
                        />
                      </IonItem>
                    </form>

                    <IonButton
                      color="dark"
                      type="submit"
                      disabled={formState.isValid === false}
                    >
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
