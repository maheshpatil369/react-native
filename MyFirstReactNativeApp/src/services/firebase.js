// src/services/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Your Firebase project configuration (from your .env details)
const firebaseConfig = {
  apiKey: "AIzaSyDI5UR31WmPpc_GVY2M6dju4JkehZI4y4o",
  authDomain: "employe-2dbf9.firebaseapp.com",
  projectId: "employe-2dbf9",
  storageBucket: "employe-2dbf9.firebasestorage.app",
  messagingSenderId: "353380325588",
  appId: "1:353380325588:web:15205d5382c647c0358341",
  measurementId: "G-67FXJHYM35",
  databaseURL: "https://employe-2dbf9-default-rtdb.firebaseio.com"
};

// ✅ Initialize Firebase App (only once)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // use existing instance if already initialized
}

// ✅ Initialize Firebase Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// 🔹 If you also need Firestore, uncomment these lines
// import { getFirestore } from 'firebase/firestore';
// export const firestore = getFirestore(app);
