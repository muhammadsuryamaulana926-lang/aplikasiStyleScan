import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface Props {
  teks: string;
  on_press: () => void;
  tipe?: 'utama' | 'sekunder';
}

export default function CTombol({ teks, on_press, tipe = 'utama' }: Props) {
  const bg = tipe === 'utama' ? 'bg-primary' : 'bg-surface border-2 border-primary';
  const textCol = tipe === 'utama' ? 'text-white' : 'text-primary';
  
  return (
    <TouchableOpacity 
      onPress={on_press} 
      className={`py-4 rounded-full items-center justify-center w-full ${bg} active:opacity-80 shadow-sm`}
    >
      <Text className={`font-bold text-base ${textCol}`}>{teks}</Text>
    </TouchableOpacity>
  );
}
