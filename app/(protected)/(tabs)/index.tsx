import { CategoryTabs } from '@/components/CategoryTabs';
import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/(auth)/login');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header />
      <CategoryTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});