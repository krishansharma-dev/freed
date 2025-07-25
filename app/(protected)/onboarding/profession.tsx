import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Professional = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('developer');
  const [entries, setEntries] = useState<{ id: string; value: string; category: string }[]>([]);

  // Sample categories for the dropdown
  const categories = [
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Manager', value: 'manager' },
    { label: 'Analyst', value: 'analyst' },
    { label: 'Other', value: 'other' },
  ];

  const handleAddEntry = () => {
    if (!inputValue.trim()) {
      alert('Please enter a valid input');
      return;
    }

    const newEntry = {
      id: Math.random().toString(), // Simple ID generation
      value: inputValue,
      category: selectedCategory,
    };

    setEntries([...entries, newEntry]);
    setInputValue(''); // Clear input after adding
  };

  const handleNext = () => {
    // Optionally save entries to context or storage before navigating
    router.push('/(protected)/(tabs)');
  };

  const renderEntry = ({ item }: { item: { id: string; value: string; category: string } }) => (
    <View style={styles.entryItem}>
      <Text style={styles.entryText}>
        {item.value} ({item.category})
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Professional Profile</Text>
      <Text style={styles.subtitle}>Add your skills or qualifications</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Enter skill or qualification"
          placeholderTextColor="#999"
        />

        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((category) => (
            <Picker.Item
              key={category.value}
              label={category.label}
              value={category.value}
            />
          ))}
        </Picker>

        <TouchableOpacity style={styles.addButton} onPress={handleAddEntry}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        style={styles.entryList}
        ListEmptyComponent={<Text style={styles.emptyText}>No entries added yet</Text>}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  entryList: {
    flex: 1,
  },
  entryItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  entryText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Professional;