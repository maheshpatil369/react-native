// src/services/api.js
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Agar aap ab bhi backend API ka upyog data operations ke liye karna chahte hain,
// toh is URL ko sahi rakhein. Login ke liye ab yeh use nahi hoga.
// If you still want to use the backend API for data operations,
// keep this URL correct. It will no longer be used for login.
const API_BASE_URL = 'http://192.168.1.35:8000/api/v1'; // Yahan apna IP address badlein

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor jo har request mein auth token add karta hai.
// Request interceptor that adds the auth token to every request.
api.interceptors.request.use(
  async (config) => {
    // Ab auth token Firebase se nahi, balki AsyncStorage se aayega
    // Now auth token will come from AsyncStorage, not directly from Firebase
    const token = await AsyncStorage.getItem('authToken'); // Ya Firebase user se token lein: await auth.currentUser?.getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor jo errors ko handle karta hai.
// Response interceptor that handles errors.
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
    Alert.alert('Error', errorMessage);
    return Promise.reject(error);
  }
);

export default api;

