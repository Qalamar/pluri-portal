import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import {
  albumsOutline,
  clipboardOutline,
  layersOutline,
  readerOutline,
  timeOutline,
  trendingDownOutline,
  trendingUpOutline,
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { promotion } from "../../pages/Promo";
import { modifyPromotion, getPromotions } from "../../utils/API";

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
    <IonContent>
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
            handler: () => { },
          },
          {
            text: "Save",
            handler: () => {
              modifyPromotion(
                promot.id,
                promot.cycle,
                promot.year,
                promot.specialityName,
                promot.description,
                promot.minTeamMembers,
                promot.maxTeamMembers,
                promot.maxTeamsInProject
              );
              getPromotions();
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
                  message: "invalid Number",
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
                  message: "invalid Number",
                },
              }}
            />
            {showError("maxTeamMembers")}
          </IonItem>
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
                  message: "invalid Number",
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
                reset(promo);
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
