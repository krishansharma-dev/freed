import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    // Save profile data to context or storage if needed
    router.push("/onboarding/community");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
        
        </View>

        {/* Gender Selection Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Gender</Text>
          <Text style={styles.cardSubtitle}>This helps us show you more relevant content</Text>
          
          <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
            <View style={styles.radioContainer}>
              <TouchableOpacity 
                style={[styles.radioOption, gender === 'female' && styles.selectedOption]}
                onPress={() => setGender('female')}
              >
                <RadioButton 
                  value="female" 
                  color="#1877F2"
                  uncheckedColor="#65676B"
                />
                <Text style={[styles.radioLabel, gender === 'female' && styles.selectedLabel]}>
                  Female
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.radioOption, gender === 'male' && styles.selectedOption]}
                onPress={() => setGender('male')}
              >
                <RadioButton 
                  value="male" 
                  color="#1877F2"
                  uncheckedColor="#65676B"
                />
                <Text style={[styles.radioLabel, gender === 'male' && styles.selectedLabel]}>
                  Male
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.radioOption, gender === 'other' && styles.selectedOption]}
                onPress={() => setGender('other')}
              >
                <RadioButton 
                  value="other" 
                  color="#1877F2"
                  uncheckedColor="#65676B"
                />
                <Text style={[styles.radioLabel, gender === 'other' && styles.selectedLabel]}>
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </RadioButton.Group>
        </View>

        {/* Date of Birth Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Birthday</Text>
          <Text style={styles.cardSubtitle}>This won't be shown publicly</Text>
          
          <TouchableOpacity 
            style={styles.dateInput} 
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.dateText}>{formatDate(dateOfBirth)}</Text>
            <Text style={styles.dateIcon}>📅</Text>
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

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Step 1 of 3</Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          style={[styles.nextButton, (!gender) && styles.disabledButton]} 
          onPress={handleNext}
          disabled={!gender}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity style={styles.skipButton} onPress={handleNext}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
    marginBottom: 16,
    lineHeight: 18,
  },
  radioContainer: {
    gap: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E6EA',
    backgroundColor: '#F8F9FA',
  },
  selectedOption: {
    borderColor: '#1877F2',
    backgroundColor: '#E7F3FF',
  },
  radioLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: '#1C1E21',
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#1877F2',
    fontWeight: '600',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E4E6EA',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  dateText: {
    fontSize: 16,
    color: '#1C1E21',
    fontWeight: '500',
  },
  dateIcon: {
    fontSize: 20,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E4E6EA',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    width: '66%',
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

export default ProfileOnboardingScreen;