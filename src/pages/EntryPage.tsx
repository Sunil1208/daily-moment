import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { useAuth } from '../auth';
import { getFormattedDate } from '../common/sharedData';
// import { entries } from '../data';
import { firestore } from '../firebase';
import { Entry, toEntry }  from '../model';
interface RouterParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth();
  const match = useRouteMatch<RouterParams>();
  const { id } = match.params;
  const history = useHistory();
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    const entryRef = firestore.collection('users').doc(userId).collection('entries').doc(id);
    entryRef.get().then((doc) => {setEntry(toEntry(doc))})
  }, [userId, id]);

  const handleDelete = async () => {
    const entryRef = firestore.collection('users').doc(userId).collection('entries').doc(id);
    await entryRef.delete();
    history.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{getFormattedDate(entry?.date)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trash} slot="icon-only"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>
          {entry?.title}
        </h2>
        <img src={entry?.pictureUrl} alt={entry?.title} />
        <p>
          {entry?.description}
        </p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
