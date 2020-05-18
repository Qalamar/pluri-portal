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
  IonButton,
  IonModal,
  IonItem,
  IonList,
  IonInput,
  IonAlert,
   IonDatetime, 
  IonChip
} from "@ionic/react";
import React, { useEffect, useState, } from "react";
import "./MyTeam.css";
import Report from "./reportComponent"; 
import {
   personOutline,
  chevronForwardOutline,
  mailOutline,
  codeOutline,
  closeOutline,
  checkmarkOutline,
  calendarOutline,
    downloadOutline,
    documentTextOutline,
    addCircleOutline
} from "ionicons/icons";

import { observer } from "mobx-react";
import {promotion} from ".././../pages/Promo";
import { useForm, Controller } from "react-hook-form";
import {useTeam , Invite,Student,Team,useStudent} from "../../utils/Interfaces" ;
import Anime from "react-anime";
import axios from "axios";
import * as api from "../../utils/api";
let TEAM:Team ; //for a  team
let inviteButton:boolean[]=[]; //for invited button 
let TEAMS:Team[]=[];
 
const useStateWithLocalStorage = (localStorageKey :string)=> {
  var storage=localStorage.getItem(localStorageKey);
  var array=[];
  if (storage!=null) array=JSON.parse(storage);

  const [value, setValue] = React.useState(
     array|| []
  );
 
  React.useEffect(() => {
    var val=JSON.stringify(value);
    localStorage.setItem(localStorageKey, val);

  }, [value]);
 
  return [value, setValue];
};
 
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
  team:"test", 
  })
  /* this const for creation */
const{Team}=useTeam({
  id:0,
  name:"",
  readiness:false,
  
  }) ;
 
const { control, handleSubmit, formState, reset, errors } = useForm({
  defaultValues: { ...Team},
  mode: "onChange"
});

  const [teams,setTeams]=useState<Team[]>([]);
  const [invites,setInvites]=useState<Invite[]>([]); 
  const[createTeam,setCreateTeam]=useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showToast, setshowToast] = useState(false);
  const [showToast1, setshowToast1] = useState(false);
  const[students,setStudents]=useState<Student[]>([]); 
  const[promos,setPromos]=useState<promotion[]>([]);
  const[maxTeamMembers,setmaxTeamMembers]=useState<number>(0);
  const[minTeamMembers,setminTeamMembers]=useState<number>(0);
  const [isOpen,setIsOpen]=useState(false);
  const[showModal,setShowModal]=useState(false);
  const[ready,setReady]=useState(false);
 const [value, setValue] = useStateWithLocalStorage(
    'myInvited'
  );
const [invited,setInvited]=useState<any[]>(value); //for member how issued the request
const [pdf,setPdf]=useState(null);
const [showReport,setShowReport]=useState(false);
const [selectedDate, setSelectedDate] = useState<string>("");
    const [fill,setFill]=useState(false);
    const [file, setFile] = useState();
  
  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;

  };
  const getStudents = async () => {
    let res = await axios.get("/student");
    let data = res.data;
    setStudents(data);

  };
  const getPromos = async ()=>{
    let res =await axios.get("/promotion");
    let data=res.data;
    setPromos(data);
    let stop:boolean=false;
    let s:string;
    let i:number=0;
    let value:promotion;
  while(stop===false && i<data.length){
     
     value=data[i];
     s=value.level+value.cycle+value.specialityCode;
    if (student.promotion.localeCompare(s)===0) stop=true;
    else i++;
  }
  if(stop===true){
    setmaxTeamMembers(data[i].maxTeamMembers);
    
    setminTeamMembers(data[i].minTeamMembers);
  }
    
  };
  const HandlerFile=(e:any)=>{
    setPdf(e.target.files[0]);
    console.log(pdf);
  };
  const getTeams=async()=>{
    let res = await axios.get("/team");
    let data = res.data;
    setTeams(data);
    TEAMS=data;
    getTeam(student.team);
  
  };
  const getInvites=async()=>{
    let res = await axios.get("/invites");
    let data = res.data;
    setInvites(data);

  };
  const getInviteStudent=(s:Student)=>{
    
    let stop:boolean=false; 
    let inv:Invite={
      id:0,
      sender:0,
      receiver:0,
      accepted:false,
      rejected:false
    } ;
    let i:number=0;
    while(i<invites.length && stop===false)
    {
      inv=invites[i];
     
      if (inv.receiver===s.id && inv.sender===student.id && inv.accepted===false && inv.rejected===false)
          stop=true;
      else i++;
    }
    return inv;
  };

