// App.js
// Yeh line sabse upar honi chahiye, koi aur import iske upar nahi hona chahiye
// This line must be at the very top, no other imports above it
import 'react-native-gesture-handler';
import React from 'react';
import { AuthProvider, useAuth } from './src/services/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import { ActivityIndicator, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

// Ek simple component jo login hone ke baad dikhega
// A simple component that will be shown after successful login
const LoggedInPlaceholder = () => {
  const { user, logout } = useAuth();
  return (
    <View style={styles.loggedInContainer}>
      <Text style={styles.loggedInText}>Welcome, {user?.email || 'User'}!</Text>
      <Text style={styles.loggedInSubtitle}>You are successfully logged in with Firebase.</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Root component jo authentication state ke aadhar par screens render karta hai
// Root component that renders screens based on authentication state
const RootApp = () => {
  const { authToken, isLoading } = useAuth();

  // Loading state dikhayein jab authentication data load ho raha ho
  // Show loading state while authentication data is being loaded
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading App...</Text>
      </View>
    );
  }

  return (
    // Agar authToken hai, toh LoggedInPlaceholder dikhayein, warna LoginScreen
    // If authToken exists, show LoggedInPlaceholder, otherwise LoginScreen
    authToken ? <LoggedInPlaceholder /> : <LoginScreen />
  );
};

// Main App component jo AuthProvider ko wrap karta hai
// Main App component that wraps AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <RootApp />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  loggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ebee',
    padding: 20,
  },
  loggedInText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  loggedInSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#dc3545', // Red color for logout
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

