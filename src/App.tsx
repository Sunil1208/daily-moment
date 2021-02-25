import {
  IonApp
} from '@ionic/react';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';



const App: React.FC = () => {
  return (
    <IonApp>
      <BrowserRouter>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/settings">
          <SettingsPage />
        </Route>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
