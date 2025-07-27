// src/services/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  REACT_NATIVE_API_KEY,
  REACT_NATIVE_AUTH_DOMAIN,
  REACT_NATIVE_PROJECT_ID,
  REACT_NATIVE_STORAGE_BUCKET,
  REACT_NATIVE_MESSAGING_SENDER_ID,
  REACT_NATIVE_APP_ID,
  REACT_NATIVE_MEASUREMENT_ID,
  REACT_NATIVE_DATABASE_URL
} from '@env';

// =================================================================
// DEBUGGING: Check if the API_KEY is loaded.
if (!REACT_NATIVE_API_KEY) {
  throw new Error("FIREBASE_API_KEY is not defined. Please check your .env file and babel.config.js setup.");
}
console.log('Firebase API Key loaded successfully.');
// =================================================================

const firebaseConfig = {
  apiKey: REACT_NATIVE_API_KEY,
  authDomain: REACT_NATIVE_AUTH_DOMAIN,
  projectId: REACT_NATIVE_PROJECT_ID,
  storageBucket: REACT_NATIVE_STORAGE_BUCKET,
  messagingSenderId: REACT_NATIVE_MESSAGING_SENDER_ID,
  appId: REACT_NATIVE_APP_ID,
  measurementId: REACT_NATIVE_MEASUREMENT_ID,
  databaseURL: REACT_NATIVE_DATABASE_URL
};

// ✅ Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let auth;

// ✅ Reliable Platform-specific Auth initialization using try...catch
try {
  // This function only works on React Native.
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // When the above code fails on the web, we fall back to this.
  console.log("Running on web, initializing auth for web.");
  auth = getAuth(app);
}

export { auth };
