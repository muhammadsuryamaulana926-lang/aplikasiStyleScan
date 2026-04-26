import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { masuk_akun } from '../services/api';

export default function VMasuk() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if(!email || !password) return Alert.alert("Error", "Mohon isi email dan kata sandi");
    setLoading(true);
    try {
      const data = await masuk_akun(email, password);
      Alert.alert("Berhasil", `Selamat datang kembali!`);
      router.replace('/beranda');
    } catch (error: any) {
      Alert.alert("Gagal Masuk", error.message || "Email atau kata sandi salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500" }} 
      className="flex-1 justify-end"
      resizeMode="cover"
    >
      <View className="absolute top-24 w-full items-center">
        <Text className="text-white text-6xl font-serif tracking-widest mb-3">STYL</Text>
        <Text className="text-white text-xs tracking-widest uppercase font-medium">Shop. Ship. Pay Later.</Text>
      </View>

      <View className="bg-white w-full rounded-t-[50px] px-8 pt-10 pb-10 h-[55%] justify-between">
        <View>
          <View className="mb-6">
            <Text className="text-xs font-bold text-black mb-1">E-mail</Text>
            <TextInput 
              placeholder="Alamat e-mail Anda" 
              placeholderTextColor="#A1A1AA" 
              className="border-b border-gray-300 py-2 text-base text-black"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View className="mb-2">
            <Text className="text-xs font-bold text-black mb-1">Kata Sandi</Text>
            <TextInput 
              placeholder="Kata sandi Anda" 
              placeholderTextColor="#A1A1AA" 
              secureTextEntry 
              className="border-b border-gray-300 py-2 text-base text-black"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity onPress={() => router.push('/lupa_sandi')} className="items-end mb-8">
            <Text className="text-xs text-black underline font-bold">Lupa Kata Sandi?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} disabled={loading} className="w-full h-14 overflow-hidden items-center justify-center bg-black rounded-sm shadow-md active:opacity-80">
            <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500" }} className="absolute w-full h-full opacity-40" />
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white font-bold text-base relative z-10">Masuk</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <Text className="text-xs text-black">Belum memiliki akun? </Text>
          <TouchableOpacity onPress={() => router.push('/daftar')}>
            <Text className="text-xs text-black underline font-bold">Buat Akun Baru</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
