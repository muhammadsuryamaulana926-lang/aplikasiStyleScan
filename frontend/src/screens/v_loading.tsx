import React, { useEffect, useRef } from 'react';
import { View, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function VLoading() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animasi Fade In Logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Pindah ke halaman masuk (login) setelah 3 detik
    const timer = setTimeout(() => {
      router.replace('/masuk');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Animated.View style={{ opacity: fadeAnim }} className="items-center">
        <Image 
          source={require('../../assets/images/logo.png')} 
          className="w-64 h-64"
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}
