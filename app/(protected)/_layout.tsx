
import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen name="onboarding/profile" options={{ title: "Profile" }} />
      <Stack.Screen name ="onboarding/community" options={{ title: "Community Information" }} />
      <Stack.Screen name="onboarding/area" options={{ title: "Select Area" }} />
      <Stack.Screen name="onboarding/verification" options={{ title: "Verification" }} />

  
      {/* Other screens will be auto-included */}
    </Stack>
  );
}