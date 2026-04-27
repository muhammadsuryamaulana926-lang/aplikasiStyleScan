import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MagnifyingGlass, Microphone, TShirt, Pants, BaseballCap, Sneaker, Handbag } from 'phosphor-react-native';
import LUtama from '../layouts/l_utama';
import { useRouter } from 'expo-router';

export default function VKategori() {
  const router = useRouter();

  const categories = [
    { name: 'Pant', icon: Pants },
    { name: 'Hoodie', icon: TShirt },
    { name: 'Shirt', icon: TShirt },
    { name: 'Hat', icon: BaseballCap },
    { name: 'Shoes', icon: Sneaker },
    { name: 'Bag', icon: Handbag },
  ];

  return (
    <LUtama show_header={false} show_footer={true} active_tab="kategori">
      <ScrollView className="flex-1 bg-[#F9FAFB] pt-6" showsVerticalScrollIndicator={false}>
        
        {/* Search Bar */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center bg-white rounded-full px-4 py-3 shadow-sm border border-gray-100">
            <MagnifyingGlass size={20} color="#A1A1AA" />
            <TextInput 
              placeholder="Find Your Hoodies" 
              placeholderTextColor="#A1A1AA"
              className="flex-1 ml-3 text-base text-black"
            />
            <Microphone size={20} color="#A1A1AA" />
          </View>
        </View>

        {/* Horizontal Category List */}
        <View className="mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }} className="flex-row space-x-6">
            {categories.map((cat, i) => {
              const isSelected = i === 1; // Highlight 'Hoodie'
              return (
                <TouchableOpacity key={i} className="items-center mr-6">
                  <View className={`w-16 h-16 rounded-full items-center justify-center mb-2 shadow-sm ${isSelected ? 'bg-black' : 'bg-white border border-gray-100'}`}>
                    <cat.icon size={28} color={isSelected ? '#FFFFFF' : '#1A1A1A'} weight={isSelected ? "fill" : "regular"} />
                  </View>
                  <Text className={`text-xs font-bold ${isSelected ? 'text-black' : 'text-gray-500'}`}>{cat.name}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {/* Masonry Layout for Styles */}
        <View className="flex-row px-5 justify-between pb-10">
          
          {/* Left Column */}
          <View className="w-[48%] flex-col space-y-4">
            
            {/* Card 1: Pullover */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-4">
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-lg font-bold text-black leading-tight">Pullover</Text>
                  <Text className="text-[10px] text-gray-400 mt-1">Available Sizes</Text>
                </View>
                <View className="w-6 h-6 rounded-full bg-gray-100 items-center justify-center">
                  <Text className="text-gray-500 text-xs">+</Text>
                </View>
              </View>
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400" }} 
                className="w-full h-32 rounded-2xl mt-2" 
                resizeMode="cover" 
              />
            </View>

            {/* Card 3: Statue Print */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <Text className="text-xl font-bold text-black leading-tight mb-2">Statue Print Ombre Hoodie</Text>
              <TouchableOpacity className="bg-[#2A2A2A] py-2 px-5 rounded-full self-start mb-4">
                <Text className="text-white text-xs font-bold">Buy Now</Text>
              </TouchableOpacity>
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=400" }} 
                className="w-full h-40 rounded-2xl" 
                resizeMode="cover" 
              />
            </View>

          </View>

          {/* Right Column */}
          <View className="w-[48%] flex-col space-y-4">
            
            {/* Card 2: Rainbow (Dark) */}
            <View className="bg-[#2A2A2A] rounded-3xl p-5 shadow-sm mb-4">
              <Text className="text-lg font-bold text-white leading-tight">Rainbow</Text>
              <Text className="text-[10px] text-gray-400 mt-1 mb-4">Available Sizes</Text>
              
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?auto=format&fit=crop&q=80&w=400" }} 
                className="w-full h-32 rounded-2xl" 
                resizeMode="cover" 
              />
              
              <TouchableOpacity className="border border-white/30 py-2 px-5 rounded-full self-start mt-4">
                <Text className="text-white text-xs font-bold">Buy Now</Text>
              </TouchableOpacity>
            </View>

            {/* View All Button */}
            <TouchableOpacity onPress={() => router.push('/beranda')} className="bg-white rounded-full py-4 items-center justify-center border border-gray-200 shadow-sm mb-4">
              <Text className="font-bold text-black">View All →</Text>
            </TouchableOpacity>

            {/* Card 4: Small card */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <Text className="text-lg font-bold text-black leading-tight mb-2">Streetwear</Text>
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1523398002811-999aa8e9f5b9?auto=format&fit=crop&q=80&w=400" }} 
                className="w-full h-24 rounded-2xl" 
                resizeMode="cover" 
              />
            </View>

          </View>

        </View>

      </ScrollView>
    </LUtama>
  );
}
