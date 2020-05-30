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
  speedometerOutline,
  layersOutline,
  constructOutline,
  clipboardOutline,  
  trendingDownOutline,
  trendingUpOutline
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import "./PromoForm.css";
import * as api  from "../utils/API";
import axios from "axios";
import {promotion} from "../pages/Promo";
import {usePromo} from "../components/PromoFormEditing";

let renderCount = 0;
let initialValues = {
  rangeInfo: -100,
  cycle: "",
  level:"",
  specialityCode: "",
  description:"",
 }; 
const PromoForm: React.FC = observer(() => {
  const {promot} = usePromo({
    id :0,
  description:"",
  cycle: "",
  level: "",
  specialityCode: "",

  });
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ... initialValues },
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
      if(promot.level.localeCompare(value.level)===0
      &&(promot.cycle.localeCompare(value.cycle)===0)
      && (promot.specialityCode.localeCompare(value.specialityCode)===0)
      ) 
          include=true;
          }
         
   if (include===false){
   api.addPromotion(promot.id,                
                   promot.description,
                   promot.cycle,
                   promot.level,
                   promot.specialityCode,
                   promot.minTeamMembers,
                   promot.maxTeamMembers);
                   
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
          <IonIcon slot="start" icon={clipboardOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Description"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("Description", selected.detail.value);
              promot.description=selected.detail.value;
             
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
                onIonChange={e => setCycle(e.detail.value)}
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
        <br/>
        <IonLabel color="light">
          <h2>Team Members  </h2>
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
              promot.minTeamMembers=selected.detail.value;
             return selected.detail.value;
              
            }}
            name="minTeamMembers"
            rules={{
              required: true,
              pattern: {
                value: /^[0-9]+$/i,
                message: "invalid Number"
              }
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
              promot.maxTeamMembers=selected.detail.value;
             return selected.detail.value;
              
            }}
            name="maxTeamMembers"
            rules={{
              required: true,
              pattern: {
                value: /^[0-9]+$/i,
                message: "invalid Number"
              }
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
              promot.maxTeamMembers=selected.detail.value;
             return selected.detail.value;             
            }}
            name="maxProjects"
            rules={{
              required: true,
              pattern: {
                value: /^[0-9]+$/i,
                message: "invalid Number"
              }
            }}
          />
        {showError("maxProjects")}
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
