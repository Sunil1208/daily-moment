import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore } from '../firebase';


const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [localState, setLocalState] = useState({
    'title': '',
    'description': '',
    'date': ''
  });


  const handleChange = name => event => {
    setLocalState({
      ...localState,
      [name]: event.detail.value
    })
  }

  const handleSave = async () => {
    console.table(localState)
    const entriesRef = firestore.collection('users').doc(userId).collection('entries')
    const entryData = {
      'title': localState.title, 
      'description': localState.description, 
      'date': localState.date}
    const entryRef = await entriesRef.add(entryData);
    console.log('saved', entryRef.id)
    history.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime 
              value={localState.date}
              onIonChange={handleChange('date')}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput 
              onIonChange={handleChange('title')}
              value={localState.title}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea 
              onIonChange={handleChange('description')}
              value={localState.description}
            />
          </IonItem>
          <IonButton
            expand="block"
            onClick={handleSave}
          >Save</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
