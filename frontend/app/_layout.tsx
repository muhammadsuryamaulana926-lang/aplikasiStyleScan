import { Stack } from 'expo-router';
import '../global.css';
import { ModalProvider } from '../src/context/ModalContext';
import { AuthProvider } from '../src/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="masuk" />
          <Stack.Screen name="daftar" />
          <Stack.Screen name="lupa_sandi" />
          <Stack.Screen name="beranda" />
          <Stack.Screen name="kamera" />
          <Stack.Screen name="rekomendasi" />
          <Stack.Screen name="hasil" />
          <Stack.Screen name="keranjang" />
          <Stack.Screen name="favorit" />
          <Stack.Screen name="profil" />
        </Stack>
      </ModalProvider>
    </AuthProvider>
  );
}
