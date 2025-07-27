// src/screens/DataManagementScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

const DataManagementScreen = () => {
  const { authToken } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Data fetch karne ka function
  // Function to fetch data
  const fetchData = async () => {
    if (!authToken) {
      setLoading(false);
      return;
    }
    try {
      // Example: Backend se data fetch karein.
      // Kripya apne backend ke sahi endpoint ko use karein.
      // Example: Fetch data from the backend.
      // Please use your backend's correct endpoint.
      const response = await api.get('/data/user-assigned-data'); // Yeh ek example endpoint hai
      setData(response.data.data || []); // Assuming response.data.data is an array
    } catch (error) {
      console.error('Failed to fetch data:', error);
      Alert.alert('Error', 'Failed to load data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authToken]); // Auth token badalne par data refetch karein

  // Pull-to-refresh functionality
  // Pull-to-refresh functionality
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading Data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Assigned Data</Text>
      {data.length === 0 ? (
        <Text style={styles.emptyText}>No data assigned yet.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item._id || index.toString()} // Assuming _id exists or use index
          renderItem={({ item }) => (
            <View style={styles.dataItem}>
              <Text style={styles.itemTitle}>{item.title || 'No Title'}</Text>
              <Text style={styles.itemDetail}>Status: {item.status || 'N/A'}</Text>
              <Text style={styles.itemDetail}>Location: {item.location || 'N/A'}</Text>
              {/* Aur details yahan add karein */}
              {/* Add more details here */}
              <TouchableOpacity style={styles.completeButton}>
                <Text style={styles.completeButtonText}>Mark Complete</Text>
              </TouchableOpacity>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f9fa', // Light background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
  dataItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 3,
  },
  completeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DataManagementScreen;
