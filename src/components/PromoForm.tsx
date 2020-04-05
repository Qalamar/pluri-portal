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
  IonButtons,
  IonAlert
} from "@ionic/react";
import {
  calendarOutline,
  speedometerOutline,
  codeOutline,
  layersOutline,
  constructOutline
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import "./PromoForm.css";
import * as api  from "../utils/api";
import axios from "axios";
import {promotion} from "../pages/Promo";
import {usePromo} from "../components/PromoFormEditing";

let renderCount = 0;
let initialValues = {
  rangeInfo: -100,
  codePromotion: "",
  cycle: "",
  level: "",
  academicYear: "2019-2020",
  specialityCode: ""
};

const PromoForm: React.FC = observer(() => {
  const {promot} = usePromo({
    id :0,
  codePromotion: "",
  cycle: "",
  level: "",
  academicYear: "2019-2020",
  specialityCode: ""
  });
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...promot },
    mode: "onChange"
  });
  renderCount++;
  const [showToast, setshowToast] = useState(false);
  const [SelectCycle, setCycle] = useState<string>();
  const [SelectSpeciality, setSpeciality] = useState<string>();
  const [promos,setpromos]=useState([]);
  const [showAlert,setshowAlert] =useState(false);  


    
  const getPromos = async () => {
    let res = await axios.get("/promotion");
    let data = res.data;
    setpromos(data);
  };
  useEffect(() => {
    getPromos();
  }, []);
 
 const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;
  };
    const onSubmit = () => {
    let i;
    let value:promotion; 
    let include:boolean;
      include=false;
  getPromos();
    for (i=0;i<promos.length;i++){
       value=promos[i];
      if(promot.codePromotion.localeCompare(value.codePromotion)===0) 
          include=true;
          }
         
   if (include===false){
   
   api.addPromotion(promot.id,promot.codePromotion,promot.cycle,promot.level,promot.academicYear,promot.specialityCode);
   setshowToast(true);
 }
 else setshowAlert(true);
 getPromos();
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
          message={'This Promotion Exists'}
          buttons={['OK']}
        />
      <form onSubmit={handleSubmit(()=>onSubmit())} style={{ padding: 20 , margin:30 , height:'auto'}}>
        <IonLabel color="light">
          <h1>Informations About Promotion </h1>
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
              promot.codePromotion=selected.detail.value;
             
              return selected.detail.value;
            }}
            name="codePromotion"
            rules={{
              required: true,
              minLength: { value: 2, message: "Must be 2 chars long" }
            }}
          />
        </IonItem>
        {showError("codePromotion")}
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
              promot.cycle=selected.detail.value;
            
              return selected.detail.value;
            }}
            name="cycle"
            rules={{
              required: true
            }}
          />
          {showError("cycle")}
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
              promot.level=selected.detail.value;
             
              return selected.detail.value;
            }}
            name="level"
            rules={{
              required: true,
              pattern: {
                value: /^[1-9]$/i,
                message: "invalid Level"
              }
            }}
          />
          {showError("level")}
        </IonItem>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={calendarOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Academic Year"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("academicYear", selected.detail.value);
              promot.academicYear=selected.detail.value;
             
              return selected.detail.value;
            }}
            name="academicYear"
            rules={{
              required: true,
              pattern: {
                value: /^20[0-9][0-9]-20[0-9][0-9]$/i,
                message: "academic year must be 20xx-20xx"
              }
            }}
          />
          {showError("academicYear")}
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
              promot.specialityCode=selected.detail.value;
             
              return selected.detail.value;
            }}
            name="specialityCode"
            rules={{
              required: false
            }}
          />
          {showError("specialityCode")}
         
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
export default PromoForm;
