import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

const ProfileOnboardingScreen = () => {
  const navigation = useNavigation();
  const [gender, setGender] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

   const handleNext = () => {
    // Save name to context or storage if needed
    router.push("/onboarding/community");
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      
      {/* Gender Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Gender</Text>
        <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
          <View style={styles.radioContainer}>
            <View style={styles.radioOption}>
              <RadioButton value="male" />
              <Text style={styles.radioLabel}>Male</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="female" />
              <Text style={styles.radioLabel}>Female</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="other" />
              <Text style={styles.radioLabel}>Other</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>

      {/* Date of Birth */}
      <View style={styles.section}>
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity 
          style={styles.dateInput} 
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{formatDate(dateOfBirth)}</Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={[styles.nextButton, (!gender) && styles.disabledButton]} 
        onPress={handleNext}
        disabled={!gender}
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
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
  },
  dateText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
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

export default ProfileOnboardingScreen;