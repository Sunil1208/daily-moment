import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvHUAhl8O1lMXQ1ItvWjnE9DRQHNpSSxE",
    authDomain: "daily-moments-451d6.firebaseapp.com",
    projectId: "daily-moments-451d6",
    storageBucket: "daily-moments-451d6.appspot.com",
    messagingSenderId: "966656802985",
    appId: "1:966656802985:web:8071668ab687ac21e869b8",
    measurementId: "G-XGE11L4REJ"
  };

  const app = firebase.default.initializeApp(firebaseConfig)

  export const auth =  app.auth();
  export const firestore = app.firestore();