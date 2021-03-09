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

interface Props {
  onLogin: () => void;
}
const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    errorMessage: ''
  })

  const handleLogin = async () => {
    console.log('should login with', {email, password})
    try {
      // "test1@example.org", "123456"
      setStatus({...status, loading: true, error: false});
      const credential = await auth.signInWithEmailAndPassword(email, password)
      console.log('credential', credential);
      setStatus({...status, loading: false, error: false});
      onLogin();
    } catch (error) {
      console.log('error', error)
      setStatus({...status, loading: false, error: true, errorMessage: error.message});
      let timer = setTimeout(() => {
        setStatus({...status, loading: false, error: false, errorMessage: ''});
      }, 5000);
      clearTimeout(timer);
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
