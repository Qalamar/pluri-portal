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
  IonChip,
  IonText,
  IonButton,
  IonSearchbar,
  IonList,
  IonModal,
  IonItem
} from "@ionic/react";
import React, { useEffect, useState, useReducer } from "react";
import Anime from "react-anime";
import axios from "axios";
import {
  addCircleOutline,
  filterOutline,
  checkmarkOutline,
  personOutline,
  peopleOutline
} from "ionicons/icons";

import { observer } from "mobx-react";

import "./Teams.css";
import { useTeam ,Team,Student ,useStudent} from "../utils/Interfaces";

let value:Student[]=[];
let size:number=0;

  const Teams: React.FC= observer(() => {
  const[teams,setTeams]=useState([]);
  const[students,setStudents]=useState<Student[]>([]);
  const [isOpen, setisOpen] = useState(false);
  const{Team}=useTeam();
  const [TeamMembers,setTeamMembers]=useState<Student[]>([]);
  


    const getTeams = async () => {
  let res = await axios.get("/team");
  let data = res.data;
  setTeams(data);
};
const getUsers = async () => {
  let res = await axios.get("/student");
  let data = res.data;
  setStudents(data);
 /* console.log(data);*/
};
useEffect(() => {
  getTeams();
  getUsers();
}, []);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <strong>Teams</strong>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonModal
         cssClass="popup"
          isOpen={isOpen}
          onDidDismiss={() => setisOpen(false)}
        >
          <IonContent color="dark" class="ion-padding ion-text-center">
          <h1>Information About Team</h1>
          <br/>
            <IonItem color="dark">
              <IonIcon icon={personOutline} slot="start" ></IonIcon>
            <IonLabel>
              
              <h2><strong>Team Leader</strong></h2>
               
            </IonLabel>
            </IonItem>
            
            {
              value.map((s:Student,i)=>
              {
                if (s.isLeader===true)
                return (
                  <IonItem color="dark"class="Mem">
                    <IonLabel>
                      {s.lastName} {s.firstName}
                      </IonLabel>
                    </IonItem>
                      );
            
            }
            )
             }<br/>
            {value.length!==1 &&( 
              <div>
                 <IonItem color="dark">
                 <IonIcon icon={peopleOutline} slot="start" ></IonIcon>
            <IonLabel>
              <h2><strong>Team Members</strong> </h2>
            
            </IonLabel> 
            </IonItem>
            
             {value.map((s:Student,i)=>
              {
                if (s.isLeader===false)
                return (
                  <IonItem color="dark"class="Mem">
                    
                    <IonLabel>
                      {s.lastName} {s.firstName}
                      </IonLabel>
                    </IonItem>
                      );
            
            }
            )
             }
             </div>
             ) 
             }
           <IonButton
          class="ion-justify-content-center ion-padding ion-margin-top"
          color="danger"
          onClick={() => setisOpen(false)}
        >
          Close Preview
        </IonButton>
      </IonContent>
    </IonModal>
               
      <IonContent class="bg">
      <Anime opacity={[0, 1]} duration={2000} easing="easeOutElastic">
        <IonGrid>
          <IonRow class="ion-align-items-center">
            <IonCol size="12">
              <IonCard class="neum">
                <IonCardHeader class="ion-text-center ion-padding">
                  <IonCardTitle color="light" class="title">
                   Teams
                  </IonCardTitle>
                  
                </IonCardHeader>
               <IonCardContent>
                   <IonGrid>
                   <IonRow class="ion-justify-content-center ion-text-center ion-align-items-center">
                   <IonCol size="12" sizeMd="5">
                        <IonSearchbar placeholder="Search for a Team"/> 
                      </IonCol>
                      </IonRow>
                      <IonRow class="ion-justify-content-center ion-text-center ion-align-items-center">
                       <IonCol>                       
                        <IonButton fill="clear" size="default" color="dark">
                          <IonIcon
                            icon={filterOutline}
                            slot="start"
                            size="large"
                          ></IonIcon>
                          Filter
                        </IonButton>
                      </IonCol>
                     </IonRow>
                     <IonRow></IonRow>
                     <IonRow>
                        {" "}
                        {teams.length === 0 ? (
                          <div>Loading...</div>
                        ) : ( 
                          teams.map((team: any,i) => {
                           { value= getMembers(team.name);    
                             size=value.length;
                              console.log(value);                                            
                            return (
                             
                              <IonCol
                                  size="12"
                                  sizeMd="5"
                                  class=" ion-text-center">
                                    { team.readiness===true &&( 
                                  <IonCard class="shadow ion-text-center">
                                  <IonCardHeader class="ion-margin-bottom">
                                    <IonCardTitle
                                      color="light"
                                      className="ion-padding title"
                                    >
                                      <strong>{team.name}</strong>
                                    </IonCardTitle>
                                    
                                  </IonCardHeader>
                                  <IonChip>
                                    <IonLabel>
                                    {value.pop()?.promotion}                                    
                                    </IonLabel>
                                    </IonChip>
                                   
                                  <IonChip>
                                    
                                    {size===1 &&(     //I specify 0 because I pop one student in the ligne 226
                                      <IonLabel>Monomial </IonLabel>
                                    )}
                               
                                 {size===2&&(      //also Here
                                    
                                      <IonLabel>Binomial </IonLabel>
                                    )}
                                    {size !==1 && size!==2 &&(
                                       <IonLabel>
                                       Number Of Members 
                                      &nbsp;
                                       {size}    
                                      </IonLabel> 
                                    )}
                                    
                                                                     
                                   </IonChip>
                                  
                                  
                                   
                         
                               
                               <IonCardContent>
                                     
                                      
                                      <IonButton  onClick={()=>{
                                        Team.id=team.id;
                                        Team.name=team.name;
                                        Team.readiness=team.readiness;
                                        //console.log(Team);
                                        value=getMembers(team.name);
                                        console.log(value);
                                        setisOpen(true);
                                        }
                                       }target="_blank" color="danger">
                                        <IonLabel class="ion-margin">
                                        See More 
                                        </IonLabel>
                                      </IonButton>
                                      
                                     </IonCardContent>
                                     
                                  </IonCard>
                                   )
                                      }
                             
                                {" "}
                              </IonCol>
                            );
                            }
                          })
                        )}
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
         </IonRow>  
         </IonGrid> 
         </Anime>                 
      </IonContent>
    </IonPage>
  );
});

export default Teams;   
                                        
                                     
                                   
                                               
                               
                               
