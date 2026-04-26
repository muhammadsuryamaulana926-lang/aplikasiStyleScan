import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Heart, Star } from 'phosphor-react-native';

export default function CKartuProduk({ produk, on_press }: { produk: any, on_press: () => void }) {
  return (
    <TouchableOpacity onPress={on_press} className="bg-white rounded-2xl overflow-hidden w-[48%] mb-4 border border-gray-100 shadow-sm pb-3">
      <View className="relative w-full aspect-square bg-[#F5F5F5] p-2">
        <Image source={{ uri: produk.gambar }} className="w-full h-full rounded-xl" resizeMode="contain" />
        <TouchableOpacity className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm">
          <Heart size={14} color="#8C8C8C" />
        </TouchableOpacity>
      </View>
      <View className="px-3 pt-3">
        <Text className="text-xs font-bold text-black mb-1" numberOfLines={1}>{produk.nama}</Text>
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-row items-center">
            <Text className="text-xs font-bold text-black mr-1">{produk.harga}</Text>
            {produk.diskon && <Text className="text-[10px] text-gray-400 line-through mr-1">$15.00</Text>}
          </View>
        </View>
        <View className="flex-row items-center justify-between">
           <View className="flex-row items-center">
             <Star size={10} color="#F59E0B" weight="fill" />
             <Text className="text-[10px] text-gray-500 ml-1">{produk.rating}</Text>
           </View>
           <Text className="text-[10px] text-gray-500">10k+ Sold</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
