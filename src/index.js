import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import App from './App';


const firebaseConfig = {
    apiKey: "AIzaSyC7mddBaVnvyTfnvq_2NrxGX6pWHF2FtjI",
    authDomain: "phone-e04e2.firebaseapp.com",
    databaseURL: "https://phone-e04e2-default-rtdb.firebaseio.com",
    projectId: "phone-e04e2",
    storageBucket: "phone-e04e2.appspot.com",
    messagingSenderId: "872737046757",
    appId: "1:872737046757:web:db54231860181cb6ec540c",
    measurementId: "G-JEFPFK6TT3"
};


firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
