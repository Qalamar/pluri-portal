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
import {
  albumsOutline,
  clipboardOutline,
  ellipsisHorizontalOutline,
  layersOutline,
  peopleCircleOutline,
  personCircleOutline,
  timeOutline,
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { promotion } from "../pages/Promo";
import * as api from "../utils/API";
import "./PromoForm.css";

export interface Promo {
  promo: promotion;
}
interface PromoState {
  promot: promotion;
  setPromo: React.Dispatch<React.SetStateAction<promotion>>;
}

export const usePromo = (overrides?: Partial<promotion>): PromoState => {
  const defaultPromo: promotion = {
    id: 0,
    description: "",
    cycle: "",
    year: "",
    specialityName: "",
    minTeamMembers: 0,
    maxTeamMembers: 0,
    maxTeamsInProject: 0,
  };
  const [promot, setPromo] = useState<promotion>({
    ...defaultPromo,
    ...overrides,
  });
  return { promot, setPromo };
};
const EditPromo: React.FC<Promo> = observer(({ promo }) => {
  const { promot } = usePromo({
    id: promo.id,
    description: promo.description,
    cycle: promo.cycle,
    year: promo.year,
    specialityName: promo.specialityName,
    minTeamMembers: promo.minTeamMembers,
    maxTeamMembers: promo.maxTeamMembers,
    maxTeamsInProject: promo.maxTeamsInProject,
  });
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...promot },
    mode: "onChange",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setshowToast] = useState(false);
  const [SelectCycle, setCycle] = useState<string>();
  const [SelectYear, setYear] = useState<string>();

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
              api.modifyPromotion(
                promot.id,
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
            },
          },
        ]}
      />
      <form
        onSubmit={handleSubmit(() => setShowAlert(true))}
        style={{ padding: 10, margin: 15, height: "auto" }}
      >
        <IonItem color="dark">
          <IonLabel>Cycle</IonLabel>
          <IonIcon slot="start" icon={layersOutline}></IonIcon>
          <Controller
            as={
              <IonSelect
                value={SelectCycle}
                placeholder="CPI/SC"
                onIonChange={(e) => setCycle(e.detail.value)}
              >
                <IonSelectOption value="CPI">Preparatory</IonSelectOption>
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
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={timeOutline}></IonIcon>
          <IonLabel>Year</IonLabel>
          <Controller
            as={
              <IonSelect
                value={SelectYear}
                placeholder="Year"
                onIonChange={(e) => setYear(e.detail.value)}
              >
                <IonSelectOption value="1st">First 1 </IonSelectOption>
                <IonSelectOption value="2nd">Second 2</IonSelectOption>
                <IonSelectOption value="3rd">Third 3</IonSelectOption>
              </IonSelect>
            }
            placeholder="Year"
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
        <IonItem color="dark">
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
        <IonItem color="dark" class="">
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
        {/*  <IonLabel color="light">
          <h1>Team Members</h1>
        </IonLabel> */}
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={personCircleOutline}></IonIcon>
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
                message: "invalid Number",
              },
            }}
          />
          {showError("minTeamMembers")}
        </IonItem>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={peopleCircleOutline}></IonIcon>

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
                message: "invalid Number",
              },
            }}
          />
          {showError("maxTeamMembers")}
        </IonItem>
        {/*  <br></br>
        <IonLabel color="light">
          <h1>Project teams</h1>
        </IonLabel> */}
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={ellipsisHorizontalOutline}></IonIcon>
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
                message: "invalid Number",
              },
            }}
          />
          {showError("maxTeamsInProject")}
        </IonItem>{" "}
        <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
          <IonButton
            color="danger"
            class="ion-padding-horizontal"
            type="button"
            onClick={() => {
              reset(promo);
            }}
          >
            Reset
          </IonButton>
          <IonButton
            color="light"
            type="submit"
            //onClick={() => console.log(promot)}

            disabled={formState.isValid === false}
          >
            Submit
          </IonButton>
        </IonButtons>
      </form>
    </IonContent>
  );
});
export default EditPromo;
