const BASE_URL = 'http://192.168.100.103:3000'; // Sesuaikan dengan IP lokal

// === PRODUK ===
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

// === KERANJANG / TERSIMPAN ===
export const simpan_outfit = async (id_produk: number) => {
  try {
    const res = await fetch(`${BASE_URL}/simpan_outfit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_produk })
    });
    return await res.json();
  } catch (error) {
    console.error("Error simpan outfit:", error);
    return null;
  }
};

export const ambil_tersimpan = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tersimpan`);
    return await res.json();
  } catch (error) {
    console.error("Error ambil tersimpan:", error);
    return { tersimpan: [] };
  }
};

export const hapus_tersimpan = async (id: number) => {
  try {
    const res = await fetch(`${BASE_URL}/tersimpan/${id}`, { method: 'DELETE' });
    return await res.json();
  } catch (error) {
    console.error("Error hapus tersimpan:", error);
    return null;
  }
};

// === AUTENTIKASI ===
export const masuk_akun = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/masuk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.pesan || 'Gagal masuk');
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const daftar_akun = async (email: string, password: string, kode_pos: string) => {
  try {
    const res = await fetch(`${BASE_URL}/daftar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, kode_pos })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal mendaftar');
    return data;
  } catch (error: any) {
    throw error;
  }
};
