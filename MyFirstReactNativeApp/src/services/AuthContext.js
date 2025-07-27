// src/services/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { auth } from './firebase'; // Firebase Auth instance import karein
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'; // Modular Firebase Auth functions import karein

// AuthContext banayein
// Create AuthContext
const AuthContext = createContext(null);

// AuthProvider component jo authentication state provide karta hai
// AuthProvider component that provides authentication state
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null); // Firebase User object
  const [isLoading, setIsLoading] = useState(true);

  // Firebase Auth state changes ko listen karein
  // Listen for Firebase Auth state changes
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User logged in
        const token = await firebaseUser.getIdToken();
        setAuthToken(token);
        setUser(firebaseUser); // Firebase user object store karein
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(firebaseUser.toJSON())); // User data ko JSON stringify karein
      } else {
        // User logged out
        setAuthToken(null);
        setUser(null);
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user');
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    // Unmount par subscription ko saaf karein
    return subscriber;
  }, []);

  // Login function (Firebase se seedhe login)
  // Login function (direct login with Firebase)
  const login = async (email, password) => {
    setIsLoading(true); // Login process ke dauran loading dikhayein
    try {
      const response = await signInWithEmailAndPassword(auth, email, password); // auth instance ko pehle argument ke roop mein pass karein
      // onAuthStateChanged listener automatically state update karega
      // onAuthStateChanged listener will automatically update the state
      return response.user;
    } catch (error) {
      console.error('Firebase Login Error:', error.code, error.message);
      let errorMessage = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      }
      Alert.alert('Login Failed', errorMessage);
      throw error; // Error ko re-throw karein taaki calling component use handle kar sake
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function (Firebase se seedhe logout)
  // Logout function (direct logout with Firebase)
  const logout = async () => {
    try {
      await signOut(auth); // auth instance ko pehle argument ke roop mein pass karein
      // onAuthStateChanged listener automatically state update karega
      // onAuthStateChanged listener will automatically update the state
    } catch (error) {
      console.error('Firebase Logout Error:', error);
      Alert.alert('Logout Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook AuthContext ka upyog karne ke liye
// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

