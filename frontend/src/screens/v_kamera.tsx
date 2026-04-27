import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { X } from 'phosphor-react-native';
import { useModal } from '../context/ModalContext';
import LUtama from '../layouts/l_utama';

export default function VKamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const { showModal } = useModal();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <LUtama judul_header="Kamera Pintar" active_tab="kamera">
        <View className="flex-1 items-center justify-center p-5">
          <Text className="text-center mb-5 text-gray-700 text-base">Kami membutuhkan izin kamera Anda untuk melakukan scan outfit cerdas.</Text>
          <TouchableOpacity onPress={requestPermission} className="bg-[#0A4D68] px-6 py-3 rounded-full">
            <Text className="text-white font-bold text-base">Izinkan Akses Kamera</Text>
          </TouchableOpacity>
        </View>
      </LUtama>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && !scanning) {
      setScanning(true);
      try {
        const photo = await cameraRef.current.takePictureAsync();
        
        // Simulasi pengiriman ke AI / Backend
        setTimeout(() => {
          setScanning(false);
          router.push('/rekomendasi' as any);
        }, 2000);

      } catch (e) {
        setScanning(false);
        showModal({ title: "Gagal", message: "Tidak dapat memproses gambar.", type: 'error' });
      }
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView style={StyleSheet.absoluteFill} facing="back" ref={cameraRef}>
        <View className="flex-1 justify-between p-6">
          <View className="flex-row justify-end mt-12">
             <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-black/50 items-center justify-center active:opacity-70">
               <X size={24} color="#FFF" />
             </TouchableOpacity>
          </View>
          
          <View className="items-center mb-16">
             <View className="bg-black/50 px-4 py-2 rounded-full mb-8">
               <Text className="text-white font-medium text-sm">Posisikan pakaian di tengah frame</Text>
             </View>
             
             <TouchableOpacity 
               onPress={takePicture} 
               disabled={scanning}
               className="w-20 h-20 rounded-full border-4 border-white items-center justify-center active:opacity-70"
             >
                {scanning ? (
                  <ActivityIndicator size="large" color="#FFFFFF" />
                ) : (
                  <View className="w-16 h-16 rounded-full bg-white" />
                )}
             </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
