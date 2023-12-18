import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBJKaEcnHs9jCFJss330XBeZGQ-ZFJsdA0",
    authDomain: "tmdt-7eae5.firebaseapp.com",
    databaseURL: "https://tmdt-7eae5-default-rtdb.firebaseio.com",
    projectId: "tmdt-7eae5",
    storageBucket: "tmdt-7eae5.appspot.com",
    messagingSenderId: "164647694244",
    appId: "1:164647694244:web:9c3147c5416100639f1b31",
    measurementId: "G-K4JJ9P9D4G"
};

export const init = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app;

export const SF = firebase.storage();

export default firebase;
