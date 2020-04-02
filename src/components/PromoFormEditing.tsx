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
  import React, { useState } from "react";
  import { useForm, Controller } from "react-hook-form";
  import "./PromoForm.css";
  import * as api from "../utils/api";
  import {promotion } from "../pages/Promo";

  let renderCount = 0;
  let initialValues = {
    rangeInfo: -100,
    codePromotion: "",
    cycle: "",
    level: "",
    academicYear: "2019-2020",
    specialityCode: ""
  };
 
  
export interface Promo {
  promo:promotion;
  }
  interface PromoState {
    PromoEdit: promotion;
    setPromo: React.Dispatch<React.SetStateAction<promotion>>;
  }
  
   const usePromo = (overrides?: Partial<promotion>): PromoState => {
      const defaultPromo: promotion= {
        id:0,
     codePromotion:"",
     cycle:"",
     level:"",
     academicYear:"",
     specialityCode:""
      };
      const [PromoEdit, setPromo] = useState<promotion>({
    ...defaultPromo,
    ...overrides,
  }); 
   return {PromoEdit, setPromo };
    };
  const PromoFormEditing: React.FC<Promo> = observer(({ promo }) => {
   
  const {PromoEdit}=usePromo({
      id:promo.id,
      codePromotion:promo.codePromotion,
      cycle:promo.cycle,
      level:promo.level,
      academicYear:promo.academicYear,
      specialityCode:promo.specialityCode
});
   const { control, handleSubmit, formState, reset, errors } = useForm({
      defaultValues: { ...PromoEdit},
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
              api.modifyPromotion(PromoEdit.id,PromoEdit.codePromotion,PromoEdit.cycle,PromoEdit.level,PromoEdit.academicYear,PromoEdit.specialityCode);
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
            <IonIcon slot="start" icon={codeOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="Code Promo"
              
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log("CodePromo", selected.detail.value);
                PromoEdit.codePromotion=selected.detail.value;
                
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
                PromoEdit.cycle=selected.detail.value;
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
                PromoEdit.level=selected.detail.value;
               
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
                console.log("AcademicYear", selected.detail.value);
                PromoEdit.academicYear=selected.detail.value;
                return selected.detail.value;
              }}
              name="academicYear"
              rules={{
                required: true,
                pattern: {
                  value: /^20[0-9][0-9]-20[0-9][0-9]$/i,
                  message: "Academic year must be 20xx-20xx"
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
                >   <IonSelectOption value="">None</IonSelectOption>
                  <IonSelectOption value="ISI">ISI</IonSelectOption>
                  <IonSelectOption value="SIW">SIW</IonSelectOption>
                </IonSelect>
              }
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log(selected.detail.value);
               PromoEdit.specialityCode=selected.detail.value;
                return selected.detail.value;
              }}
              name="specialityCode"
              rules={{
                required: true
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
