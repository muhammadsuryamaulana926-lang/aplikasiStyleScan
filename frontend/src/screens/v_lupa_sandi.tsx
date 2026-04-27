import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useModal } from '../context/ModalContext';

export default function VLupaSandi() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const { showModal } = useModal();

  const handleReset = () => {
    if(!email) return showModal({ title: "Perhatian", message: "Mohon isi e-mail Anda", type: 'info' });
    showModal({ title: "Terkirim", message: "Tautan atur ulang kata sandi telah dikirim ke e-mail Anda.", type: 'success', onConfirm: () => router.back() });
  };

  return (
    <ImageBackground 
      source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500" }} 
      className="flex-1 justify-end"
      resizeMode="cover"
    >
      <View className="absolute top-24 w-full items-center">
        <Text className="text-white text-6xl font-serif tracking-widest mb-3">STYL</Text>
        <Text className="text-white text-xs tracking-widest uppercase font-medium">Atur Ulang Sandi</Text>
      </View>

      <View className="bg-white w-full rounded-t-[50px] px-8 pt-10 pb-16 h-[50%] justify-between">
        <View>
          <Text className="text-sm text-gray-500 mb-6 leading-relaxed">
            Masukkan alamat e-mail yang terdaftar pada akun Anda. Kami akan mengirimkan instruksi untuk mengatur ulang kata sandi.
          </Text>

          <View className="mb-10">
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

          <TouchableOpacity onPress={handleReset} className="w-full h-14 overflow-hidden items-center justify-center bg-black rounded-sm shadow-md active:opacity-80">
            <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500" }} className="absolute w-full h-full opacity-40" />
            <Text className="text-white font-bold text-base relative z-10">Kirim Tautan</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.back()} className="items-center mt-auto">
          <Text className="text-xs text-black underline font-bold">Kembali ke halaman Masuk</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
