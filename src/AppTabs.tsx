import {
   IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './auth';
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth()
  if(!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/my/entries">
            <HomePage />
          </Route>
          <Route exact path="/my/settings">
            <SettingsPage />
          </Route>
          <Route exact path="/my/entries/:entryId">
            <EntryPage />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/my/entries">
            <IonIcon icon={homeIcon} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/my/settings">
            <IonIcon icon={settingsIcon} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default AppTabs;
