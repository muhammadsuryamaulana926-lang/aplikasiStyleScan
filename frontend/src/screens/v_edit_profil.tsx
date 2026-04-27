import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CaretLeft, Camera, User, Envelope } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { update_profil } from '../services/api';

export default function VEditProfil() {
  const router = useRouter();
  const { user, login } = useAuth();
  const { showModal } = useModal();

  const [nama, setNama] = useState(user?.nama_pengguna || '');
  const [email, setEmail] = useState(user?.email || '');
  const [foto, setFoto] = useState(user?.foto || null);
  const [loading, setLoading] = useState(false);

  const pilih_foto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      showModal({ title: "Izin Ditolak", message: "Aplikasi butuh izin untuk mengakses galeri foto Anda.", type: 'error' });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const simpan_perubahan = async () => {
    if (!nama || !email) {
      showModal({ title: "Gagal", message: "Nama dan Email tidak boleh kosong.", type: 'error' });
      return;
    }

    setLoading(true);
    try {
      // Catatan: Dalam aplikasi nyata, foto (URI lokal) harus diupload ke server terlebih dahulu.
      // Di sini kita simpan URI-nya langsung ke database (simulasi).
      const res = await update_profil(user!.id_pengguna, {
        nama_pengguna: nama,
        email: email,
        foto: foto || undefined
      });

      if (res?.user) {
        await login(res.user); // Update context & storage
        showModal({ 
          title: "Berhasil!", 
          message: "Profil Anda telah diperbarui.", 
          type: 'success',
          onConfirm: () => router.back()
        });
      }
    } catch (error) {
      showModal({ title: "Error", message: "Gagal memperbarui profil.", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-6 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <CaretLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-black ml-2">Edit Profil</Text>
      </View>

      <View className="flex-1 p-6">
        <View className="items-center mb-10">
          <TouchableOpacity onPress={pilih_foto} className="relative">
            <View className="w-32 h-32 rounded-full bg-gray-100 items-center justify-center overflow-hidden border-4 border-[#0A4D68]/10">
              {foto ? (
                <Image source={{ uri: foto }} className="w-full h-full" resizeMode="cover" />
              ) : (
                <User size={60} color="#CBD5E1" weight="fill" />
              )}
            </View>
            <View className="absolute bottom-0 right-0 bg-[#0A4D68] w-10 h-10 rounded-full items-center justify-center border-4 border-white">
              <Camera size={20} color="white" weight="bold" />
            </View>
          </TouchableOpacity>
          <Text className="mt-4 text-xs font-bold text-[#0A4D68]">KETUK UNTUK UBAH FOTO</Text>
        </View>

        <View className="space-y-6">
          <View>
            <Text className="text-sm font-bold text-gray-500 mb-2 ml-1">Nama Lengkap</Text>
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 border border-gray-100">
              <User size={20} color="#94A3B8" />
              <TextInput 
                className="flex-1 py-4 ml-3 text-black font-medium"
                placeholder="Masukkan nama lengkap"
                value={nama}
                onChangeText={setNama}
              />
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-sm font-bold text-gray-500 mb-2 ml-1">Alamat Email</Text>
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 border border-gray-100">
              <Envelope size={20} color="#94A3B8" />
              <TextInput 
                className="flex-1 py-4 ml-3 text-black font-medium"
                placeholder="Masukkan email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>

        <View className="flex-1" />

        <TouchableOpacity 
          onPress={simpan_perubahan}
          disabled={loading}
          className="bg-[#0A4D68] py-5 rounded-3xl items-center shadow-lg shadow-[#0A4D68]/20"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Simpan Perubahan</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
