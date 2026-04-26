import React from 'react';
import { View, Text } from 'react-native';
import LUtama from '../layouts/l_utama';

export default function VTersimpan() {
  return (
    <LUtama judul_header="Pakaian Tersimpan">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg font-bold text-text mb-2">Belum ada yang disimpan</Text>
        <Text className="text-textLight text-center">Temukan dan simpan gaya favorit Anda untuk dilihat nanti.</Text>
      </View>
    </LUtama>
  );
}
