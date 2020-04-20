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
    constructOutline,
    clipboardOutline,
    trendingDownOutline,
  trendingUpOutline
  } from "ionicons/icons";
  import { observer } from "mobx-react";
  import React, { useState } from "react";
  import { useForm, Controller } from "react-hook-form";
  import "./PromoForm.css";
  import * as api from "../utils/api";
  import {promotion } from "../pages/Promo";

  let renderCount = 0;
 
 
export interface Promo {
  promo:promotion;
  }
  interface PromoState {
    promot: promotion;
    setPromo: React.Dispatch<React.SetStateAction<promotion>>;
  }
  
  export  const usePromo = (overrides?: Partial<promotion>): PromoState => {
      const defaultPromo: promotion= {
        id:0,
     description:"",
     cycle:"",
     level:"",
     specialityCode:"",
     minTeamMembers: 0,
     maxTeamMembers:0,
      };
      const [promot, setPromo] = useState<promotion>({
    ...defaultPromo,
    ...overrides,
  }); 
   return {promot, setPromo };
    };
  const PromoFormEditing: React.FC<Promo> = observer(({ promo }) => {
   
  const {promot}=usePromo({
      id:promo.id,
      description:promo.description,
      cycle:promo.cycle,
      level:promo.level,
     
      specialityCode:promo.specialityCode,
      minTeamMembers:promo.minTeamMembers,
      maxTeamMembers:promo.maxTeamMembers
});
   const { control, handleSubmit, formState, reset, errors } = useForm({
      defaultValues: { ...promot},
      mode: "onChange"
    });
    renderCount++;
    
    const [showAlert, setShowAlert] = useState(false);
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
          message={'Do you Confirm your demand ?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('cancel');
              }
            },
            {
              text: 'Save',
              handler: () =>{
              api.modifyPromotion(promot.id,
                                 
                                 promot.description,
                                 promot.cycle,
                                 promot.level,
                                 
                                 promot.specialityCode,
                                 promot.minTeamMembers,
                                 promot.maxTeamMembers
                                 );
                setshowToast(true);
              }
            }
          ]}
        />
          <form onSubmit={handleSubmit(()=>setShowAlert(true))} style={{ padding: 20 , margin:30 , height:'auto'}} >
          <IonLabel color="light">
            <h1>Information About Promotion </h1>
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
                >   <IonSelectOption value="">None</IonSelectOption>
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
  
          {" "}
          <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
            <IonButton
              color="danger"
              fill="outline"
              type="button"
              onClick={() => {
                reset(promo);
              }}
            >
              Reset Form
            </IonButton>
            <IonButton
              color="light"
              type="submit"
              fill="outline"
             disabled={formState.dirty === false}
            >
              Save
            </IonButton>
          </IonButtons>
        </form>
      </IonContent>
    );
  }
  );
  export default PromoFormEditing;
