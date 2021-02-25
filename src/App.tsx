import {
  IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';


const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`Rendering App with loggedIn=${loggedIn}`)
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
          <Route exact path="/login">
              <LoginPage 
                loggedIn={loggedIn}
                onLogin={() => setLoggedIn(true)}
              />
            </Route>
            <Route exact path="/home">
              <HomePage />
              {loggedIn ? <HomePage /> : <Redirect to="/login"/>}
            </Route>
            <Route exact path="/settings">
              <SettingsPage />
            </Route>
            <Route exact path="/entries/:entryId">
              <EntryPage />
            </Route>
            <Redirect exact path="/" to="/home" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={homeIcon} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settingsIcon} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
