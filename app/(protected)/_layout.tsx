import { Stack } from "expo-router";
import React from "react";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
     <Stack.Screen name="/(tabs)" />
      {/* <Stack.Screen name="onboarding/profile" />
      <Stack.Screen name="onboarding/community" />
      <Stack.Screen name="onboarding/area" />
      <Stack.Screen name="onboarding/verification" /> */}
      
      {/* Other screens will be auto-included */}
    </Stack>
  );
}
