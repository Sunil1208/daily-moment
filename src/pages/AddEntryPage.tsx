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
  isPlatform,
} from '@ionic/react';
import { CameraResultType, Plugins } from '@capacitor/core';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore , storage } from '../firebase';
const { Camera } = Plugins;

async function savePicture(blobUrl, userId) {
    const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const snapshot =  await pictureRef.put(blob);
    const url = await snapshot.ref.getDownloadURL();
    console.log('savved url', url)
    return url;
}

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [localState, setLocalState] = useState({
    'title': '',
    'description': '',
    'date': '',
    'pictureUrl': '/assets/placeholder.png'
  });
  const fileInputRef = useRef<HTMLInputElement>();

  // Doing the clean up
  useEffect(() => {
    return () => {
      if (localState.pictureUrl.startsWith('blob:')){
        URL.revokeObjectURL(localState.pictureUrl);
      }
    }
  }, [localState.pictureUrl])

  const handleChange = name => event => {
    setLocalState({
      ...localState,
      [name]: event.detail.value
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0){
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      setLocalState({...localState, 'pictureUrl': pictureUrl})
    }
  }

  const handlePictureClick = async () => {
    // fileInputRef.current.click(); // for web
    if (isPlatform('capacitor')){
    // handle if the user click back from the photo or camera app (handling uncaught error)
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
      });
      setLocalState({...localState, 'pictureUrl': photo.webPath})
      console.log('photo:', photo.webPath);
    } catch (error) {
      console.log('Camera error', error)
    }
    } else {
      fileInputRef.current.click();
    }
  }

  const handleSave = async () => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries')
    const entryData = {
      'title': localState.title, 
      'description': localState.description, 
      'date': localState.date,
      'pictureUrl': localState.pictureUrl
    }
    if (!localState.pictureUrl.startsWith('/assets')){
      entryData.pictureUrl = await savePicture(localState.pictureUrl, userId);
    }
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
            <IonLabel position="stacked">Picture</IonLabel>
            <br />
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
              />
            <img 
              src={localState.pictureUrl} 
              alt=""
              //onClick={() => fileInputRef.current.click()}   //works as if clicked on the input file button
              onClick={handlePictureClick}
              style={{cursor: 'pointer'}}
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
