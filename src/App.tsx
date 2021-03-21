import {
  getPlatforms,
  IonApp, IonLoading
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AppTabs from './AppTabs';
import { AuthContext, useAuthInit } from './auth';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/SignUpPage';



const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  console.log(`Rendering App with auth: `, auth)
  if (loading){
    return <IonLoading isOpen />
  }

  console.log('platforms', getPlatforms())
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/signup">
                <SignUpPage />
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
