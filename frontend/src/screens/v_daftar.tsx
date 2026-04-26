import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function VDaftar() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [kodePos, setKodePos] = useState('');

  const handleRegister = () => {
    if(!email || !password || !kodePos) return Alert.alert("Error", "Mohon isi semua bidang (E-mail, Sandi, Kode Pos)");
    router.push('/beranda');
  };

  return (
    <ImageBackground 
      source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500" }} 
      className="flex-1 justify-end"
      resizeMode="cover"
    >
      <View className="absolute top-24 w-full items-center">
        <Text className="text-white text-6xl font-serif tracking-widest mb-3">STYL</Text>
        <Text className="text-white text-xs tracking-widest uppercase font-medium">Buat Akun Baru</Text>
      </View>

      <View className="bg-white w-full rounded-t-[50px] px-8 pt-10 pb-10 h-[75%] justify-between">
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
          <View className="mb-6">
            <Text className="text-xs font-bold text-black mb-1">Kata Sandi Baru</Text>
            <TextInput 
              placeholder="Masukkan kata sandi baru" 
              placeholderTextColor="#A1A1AA" 
              secureTextEntry 
              className="border-b border-gray-300 py-2 text-base text-black"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View className="mb-8">
            <Text className="text-xs font-bold text-black mb-1">Kode Pos</Text>
            <TextInput 
              placeholder="Ketik kode pos" 
              placeholderTextColor="#A1A1AA" 
              className="border-b border-gray-300 py-2 text-base text-black"
              value={kodePos}
              onChangeText={setKodePos}
              keyboardType="number-pad"
            />
          </View>

          <View className="flex-row items-center mb-8">
            <View className="w-4 h-4 border-2 border-black mr-2 items-center justify-center">
              {/* Checkbox Icon Mock */}
            </View>
            <Text className="text-xs text-black underline font-bold">Syarat & Ketentuan Layanan</Text>
          </View>

          <TouchableOpacity onPress={handleRegister} className="w-full h-14 overflow-hidden items-center justify-center bg-black rounded-sm shadow-md active:opacity-80">
            <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500" }} className="absolute w-full h-full opacity-40" />
            <Text className="text-white font-bold text-base relative z-10">Daftar Akun</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <Text className="text-xs text-black">Sudah memiliki akun? </Text>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text className="text-xs text-black underline font-bold">Masuk di sini</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
