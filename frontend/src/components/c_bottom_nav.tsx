import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { House, SquaresFour, Scan, Heart, User } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

export default function CBottomNav({ active = 'home' }: { active?: string }) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white border-t border-gray-100 pb-8">
      <TouchableOpacity onPress={() => router.push('/beranda')} className={`p-2 ${active === 'home' ? 'bg-[#0A4D68] rounded-full' : ''}`}>
        <House size={24} color={active === 'home' ? '#FFFFFF' : '#8C8C8C'} weight={active === 'home' ? 'fill' : 'regular'} />
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <SquaresFour size={24} color="#8C8C8C" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/kamera')} className={`p-2 ${active === 'kamera' ? 'bg-[#0A4D68] rounded-full' : ''}`}>
        <Scan size={24} color={active === 'kamera' ? '#FFFFFF' : '#8C8C8C'} weight={active === 'kamera' ? 'fill' : 'regular'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/tersimpan')} className={`p-2 ${active === 'tersimpan' ? 'bg-[#0A4D68] rounded-full' : ''}`}>
        <Heart size={24} color={active === 'tersimpan' ? '#FFFFFF' : '#8C8C8C'} weight={active === 'tersimpan' ? 'fill' : 'regular'} />
      </TouchableOpacity>
      <TouchableOpacity className="p-2">
        <User size={24} color="#8C8C8C" />
      </TouchableOpacity>
    </View>
  );
}
