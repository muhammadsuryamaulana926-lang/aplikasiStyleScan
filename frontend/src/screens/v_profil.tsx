import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SignOut, Gear, Bell, ShieldCheck, CaretRight, PencilSimple } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import LUtama from '../layouts/l_utama';
import { useModal } from '../context/ModalContext';
import { useAuth } from '../context/AuthContext';

export default function VProfil() {
  const router = useRouter();
  const { showModal } = useModal();
  const { user, logout } = useAuth();

  const menu_items = [
    { label: 'Pengaturan Akun', icon: Gear },
    { label: 'Notifikasi', icon: Bell },
    { label: 'Privasi & Keamanan', icon: ShieldCheck },
  ];

  const keluar = () => {
    showModal({
      title: "Keluar",
      message: "Apakah Anda yakin ingin keluar?",
      type: 'confirm',
      confirmText: "Keluar",
      onConfirm: async () => {
        await logout();
        router.replace('/masuk');
      }
    });
  };

  return (
    <LUtama show_header={false} show_footer={true} active_tab="profil">
      <View className="flex-1 bg-[#F9FAFB] px-5 pt-4">
        <Text className="text-xl font-bold text-black mb-6">Profil Saya</Text>

        <View className="bg-white rounded-2xl p-5 mb-6 border border-gray-100 shadow-sm flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View className="w-16 h-16 rounded-full bg-[#0A4D68] items-center justify-center overflow-hidden">
              {user?.foto ? (
                <Image source={{ uri: user.foto }} className="w-full h-full" resizeMode="cover" />
              ) : (
                <Text className="text-white text-2xl font-bold">{user?.nama_pengguna?.charAt(0)?.toUpperCase() || 'U'}</Text>
              )}
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-base font-bold text-black">{user?.nama_pengguna || 'User StyleScan'}</Text>
              <Text className="text-sm text-gray-400">{user?.email || 'user@stylescan.com'}</Text>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/edit_profil')}
            className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
          >
            <PencilSimple size={20} color="#0A4D68" weight="bold" />
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
          {menu_items.map((item, i) => (
            <TouchableOpacity key={i} className={`flex-row items-center justify-between p-4 ${i < menu_items.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <View className="flex-row items-center">
                <item.icon size={22} color="#0A4D68" />
                <Text className="text-sm font-bold text-black ml-3">{item.label}</Text>
              </View>
              <CaretRight size={16} color="#8C8C8C" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={keluar} className="bg-white rounded-2xl p-4 border border-red-100 flex-row items-center justify-center">
          <SignOut size={20} color="#EF4444" />
          <Text className="text-red-500 font-bold ml-2">Keluar dari Akun</Text>
        </TouchableOpacity>
      </View>
    </LUtama>
  );
}
