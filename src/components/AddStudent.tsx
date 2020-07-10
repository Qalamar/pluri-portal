import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonToast,
} from "@ionic/react";
import { albumsOutline, clipboardOutline } from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as api from "../utils/API";
import "./PromoForm.css";

let initialValues = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
};

const AddStudent: React.FC = observer(() => {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange",
  });
  const [showToast, setshowToast] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  useEffect(() => {}, []);

  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;
  };
  const onSubmit = () => {
    api.addStudent(
      student.firstName,
      student.lastName,
      Math.floor(Math.random() * 100000 + 1).toString(),
      student.password,
      student.email,
      "2000-01-01",
      "",
      7,
      "Pr"
    );
    api.getStudents();
    setshowToast(true);
  };

  return (
    <IonContent color="dark">
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setshowToast(false)}
        message="Promo Added"
        duration={400}
      />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setshowAlert(false)}
        message={"This Promotion Exists"}
        buttons={["OK"]}
      />
      <form
        onSubmit={handleSubmit(() => onSubmit())}
        style={{ padding: 10, margin: 15, height: "auto" }}
      >
        <IonItem color="dark">
          <IonIcon slot="start" icon={albumsOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="First Name"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              /*             setTeacher((prevState) => ({
                ...prevState,
                firstName: selected.detail.value,
              })); */
              student.firstName = selected.detail.value;

              return selected.detail.value;
            }}
            name="firstName"
            rules={{
              required: true,
            }}
          />
          {showError("firstName")}
        </IonItem>

        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={clipboardOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Last Name"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              student.lastName = selected.detail.value;
              return selected.detail.value;
            }}
            name="lastName"
            rules={{
              required: true,
            }}
          />
          {showError("lastName")}
        </IonItem>

        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={clipboardOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Email"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              student.email = selected.detail.value;
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
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={clipboardOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Password"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              student.password = selected.detail.value;
              return selected.detail.value;
            }}
            name="password"
            rules={{
              required: true,
            }}
          />
          {showError("password")}
        </IonItem>

        <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
          <IonButton
            color="danger"
            class="ion-padding-horizontal"
            type="button"
            onClick={() => {
              reset(initialValues);
            }}
          >
            Reset
          </IonButton>
          <IonButton
            color="light"
            type="submit"
            //onClick={() => console.log(student)}
            disabled={formState.isValid === false}
          >
            Submit
          </IonButton>
        </IonButtons>
      </form>
    </IonContent>
  );
});
export default AddStudent;
