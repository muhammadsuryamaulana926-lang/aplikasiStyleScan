import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Trash, ShoppingBag } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import LUtama from '../layouts/l_utama';
import { ambil_tersimpan, hapus_tersimpan } from '../services/api';

export default function VTersimpan() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const muat_data = async () => {
    setLoading(true);
    try {
      const res = await ambil_tersimpan();
      setItems(res.tersimpan || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useFocusEffect(useCallback(() => { muat_data(); }, []));

  const hapus_item = async (id: number) => {
    Alert.alert("Hapus", "Hapus produk dari keranjang?", [
      { text: "Batal" },
      { text: "Hapus", style: "destructive", onPress: async () => {
        await hapus_tersimpan(id);
        muat_data();
      }}
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View className="flex-row bg-white rounded-2xl p-4 mb-3 border border-gray-100 shadow-sm">
      <Image source={{ uri: item.gambar }} className="w-20 h-20 rounded-xl bg-gray-100" resizeMode="cover" />
      <View className="flex-1 ml-4 justify-between">
        <View>
          <Text className="text-xs text-red-500 font-bold">{item.merk}</Text>
          <Text className="text-sm font-bold text-black" numberOfLines={1}>{item.nama}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-[#0A4D68]">{item.harga}</Text>
          <TouchableOpacity onPress={() => hapus_item(item.id)} className="p-2">
            <Trash size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LUtama show_header={false} show_footer={true} active_tab="tersimpan">
      <View className="flex-1 px-5 pt-4 bg-[#F9FAFB]">
        <Text className="text-xl font-bold text-black mb-4">Keranjang Saya</Text>

        {items.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <ShoppingBag size={64} color="#D1D5DB" />
            <Text className="text-lg font-bold text-gray-400 mt-4">Keranjang Kosong</Text>
            <Text className="text-sm text-gray-400 mt-1 text-center">Jelajahi dan tambahkan produk favorit Anda</Text>
            <TouchableOpacity onPress={() => router.push('/beranda')} className="mt-6 bg-[#0A4D68] px-8 py-3 rounded-full">
              <Text className="text-white font-bold">Belanja Sekarang</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </LUtama>
  );
}
