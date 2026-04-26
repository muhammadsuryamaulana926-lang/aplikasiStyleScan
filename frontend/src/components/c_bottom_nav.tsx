import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { House, SquaresFour, Scan, Heart, User } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CBottomNav({ active = 'home' }: { active?: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const tabs = [
    { key: 'home', icon: House, route: '/beranda' },
    { key: 'kategori', icon: SquaresFour, route: '/beranda' },
    { key: 'kamera', icon: Scan, route: '/kamera' },
    { key: 'tersimpan', icon: Heart, route: '/tersimpan' },
    { key: 'profil', icon: User, route: '/profil' },
  ];

  return (
    <View 
      className="flex-row items-center justify-between px-6 bg-white border-t border-gray-100"
      style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20, paddingTop: 16 }}
    >
      {tabs.map((tab) => {
        const aktif = active === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => router.push(tab.route as any)}
            className={`p-2 ${aktif ? 'bg-[#0A4D68] rounded-full' : ''}`}
          >
            <tab.icon size={24} color={aktif ? '#FFFFFF' : '#8C8C8C'} weight={aktif ? 'fill' : 'regular'} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
