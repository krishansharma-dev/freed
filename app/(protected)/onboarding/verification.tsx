import Ionicons from '@expo/vector-icons/Ionicons';
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
    // Navigate to Professional screen if skipping or no verification selected
    if (selectedMethod === 'skip') {
      router.push('/onboarding/profession');
    }
    // Add logic here for other verification methods if needed
  };

  const handleSkip = () => {
    setSelectedMethod('skip');
    // Immediately navigate to Professional screen
    router.push('/onboarding/profession');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Verify Your Identity</Text>
      <Text style={styles.subtitle}>
        Verification helps build trust in the community. You can verify now or skip and do it later.
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
                color={selectedMethod === method.id ? '#007AFF' : '#666'}
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

            {selectedMethod === method.id && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedMethod && styles.disabledButton]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>
            {selectedMethod === 'skip' ? 'Continue Without Verification' : 'Continue'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  methodsContainer: {
    marginBottom: 20,
  },
  methodCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#fff',
    position: 'relative',
  },
  selectedMethodCard: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f7ff',
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: '#333',
  },
  selectedMethodTitle: {
    color: '#007AFF',
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  footer: {
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VerificationMethodScreen;