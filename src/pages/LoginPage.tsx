import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/react';
import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { AuthContext } from '../auth';


interface Props {
  onLogin: () => void;
}
const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const { loggedIn } = useContext(AuthContext);
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
        <IonButton expand="block" onClick={onLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
