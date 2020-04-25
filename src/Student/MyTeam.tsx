import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonFabButton,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonLabel,
  IonToast,
  IonChip,
  IonText,
  IonButton,
  IonSearchbar,
  IonModal,
  IonItem,
  IonList,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItemDivider,
  IonAlert
} from "@ionic/react";
import React, { useEffect, useState, useReducer } from "react";
import "./MyTeam.css";

import {
  checkmarkOutline,
  chevronForwardOutline,
  atOutline,
  peopleOutline,
  codeOutline
} from "ionicons/icons";

import { observer } from "mobx-react";
import {promotion} from ".././../pages/Promo";
import { useForm, Controller } from "react-hook-form";
import {useTeam , sTudent,Student,Team,useStudent} from "../../utils/Interfaces" ;
import Anime from "react-anime";
import axios from "axios";
import * as api from "../../utils/api";
let renderCount = 0;
let initialValues = {
rangeInfo: -100,
codeTeam:" ",
};
let value:Student[]=[];
let val:Team ; //for a  team
let invite =0; //count invitations
let inviteButton:boolean[]=[];
const MyTeam: React.FC = observer(() => {
/* this is just an example to test */
const {student}=useStudent({
    id:0,
  firstName:"Ilyes ",
  lastName:"bacha ",
  dateOfBirth:new Date(),
  placeOfBirth:" ",
  email:"i.bacha@esi-sba.dz",
  userName:" ",
  password:" ",
  promotion:"1SC",
  isLeader:true,
  team:"SSS", 
  })
  /* this const for creation */
const{Team}=useTeam({
  id:0,
  name:"",
  readiness:false,
  
  }) 
  
const { control, handleSubmit, formState, reset, errors } = useForm({
  defaultValues: { ...Team},
  mode: "onChange"
});
renderCount++;
 
  const [teams,setTeams]=useState<Team[]>([]);
  const[NotcreateTeam,setnotCreateTeam]=useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showToast, setshowToast] = useState(false);
  const[students,setStudents]=useState<Student[]>([]); 
  const[promos,setPromos]=useState<promotion[]>([]);
  const[maxTeamMembers,setmaxTeamMembers]=useState<number>(0);
  const[minTeamMembers,setminTeamMembers]=useState<number>(0);
  const [isOpen,setIsOpen]=useState(false);
  const[ready,setReady]=useState(false);

  
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
  const getPromos = async ()=>{
    let res =await axios.get("/promotion");
    let data=res.data;
    setPromos(data);
    
   /* console.log(data);*/
  };
  const getTeams=async ()=>{
    let res = await axios.get("/team");
    let data = res.data;
    setTeams(data);
   /* console.log(data);*/
  };

  useEffect(() => {
    getUsers();
    getPromos(); 
    getTeams(); 
   
  }, []);

 const getMinMax=()=>
  {
  let stop:boolean;
  let s:string;
  stop=false;
  let i;
  i=0;
  let value:promotion;
  while(stop===false && i<promos.length){
     
     value=promos[i];
     s=value.level+value.cycle+value.specialityCode;
    if (student.promotion.localeCompare(s)===0) stop=true;
  i++;
  }
  if(stop===true){
    setmaxTeamMembers(promos[i-1].maxTeamMembers);
    
    setminTeamMembers(promos[i-1].minTeamMembers);
  }
 };
 const getMembers=(TeamName:string)=>{
  let j:number=0;
  let i:number;
  let tab:Student[]=[];
  

  for ( i=0;i<students.length;i++){
  if (students[i].team.localeCompare(TeamName)===0)
  {  
    tab[j]=students[i];
    j++;
  }  
 }
 return tab;   
};
  const onSubmit=()=>{

    let min=minTeamMembers-1;
    let max=maxTeamMembers-1;
    let i:number ;
    let val =Team;
    let include :boolean;
    i=0;
    include=false;
     getTeams();
    while(include===false && i<teams.length){
      val=teams[i];
      if (Team.name.localeCompare(val.name)===0) include =true;
      i++;
    }
    if (include===false ){
      student.team=Team.name;
      setshowToast(true);
      student.isLeader=true;
      console.log(student.team);
      api.modifyStudent(student.id,
                      student.firstName,
                      student.lastName,
                      student.dateOfBirth,
                      student.placeOfBirth,
                      student.email,
                      student.userName,
                      student.password,
                      student.promotion,
                      true,
                      Team.name);
    api.addTeam(Team.name,Team.readiness);
    } 
    else setShowAlert1(true);
   };
  const getTeam=(s:Student)=>{
    let i=0;
    let stop=false;
    let TEAM :Team={
      id:0,
      name:"",
      readiness:false,
    };
    let value:Team;
    getTeams();
    while(i<teams.length && stop===false)
    {
      value=teams[i];
      if (value.name.localeCompare(s.team)===0){
        TEAM=value;
        stop=true;
       }  
     i++;
     }
  return TEAM;
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
      <IonModal  
          isOpen={isOpen}
          onDidDismiss={() => setIsOpen(false)}
        >
           <IonContent color="dark" class="ion-padding ion-text-center">
          <h1>Invite Students </h1>
          {students.length != 0 && (             
              students.map((s: Student,i) => {
               
                if (s.id!=student.id && s.promotion.localeCompare(student.promotion)===0 && s.team.localeCompare("")===0)
              
                return (
                  <IonItem color="dark">  {s.lastName} {s.firstName} 
                  <IonButton 
                  slot="end"
                  color="danger"
                   disabled={inviteButton[i]===true}
                  onClick={()=>{                                    
                      getMinMax();
                     console.log(maxTeamMembers);
                     console.log(inviteButton.length);
                    if(inviteButton.length>maxTeamMembers-2)
                     setShowAlert(true);
                     else inviteButton[i]=true  //else /* this will be the backend invitation*/
                     }}
                   >                   
                   {
                     inviteButton[i]===true ?(
                       <div>Invited</div>
                     ):(
                       <div> Invite</div>
                     )
                   }
                   </IonButton>
                    </IonItem>
                   ) ;
                  }
               )
             )  
             }
                  
                   
                
             <IonButton
             type="button"
             color="danger"
             onClick={()=>
              {
                setIsOpen(false);
                getMinMax();}
              }
             >
               Cancel
              </IonButton>
          </IonContent>
      </IonModal>
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
          
          {student.team.length===0 ?(  
         /* for students that don't have a team yet*/          
         <IonRow class="ion-align-items-center container">
            <IonCol></IonCol>
           
              {NotcreateTeam===false? (
            <IonList > 
           <IonLabel className="t">
           <strong>
          Create A Team To build An Amazing Project .
          </strong>
          </IonLabel>
          <br/> <br/> <br/>
           <IonButton 
           onClick={()=>{
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
             /* the end of students how don't have a team yet*/   
              ):(
                /* for how want to create a team (the LeaderTEam Form) */
                <IonCol size="12" sizeMd="7">
                  
            <IonAlert
                  isOpen={showAlert1}
                  onDidDismiss={() => setShowAlert1(false)}
                message={'This Team Name Already Exists'}
                buttons={['OK']}
      />      
              <IonCard class="shadow">
                <IonCardHeader>
                  <IonTitle color="light" class="title ion-padding">
                    Team Informations
                  </IonTitle>
                </IonCardHeader>
                <IonCardContent class="ion-padding ">
                <form onSubmit={handleSubmit(()=>onSubmit())} style={{ padding: 5,  height:'auto'}} >

                   <IonLabel color="dark">
                       <strong>
                       <h2>
                   Team Leader 
                         </h2>
                    </strong>
                     </IonLabel>
 <IonItem >
 <IonIcon slot="start" icon={atOutline}></IonIcon>
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
 Team.name=selected.detail.value;
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
<IonLabel color="dark">
                       <strong>
                       <h2>
                       Rules 
                         </h2>
                    </strong>
                     </IonLabel>
                     <br/><br/>
<IonItem>
  Your team must have {minTeamMembers} members as minimum and {maxTeamMembers} members  as maximum 
</IonItem>
    <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
        <IonButton
          color="danger"
          onClick={()=>setnotCreateTeam(false)}
          type="button"
          
        >
         Cancel
        </IonButton>
        <IonButton
          color="dark"
          type="submit"                    
          disabled={formState.isValid === false && minTeamMembers===0 && maxTeamMembers===0}
        >
          Confirm
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
           
          /* the end of creation Team */ 
           
          
           ):( 
             /* for The Leader that has a team */
           <IonRow>
             <IonCol>
               </IonCol>
           <IonCol
            size="12"
              sizeMd="6"
              class=" ion-text-center"> 
              
              {student.isLeader===true &&(              
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
                    { 
                    getMembers(student.team).map((s: Student,i) => {
                      return (
                      <IonItem> {s.lastName} {s.firstName}
                       </IonItem>
                      );
                    }
                    )
                  }
                  {ready===false &&(
                   <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
                  <IonButton 
                  color="danger"
                  type="button"
                  onClick={()=>{   
                    getTeams();                
                    val=getTeam(student);
                    console.log(val);
                    api.modifyTeam(val.id,val.name,true);
                    setReady(true);
                  }}
                  disabled={getMembers(student.team).length<minTeamMembers}
                  >
                    Ready!
                  </IonButton>    
                  <IonButton
                  color="dark"
                  type="button"
                  onClick={()=> 
                    {
                      setIsOpen(true);
                      getMinMax();
                  }}
                  >
                    Invite Members
                  </IonButton> 
                  </IonButtons> 
                  )}
                                                 
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
export default MyTeam;
                
                
                 

            
           
          
          
 
    
           
          
           
            


         
         
                         
   

