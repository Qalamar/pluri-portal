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
    IonCardSubtitle,
    IonChip,
    IonLabel,
    IonButton,
    IonIcon,
    IonList,
    IonText,
    IonModal
    
  } from "@ionic/react";
  import React, {useEffect, useState } from "react";
 
  import Anime from "react-anime";
import "./Promo.css";
import axios from "axios";
import PromoForm from "../components/PromoForm";


const Promo: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [promos, setpromos] = useState([]);
   const addPromo = () => {
    setShowModal(true);
  };
  const getPromos= async () => {
    let res = await axios.get("/promotion");
    let data = res.data;
    setpromos(data);
  };
  useEffect(() => {
    getPromos();
  }, []);
 
  
    return ( 

        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>
              <strong>Promos</strong>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonContent class="bg">
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <PromoForm />
        </IonModal>
        <Anime opacity={[0, 1]} duration={2000} easing="easeOutElastic">
      

       
            
            <IonGrid>
              <IonRow class="ion-align-items-center">
                <IonCol> 
                </IonCol>
                <IonCol size="12" sizeMd="10">
                  <IonCard class="neum">
                    <IonCardHeader class="head">
                      <IonCardTitle color="light" className="title">
                        Promos
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonGrid>
                        

                        
                       <IonRow>
                        </IonRow>                        
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>

                </IonCol>


                <IonCol></IonCol>
                </IonRow>
                {promos.map((promo:any)=>{
                  if (promo.specialityCode.length>0)
                         return (
                           <IonRow>
                             <IonCol> </IonCol>
                             <IonCol> </IonCol>
                          <IonCard  class="shadow ion-text-center">
                     
                          <IonCardTitle color="dark" className="ion-padding">
                            <strong>{promo.codePromotion}</strong>
                          </IonCardTitle>  
                          <IonChip outline={true} color="dark">
                            <IonLabel>{promo.level} </IonLabel>
                          </IonChip>                                                   
                          <IonChip outline={true} color="dark">
                            <IonLabel>{promo.cycle}</IonLabel>
                          </IonChip>
                          <IonChip outline={true} color="dark">
                            <IonLabel>{promo.academicYear}</IonLabel>
                          </IonChip>
                          <IonChip outline={true} color="dark">
                            <IonLabel>{promo.specialityCode} </IonLabel>
                          </IonChip>
                          
                          <IonCardContent>
                           <IonList>
                            <IonButton
                               target="_blank"
                                color="danger"
                              >
                                <IonLabel class="ion-margin">Edit</IonLabel>
                              </IonButton>
                              <IonButton target="_blank"
                                color="dark"
                                
                                >
                                  <IonLabel class="ion-margin">Delete</IonLabel>
                                </IonButton>
                              </IonList>
                              </IonCardContent> 
                               
                              
                   </IonCard>
                   <IonCol> </IonCol>
                   <IonCol> </IonCol>
                     
                      
                   </IonRow>

                         ) ;
              else return (
                <IonRow>
                <IonCol> </IonCol>
                <IonCol> </IonCol>
             <IonCard  class="shadow ion-text-center">
        
             <IonCardTitle color="dark" className="ion-padding">
               <strong>{promo.codePromotion}</strong>
             </IonCardTitle>  
             <IonChip outline={true} color="dark">
               <IonLabel>{promo.level} </IonLabel>
             </IonChip>                                                   
             <IonChip outline={true} color="dark">
               <IonLabel>{promo.cycle}</IonLabel>
             </IonChip>
             <IonChip outline={true} color="dark">
               <IonLabel>{promo.academicYear}</IonLabel>
             </IonChip>
    
             
             <IonCardContent>
              <IonList>
               <IonButton
                  target="_blank"
                   color="danger"
                 >
                   <IonLabel class="ion-margin">Edit</IonLabel>
                 </IonButton>
                 <IonButton target="_blank"
                   color="dark"
                   
                   >
                     <IonLabel class="ion-margin">Delete</IonLabel>
                   </IonButton>
                 </IonList>
                 </IonCardContent> 
                  
                 
      </IonCard>
      <IonCol> </IonCol>
      <IonCol> </IonCol>
        
         
      </IonRow>

              );
                }
                        )
                        }
               
                 <IonRow></IonRow>
                 <IonRow></IonRow>
                 <IonRow></IonRow>
                 <IonRow> 
                <IonCol></IonCol>
                <IonCol></IonCol>
                <IonCol></IonCol>
                <IonCol> <IonButton  onClick={() => addPromo()} color="danger"> ADD New Promo </IonButton></IonCol>
                </IonRow> 
                  <IonRow></IonRow>
                  <IonRow></IonRow>
                  
             </IonGrid>
          </Anime>
        </IonContent>
      </IonPage>
        );

};

export default Promo; 
