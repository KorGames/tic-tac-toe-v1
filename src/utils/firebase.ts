// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
//@ts-expect-error
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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

const firebase_app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(firebase_app);
const firebase_firestore = getFirestore(firebase_app);
const firebase_auth = initializeAuth(firebase_app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { firebase_firestore, firebase_auth };
