import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CHeader from '../components/c_header';
import CBottomNav from '../components/c_bottom_nav';

interface Props {
  children: React.ReactNode;
  judul_header?: string;
  show_header?: boolean;
  show_footer?: boolean;
  active_tab?: string;
}

export default function LUtama({ children, judul_header, show_header = true, show_footer = true, active_tab = 'home' }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      {show_header && judul_header && <CHeader judul={judul_header} />}
      <View className="flex-1">
        {children}
      </View>
      {show_footer && <CBottomNav active={active_tab} />}
    </SafeAreaView>
  );
}
