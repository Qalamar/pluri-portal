import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonToast,
  IonButtons
} from "@ionic/react";
import { observer } from "mobx-react";
import React, { useState } from "react";
import {
  peopleCircleOutline,
  schoolOutline,
  personCircleOutline,
  mailOutline,
  maleFemaleOutline,
  briefcaseOutline,
  walkOutline
} from "ionicons/icons";
import { store } from "../stores/Store";
import { useForm, Controller } from "react-hook-form";
import Anime from "react-anime";
import axios from "axios";
import "./UserForm.css";

let renderCount = 0;
let initialValues = {
  rangeInfo: -100,
  firstName: "",
  lastName: "",
  gender: "",
  class: "",
  email: "",
  promo: ""
};

const UserForm: React.FC = observer(() => {
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange"
  });

  const [data, setData] = useState();
  const [showToast, setshowToast] = useState(false);
  renderCount++;

  /**
   *
   * @param _fieldName
   */
  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red" }}>{error.message || "Field Is Required"}</div>
    ) : null;
  };

  /**
   *
   * @param data
   */

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const onSubmit = (data: any) => {
    setData(data);
    axios
      .post("/students", {
        first_name: capitalizeFirstLetter(data.firstName),
        last_name: data.lastName.toUpperCase(),
        class: data.class,
        email: data.email,
        gender: data.gender,
        promo: data.promo
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <IonContent color="dark" class="ion-padding-top ion-margin-top">
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setshowToast(false)}
        message="User added."
        duration={400}
      />

      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 18 }}>
        <IonLabel color="light">
          <h1>Information</h1>
        </IonLabel>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={personCircleOutline}></IonIcon>

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
              minLength: { value: 4, message: "Must be 4 chars long" }
            }}
          />
        </IonItem>
        {showError("firstName")}
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={peopleCircleOutline}></IonIcon>

          <Controller
            as={IonInput}
            placeholder="Last Name"
            className="capitalize"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("lastName", selected.detail.value);
              return selected.detail.value;
            }}
            name="lastName"
            rules={{
              required: true,
              minLength: { value: 4, message: "Must be 4 chars long" }
            }}
          />
        </IonItem>
        {showError("lastName")}
        <IonItem color="dark">
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
                message: "invalid email address"
              }
            }}
          />
        </IonItem>
        {showError("email")}
        <IonItem color="dark" class="ion-margin-bottom">
          <IonIcon slot="start" icon={maleFemaleOutline}></IonIcon>
          <IonLabel>Gender</IonLabel>
          <Controller
            as={
              <IonSelect placeholder="Select One">
                <IonSelectOption value="FEMALE">Female</IonSelectOption>
                <IonSelectOption value="MALE">Male</IonSelectOption>
              </IonSelect>
            }
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log(selected.detail.value);
              return selected.detail.value;
            }}
            name="gender"
            rules={{ required: true }}
          />
        </IonItem>
        <IonLabel color="light">
          <h1>Role</h1>
        </IonLabel>
        <Controller
          as={
            <IonRadioGroup>
              <IonItem color="dark">
                <IonIcon slot="start" icon={schoolOutline}></IonIcon>
                <IonLabel>Student</IonLabel>
                <IonRadio value="Student" />
              </IonItem>
              <IonItem color="dark">
                <IonIcon slot="start" icon={briefcaseOutline}></IonIcon>
                <IonLabel>Teacher</IonLabel>
                <IonRadio value="Teacher" />
              </IonItem>
            </IonRadioGroup>
          }
          control={control}
          name="class"
          rules={{ required: true }}
          onChangeName="onIonChange"
          onChange={([selected]) => {
            console.log(selected.detail.value);
            return selected.detail.value;
          }}
        />
        <IonItem color="dark" class="ion-margin-bottom">
          <IonIcon slot="start" icon={walkOutline}></IonIcon>
          <IonLabel>Promotion</IonLabel>
          <Controller
            as={
              <IonSelect placeholder="Select One">
                <IonSelectOption value="1CPI">1CPI</IonSelectOption>
                <IonSelectOption value="2CPI">2CPI</IonSelectOption>
                <IonSelectOption value="1CS">1CS</IonSelectOption>
                <IonSelectOption value="2CS-SIW">2CS-SIW</IonSelectOption>
                <IonSelectOption value="2CS-ISI">2CS-ISI</IonSelectOption>
                <IonSelectOption value="3CS-SIW">3CS-SIW</IonSelectOption>
                <IonSelectOption value="3CS-ISI">3CS-ISI</IonSelectOption>
              </IonSelect>
            }
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log(selected.detail.value);
              return selected.detail.value;
            }}
            name="promo"
            rules={{ required: true }}
          />
        </IonItem>{" "}
        <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
          <IonButton
            color="danger"
            fill="outline"
            type="button"
            onClick={() => {
              reset(initialValues);
            }}
          >
            Reset Form
          </IonButton>
          <IonButton
            color="light"
            type="submit"
            fill="outline"
            onClick={() => setshowToast(true)}
            disabled={formState.isValid === false}
          >
            Submit
          </IonButton>
        </IonButtons>
      </form>
    </IonContent>
  );
});

export default UserForm;
