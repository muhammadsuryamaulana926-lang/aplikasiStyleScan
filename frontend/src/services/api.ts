const BASE_URL = 'http://localhost:3000'; // Sesuaikan dengan IP lokal jika menggunakan perangkat asli (misal: 10.0.2.2 untuk Android emulator)

export const ambil_produk = async () => {
  try {
    const res = await fetch(`${BASE_URL}/produk`);
    return await res.json();
  } catch (error) {
    console.error("Error ambil produk:", error);
    return { produk: [] };
  }
};

export const analisis_gambar = async (uri: string) => {
  try {
    const res = await fetch(`${BASE_URL}/analisis_outfit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url_gambar: uri })
    });
    return await res.json();
  } catch (error) {
    console.error("Error analisis gambar:", error);
    return null;
  }
};

export const simpan_outfit = async (produk: any) => {
  try {
    const res = await fetch(`${BASE_URL}/simpan_outfit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produk })
    });
    return await res.json();
  } catch (error) {
    console.error("Error simpan outfit:", error);
    return null;
  }
};