useEffect(() => {
    getStudents();
    getPromos(); 
    getTeams();
    getInvites();
   }, []);
    
 
   const getTeam=(TeamName:string)=>{     
        let i:number=0;
        let stop=false;       
        let val :Team={
          id:0,
          name:"",
          readiness:false
        };
        while(i<TEAMS.length && stop===false)
        {
          val=TEAMS[i];
          if (TeamName.localeCompare(val.name)===0) stop =true;
          else i++;
        }  
        setReady(val.readiness);
        Team.id=val.id;
        Team.readiness=val.readiness;
        Team.name=val.name; 
        return  val;      
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
const getInvited=async()=>{
let res=await axios.get("/invited");                         
let data=res.data;
let i:number=0;
let value:any[]=[];
for(i=0;i<data.length;i++){
   value[i]=data[i];
   value[i].sender=getStudent(value[i].sender);
};
if(data.length!==0){
let j=JSON.stringify(value);
console.log("jjjjjjjjjj",j);
localStorage.setItem('myInvited',j);
setValue(value);
console.log(value)
setInvited(value);
}

};
const getStudent=(id:number)=>{
   
   let stop:boolean=false;
   let i:number=0;
   let student:any=0;
   while(i<students.length && stop===false)
   {
     student=students[i];
     if(student.id===id)stop=true;
     else i++;
   }
   return student;
};

  const onSubmit=()=>{
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
      student.isLeader=true;
      setshowToast(true);
      
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
    api.addTeam(Team.name,false);
    setCreateTeam(false);
    } 
    else setShowAlert1(true);
   };
     const onChange = (e: any) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
        setFill(true);
      };
      const onSubmit1 = () => {
         
        let form_data = new FormData();
        //var blob=new Blob([file],{type:"application/pdf"})
        form_data.append('Report',file,'test');  
        console.log(form_data.getAll('Report'));  
        
        let b ={
            form:form_data,
            daate:new Date()
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
          <form onSubmit={handleSubmit(()=>onSubmit1())} style={{ padding: 10 , margin:20}}>
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
           {fill===true?(<IonLabel>{file.name}</IonLabel>)
           :(
            <IonLabel>Pdf Report </IonLabel> 
           )}
          
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
  <input type="file" name="myfile" accept="application/pdf" onChange={onChange}/>
   </div>
   }
   control={control}
            onChangeName="onIonChange"
            name="report"
           
    />  
       </IonItem>
          
        <IonButtons class="ion-justify-content-center ion-margin-top">
          <IonButton
            color="danger"
            fill="outline"
            type="button"
            onClick={()=>setShowReport(false)}
          >
            Cancel
          </IonButton>
          <IonButton
            color="dark"
            type="submit"
            fill="outline"
           onClick={(e)=>console.log(file)}
           disabled={selectedDate.length !==0|| fill===false}
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
        <IonCard class="shadow">
                <IonCardHeader class="ion-text-center">
                  <IonTitle color="light" class="title ion-padding">
                    Team
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
                      Team.name=selected.detail.value;
                       return selected.detail.value;}}
                        name="name"
                        rules={{
                      required: true,
                       minLength: { value: 3, message: "Must be 3 chars long" }}}
                          />
                        </IonItem>
                    {showError("name")} 
                                   <br/> 
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
          onClick={()=>setCreateTeam(false)}
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
        </IonContent>
      </IonModal>
      <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}>
             <IonContent class=" ion-text-center">
               {invited.length===0 ?(
              <div>
                <h1>
              YOU DON'T HAVE INVITES !
              </h1>            
              
               </div>):(
                 <div>
                  
                {
                  invited.map((inv:any,i)=>{
                  return (
                    <div>
                      {inv.rejected===false && (
                  <IonCard  class="shadow">
                    <IonCardHeader className="header">
                    <IonTitle color="light" class="title ion-padding">
                      {inv.sender.team}
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
                        
                        onClick={()=>{api.modifyInvite(inv.id,
                                                      inv.sender,
                                                      inv.receiver,
                                                      inv.accepted,
                                                      true);
                                                    getInvited();}}
                        >
                          <IonIcon slot="end" icon={closeOutline}></IonIcon>
                       Reject
                        </IonButton>
                        <IonButton
                         color="danger"
                         size="default"
                         type="button"
                        
                          onClick={()=>{
                          api.modifyInvite(inv.id,
                            inv.sender,
                            inv.receiver,
                            true,
                            inv.rejected);
                            student.team=inv.sender.team;
                            api.modifyStudent(student.id,
                              student.firstName,
                              student.lastName,
                              student.dateOfBirth,
                              student.placeOfBirth,
                              student.email,
                              student.userName,
                              student.password,
                              student.promotion,
                              student.isLeader,
                              student.team
                              );
                              localStorage.clear();
                              setShowModal(false);  
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
             onClick={()=>
              {
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
              students.map((s: Student,i) => {
               
                if (s.id!==student.id && s.promotion.localeCompare(student.promotion)===0 && s.team.localeCompare("")===0)
              
                return (
                  <IonItem color="dark">  {s.lastName} {s.firstName}                
                  
                  {getInviteStudent(s).receiver===s.id
                 && (inviteButton[i]=true)
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
                   disabled={inviteButton[i]===true}
                  onClick={()=>{                                    
                      
                    if(inviteButton.length>maxTeamMembers-2)
                     setShowAlert(true);
                     else {
                       inviteButton[i]=true;
                       api.postInviteStudent(0,s.id);
                       setshowToast1(true);
                       } 
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
                }
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
             <IonCol size="12" sizeMd="8">        
            <IonList > 
           <IonLabel className="t">
           <strong>
          Create A Team To build An Amazing Project .
          </strong>
          </IonLabel>
          <br/> <br/> <br/>
          <IonList class=" ion-justify-content-center ion-padding-left ion-margin-top" className="butt">
          <IonButton
          slot="start"
          color="dark"
          size="default"
          type="button"
          className="but"
          onClick={()=>{
            getInvited()           
            setShowModal(true);
            console.log("cliquite",invited);
          }}
          >
          See Invites
          <IonIcon icon={mailOutline} />
          </IonButton>
           <IonButton 
           onClick={()=>{
             setCreateTeam(true);
             getTeams();
          }}          
           slot="start" className="but" color="danger" size="default" type="button"
            >
             Get Created 
            <IonIcon icon={chevronForwardOutline} />            
           </IonButton>
           </IonList>
           </IonList>
           </IonCol>
           <IonCol></IonCol>         
           </IonRow>       
           ):( 
             /* for The Leader that has a team */
           <IonRow>
             <IonCol>
               </IonCol>
           <IonCol
            size="12"
              sizeMd="10"
              class=" ion-text-center"> 
              
              {student.isLeader===true ?(              
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
                    <IonGrid>
                      <IonRow >
                        <IonCol size="12" sizeMd="6"> 
                <IonItem class="ion-text-center">
                                  <IonLabel>
                                    <strong>Team Members</strong>
                                  </IonLabel>
                                </IonItem>
                    { 
                    getMembers(student.team).map((s: Student,i) => {
                      if (s.isLeader===false)
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
                    TEAM=getTeam(student.team);
                    api.modifyTeam(TEAM.id,TEAM.name,true);
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
                      
                  }}
                  >
                    Invite Members
                  </IonButton> 
                  </IonButtons> 
                  )}
                 </IonCol>
                 <IonCol size="12" sizeMd="6"> 
                 <IonItem class="ion-text-center">
                                  <IonLabel>
                                    <strong>Reports</strong>
                                  </IonLabel>
                                </IonItem>
                  
                                <IonButton
                            size="default"
                            fill="clear"
                            onClick={() => setShowReport(true)}
                            color="danger"
                          >
                            <IonIcon
                              icon={addCircleOutline}
                              slot="start"
                              size="large"
                            ></IonIcon>
                            Add A Report
                          </IonButton>
                 </IonCol>
                 </IonRow>
                 </IonGrid>                             
                </IonCardContent>
                
                </IonCard>
                ):
                (
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
                      if (s.isLeader===true)
                      return (
                      <div>
                        <IonItem class="ion-text-center">
                                  <IonLabel>
                                    <strong>Team Leader</strong>
                                  </IonLabel>
                                </IonItem>
                         <IonItem> {s.lastName} {s.firstName}
                       </IonItem>
                       </div>
                      );
                    }
                    )
                  }
                  {getMembers(student.team).length > 1 &&(
                    <IonItem class="ion-text-center">
                    <IonLabel>
                      <strong>Team Members</strong>
                    </IonLabel>
                  </IonItem>
                  )}
                  { 
                    getMembers(student.team).map((s: Student,i) => {

                      if (s.isLeader===false)
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
export default MyTeam;
                
                
                 

            
           
          
          
 
    
           
          
           
            


         
         
                         
   

