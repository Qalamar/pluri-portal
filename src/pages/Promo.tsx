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
  import React, { useState } from "react";
 
  import Anime from "react-anime";
import "./Promo.css";

import PromoForm from "../components/PromoForm";

const Promo: React.FC = () => {
 
  const [showModal, setShowModal] = useState(false);
  const [promos, setpromos] = useState([]);
   const addPromo = () => {
    setShowModal(true);
  };
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
                <IonCol></IonCol>
                <IonCol size="12" sizeMd="10">
                  <IonCard class="neum">
                    <IonCardHeader class="head">
                      <IonCardTitle color="light" className="title">
                        Promos
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonGrid>
                        


      
                        <IonRow></IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol></IonCol>
                </IonRow>
                
                
                <IonRow></IonRow>
                <IonRow></IonRow>
                 <IonRow>
                   <IonCol>
                    
                     <IonCard  class="shadow ion-text-center">
                     
                            <IonCardTitle color="dark" className="ion-padding">
                              <strong>1 CPI</strong>
                            </IonCardTitle>                                                     
                            <IonChip outline={true} color="dark">
                              <IonLabel>2017-2018</IonLabel>
                            </IonChip>
                            <IonChip outline={true} color="dark">
                              <IonLabel>Preparatory Cycle</IonLabel>
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
                       </IonCol>
                       <IonCol>
                       <IonCard  class="shadow ion-text-center">
                     
                     <IonCardTitle color="dark" className="ion-padding">
                       <strong>2 CPI</strong>
                     </IonCardTitle>                                                     
                     <IonChip outline={true} color="dark">
                              <IonLabel>2017-2018</IonLabel>
                            </IonChip>
                            <IonChip outline={true} color="dark">
                              <IonLabel>Preparatory Cycle</IonLabel>
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

                     </IonCol>
                     
                     <IonCol>
                     <IonCard class="shadow ion-text-center">
                     <IonCardTitle color="dark" className="ion-padding">
                       <strong>1 SC</strong>
                     </IonCardTitle>                                                     
                     <IonChip outline={true} color="dark">
                              <IonLabel>2017-2018</IonLabel>
                            </IonChip>
                            <IonChip outline={true} color="dark">
                              <IonLabel>Secondary Cycle</IonLabel>
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
                     </IonCol>
                 </IonRow>
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
                  <IonRow>
                  <IonCol></IonCol>
                <IonCol></IonCol>
                <IonCol></IonCol>
                <IonCol>
                <IonButton   color="dark"> ADD New Speciality </IonButton></IonCol>
                  </IonRow>
             </IonGrid>
          </Anime>
        </IonContent>
      </IonPage>
        );

};

export default Promo;  
