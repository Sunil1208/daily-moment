import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { entries } from '../data';

interface RouterParams {
  entryId: string;
}

const EntryPage: React.FC = () => {
  const { entryId } = useParams<RouterParams>();
  const entry = entries.find((entry) => entry.id === entryId);
  if(!entry){
    throw new Error(`No such entry: ${entryId}`);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Entry {entryId}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {entry.description}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
