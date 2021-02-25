import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';

interface RouterParams {
  entryId: string;
}

const EntryPage: React.FC = () => {
  const { entryId } = useParams<RouterParams>();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Entry {entryId}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        This is the entry page.
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
