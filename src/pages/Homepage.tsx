import {
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonTitle
} from "@ionic/react";
import { ResponsivePie } from "@nivo/pie";
import { motion } from "framer-motion";
import { closeOutline, logoIonic, logoReact, server } from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import Toolbar from "../components/Toolbar";
import "../forms/promotion/PromoForm.css";
import { getProjects, getPromotions, getStudents, getProffessors } from "../utils/API";
import { store } from "../utils/Store";
import "../theme/main.css";


const Homepage: React.FC = observer(() => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    store.page = "about";
    if (store.isAuth.access === "2") setShowModal(true);
    getProjects();
    getPromotions();
    getStudents();
    getProffessors();
  }, []);

  const data = [
    {
      id: "Students",
      label: "Students",
      value: store.students.length,
      color: "hsl(134, 70%, 50%)",
    },
    {
      id: "Teachers",
      label: "Teachers",
      value: store.teachers.length,
      color: "hsl(127, 70%, 50%)",
    }, {
      id: "Promos",
      label: "Promos",
      value: store.promos.length,
      color: "hsl(127, 70%, 50%)",
    }, {
      id: "Projects",
      label: "Projects",
      value: store.projects.length,
      color: "hsl(127, 70%, 50%)",
    }
  ];

  return (
    <IonPage>
      <Toolbar page={"About"} />
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <div className="ion-text-end">
          <IonButton
            class="ion-text-end"
            color="dark"
            fill="clear"
            onClick={() => setShowModal(false)}
          >
            <IonIcon color="dark" slot="end" icon={closeOutline} />
            Dismiss
          </IonButton>
        </div>
        <IonContent>
          <div className="centered ion-text-center">
            <IonLabel class="teacher ion-text-center ion-padding ion-justify-content-center">
              <strong>Guest Access</strong>
            </IonLabel>
            <IonLabel class="ion-margin-top">
              You will not be able to preview or modify any data.
            </IonLabel>
          </div>
        </IonContent>
      </IonModal>
      <IonContent className="flow">
        <IonGrid>
          <IonRow class="">
            <IonCol size="12" sizeXl="8" class='ion-padding'>
              <IonCard className='home-cart holder ion-padding'>
                <IonGrid>
                  <IonRow>
                    <IonCol size='12' sizeLg='6'>
                      <IonTitle class='project'><strong>Summary</strong></IonTitle>
                    </IonCol>
                    <IonCol size='12' sizeLg='6'>
                      <div style={{ height: "250px" }}>
                        <ResponsivePie
                          data={data}
                          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                          innerRadius={0.5}
                          padAngle={0.7}
                          cornerRadius={3}
                          colors={{ scheme: 'nivo' }}
                          borderWidth={1}
                          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                          radialLabelsSkipAngle={10}
                          radialLabelsTextXOffset={6}
                          radialLabelsTextColor="#333333"
                          radialLabelsLinkOffset={0}
                          radialLabelsLinkDiagonalLength={16}
                          radialLabelsLinkHorizontalLength={24}
                          radialLabelsLinkStrokeWidth={1}
                          radialLabelsLinkColor={{ from: 'color' }}
                          slicesLabelsSkipAngle={10}
                          slicesLabelsTextColor="#333333"
                          animate={true}
                          motionStiffness={90}
                          motionDamping={15}
                          defs={[
                            {
                              id: 'dots',
                              type: 'patternDots',
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              size: 4,
                              padding: 1,
                              stagger: true
                            },
                            {
                              id: 'lines',
                              type: 'patternLines',
                              background: 'inherit',
                              color: 'rgba(255, 255, 255, 0.3)',
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10
                            }
                          ]}
                          fill={[
                            {
                              match: {
                                id: 'ruby'
                              },
                              id: 'dots'
                            },
                            {
                              match: {
                                id: 'c'
                              },
                              id: 'dots'
                            },
                            {
                              match: {
                                id: 'go'
                              },
                              id: 'dots'
                            },
                            {
                              match: {
                                id: 'python'
                              },
                              id: 'dots'
                            },
                            {
                              match: {
                                id: 'scala'
                              },
                              id: 'lines'
                            },
                            {
                              match: {
                                id: 'lisp'
                              },
                              id: 'lines'
                            },
                            {
                              match: {
                                id: 'elixir'
                              },
                              id: 'lines'
                            },
                            {
                              match: {
                                id: 'javascript'
                              },
                              id: 'lines'
                            }
                          ]}
                          legends={[
                            {
                              anchor: 'bottom',
                              direction: 'row',
                              translateY: 56,
                              itemWidth: 100,
                              itemHeight: 18,
                              itemTextColor: '#999',
                              symbolSize: 18,
                              symbolShape: 'circle',
                              effects: [
                                {
                                  on: 'hover',
                                  style: {
                                    itemTextColor: '#000'
                                  }
                                }
                              ]
                            }
                          ]}
                        />
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeXl="4" class='ion-padding-top'>
              <IonCard class="ion-text-center holder home-cart ion-no-padding">
                <IonCardContent class="">
                  {/* <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonChip class='ion-padding' outline={true} color="primary">
                          <IonLabel>1 CPI</IonLabel>
                        </IonChip>
                        <IonChip class='ion-padding' outline={true} color="primary">
                          <IonLabel>2 CPI</IonLabel>
                        </IonChip>
                        <IonChip class='ion-padding' outline={true} color="primary">
                          <IonLabel>1 CS</IonLabel>
                        </IonChip>
                        <IonChip class='ion-padding' outline={true} color="primary">
                          <IonIcon icon={globeOutline} />
                          <IonLabel>2 CS - SIW</IonLabel>
                        </IonChip>
                        <IonChip class='ion-padding' outline={true} color="primary">
                          <IonIcon icon={fileTrayFullOutline} />
                          <IonLabel>2 CS - SIL</IonLabel>
                        </IonChip>
                        <IonChip class='ion-padding' outline={true} color="primary">
                          <IonIcon icon={globeOutline} />
                          <IonLabel>3 CS - SIW</IonLabel>
                        </IonChip>
                        <IonChip class='ion-padding' outline={true} color="primary">
                          <IonIcon icon={fileTrayFullOutline} />
                          <IonLabel>3 CS - SIL</IonLabel>
                        </IonChip>
                        <IonItem lines='none' class='ion-margin-top ion-padding-horizontal'>
                          <IonLabel>Promotion</IonLabel>
                          <IonSelect value={mail} placeholder="Select" onIonChange={e => setMail(e.detail.value)}>
                            <IonSelectOption value="mailto:etudiant1@esi-sba.dz">1CPI</IonSelectOption>
                            <IonSelectOption value="mailto:etudiant2@esi-sba.dz">2CPI</IonSelectOption>
                            <IonSelectOption value="mailto:etudiant3@esi-sba.dz">1CS</IonSelectOption>
                            <IonSelectOption value="mailto:etudiant4@esi-sba.dz">2CS - SIW</IonSelectOption>
                            <IonSelectOption value="mailto:etudiant4@esi-sba.dz">2CS - SIL</IonSelectOption>
                            <IonSelectOption value="mailto:etudiant5@esi-sba.dz">3CS - SIW</IonSelectOption>
                            <IonSelectOption value="mailto:etudiant5@esi-sba.dz">3CS - SIL</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                        <IonButton href={mail} class='ion-margin-top'>Send Mail</IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid> */}
                  <Iframe url="https://desolate-journey-22370.herokuapp.com/"
                    width="100%"
                    frameBorder={0}
                    height="400px"
                    id="myId"
                    className="myClassname"
                    position="relative" />
                </IonCardContent>
              </IonCard>
            </IonCol>
            <motion.div
              animate={{ x: -10, y: -220 }}
              whileHover={{ y: -230 }}
            >
              <IonCard className='summary ion-padding'>
                <IonGrid>
                  <IonRow class="ion-margin-vertical">
                    <IonCol>
                      <IonLabel color="light" class="project">
                        <strong>Pluri Portal</strong></IonLabel>
                      <br></br>
                      <IonLabel color='light'>
                        Pluri portal is an academic platform for teachers and<br></br>
                        students,allowing project submission, preview and<br></br> attribution.
                        </IonLabel>
                    </IonCol>
                  </IonRow>
                  <IonRow class="ion-justify-content-center">
                    <IonCol>
                      <IonChip outline={true} color="light">
                        <IonIcon icon={logoReact} />
                        <IonLabel>React</IonLabel>
                      </IonChip>
                      <IonChip outline={true} color="light">
                        <IonIcon icon={logoIonic} />
                        <IonLabel>Ionic</IonLabel>
                      </IonChip>
                      <IonChip outline={true} color="light">
                        <IonIcon icon={server} />
                        <IonLabel>Django</IonLabel>
                      </IonChip>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            </motion.div>
          </IonRow>
          <IonRow class="ion-no-padding">
            <IonCol size='12' sizeLg='4'>
              <a href='https://bragdonilyes.pythonanywhere.com/cantbefoundkids/login/?next=/cantbefoundkids/' target='_blank' rel="noopener noreferrer">
                <motion.div
                  animate={{ y: -220 }}
                  whileHover={{ scale: 1.1, y: -240 }}
                >
                  <div className='backend'></div>
                </motion.div>
              </a>
            </IonCol>
            <IonCol size='12' sizeLg='4'>
              <a href='https://github.com/Qalamar/pluri-portal' target='_blank' rel="noopener noreferrer">
                <motion.div
                  animate={{ y: -220 }}
                  whileHover={{ scale: 1.1, y: -240 }}
                >
                  <div className='github'></div>
                </motion.div>
              </a>
            </IonCol>
            <IonCol size='12' sizeLg='4'>
              <a href='mailto:contact@tariqhamrit.com' target='_blank' rel="noopener noreferrer">
                <motion.div
                  animate={{ y: -220 }}
                  whileHover={{ scale: 1.1, y: -240 }}
                >
                  <div className='report'></div>
                </motion.div></a>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
});
export default Homepage;
