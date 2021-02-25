import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { entries } from '../data';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry) => {
            return(
              <IonItem 
                button 
                key={entry.id}
                routerLink={`/my/entries/${entry.id}`}
              >
                {entry.description}
              </IonItem>
            )
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
