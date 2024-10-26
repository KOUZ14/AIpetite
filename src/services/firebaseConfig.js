// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyZ1gmf-J4QACdis_KNXFrrb1xdl_G9CM",
  authDomain: "aipetite.firebaseapp.com",
  projectId: "aipetite",
  storageBucket: "aipetite.appspot.com",
  messagingSenderId: "224433331050",
  appId: "1:224433331050:web:86e1ab120528b1e920a313",
  measurementId: "G-D4BJ4SCD69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Analytics if supported
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { app, auth, analytics }; // Export auth for use in your app
