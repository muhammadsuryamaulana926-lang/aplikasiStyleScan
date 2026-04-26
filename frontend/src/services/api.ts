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

export const ambil_produk_by_id = async (id: number | string) => {
  try {
    const res = await fetch(`${BASE_URL}/produk/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error ambil produk by id:", error);
    return null;
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
export const simpan_outfit = async (id_produk: number, ukuran?: string, warna?: string) => {
  try {
    const res = await fetch(`${BASE_URL}/simpan_outfit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_produk, ukuran, warna })
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
    
    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.log("API_JSON_PARSE_ERROR:", e);
      throw new Error("Gagal membaca respon dari server");
    }

    if (!res.ok) {
      console.log("API_RESPONSE_NOT_OK:", res.status, data);
      throw new Error(data.pesan || `Server error (${res.status})`);
    }
    return data;
  } catch (error: any) {
    console.log("API_FETCH_ERROR:", error.message);
    throw error;
  }
};

export const daftar_akun = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/daftar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error("Gagal membaca respon dari server");
    }

    if (!res.ok) {
      console.log("API_REGISTER_NOT_OK:", res.status, data);
      throw new Error(data.pesan || `Server error (${res.status})`);
    }
    return data;
  } catch (error: any) {
    console.log("API_REGISTER_FETCH_ERROR:", error.message);
    throw error;
  }
};
