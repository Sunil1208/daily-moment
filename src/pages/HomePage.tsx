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


const HomePage: React.FC = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const entriesRef = firestore.collection('entries');
    entriesRef.get().then((snapshot) => {
      console.log('snapshot', snapshot)
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setEntries(entries)
    })
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
