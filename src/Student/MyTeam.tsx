import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonLabel,
  IonToast,
  IonText,
  IonButton,
  IonItem,
  IonList,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonAlert
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./MyTeam.css";

import {
  chevronForwardOutline,
  atOutline,
  peopleOutline,
  codeOutline
} from "ionicons/icons";

import { observer } from "mobx-react";
import { promotion } from "../pages/Promo";
import { useForm, Controller } from "react-hook-form";
import { useTeam, Student, Team, useStudent } from "../utils/Interfaces";
import Anime from "react-anime";
import axios from "axios";
import * as api from "../utils/api";

let renderCount = 0;
let initialValues = {
  rangeInfo: -100,
  codeTeam: " ",
};
let value: Student[] = [];



const MyTeam: React.FC = observer(() => {
  /* this is just an example to test */
  const { student } = useStudent({
    id: 0,
    firstName: "badra souhila",
    lastName: "guendouzi",
    dateOfBirth: new Date(),
    placeOfBirth: "Arzew",
    email: "b.guendouzi@esi-sba.dz",
    userName: "souHila",
    password: "Guendouzi",
    promotion: "1SC",
    isLeader: false,
    team: "",
  })
  const { Team } = useTeam({
    id: 0,
    name: "",
    readiness: false,
  })


  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...Team },
    mode: "onChange"
  });
  renderCount++;

  const [teams, setTeams] = useState<Team[]>([]);
  const [NotcreateTeam, setnotCreateTeam] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showToast, setshowToast] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [promos, setPromos] = useState<promotion[]>([]);
  const [maxTeamMembers, setmaxTeamMembers] = useState<number>(0);
  const [minTeamMembers, setminTeamMembers] = useState<number>(0);
  const [members, setMembers] = useState<Student[]>([]);
  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;

  };

  const getUsers = async () => {
    let res = await axios.get("/student");
    let data = res.data;
    setStudents(data);
    /* console.log(data);*/
  };
  const getPromos = async () => {
    let res = await axios.get("/promotion");
    let data = res.data;
    setPromos(data);

    /* console.log(data);*/
  };
  const getTeams = async () => {
    let res = await axios.get("/team");
    let data = res.data;
    setTeams(data);
    /* console.log(data);*/
  };

  useEffect(() => {
    getUsers();
    getPromos();


  }, []);
  const getMinMax = () => {
    let stop: boolean;
    let s: string;
    stop = false;
    let i;
    i = 0;
    let value: promotion;
    while (stop === false && i < promos.length) {

      value = promos[i];
      s = value.level + value.cycle + value.specialityCode;
      if (student.promotion.localeCompare(s) === 0) stop = true;
      i++;
    }
    if (stop === true) {
      setmaxTeamMembers(promos[i - 1].maxTeamMembers);

      setminTeamMembers(promos[i - 1].minTeamMembers);
    }
  };
  const getMembers = (TeamName: string) => {
    let j: number = 0;
    let i: number;
    let tab: Student[] = [];


    for (i = 0; i < students.length; i++) {
      if (students[i].team.localeCompare(TeamName) === 0) {
        tab[j] = students[i];
        j++;
      }
    }
    return tab;
  };
  const onSubmit = () => {
    console.log(members.length);
    console.log(minTeamMembers);
    console.log(maxTeamMembers);
    let min = minTeamMembers - 1;
    let max = maxTeamMembers - 1;
    let i: number;
    let val = Team;
    let include: boolean;
    i = 0;
    include = false;
    getTeams();
    if (members.length <= max && members.length >= min) {
      while (include === false && i < teams.length) {
        val = teams[i];
        if (Team.name.localeCompare(val.name) === 0) include = true;
        i++;
      }
      if (include === false) {
        student.team = Team.name;
        setshowToast(true);
        student.isLeader = true;
        console.log(student.team);
        api.modifyStudent(
          student.id,
          student.firstName,
          student.lastName,
          student.userName,
          student.password,
          student.email,
          student.dateOfBirth,
          student.placeOfBirth,
          student.promotion,
          student.currentYear,
          Team.name);
        api.addTeam(Team.name, Team.readiness);


      }
      else setShowAlert1(true);
    }
    else setShowAlert(true);
  };


  return (

    <IonPage>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setshowToast(false)}
        message="Team created  "
        duration={400}
      />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons >

          <IonTitle>
            <strong>My Team</strong>
          </IonTitle>
        </IonToolbar>

      </IonHeader>
      <IonContent >

        <Anime opacity={[0, 1]} duration={2000} easing="easeOutElastic">
          <IonGrid>
            {student.team.length === 0 ? (
              <IonRow class="ion-align-items-center container">
                <IonCol></IonCol>

                {NotcreateTeam === false ? (
                  <IonList >
                    <IonLabel className="t">
                      <strong>
                        Create A Team To build An Amazing Project .
          </strong>
                    </IonLabel>
                    <br /> <br /> <br />
                    <IonButton
                      onClick={() => {
                        setnotCreateTeam(true);
                        getMinMax();
                        getTeams();
                      }}


                      slot="start" className="but" color="danger" size="default" type="button"

                    >
                      Get Created
            <IonIcon icon={chevronForwardOutline} />

                    </IonButton>
                  </IonList>

                ) : (

                    <IonCol size="12" sizeMd="7">
                      <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        message={'You Must respect Team Rules'}
                        buttons={['OK']}
                      />
                      <IonAlert
                        isOpen={showAlert1}
                        onDidDismiss={() => setShowAlert1(false)}
                        message={'This Team Name Exists'}
                        buttons={['OK']}
                      />

                      <IonCard class="shadow">
                        <IonCardHeader>
                          <IonTitle color="light" class="title ion-padding">
                            Team Informations
                  </IonTitle>
                        </IonCardHeader>
                        <IonCardContent class="ion-padding ">
                          <form onSubmit={handleSubmit(() => onSubmit())} style={{ padding: 5, height: 'auto' }} >

                            <IonLabel color="dark">
                              <strong>
                                <h2>
                                  Team Leader
     </h2>
                              </strong>
                            </IonLabel>
                            <IonItem >
                              <IonIcon slot="start" icon={atOutline}></IonIcon>
                              <IonLabel> {student.email} </IonLabel>
                            </IonItem>
                            <IonItem >
                              <IonIcon slot="start" icon={codeOutline}></IonIcon>
                              <Controller
                                as={IonInput}
                                placeholder="Team Name"
                                className="firstCapital"
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]) => {
                                  //console.log("Teamname", selected.detail.value);
                                  Team.name = selected.detail.value;
                                  return selected.detail.value;
                                }}
                                name="name"
                                rules={{
                                  required: true,
                                  minLength: { value: 3, message: "Must be 3 chars long" }


                                }}
                              />
                            </IonItem>
                            {showError("name")}
                            <IonItem >
                              <IonIcon slot="start" icon={peopleOutline}></IonIcon>
                              <IonLabel>Select Your Team Members</IonLabel>
                              <Controller
                                as={
                                  <IonSelect value={members} multiple={true} cancelText="Cancel" okText="Okay" >
                                    {students.length != 0 && (

                                      students.map((s: any, i) => {
                                        if (s.id != student.id && s.promotion.localeCompare(student.promotion) === 0 && s.team.localeCompare("") === 0)
                                          return (
                                            <IonSelectOption key={s.id} value={s} >  {s.lastName} {s.firstName} </IonSelectOption>
                                          );
                                      }
                                      )
                                    )
                                    }
                                  </IonSelect>
                                }
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]) => {
                                  // console.log("Teamtable", selected.detail.value);
                                  setMembers(selected.detail.value);
                                  return selected.detail.value;
                                }}
                                name="SelectM"
                                rules={{
                                  required: true
                                }}
                              />

                            </IonItem>
                            {showError("SelectM")}





                            <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
                              <IonButton
                                color="danger"
                                onClick={() => setnotCreateTeam(false)}
                                type="button"

                              >
                                Cancel
        </IonButton>
                              <IonButton
                                color="dark"
                                type="submit"

                                onClick={() => {
                                  console.log(members);

                                }}
                                disabled={formState.isValid === false}
                              >
                                Submit and Invite Members
        </IonButton>
                            </IonButtons>
                          </form>
                        </IonCardContent>

                      </IonCard>
                    </IonCol>
                  )
                }
                <IonCol></IonCol>
              </IonRow>




            ) : (<IonRow>
              <IonCol>
              </IonCol>
              <IonCol
                size="12"
                sizeMd="6"
                class=" ion-text-center">

                {student.isLeader === true && (
                  <IonCard class="shadow ion-text-center">

                    <IonCardHeader class="ion-margin-bottom">
                      <IonCardTitle
                        color="light"
                        className="ion-padding title"
                      >
                        <strong>{student.team}</strong>
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText>
                        <h1>
                          <strong>
                            Team Members
                    </strong>
                        </h1>
                      </IonText>
                      {
                        getMembers(student.team).map((s: Student, i) => {
                          return (
                            <IonItem> {s.lastName} {s.firstName}
                            </IonItem>
                          );
                        }
                        )
                      }

                    </IonCardContent>

                  </IonCard>
                )}
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
              )

            }
          </IonGrid>
        </Anime>
      </IonContent>
    </IonPage>
  );
});
export default MyTeam


  ;


















