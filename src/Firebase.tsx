import React from "react";
import firebase from "firebase"
// "site": "am-records",
// firebase deploy --only hosting:am-records
const firebaseConfig = {
    apiKey: "AIzaSyDxSz26PluwumYFV4F_zxfFHKnq3e-8-NQ",
    authDomain: "eprms-3f623.firebaseapp.com",
    projectId: "eprms-3f623",
    storageBucket: "eprms-3f623.appspot.com",
    messagingSenderId: "837255986851",
    appId: "1:837255986851:web:b22c7c0dd700e971290916",
    measurementId: "G-Q98VDS20ZF"
  };


let app = firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();
let storage = firebase.storage();
let auth = firebase.auth();

export {app, firestore, storage, auth}
