import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonRadioGroup,
    IonRadio,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonToast,
    IonButtons,
    IonCard,
    IonCardContent,
    IonItemDivider,
    IonTextarea
  } from "@ionic/react";
  import { observer } from "mobx-react";
  import {useProject} from "../utils/Interfaces";
  import React, { useState,useEffect } from "react";
  import {
    walkOutline,
    briefcaseOutline,
    bulbOutline,
    bookOutline,
    documentsOutline
  } from "ionicons/icons";
  import { store } from "../stores/Store";
  import { useForm, Controller } from "react-hook-form";
  import { useDropzone } from "react-dropzone";
  import Anime from "react-anime";
  import axios from "axios";
  import styled from "styled-components";
  import "./UserForm.css";
  
  const getColor = (props: any) => {
    if (props.isDragAccept) {
      return "#00e676";
    }
    if (props.isDragReject) {
      return "#ff1744";
    }
    if (props.isDragActive) {
      return "#2196f3";
    }
    return "#dd6666";
  };
  
  const Container = styled.div`
    justify-items: center;
    width: 400px;
    height: auto;
    position: absolute;
    left: calc(50% - 200px);
    align-items: center;
    padding: 20px;
    border-width: 4px;
    border-radius: 4px;
    border-color: ${(props) => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #dd6666;
    outline: none;
    transition: border 0.24s ease-in-out;
  `;
  
  let renderCount = 0;
  let initialValues = {
    rangeInfo: -100,
    title:"",
    domain:"",
    tools:"",
    requiredDocuments:"",
    promo:-99

  };
  
  const ProjectForm: React.FC = observer(() => {
    const { control, handleSubmit, formState, reset, errors } = useForm({
      defaultValues: { ...initialValues },
      mode: "onChange",
    });
    const {Project}=useProject();
    const {
      acceptedFiles,
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone();
    const[doc,setDoc]=useState<any>();
    const files = acceptedFiles.map((file) => (
      <li key={file.name}>
        {
       Project.document.append('document',file)
        }
        {file.name} - {file.size} bytes
      </li>
    ));
    const[selectpromo,setSelectpromo]=useState('');
    const [data, setData] = useState();
    
    const [promos,setpromos]=useState<any[]>([]);
    const [selectPromo,setSelectPromo]=useState<number>(-99);
    const [showToast, setshowToast] = useState(false);
    const getPromos = async () => {
      let res = await axios.get("/promo/promos");
      let data = res.data;
      setpromos(data);
    };
    renderCount++;
  
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
    useEffect(() => {
      getPromos();
    }, []);
    const onSubmit = () => {
      let docu=Project.document.getAll('document')[Project.document.getAll('document').length-1];
      Project.document.delete('document');
      Project.document.append('document',docu);
      console.log(Project.document.getAll('document'));
    axios.post('/pfe/add',{
      title:Project.title,
      domain:Project.domain,
      tools:Project.tools,
      requiredDocuments:Project.requiredDocuments,
      document:Project.document}
      ) .then(function (response) {
        console.log(response);
        setshowToast(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    
  
    return (
      <IonContent color="dark" class="ion-padding-top ion-margin-top">
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setshowToast(false)}
          message="Project added."
          duration={400}
        />
  
        <form onSubmit={handleSubmit(()=>onSubmit())} style={{ padding: 38 }}>
          <IonLabel color="light">
            <h1>Project Information</h1>
          </IonLabel>
          <IonItem color="dark" class="">
            <IonIcon slot="start" icon={bookOutline}></IonIcon>
  
            <Controller
              as={IonInput}
              placeholder="Title"
              className="firstCapital"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log("Title", selected.detail.value);
                Project.title=selected.detail.value;
                return selected.detail.value;
              }}
              name="title"
              rules={{
                required: true,
                minLength: { value: 4, message: "Must be at least 4 chars long" },
              }}
            />
          </IonItem>
          {showError("title")}
          <IonItem color="dark" class="">
            <IonIcon slot="start" icon={bulbOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="Domain"
              className="firstCapital"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log("Domain", selected.detail.value);
                Project.domain=selected.detail.value;
                return selected.detail.value;
              }}
              name="domain"
              rules={{
                required: true,
                minLength: { value: 4, message: "Must be at least 4 chars long" },
              }}
            />
          </IonItem>
          {showError("domain")}
          <IonItem color="dark" class="">
            <IonIcon slot="start" icon={briefcaseOutline}></IonIcon>
  
            <Controller
              as={IonInput}
              placeholder="Tools"
              className="firstCapital"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log("Tools", selected.detail.value);
                Project.tools=selected.detail.value;
                return selected.detail.value;
              }}
              name="tools"
              rules={{
                required: true,
                minLength: { value: 4, message: "Must be at least 4 chars long" },
              }}
            />
          </IonItem>
          {showError("tools")}
          <IonItem color="dark" class="">
            <IonIcon slot="start" icon={documentsOutline}></IonIcon>
  
            <Controller
              as={IonInput}
              placeholder="Required Documents"
              className="firstCapital"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log("Required Documents", selected.detail.value);
                Project.requiredDocuments=selected.detail.value;
                return selected.detail.value;
              }}
              name="requiredDocuments"
              rules={{
                required: true,
                minLength: { value: 4, message: "Must be at least 4 chars long" },
              }}
            />
          </IonItem>
          {showError("requiredDocuments")}
          <IonItem color="dark" class="ion-margin-bottom">
            <IonIcon slot="start" icon={walkOutline}></IonIcon>
            <IonLabel>Promotion</IonLabel>
            <Controller
              as={
               
                <IonSelect placeholder="Select One" value={selectpromo} onIonChange={e => setSelectpromo(e.detail.value)}>
                  {promos.map((promo:any,i)=>{
                   
                    return (
                      <IonSelectOption value={promo.id}>{promo.year}
                                                        {promo.cycle.localeCompare('CPI')===0?(
                                                          <div>CPI</div>
                                                        ):(
                                                          <div>SC</div>
                                                        )}
                                                        {
                                                        promo.specialityName.localeCompare("")!==0 &&(
                                                        <div>-{promo.specialityName}-</div>
                                                        )
                                                        }
                     </IonSelectOption>
                    )
                  })}

                </IonSelect>
              }
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log(selected.detail.value);
                Project.promo=selected.detail.value;
                return selected.detail.value;
              }}
              name="promo"
              rules={{ required: true }}
            />
          </IonItem>
          {showError("promo")}
          <IonItem color="black">
            <IonLabel class="ion-text-center">Attachements</IonLabel>
          </IonItem>
          <IonItem
            color="dark"
            class="ion-margin-bottom ion-justify-content-center ion-text-center"
          >
            <Controller
              as={
                <div>
                  <Container
                    {...getRootProps({
                      isDragActive,
                      isDragAccept,
                      isDragReject,
                    })}
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop A Document  here, or click to select A document {" "}
                    </p>
                  </Container>
                  <aside>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <ul>{files}</ul>
                  </aside>
                </div>
              }
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log(selected.detail.value);
                return selected.detail.value;
              }}
              name="document"
              
            />
          </IonItem>
          {showError("document")}{" "}
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
              disabled={formState.isValid === false || files.length!==1}
            >
              Submit
            </IonButton>
          </IonButtons>
        </form>
      </IonContent>
    );
  });
  
  export default ProjectForm;
