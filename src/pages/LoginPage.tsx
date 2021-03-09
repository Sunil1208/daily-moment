import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonLoading
} from '@ionic/react';
import React,  { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase'

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    errorMessage: ''
  })

  const handleLogin = async () => {
    try {
      // "test1@example.org", "123456"
      setStatus({...status, loading: true, error: false});
      const credential = await auth.signInWithEmailAndPassword(email, password)
      console.log('credential', credential);
      setStatus({...status, loading: false, error: false});
    } catch (error) {
      console.log('error', error)
      setStatus({...status, loading: false, error: true, errorMessage: error.message});
    }
    
  }
  if(loggedIn){
    return <Redirect to="/my/entries" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput 
              type="email" 
              onIonChange={e => {setEmail(e.detail.value)}}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput 
              type="password"
              onIonChange={e => {setPassword(e.detail.value)}}
            />
          </IonItem>
        </IonList>
        {status.error && (
          <IonText color="danger" >{status.errorMessage} &nbsp;</IonText>
        )}
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
