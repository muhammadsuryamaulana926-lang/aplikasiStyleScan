import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CaretLeft, Bell } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

export default function CHeader({ judul }: { judul: string }) {
  const router = useRouter();
  
  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-surface">
      <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : null} className="p-2 bg-gray-100 rounded-full active:opacity-70">
        <CaretLeft size={20} color="#1A1A1A" weight="bold" />
      </TouchableOpacity>
      <Text className="text-lg font-bold text-text">{judul}</Text>
      <TouchableOpacity className="p-2 bg-gray-100 rounded-full active:opacity-70">
        <Bell size={20} color="#1A1A1A" weight="bold" />
      </TouchableOpacity>
    </View>
  );
}
