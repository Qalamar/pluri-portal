import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonDatetime,
} from "@ionic/react";
import {
  briefcaseOutline,
  mailOutline,
  maleFemaleOutline,
  peopleCircleOutline,
  personCircleOutline,
  schoolOutline,
  walkOutline,
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as api from "../utils/API";
import "./UserForm.css";

let renderCount = 0;
let initialValues = {
  rangeInfo: -100,
  firstName: "",
  lastName: "",
  gender: "",
  class: "",
  email: "",
  promo: "",
};

const UserForm: React.FC = observer(() => {
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange",
  });

  const [data, setData] = useState();
  const [showToast, setshowToast] = useState(false);
  renderCount++;

  const [role, setRole] = useState("");

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

  const [selectedDate, setSelectedDate] = useState<string>("2012-12-15");

  const onSubmit = (data: any) => {
    setData(data);
    if (data.class === "Student")
      api.addStudent(
        data.firstName,
        data.lastName,
        data.userName,
        data.password,
        data.email,
        selectedDate,
        data.birthPlace,
        data.promo,
        data.currentYear
      );
    //data.class === Teacher
    //  else
    /* api.addTeacher(
        capitalizeFirstLetter(data.firstName),
        data.lastName.toUpperCase(),
        data.userName,
        data.password,
        data.email,
        selectedDate,
        data.birthPlace,
        data.speciality,
        data.grade,
        data.currentYear
      ); */
  };

  return (
    <IonContent color="dark" class="ion-padding-top ion-margin-top">
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setshowToast(false)}
        message="User added."
        duration={400}
      />

      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 38 }}>
        <IonLabel color="light">
          <h1>Information</h1>
        </IonLabel>
        <Controller
          as={
            <IonRadioGroup>
              <IonItem
                color="dark"
                onClick={() => {
                  setRole("student");
                }}
              >
                <IonIcon slot="start" icon={schoolOutline}></IonIcon>
                <IonLabel>Student</IonLabel>
                <IonRadio value="Student" />
              </IonItem>
              <IonItem
                color="dark"
                onClick={() => {
                  setRole("professor");
                }}
              >
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
              minLength: { value: 4, message: "Must be 4 chars long" },
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
              minLength: { value: 4, message: "Must be 4 chars long" },
            }}
          />
        </IonItem>
        {showError("lastName")}
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={personCircleOutline}></IonIcon>

          <Controller
            as={IonInput}
            placeholder="User Name"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("userName", selected.detail.value);
              return selected.detail.value;
            }}
            name="userName"
            rules={{
              required: true,
              minLength: { value: 4, message: "Must be 4 chars long" },
            }}
          />
        </IonItem>
        {showError("userName")}
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={personCircleOutline}></IonIcon>

          <Controller
            as={IonInput}
            placeholder="Password"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("password", selected.detail.value);
              return selected.detail.value;
            }}
            name="password"
            rules={{
              required: true,
              minLength: { value: 4, message: "Must be 4 chars long" },
            }}
          />
        </IonItem>
        {showError("password")}
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
                message: "invalid email address",
              },
            }}
          />
        </IonItem>
        {showError("email")}
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={personCircleOutline}></IonIcon>

          <IonDatetime
            id="dynamicDisabled"
            displayFormat="YYYY MM DD"
            value={selectedDate}
            onIonChange={(e) => setSelectedDate(e.detail.value!)}
          ></IonDatetime>
        </IonItem>

        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={personCircleOutline}></IonIcon>

          <Controller
            as={IonInput}
            placeholder="Birth Place"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("birthPlace", selected.detail.value);
              return selected.detail.value;
            }}
            name="birthPlace"
            rules={{
              required: true,
              minLength: { value: 4, message: "Must be 4 chars long" },
            }}
          />
        </IonItem>
        {showError("birthPlace")}
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
        {role == "student" && (
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
          </IonItem>
        )}
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={personCircleOutline}></IonIcon>

          <Controller
            as={IonInput}
            placeholder="Current Year"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("cuurentYear", selected.detail.value);
              return selected.detail.value;
            }}
            name="currentYear"
            rules={{
              required: true,
              minLength: { value: 4, message: "Must be 4 chars long" },
            }}
          />
        </IonItem>
        {showError("userName")}
        {role == "professor" && (
          <IonItem color="dark" class="">
            <IonIcon slot="start" icon={personCircleOutline}></IonIcon>

            <Controller
              as={IonInput}
              placeholder="Speciality"
              className="firstCapital"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log("speciality", selected.detail.value);
                return selected.detail.value;
              }}
              name="speciality"
              rules={{
                required: true,
                minLength: { value: 4, message: "Must be 4 chars long" },
              }}
            />
          </IonItem>
        )}
        {showError("speciality")}
        {role == "professor" && (
          <IonItem color="dark" class="ion-margin-bottom">
            <IonIcon slot="start" icon={briefcaseOutline}></IonIcon>
            <IonLabel>Grade</IonLabel>
            <Controller
              as={
                <IonSelect placeholder="Select One">
                  <IonSelectOption value="Pr">Pr</IonSelectOption>
                  <IonSelectOption value="MCA">MCA</IonSelectOption>
                  <IonSelectOption value="MCB">MCB</IonSelectOption>
                  <IonSelectOption value="MAA">MAA</IonSelectOption>
                  <IonSelectOption value="MAB">MAB</IonSelectOption>
                </IonSelect>
              }
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log(selected.detail.value);
                return selected.detail.value;
              }}
              name="grade"
              rules={{ required: true }}
            />
          </IonItem>
        )}
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
