import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CommunityOnboardingScreen = () => {
  const navigation = useNavigation();
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  
  // Sample data - in a real app you might fetch this from an API
  const countries = ['United States', 'India', 'Canada', 'United Kingdom', 'Australia'];
  const statesByCountry: Record<string, string[]> = {
    'United States': ['California', 'Texas', 'New York', 'Florida'],
    'India': ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
  };

  const handleNext = () => {
    // Validate and save data
    if (!country || !state || !city || !pincode) {
      alert('Please fill all fields');
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Community Information</Text>
      
      {/* Country Picker */}
      <View style={styles.section}>
        <Text style={styles.label}>Country</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => {
              setCountry(itemValue);
              setState(''); // Reset state when country changes
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select your country" value="" />
            {countries.map((countryName) => (
              <Picker.Item key={countryName} label={countryName} value={countryName} />
            ))}
          </Picker>
        </View>
      </View>

      {/* State Picker */}
      <View style={styles.section}>
        <Text style={styles.label}>State/Province</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={state}
            onValueChange={(itemValue) => setState(itemValue)}
            style={styles.picker}
            enabled={!!country}
          >
            <Picker.Item label={country ? "Select your state" : "Select country first"} value="" />
            {country && statesByCountry[country]?.map((stateName) => (
              <Picker.Item key={stateName} label={stateName} value={stateName} />
            ))}
          </Picker>
        </View>
      </View>

      {/* City Input */}
      <View style={styles.section}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your city"
          value={city}
          onChangeText={setCity}
          editable={!!state}
        />
      </View>

      {/* Pincode Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Pincode/Zipcode</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
          maxLength={10}
          editable={!!city}
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={[
          styles.nextButton, 
          (!country || !state || !city || !pincode) && styles.disabledButton
        ]} 
        onPress={handleNext}
        disabled={!country || !state || !city || !pincode}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
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

export default CommunityOnboardingScreen;