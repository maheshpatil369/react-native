// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../services/AuthContext';
import { useNavigation } from '@react-navigation/native'; // For navigation

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.name || 'Employee'}!</Text>
      <Text style={styles.infoText}>This is your dashboard. You can access various features from the navigation drawer.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.openDrawer()} // Drawer kholne ke liye
      >
        <Text style={styles.buttonText}>Open Drawer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e9ebee', // Light grey-blue background
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#28a745', // Green color
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545', // Red color for logout
    marginTop: 30,
  },
});

export default HomeScreen;
