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
} from "@ionic/react";
import { observer } from "mobx-react";
import React, { useState } from "react";
import {
  peopleCircleOutline,
  schoolOutline,
  personCircleOutline,
  mailOutline,
  maleFemaleOutline,
  briefcaseOutline,
  walkOutline,
  fileTrayFullOutline,
  informationCircleOutline,
  bookOutline,
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
  firstName: "",
  lastName: "",
  gender: "",
  class: "",
  email: "",
  promo: "",
};

const ProjectForm: React.FC = observer(() => {
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange",
  });

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const [data, setData] = useState();
  const [showToast, setshowToast] = useState(false);
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

  const onSubmit = (data: any) => {
    setData(data);
    axios
      .post("/students", {
        first_name: capitalizeFirstLetter(data.firstName),
        last_name: data.lastName.toUpperCase(),
        class: data.class,
        email: data.email,
        gender: data.gender,
        promo: data.promo,
      })
      .then(function (response) {
        console.log(response);
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
        message="User added."
        duration={400}
      />

      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 38 }}>
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
              console.log("firstName", selected.detail.value);
              return selected.detail.value;
            }}
            name="firstName"
            rules={{
              required: true,
              minLength: { value: 4, message: "Must be at least 4 chars long" },
            }}
          />
        </IonItem>
        {showError("firstName")}
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={informationCircleOutline}></IonIcon>

          <Controller
            as={IonInput}
            placeholder="Short Description"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("lastName", selected.detail.value);
              return selected.detail.value;
            }}
            name="lastName"
            rules={{
              required: true,
              minLength: { value: 4, message: "Must be at least 4 chars long" },
            }}
          />
        </IonItem>
        {showError("lastName")}
        <IonItem color="dark" class="ion-margin-bottom">
          <IonIcon slot="start" icon={walkOutline}></IonIcon>
          <IonLabel>Promotion</IonLabel>
          <Controller
            as={
              <IonSelect placeholder="Select One">
                <IonSelectOption value="1CPI">1CPI</IonSelectOption>
                <IonSelectOption value="2CPI">2CPI</IonSelectOption>
                <IonSelectOption value="1CS">1CS</IonSelectOption>
                <IonSelectOption value="2CS-SIW">2CS-SIW</IonSelectOption>
                <IonSelectOption value="2CS-ISI">2CS-ISI</IonSelectOption>
                <IonSelectOption value="3CS-SIW">3CS-SIW</IonSelectOption>
                <IonSelectOption value="3CS-ISI">3CS-ISI</IonSelectOption>
              </IonSelect>
            }
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log(selected.detail.value);
              return selected.detail.value;
            }}
            name="promo"
            rules={{ required: true }}
          />
        </IonItem>{" "}
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
                    Drag 'n' drop some files here, or click to select files{" "}
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
            name="promo"
            rules={{ required: true }}
          />
        </IonItem>{" "}
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

export default ProjectForm;
