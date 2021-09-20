import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4kxRSj58uzLwIEuitnyxjWqMClrgmphs",
  authDomain: "tic-tac-toe-97573.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-97573-default-rtdb.firebaseio.com",
  projectId: "tic-tac-toe-97573",
  storageBucket: "tic-tac-toe-97573.appspot.com",
  messagingSenderId: "192428586255",
  appId: "1:192428586255:web:2934ab431da7ced95aba7a",
  measurementId: "G-490WQ1ZPEJ",
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
