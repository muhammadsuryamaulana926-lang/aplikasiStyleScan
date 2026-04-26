import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { CaretLeft, Heart, Star } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { analisis_gambar } from '../services/api';

export default function VHasil() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    analisis_gambar("dummy").then(res => setData(res)).catch(console.error);
  }, []);

  const p = data?.rekomendasi_produk?.[0] || {
    merk: "H&M", rating: 4.3, nama: "Casual Mandarin Collar Shirt", harga: "$900.00", gambar: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=500"
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-6 py-4 absolute top-0 left-0 right-0 z-10 mt-8">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
          <CaretLeft size={20} color="#1A1A1A" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
          <Heart size={20} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full h-[450px] bg-[#F5F5F5] items-center justify-center pt-10 pb-8">
           <Image source={{ uri: p.gambar }} className="w-3/4 h-full" resizeMode="contain" />
           <View className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full">
             <Text className="text-black font-bold text-xs">1/8</Text>
           </View>
        </View>

        <View className="p-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm font-bold text-red-500">{p.merk}</Text>
            <View className="flex-row items-center">
              <Star size={16} color="#F59E0B" weight="fill" />
              <Text className="text-sm font-bold text-black ml-1">{p.rating}</Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-black mb-4">{p.nama}</Text>

          <View className="flex-row items-end mb-6 border-b border-gray-100 pb-6">
            <Text className="text-2xl font-bold text-black mr-3">{p.harga}</Text>
            <Text className="text-sm text-gray-400 line-through mr-3 mb-1">$1,200.00</Text>
            <View className="bg-red-500 px-2 py-0.5 rounded mb-1 mr-auto">
              <Text className="text-white text-[10px] font-bold">-20%</Text>
            </View>
            <Text className="text-xs font-bold text-gray-400 mb-1">10k+ Sold</Text>
          </View>

          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
               <Text className="text-sm font-bold text-black mr-4">Size</Text>
               <View className="flex-row space-x-3">
                 {['S', 'M', 'L', 'XL'].map((s, i) => (
                   <Text key={i} className={`text-sm font-bold ${i === 1 ? 'text-[#0A4D68]' : 'text-gray-400'}`}>{s}</Text>
                 ))}
               </View>
            </View>
            <View className="flex-row items-center">
               <Text className="text-sm font-bold text-black mr-3">Color</Text>
               <View className="flex-row space-x-2">
                 <View className="w-5 h-5 rounded-full bg-gray-500" />
                 <View className="w-5 h-5 rounded-full bg-[#0A4D68] border-2 border-[#0A4D68] ring-2 ring-white" />
                 <View className="w-5 h-5 rounded-full bg-red-800" />
               </View>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-base font-bold text-black mb-2">Description</Text>
            <Text className="text-gray-500 text-sm leading-relaxed">
              Tetap stylish dengan koleksi pakaian pria terbaru. Menampilkan desain yang bersih dan bahan yang dapat bernapas, sangat cocok untuk berbagai kegiatan... <Text className="font-bold text-black">Read More ∨</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="flex-row space-x-4 p-6 bg-white border-t border-gray-100">
        <TouchableOpacity className="flex-1 py-4 rounded-full border border-gray-200 items-center">
          <Text className="font-bold text-black">Add Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-[#0A4D68] py-4 rounded-full items-center shadow-md">
          <Text className="font-bold text-white">Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
