
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define navigation type for TypeScript
type NavigationProp = {
  navigate: (screen: string) => void;
};

const VerificationMethodScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

  const verificationMethods: {
    id: string;
    title: string;
    description: string;
    icon: IoniconName;
  }[] = [
    {
      id: 'aadhaar',
      title: 'Aadhaar Card Verification',
      description: 'Verify instantly using your Aadhaar details',
      icon: 'card-outline',
    },
    {
      id: 'postal',
      title: 'Postal Verification',
      description: 'We will send a verification code to your postal address',
      icon: 'mail-outline',
    },
  ];

  const handleContinue = () => {
    if (!selectedMethod && selectedMethod !== 'skip') {
      alert('Please select a verification method or choose to skip');
      return;
    }
    console.log('Selected verification method:', selectedMethod);
    // Navigate to Professional screen
    router.push('/onboarding/profession');
  };

  const handleSkip = () => {
    setSelectedMethod('skip');
    // Immediately navigate to Professional screen
    router.push('/onboarding/profession');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Verify Your Identity</Text>
         
        </View>

        {/* Verification Methods */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Verification Method</Text>
          <Text style={styles.cardSubtitle}>
            You can verify now or skip and do it later
          </Text>

          <View style={styles.methodsContainer}>
            {verificationMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  selectedMethod === method.id && styles.selectedMethodCard,
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodHeader}>
                  <Ionicons
                    name={method.icon}
                    size={24}
                    color={selectedMethod === method.id ? '#1877F2' : '#65676B'}
                  />
                  <Text
                    style={[
                      styles.methodTitle,
                      selectedMethod === method.id && styles.selectedMethodTitle,
                    ]}
                  >
                    {method.title}
                  </Text>
                </View>
                <Text style={styles.methodDescription}>{method.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Step 2 of 3</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.nextButton, !selectedMethod && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedMethod}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {selectedMethod === 'skip' ? 'Continue Without Verification' : 'Continue'}
          </Text>
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
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
    paddingTop: 200,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
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
  methodsContainer: {
    gap: 12,
  },
  methodCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E6EA',
    backgroundColor: '#F8F9FA',
  },
  selectedMethodCard: {
    borderColor: '#1877F2',
    backgroundColor: '#E7F3FF',
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    color: '#1C1E21',
  },
  selectedMethodTitle: {
    color: '#1877F2',
    fontWeight: '600',
  },
  methodDescription: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 18,
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
    width: '33%', // Represents Step 2 of 3
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

export default VerificationMethodScreen;