import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { CaretLeft, Heart, HandTap } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { ambil_produk, simpan_outfit } from '../services/api';

export default function VKamera() {
  const router = useRouter();
  const [produk_list, setProdukList] = useState<any[]>([]);
  const [index_aktif, setIndexAktif] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    ambil_produk().then(res => {
      if (res.produk && res.produk.length > 0) {
        setProdukList(res.produk);
      }
    }).catch(console.error);
  }, []);

  const produk_sekarang = produk_list[index_aktif] || {
    id: 1, nama: "Light Hoodie Bold Burger", harga: "$900.00", diskon: "-20%",
    gambar: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"
  };

  const geser_kanan = () => {
    if (produk_list.length > 0) {
      setIndexAktif((prev) => (prev + 1) % produk_list.length);
      setLiked(false);
    }
  };

  const geser_kiri = () => {
    if (produk_list.length > 0) {
      setIndexAktif((prev) => (prev - 1 + produk_list.length) % produk_list.length);
      setLiked(false);
    }
  };

  const tambah_keranjang = async () => {
    try {
      const res = await simpan_outfit(produk_sekarang.id);
      if (res?.sudah_ada) {
        Alert.alert("Info", "Produk sudah ada di keranjang Anda");
      } else {
        Alert.alert("Berhasil! 🛒", `${produk_sekarang.nama} ditambahkan ke keranjang`);
      }
    } catch (error) {
      Alert.alert("Error", "Gagal menambahkan ke keranjang");
    }
  };

  // Ambil 3 gambar untuk carousel bawah
  const gambar_carousel = produk_list.length >= 3
    ? [
        produk_list[(index_aktif - 1 + produk_list.length) % produk_list.length],
        produk_list[index_aktif],
        produk_list[(index_aktif + 1) % produk_list.length],
      ]
    : produk_list.length > 0
    ? [produk_list[0], produk_list[index_aktif], produk_list[Math.min(1, produk_list.length - 1)]]
    : [];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <TouchableOpacity activeOpacity={1} onPress={geser_kanan} className="absolute inset-0">
        <Image
          source={{ uri: produk_sekarang.gambar }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View className="flex-row items-center justify-between px-6 py-4 mt-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white/20 rounded-full">
          <CaretLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLiked(!liked)} className="p-2 bg-white/20 rounded-full">
          <Heart size={20} color={liked ? "#FF4D6D" : "#FFFFFF"} weight={liked ? "fill" : "regular"} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center">
        <View className="items-center bg-black/40 px-4 py-2 rounded-full flex-row">
          <View className="mr-2">
            <HandTap size={20} color="#FFFFFF" weight="fill" />
          </View>
          <Text className="text-white text-sm font-medium">Ketuk untuk ganti pakaian</Text>
        </View>
      </View>

      <View className="pb-8 px-6">
        <View className="h-24 justify-center items-center mb-6 relative">
          <View className="absolute w-[120%] h-40 border-t border-white/30 rounded-t-[100%] top-12" />

          <View className="flex-row items-end justify-center space-x-4">
            {gambar_carousel.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  if (i === 0) geser_kiri();
                  else if (i === 2) geser_kanan();
                }}
                className={`${i === 1 ? 'w-16 h-16 border-2 border-white' : 'w-12 h-12'} rounded-full bg-white/20 overflow-hidden`}
              >
                <Image source={{ uri: item?.gambar }} className="w-full h-full" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex-row justify-between items-end mb-6">
          <View>
            <Text className="text-white text-xl font-bold mb-1">{produk_sekarang.nama}</Text>
            <View className="flex-row space-x-2">
              <Text className="text-white/60 text-xs line-through">$1,200.00</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-white text-xl font-bold">{produk_sekarang.harga}</Text>
            {produk_sekarang.diskon ? (
              <View className="bg-red-500 px-2 py-0.5 rounded-full mt-1">
                <Text className="text-white text-[10px] font-bold">{produk_sekarang.diskon}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View className="flex-row space-x-4">
          <TouchableOpacity onPress={() => router.push('/hasil')} className="flex-1 bg-white/20 py-4 rounded-full items-center">
            <Text className="text-white font-bold">Lihat Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={tambah_keranjang} className="flex-1 bg-[#0A4D68] py-4 rounded-full items-center">
            <Text className="text-white font-bold">Masuk Keranjang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
