import {
  IonAlert,
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
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import * as api from "../../utils/API";

let initialValues = {
  title: "",
  domain: "",
  professor: "",
  tools: "",
  requiredDocuments: "",
  promo: "",
};

let formData = new FormData();

const AddProject: React.FC = observer(() => {
  const onDrop = useCallback((acceptedFiles) => {
    formData.append("document", acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [project, setProject] = useState({
    title: "",
    domain: "",
    professor: "",
    tools: "",
    requiredDocuments: "",
    promo: "",
  });

  useEffect(() => {
    setProject(initialValues)
  }, []);

  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange",
  });
  const [showToast, setshowToast] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

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
    formData.append("requiredDocuments", "");
    formData.append("promo", project.promo);
    api.addProject(formData);
    setshowToast(true);
  };

  return (
    <IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setshowToast(false)}
        message="You don't have permission to add projects"
        duration={800}
      />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setshowAlert(false)}
        message={"This projects exists"}
        buttons={["OK"]}
      />
      <div className="centered">
        <form
          onSubmit={handleSubmit(() => onSubmit())}
          style={{ padding: 10, margin: 15, height: "auto" }}
        >
          <IonItem class="">
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
                  message: "Must be at least 4 characters long",
                },
              }}
            />
          </IonItem>
          {showError("title")}
          <IonItem class="">
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
                  value: 2,
                  message: "Must be at least 2 characters long",
                },
              }}
            />
          </IonItem>
          {showError("domain")}
          <IonItem class="">
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
                  message: "Must be at least 4 characters long",
                },
              }}
            />
          </IonItem>
          {showError("tools")}
          <IonItem>
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

          <IonItem lines="none" class="ion-text-center" {...getRootProps()}>
            <input {...getInputProps()} />
            <IonIcon icon={cloudUploadOutline}></IonIcon>

            <IonLabel>Upload Files</IonLabel>
          </IonItem>

          <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
            <IonButton
              color="danger"
              type="button"
              onClick={() => {
                reset(initialValues);
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
export default AddProject;
