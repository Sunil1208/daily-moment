import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
// import { entries } from '../data';
import { firestore } from '../firebase';
import { Entry, toEntry }  from '../model';
interface RouterParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const match = useRouteMatch<RouterParams>();
  const { id } = match.params;
  console.log(id)
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    const entryRef = firestore.collection('entries').doc(id);
    entryRef.get().then((doc) => {setEntry(toEntry(doc))})
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{entry?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {entry?.description}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
