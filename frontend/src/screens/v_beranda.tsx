import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import LUtama from '../layouts/l_utama';
import CKartuProduk from '../components/c_kartu_produk';
import { MagnifyingGlass, ShoppingBag, MapPin } from 'phosphor-react-native';
import { ambil_produk } from '../services/api';
import { useRouter } from 'expo-router';

export default function VBeranda() {
  const [produk, set_produk] = useState([]);
  const router = useRouter();

  useEffect(() => {
    ambil_produk().then(res => set_produk(res.produk || [])).catch(console.error);
  }, []);

  return (
    <LUtama show_header={false} show_footer={true} active_tab="home">
      <ScrollView className="flex-1 px-5 pt-4 bg-[#F9FAFB]" showsVerticalScrollIndicator={false}>
        {/* Header Wearify */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-[#0A4D68] rounded-md mr-2 transform rotate-45 items-center justify-center">
              <View className="w-4 h-4 bg-white transform -rotate-45" />
            </View>
            <Text className="text-xl font-bold text-black">Wearify</Text>
          </View>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
              <MagnifyingGlass size={20} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
              <ShoppingBag size={20} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location & Banner */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <MapPin size={20} color="#8C8C8C" />
              <View className="ml-2">
                <Text className="text-xs text-gray-500">Send to</Text>
                <Text className="text-sm font-bold text-black">Malang, Indonesia</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-[#0A4D68] px-4 py-2 rounded-full">
              <Text className="text-white font-bold text-xs">Change</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-[#0A4D68] rounded-xl overflow-hidden relative p-5 h-32 justify-center">
             <View className="z-10 w-2/3">
                <Text className="text-white text-base font-bold mb-1">Don't miss out —</Text>
                <Text className="text-blue-100 text-xs mb-3">Save up to 50% on your favorite products.</Text>
                <TouchableOpacity className="bg-white px-3 py-1.5 rounded-full self-start">
                  <Text className="text-[#0A4D68] font-bold text-[10px]">Shop Now</Text>
                </TouchableOpacity>
             </View>
             <Image source={{ uri: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=200" }} className="absolute right-0 bottom-0 w-32 h-32 opacity-80" resizeMode="cover" />
          </View>
        </View>

        {/* Popular Brand */}
        <View className="mb-6">
          <Text className="text-sm font-bold text-black mb-3">Popular Brand</Text>
          <View className="flex-row justify-between">
            {['H&M', 'Zara', 'Lacoste', 'Polo', 'Puma'].map((merk, i) => (
              <View key={i} className="bg-white w-[18%] aspect-square rounded-xl items-center justify-center border border-gray-100 shadow-sm">
                <Text className="font-bold text-black text-xs">{merk}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Flash Sale */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm font-bold text-black">Flash Sale</Text>
          <View className="flex-row items-center">
            <Text className="text-xs text-gray-500 mr-2">Ends at</Text>
            <View className="bg-red-500 px-2 py-1 rounded">
              <Text className="text-white font-bold text-xs">11 : 12 : 02</Text>
            </View>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between pb-8">
          {produk.map((p: any, i: number) => (
            <CKartuProduk key={p?.id ? p.id.toString() : i.toString()} produk={p} on_press={() => router.push({ pathname: '/hasil', params: { id: p.id } })} />
          ))}
        </View>
      </ScrollView>
    </LUtama>
  );
}
