import {
  IonInput,
  IonSelect,
  IonButton,
  IonLabel,
  IonIcon,
  IonItem,
  IonContent,
  IonToast,
  IonSelectOption,
  IonButtons
} from "@ionic/react";
import {
  calendarOutline,
  speedometerOutline,
  codeOutline,
  layersOutline,
  constructOutline
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./PromoForm.css";
import * as api  from "../utils/api";

let renderCount = 0;
let initialValues = {
  rangeInfo: -100,
  CodePromo: "",
  Cycle: "",
  Level: "",
  AcademicYear: "2019-2020",
  Speciality: ""
};
let ValuesPromo ={
  rangeInfo: -100,
  CodePromo: "",
  Cycle: "",
  Level: "",
  AcademicYear: "2019-2020",
  Speciality: ""
}

const PromoForm: React.FC = observer(() => {
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange"
  });
  renderCount++;
  const [data, setData] = useState();
  const [showToast, setshowToast] = useState(false);

  const [SelectCycle, setCycle] = useState<string>();
  const [SelectSpeciality, setSpeciality] = useState<string>();
  

  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;
  };
  const onSubmit = (data: any) => {
    setData(data);
   api.addPromotion(data.id,data.CodePromo,data.Cycle,data.Level,data.AcademicYear,data.Speciality);
   
  };

  return (
    <IonContent color="dark">
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setshowToast(false)}
        message="Promo Added"
        duration={400}
      />
      <form onSubmit={handleSubmit(()=>onSubmit(ValuesPromo))} style={{ padding: 20 , margin:30 , height:'auto'}}>
        <IonLabel color="light">
          <h1>Information About Promotion </h1>
        </IonLabel>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={codeOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Code Promo"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("CodePromo", selected.detail.value);
              ValuesPromo.CodePromo=selected.detail.value;
              return selected.detail.value;
            }}
            name="CodePromo"
            rules={{
              required: true,
              minLength: { value: 2, message: "Must be 2 chars long" }
            }}
          />
        </IonItem>
        {showError("CodePromo")}
        <IonItem color="dark">
          <IonLabel>Cycle</IonLabel>
          <IonIcon slot="start" icon={layersOutline}></IonIcon>
          <Controller
            as={
              <IonSelect
                value={SelectCycle}
                placeholder="Select One"
                onIonChange={e => setCycle(e.detail.value)}
              >
                <IonSelectOption value="Preparatory">
                  Preparatory
                </IonSelectOption>
                <IonSelectOption value="Secondary">Secondary</IonSelectOption>
              </IonSelect>
            }
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log(selected.detail.value);
              ValuesPromo.Cycle=selected.detail.value;
              return selected.detail.value;
            }}
            name="Cycle"
            rules={{
              required: true
            }}
          />
          {showError("Cycle")}
        </IonItem>

        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={speedometerOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Level"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("Level", selected.detail.value);
              ValuesPromo.Level=selected.detail.value;
              return selected.detail.value;
            }}
            name="Level"
            rules={{
              required: true,
              pattern: {
                value: /^[1-9]$/i,
                message: "invalid Level"
              }
            }}
          />
          {showError("Level")}
        </IonItem>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={calendarOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Academic Year"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("AcademicYear", selected.detail.value);
              ValuesPromo.AcademicYear=selected.detail.value;
              return selected.detail.value;
            }}
            name="AcademicYear"
            rules={{
              required: true,
              pattern: {
                value: /^20[0-9][0-9]-20[0-9][0-9]$/i,
                message: "Academic year must be 20xx-20xx"
              }
            }}
          />
          {showError("AcademicYear")}
        </IonItem>
        <IonItem color="dark">
          <IonLabel>Speciality</IonLabel>
          <IonIcon slot="start" icon={constructOutline}></IonIcon>
          <Controller
            as={
              <IonSelect
                value={SelectSpeciality}
                placeholder="Select One"
                onIonChange={e => setSpeciality(e.detail.value)}
              > 
                <IonSelectOption value="" > None</IonSelectOption>
                <IonSelectOption value="ISI">ISI</IonSelectOption>
                <IonSelectOption value="SIW">SIW</IonSelectOption>
              </IonSelect>
            }
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log(selected.detail.value);
              ValuesPromo.Speciality=selected.detail.value;
              return selected.detail.value;
            }}
            name="Speciality"
            rules={{
              required: false
            }}
          />
          {showError("Speciality")}
        </IonItem>

        {" "}
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
export default PromoForm;
