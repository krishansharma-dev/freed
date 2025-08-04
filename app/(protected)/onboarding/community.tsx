import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CommunityOnboardingScreen = () => {
  const navigation = useNavigation();
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  
  // Sample data - in a real app you might fetch this from an API
  const countries = ['United States', 'India', 'Canada', 'United Kingdom', 'Australia'];
  const statesByCountry: Record<string, string[]> = {
    'United States': ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania'],
    'India': ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia'],
  };

  const handleNext = () => {
    // Validate and save data
    if (!country || !state || !city || !pincode) {
      Alert.alert('Incomplete Information', 'Please fill all fields to continue');
      return;
    }
    
    console.log({
      country,
      state,
      city,
      pincode,
    });
    
    router.push("/onboarding/area");
  };

  const isFormValid = country && state && city && pincode;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Where are you located?</Text>
        </View>

        {/* Location Form Card */}
        <View style={styles.card}>
          
          {/* Country Picker */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Country</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={country}
                onValueChange={(itemValue) => {
                  setCountry(itemValue);
                  setState(''); // Reset state when country changes
                }}
                style={styles.picker}
              >
                <Picker.Item 
                  label="Select your country" 
                  value="" 
                  color="#65676B"
                />
                {countries.map((countryName) => (
                  <Picker.Item 
                    key={countryName} 
                    label={countryName} 
                    value={countryName}
                    color="#1C1E21"
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* State Picker */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>State/Province</Text>
            <View style={[
              styles.pickerContainer, 
              !country && styles.disabledContainer
            ]}>
              <Picker
                selectedValue={state}
                onValueChange={(itemValue) => setState(itemValue)}
                style={styles.picker}
                enabled={!!country}
              >
                <Picker.Item 
                  label={country ? "Select your state" : "Select country first"} 
                  value="" 
                  color="#65676B"
                />
                {country && statesByCountry[country]?.map((stateName) => (
                  <Picker.Item 
                    key={stateName} 
                    label={stateName} 
                    value={stateName}
                    color="#1C1E21"
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* City Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={[
                styles.input,
                !state && styles.disabledInput
              ]}
              placeholder="Enter your city"
              placeholderTextColor="#65676B"
              value={city}
              onChangeText={setCity}
              editable={!!state}
            />
          </View>

          {/* Pincode Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Pincode/Zipcode</Text>
            <TextInput
              style={[
                styles.input,
                !city && styles.disabledInput
              ]}
              placeholder="Enter your pincode"
              placeholderTextColor="#65676B"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="number-pad"
              maxLength={10}
              editable={!!city}
            />
          </View>
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <Text style={styles.privacyText}>
            🔒 Your location information is used to show you relevant content and will be kept private
          </Text>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Step 3 of 3</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={[styles.nextButton, !isFormValid && styles.disabledButton]} 
          onPress={handleNext}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity style={styles.skipButton} onPress={() => router.push("/onboarding/area")}>
          <Text style={styles.skipText}>Skip location setup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  content: {
    padding: 20,
    paddingTop: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
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
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#65676B',
    marginBottom: 20,
    lineHeight: 18,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1.5,
    borderColor: '#E4E6EA',
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    overflow: 'hidden',
  },
  disabledContainer: {
    backgroundColor: '#F0F2F5',
    borderColor: '#E4E6EA',
    opacity: 0.6,
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#1C1E21',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E4E6EA',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    color: '#1C1E21',
  },
  disabledInput: {
    backgroundColor: '#F0F2F5',
    borderColor: '#E4E6EA',
    color: '#65676B',
    opacity: 0.6,
  },
  privacyNotice: {
    backgroundColor: '#E7F3FF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#1877F2',
  },
  privacyText: {
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 18,
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
    width: '100%',
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
    marginTop: 8,
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

export default CommunityOnboardingScreen;