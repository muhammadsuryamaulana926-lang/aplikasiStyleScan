import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="daftar" />
      <Stack.Screen name="lupa_sandi" />
      <Stack.Screen name="beranda" />
      <Stack.Screen name="kamera" />
      <Stack.Screen name="hasil" />
      <Stack.Screen name="tersimpan" />
    </Stack>
  );
}
