import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type AreaItem = {
  id: string;
  name: string;
  distance?: string;
};

const Area = () => {
  const navigation = useNavigation();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [areas, setAreas] = useState<AreaItem[]>([]);

  // Mock data - in a real app you would fetch this from an API based on city/pincode
  const mockAreas: AreaItem[] = [
    { id: '1', name: 'Downtown', distance: '2 km away' },
    { id: '2', name: 'Midtown', distance: '3.5 km away' },
    { id: '3', name: 'Uptown', distance: '5 km away' },
    { id: '4', name: 'Westside', distance: '7 km away' },
    { id: '5', name: 'Eastside', distance: '4 km away' },
    { id: '6', name: 'Riverside', distance: '6 km away' },
    { id: '7', name: 'Hillside', distance: '8 km away' },
  ];

  // Simulate API call to fetch areas
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setAreas(mockAreas);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter areas based on search query
  const filteredAreas = areas.filter(area =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (!selectedArea) {
      alert('Please select your area');
      return;
    }
    
    console.log('Selected area:', selectedArea);
     router.push("/onboarding/verification");
  };

  const renderAreaItem = ({ item }: { item: AreaItem }) => (
    <TouchableOpacity
      style={[
        styles.areaItem,
        selectedArea === item.id && styles.selectedAreaItem
      ]}
      onPress={() => setSelectedArea(item.id)}
    >
      <View style={styles.areaInfo}>
        <Text style={styles.areaName}>{item.name}</Text>
        {item.distance && <Text style={styles.areaDistance}>{item.distance}</Text>}
      </View>
      {selectedArea === item.id && (
        <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Area</Text>
      <Text style={styles.subtitle}>Choose the area closest to your location</Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for your area..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Areas List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading areas...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredAreas}
          renderItem={renderAreaItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>No areas found matching your search</Text>
          }
        />
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, !selectedArea && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedArea}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  areaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedAreaItem: {
    backgroundColor: '#e6f2ff',
    borderColor: '#007AFF',
  },
  areaInfo: {
    flex: 1,
  },
  areaName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  areaDistance: {
    fontSize: 14,
    color: '#666',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Area;