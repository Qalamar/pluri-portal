import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonToast,
  IonCard,
} from "@ionic/react";
import {
  lockClosedOutline,
  mailOutline,
  peopleCircleOutline,
  personCircleOutline,
} from "ionicons/icons";
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

const AddTeacher: React.FC = observer(() => {
  const [teacher, setTeacher] = useState({
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
  const [SelectCycle, setCycle] = useState<"">();
  const [SelectYear, setYear] = useState<"">();
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
    api.addProfessor(
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
  };

  return (
    <IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setshowToast(false)}
        message="Teacher Added"
        duration={400}
      />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setshowAlert(false)}
        message={"This Teacher Exists"}
        buttons={["OK"]}
      />
      <div className="centered">
        <form
          onSubmit={handleSubmit(() => onSubmit())}
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
                /*             setTeacher((prevState) => ({
                ...prevState,
                firstName: selected.detail.value,
              })); */
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

          <IonItem>
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
          <IonItem class="">
            <IonIcon slot="start" icon={lockClosedOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="Access Key"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                teacher.password = selected.detail.value;
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
              type="button"
              onClick={() => {
                reset(initialValues);
              }}
            >
              Reset
            </IonButton>
            <IonButton
              type="submit"
              // onClick={() => console.log(teacher)}
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
export default AddTeacher;
