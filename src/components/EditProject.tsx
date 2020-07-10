import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonToast,
} from "@ionic/react";
import {
  albumsOutline,
  bookOutline,
  briefcaseOutline,
  bulbOutline,
  cloudUploadOutline,
  documentsOutline,
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import * as api from "../utils/API";
import { Project } from "../utils/Interfaces";
import "./PromoForm.css";

export interface Projects {
  data: Project;
}

let formData = new FormData();

const AddProject: React.FC<Projects> = observer(({ data }) => {
  const onDrop = useCallback((acceptedFiles) => {
    formData.append("document", acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [project, setProject] = useState({
    id: 0,
    title: "",
    domain: "",
    professor: "",
    tools: "",
    requiredDocuments: "",
    promo: "",
  });

  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...data },
    mode: "onChange",
  });
  const [showToast, setshowToast] = useState(false);

  useEffect(() => {
    project.id = data.id;
    project.title = data.title;
    project.domain = data.domain;
    project.professor = data.professor;
    project.tools = data.tools;
    project.requiredDocuments = data.requiredDocuments;
    project.promo = data.promo;
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
    formData.append("title", project.title);
    formData.append("domain", project.domain);
    formData.append("professor", project.professor);
    formData.append("tools", project.tools);
    formData.append("requiredDocuments", project.requiredDocuments);
    formData.append("promo", project.promo);
    /* for (var pair of formData.entries()) {
      
    } */
    api.modifyProject(project.id, formData);
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
      {/*  <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        message={"Do you Confirm your demand ?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              
            },
          },
          {
            text: "Save",
            handler: () => {
              
              api.modifyStudent(
                student.id,
                student.firstName,
                student.lastName,
                Math.floor(Math.random() * 100000 + 1).toString(),
                student.password,
                student.email,
                "2000-01-01",
                "",
                7,
                "Pr"
              );
              api.getStudents();
              setshowToast(true);
            },
          },
        ]}
      /> */}
      <div className="centered">
        <form
          onSubmit={handleSubmit(() => onSubmit())}
          style={{ padding: 10, margin: 15, height: "auto" }}
        >
          <IonItem color="dark" class="">
            <IonIcon slot="start" icon={bookOutline}></IonIcon>

            <Controller
              as={IonInput}
              placeholder="Title"
              className="firstCapital"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                project.title = selected.detail.value;
                return selected.detail.value;
              }}
              name="title"
              rules={{
                required: true,
                minLength: {
                  value: 4,
                  message: "Must be at least 4 chars long",
                },
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
                project.domain = selected.detail.value;
                return selected.detail.value;
              }}
              name="domain"
              rules={{
                required: true,
                minLength: {
                  value: 4,
                  message: "Must be at least 4 chars long",
                },
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
                project.tools = selected.detail.value;
                return selected.detail.value;
              }}
              name="tools"
              rules={{
                required: true,
                minLength: {
                  value: 4,
                  message: "Must be at least 4 chars long",
                },
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
                project.requiredDocuments = selected.detail.value;
                return selected.detail.value;
              }}
              name="requiredDocuments"
              rules={{
                required: true,
                minLength: {
                  value: 4,
                  message: "Must be at least 4 chars long",
                },
              }}
            />
          </IonItem>
          {showError("requiredDocuments")}
          <IonItem color="dark" class="ion-margin-bottom">
            <IonIcon slot="start" icon={albumsOutline}></IonIcon>
            <Controller
              as={IonInput}
              placeholder="Promotion"
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                project.promo = selected.detail.value;
                return selected.detail.value;
              }}
              name="promo"
              rules={{
                required: true,
              }}
            />
          </IonItem>
          {showError("promo")}
          <IonItem color="black">
            <IonLabel class="ion-text-center">Attachements</IonLabel>
          </IonItem>

          <IonItem class="ion-text-center" {...getRootProps()}>
            <input {...getInputProps()} />
            <IonIcon icon={cloudUploadOutline}></IonIcon>

            <IonLabel>Upload Files</IonLabel>
          </IonItem>

          <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
            <IonButton
              color="danger"
              class="ion-padding-horizontal"
              type="button"
              onClick={() => {
                reset(data);
              }}
            >
              Reset
            </IonButton>
            <IonButton
              color="light"
              type="submit"
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
export default AddProject;
