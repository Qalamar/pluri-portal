import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import axios from "axios";
import {
  clipboardOutline,
  constructOutline,
  layersOutline,
  speedometerOutline,
  trendingDownOutline,
  trendingUpOutline,
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { usePromo } from "./EditPromo";
import { promotion } from "../pages/Promo";
import * as api from "../utils/API";
import { Promotion } from "../utils/Interfaces";
import "./PromoForm.css";

let initialValues = {
  cycle: "",
  year: "",
  specialityName: "",
  description: "",
  minTeamMembers: 0,
  maxTeamMembers: 0,
  maxProjects: 0,
};
const AddPromo: React.FC = observer(() => {
  const { promot } = usePromo({
    cycle: "",
    year: "",
    specialityName: "",
    description: "",
    minTeamMembers: 0,
    maxTeamMembers: 0,
    maxProjects: 0,
  });
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange",
  });
  const [showToast, setshowToast] = useState(false);
  const [SelectCycle, setCycle] = useState<string>();
  const [SelectYear, setYear] = useState<string>();
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
    api.addPromotion(
      promot.cycle,
      promot.year,
      promot.specialityName,
      promot.description,
      promot.minTeamMembers,
      promot.maxTeamMembers,
      promot.maxProjects
    );

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
        style={{ padding: 20, margin: 30, height: "auto" }}
      >
        <IonLabel color="light">
          <h1>Informations About Promotion </h1>
        </IonLabel>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={clipboardOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Description"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("Description", selected.detail.value);
              promot.description = selected.detail.value;

              return selected.detail.value;
            }}
            name="description"
            rules={{
              required: true,
            }}
          />
        </IonItem>
        {showError("description")}
        <IonItem color="dark">
          <IonLabel>Cycle</IonLabel>
          <IonIcon slot="start" icon={layersOutline}></IonIcon>
          <Controller
            as={
              <IonSelect
                value={SelectCycle}
                placeholder="Select One"
                onIonChange={(e) => setCycle(e.detail.value)}
              >
                <IonSelectOption value="CPI">Preparatory</IonSelectOption>
                <IonSelectOption value="SC">Secondary</IonSelectOption>
              </IonSelect>
            }
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log(selected.detail.value);
              promot.cycle = selected.detail.value;

              return selected.detail.value;
            }}
            name="cycle"
            rules={{
              required: true,
            }}
          />
          {showError("cycle")}
        </IonItem>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={speedometerOutline}></IonIcon>
          <IonLabel>Year</IonLabel>
          <Controller
            as={
              <IonSelect
                value={SelectYear}
                placeholder="Select One"
                onIonChange={(e) => setYear(e.detail.value)}
              >
                <IonSelectOption value="1st"> First 1 </IonSelectOption>
                <IonSelectOption value="2nd">Second 2</IonSelectOption>
                <IonSelectOption value="3rd">Third 3</IonSelectOption>
              </IonSelect>
            }
            placeholder="year"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("year", selected.detail.value);
              promot.year = selected.detail.value;

              return selected.detail.value;
            }}
            name="year"
            rules={{
              required: true,
            }}
          />
          {showError("year")}
        </IonItem>
        <IonItem color="dark">
          <IonIcon slot="start" icon={constructOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Speciality"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log(selected.detail.value);
              promot.specialityName = selected.detail.value;

              return selected.detail.value;
            }}
            name="specialityName"
            rules={{
              required: false,
            }}
          />
          {showError("specialityName")}
        </IonItem>
        <br />
        <IonLabel color="light">
          <h2>Team Members </h2>
        </IonLabel>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={trendingDownOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Min Team Members"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("minTeamMembers", selected.detail.value);
              promot.minTeamMembers = selected.detail.value;
              return selected.detail.value;
            }}
            name="minTeamMembers"
            rules={{
              pattern: {
                value: /^[0-9]+$/i,
                message: "invalid Number",
              },
            }}
          />
          {showError("minTeamMembers")}
        </IonItem>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={trendingUpOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Max Team Members"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("maxTeamMembers", selected.detail.value);
              promot.maxTeamMembers = selected.detail.value;
              return selected.detail.value;
            }}
            name="maxTeamMembers"
            rules={{
              pattern: {
                value: /^[0-9]+$/i,
                message: "invalid Number",
              },
            }}
          />
          {showError("maxTeamMembers")}
        </IonItem>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={trendingUpOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Max Projects"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("maxProjects", selected.detail.value);
              promot.maxProjects = selected.detail.value;
              return selected.detail.value;
            }}
            name="maxProjects"
            rules={{
              pattern: {
                value: /^[0-9]+$/i,
                message: "invalid Number",
              },
            }}
          />
          {showError("maxProjects")}
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
            onClick={() => console.log(promot)}
            disabled={formState.isValid === false}
          >
            Submit
          </IonButton>
        </IonButtons>
      </form>
    </IonContent>
  );
});
export default AddPromo;
