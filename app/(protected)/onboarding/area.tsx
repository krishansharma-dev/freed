import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type AreaItem = {
  id: string;
  name: string;
  distance?: string;
  type?: string;
};

const Area = () => {
  const navigation = useNavigation();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [areas, setAreas] = useState<AreaItem[]>([]);

  // Enhanced mock data - in a real app you would fetch this from an API based on city/pincode
  const mockAreas: AreaItem[] = [
    { id: '1', name: 'Downtown District', distance: '2.1 km away', type: 'Business District' },
    { id: '2', name: 'Midtown Plaza', distance: '3.5 km away', type: 'Shopping Area' },
    { id: '3', name: 'Uptown Heights', distance: '5.2 km away', type: 'Residential' },
    { id: '4', name: 'Westside Gardens', distance: '7.1 km away', type: 'Residential' },
    { id: '5', name: 'Eastside Market', distance: '4.3 km away', type: 'Commercial' },
    { id: '6', name: 'Riverside Park', distance: '6.8 km away', type: 'Recreation' },
    { id: '7', name: 'Hillside Village', distance: '8.5 km away', type: 'Suburban' },
    { id: '8', name: 'Central Station', distance: '1.8 km away', type: 'Transport Hub' },
  ];

  // Simulate API call to fetch areas
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setAreas(mockAreas);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Filter areas based on search query
  const filteredAreas = areas.filter(area =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (!selectedArea) {
      Alert.alert('Area Required', 'Please select your area to continue');
      return;
    }
    
    const selectedAreaData = areas.find(area => area.id === selectedArea);
    console.log('Selected area:', selectedAreaData);
    router.push("/onboarding/verification");
  };

  const renderAreaItem = ({ item }: { item: AreaItem }) => (
    <TouchableOpacity
      style={[
        styles.areaItem,
        selectedArea === item.id && styles.selectedAreaItem
      ]}
      onPress={() => setSelectedArea(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.areaContent}>
        <View style={styles.areaIcon}>
          <Ionicons 
            name="location" 
            size={20} 
            color={selectedArea === item.id ? '#1877F2' : '#65676B'} 
          />
        </View>
        <View style={styles.areaInfo}>
          <Text style={[
            styles.areaName,
            selectedArea === item.id && styles.selectedAreaName
          ]}>
            {item.name}
          </Text>
          <View style={styles.areaDetails}>
            {item.type && (
              <Text style={styles.areaType}>{item.type}</Text>
            )}
            {item.distance && (
              <Text style={styles.areaDistance}>• {item.distance}</Text>
            )}
          </View>
        </View>
        <View style={styles.selectionIndicator}>
          {selectedArea === item.id ? (
            <Ionicons name="checkmark-circle" size={24} color="#1877F2" />
          ) : (
            <View style={styles.unselectedCircle} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const LoadingComponent = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#1877F2" />
      <Text style={styles.loadingText}>Finding areas near you...</Text>
      <Text style={styles.loadingSubtext}>This may take a few moments</Text>
    </View>
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={48} color="#E4E6EA" />
      <Text style={styles.noResultsText}>No areas found</Text>
      <Text style={styles.noResultsSubtext}>Try adjusting your search terms</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose your neighborhood</Text>
         
        </View>

        {/* Search Bar */}
        <View style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#65676B" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search neighborhoods..."
              placeholderTextColor="#65676B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={20} color="#65676B" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Areas List */}
        <View style={styles.listCard}>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <FlatList
              data={filteredAreas}
              renderItem={renderAreaItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={<EmptyComponent />}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.progressText}>Almost done!</Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.nextButton, !selectedArea && styles.disabledButton]}
            onPress={handleNext}
            disabled={!selectedArea || isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {isLoading ? 'Loading...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          {/* Skip Option */}
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={() => router.push("/onboarding/verification")}
          >
            <Text style={styles.skipText}>Skip area selection</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1E21',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#65676B',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1E21',
  },
  clearButton: {
    padding: 4,
  },
  listCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
  },
  loadingSubtext: {
    marginTop: 4,
    fontSize: 14,
    color: '#65676B',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
  },
  noResultsSubtext: {
    marginTop: 4,
    fontSize: 14,
    color: '#65676B',
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    padding: 16,
  },
  areaItem: {
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    marginVertical: 4,
  },
  selectedAreaItem: {
    backgroundColor: '#E7F3FF',
    borderWidth: 2,
    borderColor: '#1877F2',
  },
  areaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  areaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  areaInfo: {
    flex: 1,
  },
  areaName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 4,
  },
  selectedAreaName: {
    color: '#1877F2',
  },
  areaDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaType: {
    fontSize: 14,
    color: '#65676B',
    fontWeight: '500',
  },
  areaDistance: {
    fontSize: 14,
    color: '#65676B',
    marginLeft: 4,
  },
  selectionIndicator: {
    marginLeft: 12,
  },
  unselectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E4E6EA',
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E6EA',
    marginHorizontal: 16,
  },
  bottomSection: {
    marginTop: 20,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E4E6EA',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    width: '90%',
    height: '100%',
    backgroundColor: '#1877F2',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#65676B',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#1877F2',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#1877F2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#E4E6EA',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  skipText: {
    color: '#1877F2',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Area;