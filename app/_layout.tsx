
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Esta es la pantalla de login */}
      <Stack.Screen name="index-0" options={{ title: 'Login', headerShown: false }} />
    </Stack>
  );
}