import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { CaretLeft, Heart, HandTap } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

export default function VKamera() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="absolute inset-0">
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" }} 
          className="w-full h-full" 
          resizeMode="cover" 
        />
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500" }} 
          className="absolute inset-0 w-full h-full opacity-90" 
          resizeMode="cover" 
        />
      </View>

      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white/20 rounded-full">
          <CaretLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 bg-white/20 rounded-full">
          <Heart size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center">
        <View className="items-center bg-black/40 px-4 py-2 rounded-full flex-row">
          <HandTap size={20} color="#FFFFFF" weight="fill" className="mr-2" />
          <Text className="text-white text-sm font-medium">Geser untuk mencoba pakaian lain</Text>
        </View>
      </View>

      <View className="pb-8 px-6">
        <View className="h-24 justify-center items-center mb-6 relative">
          <View className="absolute w-[120%] h-40 border-t border-white/30 rounded-t-[100%] top-12" />
          
          <View className="flex-row items-end justify-center space-x-4">
            <View className="w-12 h-12 rounded-full bg-white/20 overflow-hidden">
               <Image source={{ uri: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=100" }} className="w-full h-full" />
            </View>
            <View className="w-16 h-16 rounded-full bg-white/40 overflow-hidden border-2 border-white items-center justify-center">
               <Image source={{ uri: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=150" }} className="w-full h-full" />
            </View>
            <View className="w-12 h-12 rounded-full bg-white/20 overflow-hidden">
               <Image source={{ uri: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=100" }} className="w-full h-full" />
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-end mb-6">
          <View>
            <Text className="text-white text-xl font-bold mb-1">Light Hoodie Bold Burger</Text>
            <View className="flex-row space-x-2">
              <Text className="text-white/60 text-xs line-through">$1,200.00</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-white text-xl font-bold">$900.00</Text>
            <View className="bg-red-500 px-2 py-0.5 rounded-full mt-1">
               <Text className="text-white text-[10px] font-bold">-20%</Text>
            </View>
          </View>
        </View>

        <View className="flex-row space-x-4">
          <TouchableOpacity onPress={() => router.push('/hasil')} className="flex-1 bg-white/20 py-4 rounded-full items-center">
            <Text className="text-white font-bold">Lihat Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-[#0A4D68] py-4 rounded-full items-center">
            <Text className="text-white font-bold">Masuk Keranjang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
