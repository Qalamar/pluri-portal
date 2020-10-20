import {
    IonAlert, IonButton, IonButtons,
    IonCard,
    IonCardContent, IonCardHeader,
    IonCardTitle, IonCol, IonContent,
    IonDatetime, IonGrid,
    IonIcon,
    IonInput, IonItem, IonLabel,
    IonList, IonModal, IonPage,
    IonRow, IonTitle,
    IonToast
} from "@ionic/react";
import axios from "axios";
import {
    addCircleOutline, archiveOutline, calendarOutline, checkmarkOutline, chevronForwardOutline,
    closeOutline, codeOutline,
    documentTextOutline, downloadOutline, mailOutline,
    mailUnreadOutline,
    personAddOutline, personOutline
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Anime from "react-anime";
import { Controller, useForm } from "react-hook-form";
import Toolbar from "../components/Toolbar";
import { promotion } from "../pages/Promo";
import * as api from "../utils/API";
import { Invite, Student, studentSecure, Team, useTeam } from "../utils/Interfaces";



let inviteButton: boolean[] = []; //for invited button 
const useStateWithLocalStorage = (localStorageKey: string) => {
    var storage = localStorage.getItem(localStorageKey);
    var array = [];
    if (storage != null) array = JSON.parse(storage);

    const [value, setValue] = React.useState(
        array || []
    );

    React.useEffect(() => {
        var val = JSON.stringify(value);
        localStorage.setItem(localStorageKey, val);

    }, [value]);

    return [value, setValue];
};

const MyTeam: React.FC = observer(() => {
    /* this is just an example to test */
    const student = {
        id: 0,
        firstName: "Ilyes ",
        lastName: "Bacha ",
        dateOfBirth: "FD",
        placeOfBirth: " ",
        email: "i.bacha@esi-sba.dz",
        userName: " ",
        password: " ",
        promotion: 5,
        currentYear: "2019/2020",
        isLeader: true,
        note: 15.15,
        team: -99,
    }
    /* this const for creation */
    const { Team } = useTeam({
        id: -99,
        name: "",
        readiness: false,
        project: -99,
        noteAvg: -99

    });

    const { control, handleSubmit, formState, reset, errors } = useForm({
        defaultValues: { ...Team },
        mode: "onChange"
    });

    const [getMembersTeam, setGetMembersTeam] = useState<Student[]>([]);
    const [invites, setInvites] = useState<Invite[]>([]);
    const [createTeam, setCreateTeam] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert1, setShowAlert1] = useState(false);
    const [showToast, setshowToast] = useState(false);
    const [showToast1, setshowToast1] = useState(false);
    const [students, setStudents] = useState<studentSecure[]>([]);
    const [promos, setPromos] = useState<promotion[]>([]);
    const [myTeam, setMyTeam] = useState<Team>(Team);
    const [teams, setTeams] = useState<Team[]>([]);
    const [maxTeamMembers, setmaxTeamMembers] = useState<number>(5);
    const [minTeamMembers, setminTeamMembers] = useState<number>(4);
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [ready, setReady] = useState(false);
    const [value, setValue] = useStateWithLocalStorage(
        'myInvited'
    );
    const [invited, setInvited] = useState<any[]>(value); //for member how issued the request
    const [inviteD, setInviteD] = useState<Invite[]>([]);
    const [showReport, setShowReport] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [fill, setFill] = useState(false);
    const [file, setFile] = useState('');
    const [form_data, setForm_data] = useState<FormData>(new FormData());
    const [senders, setsenders] = useState<any[]>([]);
    const showError = (_fieldName: string) => {
        let error = (errors as any)[_fieldName];
        return error ? (
            <div style={{ color: "red", fontWeight: "bold" }}>
                {error.message || "Field Is Required"}
            </div>
        ) : null;

    };
    const getStudents = async () => { /*students on the same promo*/
        let res = await axios.get("/users/students");
        let data = res.data;
        setStudents(data);

    };
    const getPromos = async () => {
        let res = await axios.get("/promo/promos");
        let data = res.data;
        setPromos(data);
        let stop: boolean = false;
        let i: number = 0;
        let value: promotion;
        while (stop === false && i < data.length) {
            value = data[i];
            if (student.promotion === value.id) stop = true;
            else i++;
        }
        if (stop === true) {

            setmaxTeamMembers(data[i].maxTeamMembers);
            setminTeamMembers(data[i].minTeamMembers);
        }

    };

    const getTeams = async () => {
        let res = await axios.get("/users/teams");
        let data = res.data;
        setTeams(data);


    };
    const getInvites = async () => {
        let res = await axios.get("/users/invites");
        let data = res.data;
        setInvites(data);

    };
    const getInviteStudent = (s: studentSecure) => {

        let stop: boolean = false;
        let inv: Invite = {
            id: 0,
            sender: 0,
            receiver: 0,
            accepted: false,
            rejected: false
        };
        let i: number = 0;
        while (i < invites.length && stop === false) {
            inv = invites[i];

            if (inv.receiver === s.id && inv.sender === student.id && inv.accepted === false && inv.rejected === false)
                stop = true;
            else i++;
        }
        return inv;
    };
    useEffect(() => {
        getStudents();
        getPromos();
        getTeams();
        // getInvites();  
        getMyTeam();

        // getInvited();
    }, []);

    const getMyTeam = async () => {
        let res = await axios.get('/users/myteam');
        let data = res.data;
        console.log(data);
        if (data.length !== 0) {
            let d = data[0];
            setMyTeam(d);
            console.log(d.id);
            getMembers(d.id);
        }
    };
    const getMembers = async (idTeam: number) => {
        if (myTeam.id >= 0) {
            let res = await axios.get("/users/team/" + myTeam.id);
            let data = res.data;
            setGetMembersTeam(data);
        }
        else {
            let res = await axios.get("/users/team/" + idTeam);
            let data = res.data;
            setGetMembersTeam(data);
        };

    };
    const getInvited = async () => {
        let table: any = [];
        let res = await axios.get('/users/invited');
        let data = res.data;
        console.log(data);
        setInviteD(data);
        let i: number = 0;
        //this process to store the complete Sender (id,firstName,...) on LocaleStorage
        for (i = 0; i < data.length; i++) {
            let j = data[i].sender;
            let res1 = await axios.get("/users/students/" + j);
            let student = res1.data; //I bring the student
            let res2 = await axios.get("/users/teams/" + student.team);
            let data2 = res2.data;
            table[i] = {
                invitation: data[i],
                sender: student,
                team: data2
            }
            setsenders(table);
        };

        //this process to store the complete Sender (id,firstName,...) on LocaleStorage
    };

    const Storage = () => {
        let i: number = 0;
        let value: any[] = [];
        if (inviteD.length !== 0) {
            let j = JSON.stringify(senders);
            console.log("LocaleStorage", j);
            localStorage.setItem('myInvited', j);
            setValue(senders);
            setInvited(senders);
        };
    };

    const onSubmit = () => {
        console.log(Team);
        let i: number;
        let val = Team;
        let include: boolean;
        i = 0;
        include = false;
        getTeams();
        while (include === false && i < teams.length) {

            val = teams[i];

            if (Team.name.localeCompare(val.name) === 0) include = true;
            i++;
        }
        if (include === false) {
            student.isLeader = true;
            setshowToast(true);
            // api.modifyStudent(student.id,
            //     student.firstName,
            //     student.lastName,
            //     student.dateOfBirth,
            //     student.placeOfBirth,
            //     student.email,
            //     student.userName,
            //     student.password,
            //     student.promotion,
            //     true,
            //     student.note
            // );
            api.addTeam(Team.name);
            axios.post('/users/myteam', {
                name: Team.name,
                readiness: false,
                project: Team.project,
                noteAvg: Team.noteAvg
            }).then(function (res) {
                setCreateTeam(false);
                setMyTeam({
                    id: 0,
                    name: Team.name,
                    readiness: false,
                    project: -99,
                    noteAvg: -99
                });
                student.isLeader = true;

            });

        }
        else setShowAlert1(true);
    };
    const onChange = (e: any) => {
        setFile(e.target.files[0].name);
        form_data.append('Report', e.target.files[0]);
        console.log(e.target.files[0]);
        setFill(true);
    };
    const onSubmit1 = () => {
        console.log(form_data.getAll('Report'));
        let b = {
            form: form_data,
            date: new Date()
        }
        let url = "http://localhost:3000/report/";
        axios
            .post(url, b)
            .then((res) => {
                console.log(res.data);
                setShowReport(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <IonPage>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setshowToast(false)}
                message="Team created  "
                duration={400}
            />
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                message={'You must respecte The Team Roles '}
                buttons={['OK']}
            />
            <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                message={'This Team Name Already Exists'}
                buttons={['OK']}
            />
            <IonModal
                isOpen={showReport}
                onDidDismiss={() => setShowReport(false)}
                id="MODAL"
            >
                <IonContent>
                    <form onSubmit={handleSubmit(() => onSubmit1())} style={{ padding: 10, margin: 20 }}>
                        <IonLabel >
                            <h1>Report Informations </h1>
                        </IonLabel>
                        <IonItem>
                            <IonIcon slot="start" icon={calendarOutline}></IonIcon>
                            <IonLabel>Date</IonLabel>
                            <Controller
                                as={
                                    <IonDatetime displayFormat="DD/MM/YYYY" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
                                }
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]) => {
                                    console.log("date", selected.detail.value);
                                    return selected.detail.value;
                                }}
                                name="date"
                                rules={{
                                    required: true,
                                }}
                            />
                        </IonItem>
                        {showError("date")}
                        <IonItem>
                            <IonIcon slot="start" icon={documentTextOutline}></IonIcon>

                            <IonLabel> Report </IonLabel>
                            <Controller
                                as={
                                    <div className="upload-btn-wrapper">
                                        <IonButton fill="clear" size="default" color="dark">
                                            <IonIcon
                                                icon={downloadOutline}
                                                slot="end"
                                                size="large"
                                            ></IonIcon>

                                        </IonButton>
                                        <input type="file" name="myfile" accept="application/pdf" onChange={onChange} />
                                    </div>

                                }
                                control={control}
                                onChangeName="onIonChange"
                                name="report"

                            />
                        </IonItem>
                        <IonItem lines="none" class="ion-text-center">
                            <br></br>
                            {fill === true && (
                                <IonLabel>{file}</IonLabel>
                            )}
                        </IonItem>

                        <IonButtons class="ion-justify-content-center ion-margin-top">
                            <IonButton
                                color="danger"
                                fill="outline"
                                type="button"
                                onClick={() => {
                                    setShowReport(false);
                                    setFill(true);
                                }
                                }
                            >
                                Cancel
            </IonButton>
                            <IonButton
                                color="dark"
                                type="submit"
                                fill="outline"
                                onClick={(e) => console.log(file)}
                                disabled={selectedDate.length !== 0 || fill === false}
                            >
                                Submit
            </IonButton>
                        </IonButtons>
                    </form>
                </IonContent>

      )
        </IonModal>
            <IonModal
                isOpen={createTeam}
                onDidDismiss={() => setCreateTeam(false)}>
                <IonContent>
                    <IonCard class="shadow" className="createTeam">
                        <IonCardHeader class="ion-text-center">
                            <IonTitle color="dark" class="title ion-padding">
                                Team
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
                                    <IonIcon slot="start" icon={personOutline}></IonIcon>
                                    <IonLabel> {student.lastName} {student.firstName} </IonLabel>
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
                                <br />
                                <IonLabel color="dark">
                                    <strong>
                                        <h2>
                                            Rules
                           </h2>
                                    </strong>
                                </IonLabel>

                                <IonItem>
                                    Your team must have {minTeamMembers} members as minimum and {maxTeamMembers} members  as maximum
  </IonItem>
                                <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
                                    <IonButton
                                        color="danger"
                                        onClick={() => setCreateTeam(false)}
                                        type="button"

                                    >
                                        Cancel
          </IonButton>
                                    <IonButton
                                        color="dark"
                                        type="submit"
                                        disabled={formState.isValid === false && minTeamMembers === 0 && maxTeamMembers === 0}
                                    >
                                        Confirm
          </IonButton>
                                </IonButtons>
                            </form>
                        </IonCardContent>

                    </IonCard>
                </IonContent>
            </IonModal>
            <IonModal
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}>
                <IonContent class=" ion-text-center">

                    {invited.length === 0 ? (
                        <div>
                            <h1>
                                YOU DON'T HAVE INVITES !
                </h1>

                        </div>) : (
                            <div>

                                {
                                    invited.map((inv: any, i) => {

                                        return (
                                            <div>
                                                {inv.invitation.rejected === false && (
                                                    <IonCard class="shadow">
                                                        <IonCardHeader className="header">
                                                            <IonTitle color="light" class="title ion-padding">
                                                                {inv.team.name}
                                                            </IonTitle>
                                                        </IonCardHeader >
                                                        <IonCardContent>
                                                            <IonItem>
                                                                <h2>
                                                                    {inv.sender.lastName} {inv.sender.firstName}</h2>
                          &nbsp;
                          &nbsp;
                          <IonButtons slot="end">
                                                                    <IonButton
                                                                        color="dark"
                                                                        size="default"
                                                                        type="button"

                                                                        onClick={() => {
                                                                            axios.put('users/invites/' + inv.invitation.id, {
                                                                                sender: inv.sender.id,
                                                                                receiver: inv.invitation.receiver,
                                                                                accepted: inv.invitation.accepted,
                                                                                rejected: true
                                                                            });
                                                                            getInvited();
                                                                        }}
                                                                    >
                                                                        <IonIcon slot="end" icon={closeOutline}></IonIcon>
                         Reject
                          </IonButton>
                                                                    <IonButton
                                                                        color="danger"
                                                                        size="default"
                                                                        type="button"

                                                                        onClick={() => {
                                                                            axios.put('users/invites/' + inv.invitation.id, {
                                                                                sender: inv.sender.id,
                                                                                receiver: inv.invitation.receiver,
                                                                                accepted: true,
                                                                                rejected: false
                                                                            })
                                                                                .then(function (response) {
                                                                                    console.log(response);
                                                                                    localStorage.clear();
                                                                                    setShowModal(false);
                                                                                    student.team = inv.team.id;
                                                                                    axios.post('/users/myteam', {
                                                                                        id: inv.team.id,
                                                                                        name: inv.team.name,
                                                                                        readiness: inv.team.readiness,
                                                                                        noteAvg: inv.team.noteAvg,
                                                                                        project: inv.team.project
                                                                                    });
                                                                                    setMyTeam(inv.team);
                                                                                    getMembers(inv.team.id);
                                                                                });


                                                                        }}
                                                                    >
                                                                        <IonIcon slot="end" icon={checkmarkOutline}></IonIcon>
                            Accept
                          </IonButton>
                                                                </IonButtons>
                                                            </IonItem>
                                                        </IonCardContent>
                                                    </IonCard>
                                                )
                                                }
                                            </div>

                                        );
                                    })}

                            </div>
                        )

                    }

                    <IonButton
                        className="close"
                        type="button"
                        color="danger"
                        onClick={() => {
                            setShowModal(false);
                        }
                        }
                    >
                        Close Preview
                </IonButton>
                </IonContent>
            </IonModal>
            <IonModal
                isOpen={isOpen}
                onDidDismiss={() => setIsOpen(false)}
            >
                <IonContent color="dark" class="ion-padding ion-text-center">
                    <h1>Invite Students </h1>
                    {students.length !== 0 && (
                        students.map((s: studentSecure, i) => {

                            if (s.id !== student.id && s.promotion === student.promotion && s.team < 0)

                                return (
                                    <IonItem color="dark">  {s.lastName} {s.firstName}

                                        {getInviteStudent(s).receiver === s.id
                                            && (inviteButton[i] = true)
                                        }
                                        <IonToast
                                            isOpen={showToast1}
                                            onDidDismiss={() => setshowToast1(false)}
                                            message="Invite Sent "
                                            duration={400}
                                        />
                                        <IonButton
                                            slot="end"
                                            color="danger"
                                            disabled={inviteButton[i] === true}
                                            onClick={() => {

                                                if (inviteButton.length > maxTeamMembers - 1)
                                                    setShowAlert(true);
                                                else {
                                                    inviteButton[i] = true;
                                                    // api.postInviteStudent(s.id);
                                                    setshowToast1(true);
                                                }
                                            }}
                                        >
                                            {
                                                inviteButton[i] === true ? (
                                                    <div>Invited</div>
                                                ) : (
                                                        <div> Invite</div>
                                                    )
                                            }
                                        </IonButton>
                                    </IonItem>
                                );
                        }
                        )
                    )
                    }
                    <IonButton
                        type="button"
                        color="danger"
                        onClick={() => {
                            setIsOpen(false);
                        }
                        }
                    >
                        Cancel
                </IonButton>
                </IonContent>
            </IonModal>
            <Toolbar page={"My Team"} />
            <IonContent >
                <IonGrid>
                    <IonRow class="ion-align-items-center ion-justify-content-center">
                        <IonCol
                            size="12"
                            sizeSm="6"
                            sizeMd="4"
                            sizeXl="3"
                            class=" ion-text-center"
                        >
                            <Anime
                                opacity={[0, 1]}
                                duration={2000}
                                easing="easeOutElastic"
                            >
                                <IonCard class="shadow holder ion-text-center">
                                    <IonCardHeader>
                                        <IonIcon
                                            icon={mailUnreadOutline}
                                            class="ico"
                                            color="dark"
                                        ></IonIcon>
                                    </IonCardHeader>
                                    <IonCardTitle color="dark">
                                        <strong>
                                            Invites
                                        </strong>
                                    </IonCardTitle>
                                    {/* <IonChip outline={false} color="dark">
                                        <IonLabel>{e.email}</IonLabel>
                                      </IonChip> */}

                                    <IonCardContent>

                                        <IonButton
                                            slot="start"
                                            color="dark"
                                            size="default"
                                            type="button"

                                            onClick={() => {
                                                getInvited();
                                                Storage();
                                                setShowModal(true);
                                            }}
                                        >
                                            See Invites
                                         
                                        </IonButton>

                                    </IonCardContent>
                                </IonCard>
                            </Anime>
                        </IonCol>

                        <IonCol
                            size="12"
                            sizeSm="6"
                            sizeMd="4"
                            sizeXl="3"
                            class=" ion-text-center"
                        >
                            <Anime
                                opacity={[0, 1]}
                                duration={2000}
                                easing="easeOutElastic"
                            >
                                <IonCard class="shadow holder ion-text-center">
                                    <IonCardHeader>
                                        <IonIcon
                                            icon={archiveOutline}
                                            class="ico"
                                            color="dark"
                                        ></IonIcon>
                                    </IonCardHeader>
                                    <IonCardTitle color="dark">
                                        <strong>
                                            Team
                                        </strong>
                                    </IonCardTitle>
                                    {/* <IonChip outline={false} color="dark">
                                        <IonLabel>{e.email}</IonLabel>
                                      </IonChip> */}

                                    <IonCardContent>
                                        
                                            <IonButton
                                                onClick={() => {
                                                    setCreateTeam(true);
                                                    getTeams();
                                                }}
                                                slot="start" className="but" color="danger" size="default" type="button"
                                            >
                                                Create
                                            <IonIcon icon={chevronForwardOutline} />
                                            </IonButton>
                                       
                                    </IonCardContent>
                                </IonCard>
                            </Anime>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
});
export default MyTeam;