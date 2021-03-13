import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
// import { entries } from '../data';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../model';


const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore.collection('entries');
    entriesRef.get().then(({ docs }) => setEntries(docs.map(toEntry)))
  }, [])
  
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
