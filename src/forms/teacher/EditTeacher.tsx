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
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as api from "../../utils/API";
import { TeacherInterface } from "../../utils/Interfaces";

export interface Professor {
  teacher: TeacherInterface;
}

const EditPromo: React.FC<Professor> = observer(({ teacher }) => {
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...teacher },
    mode: "onChange",
  });

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
    <IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setshowToast(false)}
        message="Teacher Modified"
        duration={400}
      />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        message={"Confirm changes?"}
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
              api.modifyProfessor(
                teacher.id,
                teacher.firstName,
                teacher.lastName,
                Math.floor(Math.random() * 100000 + 1).toString(),
                teacher.password,
                teacher.email,
                "2000-01-01",
                "",
                "",
                "Pr",
                ""
              );
              api.getProffessors();
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
          <IonItem>
            <IonIcon slot="start" icon={personCircleOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="First Name"
              className="firstCapital"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                teacher.firstName = selected.detail.value;
                return selected.detail.value;
              }}
              name="firstName"
              rules={{
                required: true,
              }}
            />
            {showError("firstName")}
          </IonItem>

          <IonItem class="">
            <IonIcon slot="start" icon={peopleCircleOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="Last Name"
              className="firstCapital"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                teacher.lastName = selected.detail.value;
                return selected.detail.value;
              }}
              name="lastName"
              rules={{
                required: true,
              }}
            />
            {showError("lastName")}
          </IonItem>

          <IonItem class="">
            <IonIcon slot="start" icon={mailOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="Email"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                teacher.email = selected.detail.value;
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
              color="danger"
              class="ion-padding-horizontal"
              type="button"
              onClick={() => {
                reset(teacher);
              }}
            >
              Reset
            </IonButton>
            <IonButton type="submit" disabled={formState.isValid === false}>
              Submit
            </IonButton>
          </IonButtons>
        </form>
      </div>
    </IonContent>
  );
});
export default EditPromo;
