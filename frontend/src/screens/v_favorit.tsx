import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CaretLeft, Trash } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import LUtama from '../layouts/l_utama';
import { ambil_favorit, toggle_favorit } from '../services/api';
import { useModal } from '../context/ModalContext';
import { useAuth } from '../context/AuthContext';

export default function VFavorit() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showModal } = useModal();
  const { user } = useAuth();

  const muat_data = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await ambil_favorit(user.id_pengguna);
      setItems(res.favorit || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      muat_data();
    }, [user])
  );

  const hapus_item = (id_produk: number) => {
    if (!user) return;
    showModal({
      title: "Hapus Favorit",
      message: "Yakin ingin menghapus dari favorit?",
      type: 'confirm',
      confirmText: "Hapus",
      onConfirm: async () => {
        try {
          await toggle_favorit(user.id_pengguna, id_produk);
          muat_data();
        } catch (error) {
          showModal({ title: "Gagal", message: "Gagal menghapus favorit", type: 'error' });
        }
      }
    });
  };

  return (
    <LUtama judul_header="Favorit" show_footer={true} active_tab="favorit">
      <ScrollView className="flex-1 px-5 pt-4 bg-[#F9FAFB]" showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#0A4D68" className="mt-10" />
        ) : items.length === 0 ? (
          <View className="items-center mt-20">
            <Text className="text-gray-400 text-base font-bold">Belum ada outfit favorit.</Text>
            <TouchableOpacity onPress={() => router.push('/beranda')} className="mt-4 bg-[#0A4D68] px-6 py-2 rounded-full">
              <Text className="text-white font-bold">Cari Outfit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="pb-10">
            {items.map((item: any) => (
              <View key={item.id} className="flex-row bg-white rounded-2xl p-4 mb-4 border border-gray-100 shadow-sm">
                <View className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                  <Image source={{ uri: item.gambar }} className="w-full h-full" resizeMode="cover" />
                </View>
                <View className="ml-4 flex-1 justify-center">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1 mr-2">
                      <Text className="font-bold text-black text-base" numberOfLines={1}>{item.nama}</Text>
                      <Text className="text-xs text-gray-500 mt-1">{item.merk}</Text>
                    </View>
                    <TouchableOpacity onPress={() => hapus_item(item.id_produk)} className="p-2 bg-red-50 rounded-full">
                      <Trash size={16} color="#EF4444" weight="bold" />
                    </TouchableOpacity>
                  </View>
                  <Text className="font-bold text-black text-base mt-2">{item.harga}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </LUtama>
  );
}
