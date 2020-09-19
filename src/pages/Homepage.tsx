import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
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
import { closeOutline, logoIonic, logoReact, newspaperOutline, server } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import Toolbar from "../components/Toolbar";
import "../forms/promotion/PromoForm.css";
import { store } from "../utils/Store";
import { ResponsivePie } from "@nivo/pie";

import "./Auth.css";

const Homepage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    store.page = "about";
    if (store.isAuth.access === "2") setShowModal(true);
  }, []);

  const data = [
    {
      id: "Correct",
      label: "Correct",
      value: 6,
      color: "hsl(134, 70%, 50%)",
    },
    {
      id: "Wrong",
      label: "Wrong",
      value: 4,
      color: "hsl(127, 70%, 50%)",
    },
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
      <IonContent className="showcase">
        <IonGrid>
          <IonRow class="ion-align-items-center ">
            <IonCol size="12" sizeXl="8" class='ion-padding'>
              <IonCard className='home-cart holder ion-padding'>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonTitle>Summary</IonTitle>
                      <IonCard className='summary'>

                      </IonCard>
                    </IonCol>
                    <IonCol>
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
            <IonCol size="12" sizeMd="4" sizeXl="4" class='ion-padding'>
              <IonCard class="ion-text-center holder home-cart ion-padding">
                <div>
                  <IonIcon
                    icon={newspaperOutline}
                    class="ico"
                    color="dark"
                  />
                </div>
                <IonCardContent class=" ion-text-center">
                  <IonGrid>
                    <IonRow class="ion-margin-bottom">
                      <IonCol>
                        <IonTitle color="dark" class="project">
                          <strong>Pluri Portal</strong></IonTitle>
                        <IonLabel>
                          Pluri portal is an academic platform for teachers and
                          students , allowing project submission, preview and
                          attribution.
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonLabel>
                      <strong>Technologies</strong>
                    </IonLabel>
                    <IonRow class="ion-padding-horizontal ion-justify-content-center">
                      <IonCol>
                        <IonChip outline={false} color="danger">
                          <IonIcon icon={logoReact} />
                          <IonLabel>React</IonLabel>
                        </IonChip>
                        <IonChip outline={false} color="primary">
                          <IonIcon icon={logoIonic} />
                          <IonLabel>Ionic</IonLabel>
                        </IonChip>
                        <IonChip outline={false} color="success">
                          <IonIcon icon={server} />
                          <IonLabel>Django</IonLabel>
                        </IonChip>
                      </IonCol>
                    </IonRow>

                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Homepage;
