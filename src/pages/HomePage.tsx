import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
// import { entries } from '../data';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../model';


const HomePage: React.FC = () => {
  const { userId } = useAuth(); 
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore.collection('users')
                          .doc(userId)
                          .collection('entries');
    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)))
    // entriesRef.get().then(({ docs }) => setEntries(docs.map(toEntry)))
  }, [userId]);
  
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
                routerLink={`/my/entries/view/${entry.id}`}
              >
                {entry.title}
              </IonItem>
            )
          })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
