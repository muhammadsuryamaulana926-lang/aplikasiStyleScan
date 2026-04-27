import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator, Animated, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { masuk_akun, daftar_akun } from '../services/api';
import { useModal } from '../context/ModalContext';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, Square } from 'phosphor-react-native';

const { height } = Dimensions.get('window');

type AuthMode = 'welcome' | 'login' | 'register';

export default function VMasuk() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { showModal } = useModal();
  const { login } = useAuth();

  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const showForm = (mode: AuthMode) => {
    setAuthMode(mode);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const hideForm = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => setAuthMode('welcome'));
  };

  const handleAuth = async () => {
    if (!email || !password) return showModal({ title: "Perhatian", message: "Mohon isi email dan kata sandi", type: 'info' });
    
    if (authMode === 'register' && !agreed) {
      return showModal({ title: "Perhatian", message: "Anda harus menyetujui Syarat & Ketentuan", type: 'info' });
    }

    setLoading(true);
    try {
      if (authMode === 'login') {
        const data = await masuk_akun(email, password);
        await login(data.pengguna);
        showModal({ title: "Berhasil", message: "Selamat datang kembali!", type: 'success', onConfirm: () => router.replace('/beranda') });
      } else {
        const res = await daftar_akun(email, password);
        await login(res.pengguna);
        showModal({ title: "Berhasil", message: "Akun berhasil dibuat dan otomatis masuk!", type: 'success', onConfirm: () => router.replace('/beranda') });
      }
    } catch (error: any) {
      console.log("AUTH_ERROR:", error);
      showModal({ title: authMode === 'login' ? "Gagal Masuk" : "Gagal Mendaftar", message: error.message || "Terjadi kesalahan", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <ImageBackground 
        source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500" }} 
        className="flex-1 justify-end"
        resizeMode="cover"
      >
        <View className="absolute top-24 w-full items-center">
          <Text className="text-white text-6xl font-serif tracking-widest mb-3">STYL</Text>
          <Text className="text-white text-xs tracking-widest uppercase font-medium">Shop. Ship. Pay Later.</Text>
        </View>

        {/* Welcome Buttons */}
        <Animated.View 
          className="w-full px-8 pb-16 absolute bottom-0"
          style={{ opacity: fadeAnim, pointerEvents: authMode === 'welcome' ? 'auto' : 'none' }}
        >
          <TouchableOpacity onPress={() => showForm('login')} className="w-full h-14 bg-white items-center justify-center mb-4 rounded-sm shadow-md active:opacity-80">
            <Text className="text-black font-bold text-base">Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showForm('register')} className="w-full h-14 items-center justify-center mb-4 rounded-sm border-2 border-white active:bg-white/20">
            <Text className="text-white font-bold text-base">Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace('/beranda')} className="w-full h-14 items-center justify-center rounded-sm border-2 border-white active:bg-white/20">
            <Text className="text-white font-bold text-base">Shop Now</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Auth Form Panel */}
        <Animated.View 
          className="bg-white w-full rounded-t-[50px] px-8 pt-10 pb-12"
          style={{ 
            height: authMode === 'register' ? height * 0.75 : height * 0.65,
            transform: [{ translateY: slideAnim }] 
          }}
        >
          <View className="flex-1">
            <View className="mb-6">
              <Text className="text-xs font-bold text-black mb-1">E-mail</Text>
              <TextInput 
                placeholder="Your e-mail address" 
                placeholderTextColor="#A1A1AA" 
                className="border-b border-gray-300 py-2 text-base text-black"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            
            <View className="mb-6">
              <Text className="text-xs font-bold text-black mb-1">Password</Text>
              <TextInput 
                placeholder="New password" 
                placeholderTextColor="#A1A1AA" 
                secureTextEntry 
                className="border-b border-gray-300 py-2 text-base text-black"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {authMode === 'register' && (
              <>
                <View className="mb-6">
                  <Text className="text-xs font-bold text-black mb-1">Zip Code</Text>
                  <TextInput 
                    placeholder="Type in zip code" 
                    placeholderTextColor="#A1A1AA" 
                    className="border-b border-gray-300 py-2 text-base text-black"
                    value={zipCode}
                    onChangeText={setZipCode}
                    keyboardType="numeric"
                  />
                </View>

                <TouchableOpacity onPress={() => setAgreed(!agreed)} className="flex-row items-center mb-8">
                  {agreed ? (
                    <CheckSquare size={20} color="#000" weight="fill" />
                  ) : (
                    <Square size={20} color="#000" />
                  )}
                  <Text className="text-xs text-black font-bold ml-2 underline">Terms of Service</Text>
                </TouchableOpacity>
              </>
            )}

            {authMode === 'login' && (
              <TouchableOpacity onPress={() => router.push('/lupa_sandi')} className="items-end mb-8">
                <Text className="text-xs text-black underline font-bold">Lupa Kata Sandi?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleAuth} disabled={loading} className="w-full h-14 overflow-hidden items-center justify-center bg-black rounded-sm shadow-md active:opacity-80 mb-6">
              <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500" }} className="absolute w-full h-full opacity-40" />
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white font-bold text-base relative z-10">{authMode === 'login' ? 'Log In' : 'Sign Up'}</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center items-center mt-auto">
            <Text className="text-xs text-black">{authMode === 'login' ? "Belum memiliki akun? " : "Already a member? "}</Text>
            <TouchableOpacity onPress={() => showForm(authMode === 'login' ? 'register' : 'login')}>
              <Text className="text-xs text-black underline font-bold">{authMode === 'login' ? "Buat Akun Baru" : "Sign In here"}</Text>
            </TouchableOpacity>
          </View>

          {/* Close button to go back to welcome screen */}
          <TouchableOpacity onPress={hideForm} className="absolute top-4 right-6 p-2">
            <Text className="text-gray-400 font-bold text-lg">✕</Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
