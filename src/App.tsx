import {
  IonApp, IonLoading
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AppTabs from './AppTabs';
import { AuthContext } from './auth';
import { auth } from './firebase';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';



const App: React.FC = () => {
  const [authState, setAuthState] = useState({loading: true, loggedIn: false});
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthState({loading: false, loggedIn: Boolean(user)})
      console.log('onAuthStateChanged', user)
    });
  }, []);

  console.log(`Rendering App with authState: `, authState)
  if (authState.loading){
    return <IonLoading isOpen />
  }
  return (
    <IonApp>
      <AuthContext.Provider value={{loggedIn: authState.loggedIn}}>
        <IonReactRouter>
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route path="/my">
                <AppTabs />
              </Route>
              <Redirect exact path="/" to="/my/entries" />
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
