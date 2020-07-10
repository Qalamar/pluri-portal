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
import {
  mailOutline,
  peopleCircleOutline,
  personCircleOutline,
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as api from "../utils/API";
import { sTudent } from "../utils/Interfaces";
import "./PromoForm.css";

const EditStudent: React.FC<sTudent> = observer(({ student }) => {
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...student },
    mode: "onChange",
  });

  const [indiv, setStudent] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    password: "",
    userName: "",
    email: "",
  });

  useEffect(() => {
    indiv.id = student.id;
    indiv.firstName = student.firstName;
    indiv.lastName = student.lastName;
    indiv.password = student.password;
    indiv.userName = student.userName;
    indiv.email = student.email;
  }, []);

  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setshowToast] = useState(false);

  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;
  };
  return (
    <IonContent color="dark">
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setshowToast(false)}
        message="Promo Modified "
        duration={400}
      />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        message={"Do you Confirm your demand ?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {},
          },
          {
            text: "Save",
            handler: () => {
              api.modifyStudent(
                indiv.id,
                indiv.firstName,
                indiv.lastName,
                indiv.userName,
                indiv.password,
                indiv.email,
                "2000-01-01",
                "",
                7,
                ""
              );
              api.getStudents();
              setshowToast(true);
            },
          },
        ]}
      />
      <div className="centered">
        <form
          onSubmit={handleSubmit(() => setShowAlert(true))}
          style={{ padding: 10, margin: 15, height: "auto" }}
        >
          <IonItem color="dark">
            <IonIcon slot="start" icon={personCircleOutline}></IonIcon>
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
            <IonIcon slot="start" icon={peopleCircleOutline}></IonIcon>
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
            <IonIcon slot="start" icon={mailOutline}></IonIcon>
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
          {/* <IonItem color="dark" class="">
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
        </IonItem> */}

          <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
            <IonButton
              color="danger"
              class="ion-padding-horizontal"
              type="button"
              onClick={() => {
                reset(student);
              }}
            >
              Reset
            </IonButton>
            <IonButton
              color="light"
              type="submit"
              // onClick={() => }
              disabled={formState.isValid === false}
            >
              Submit
            </IonButton>
          </IonButtons>
        </form>
      </div>
    </IonContent>
  );
});
export default EditStudent;
