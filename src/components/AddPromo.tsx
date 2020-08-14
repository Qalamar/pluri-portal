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
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import {
  albumsOutline,
  clipboardOutline,
  ellipsisHorizontalOutline,
  layersOutline,
  peopleCircleOutline,
  personCircleOutline,
  timeOutline,
  trendingDownOutline,
  trendingUpOutline,
  readerOutline,
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as api from "../utils/API";
import { usePromo } from "./EditPromo";
import "./PromoForm.css";

let initialValues = {
  cycle: "",
  year: "",
  specialityName: "",
  description: "",
  minTeamMembers: "",
  maxTeamMembers: "",
  maxTeamsInProject: "",
};
const AddPromo: React.FC = observer(() => {
  const { promot } = usePromo({
    cycle: "",
    year: "",
    specialityName: "",
    description: "",
    minTeamMembers: 0,
    maxTeamMembers: 0,
    maxTeamsInProject: 0,
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
      promot.maxTeamsInProject
    );
    api.getPromotions();
    setshowToast(true);
  };

  return (
    <IonContent>
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
      <div className="centered">
        <form
          onSubmit={handleSubmit(() => onSubmit())}
          style={{ padding: 10, margin: 15, height: "auto" }}
        >
          <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonCol size="6">
                <IonItem>
                  <IonLabel>Cycle</IonLabel>
                  <IonIcon slot="start" icon={layersOutline}></IonIcon>
                  <Controller
                    as={
                      <IonSelect
                        value={SelectCycle}
                        onIonChange={(e) => setCycle(e.detail.value)}
                      >
                        <IonSelectOption value="CPI">
                          Preparatory
                        </IonSelectOption>
                        <IonSelectOption value="SC">Secondary</IonSelectOption>
                      </IonSelect>
                    }
                    control={control}
                    onChangeName="onIonChange"
                    onChange={([selected]) => {
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
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonIcon slot="start" icon={timeOutline}></IonIcon>
                  <IonLabel>Year</IonLabel>
                  <Controller
                    as={
                      <IonSelect
                        value={SelectYear}
                        placeholder="Year"
                        onIonChange={(e) => setYear(e.detail.value)}
                      >
                        <IonSelectOption value="1st">1</IonSelectOption>
                        <IonSelectOption value="2nd">2</IonSelectOption>
                        <IonSelectOption value="3rd">3</IonSelectOption>
                      </IonSelect>
                    }
                    control={control}
                    onChangeName="onIonChange"
                    onChange={([selected]) => {
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
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonItem>
            <IonIcon slot="start" icon={albumsOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="Speciality"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
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
          <IonItem class="">
            <IonIcon slot="start" icon={clipboardOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="Description"
              className="firstCapital"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                promot.description = selected.detail.value;

                return selected.detail.value;
              }}
              name="description"
              rules={{
                required: false,
              }}
            />
            {showError("description")}
          </IonItem>
          {/*  <IonLabel >
          <h1>Team Members</h1>
        </IonLabel> */}
          <IonItem class="">
            <IonIcon slot="start" icon={trendingDownOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="Minimum team members"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                promot.minTeamMembers = selected.detail.value;
                return selected.detail.value;
              }}
              name="minTeamMembers"
              rules={{
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Invalid number",
                },
              }}
            />
            {showError("minTeamMembers")}
          </IonItem>
          <IonItem class="">
            <IonIcon slot="start" icon={trendingUpOutline}></IonIcon>

            <Controller
              as={IonInput}
              placeholder="Maximum team members"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                promot.maxTeamMembers = selected.detail.value;
                return selected.detail.value;
              }}
              name="maxTeamMembers"
              rules={{
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Invalid number",
                },
              }}
            />
            {showError("maxTeamMembers")}
          </IonItem>
          {/*  <br></br>
        <IonLabel >
          <h1>Project teams</h1>
        </IonLabel> */}
          <IonItem class="">
            <IonIcon slot="start" icon={readerOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="Teams per project"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                promot.maxTeamsInProject = selected.detail.value;
                return selected.detail.value;
              }}
              name="maxTeamsInProject"
              rules={{
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Invalid number",
                },
              }}
            />
            {showError("maxTeamsInProject")}
          </IonItem>{" "}
          <IonButtons class="ion-justify-content-center ion-padding">
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
              //onClick={() => console.log(promot)}
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
export default AddPromo;
