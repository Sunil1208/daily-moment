import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';

interface Props {
  loggedIn: boolean;
  onLogin: () => void;
}
const LoginPage: React.FC<Props> = ({ loggedIn, onLogin }) => {
  if(loggedIn){
    return <Redirect to="/home" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={onLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
