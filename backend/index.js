const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Konfigurasi Database
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'aplikasistylescan'
};

let pool;

async function initDB() {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    await connection.end();

    pool = mysql.createPool(dbConfig);
    console.log(`Terhubung ke database MySQL: ${dbConfig.database}`);

    // Membuat Tabel-Tabel
    await pool.query(`
      CREATE TABLE IF NOT EXISTS produk (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        harga VARCHAR(50),
        diskon VARCHAR(50),
        merk VARCHAR(100),
        gambar VARCHAR(500),
        rating DECIMAL(3, 1)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tersimpan (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_pengguna INT NOT NULL,
        id_produk INT,
        ukuran VARCHAR(50),
        warna VARCHAR(50),
        waktu_simpan TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS favorit (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_pengguna INT NOT NULL,
        id_produk INT,
        waktu_simpan TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS pengguna (
        id_pengguna INT AUTO_INCREMENT PRIMARY KEY,
        nama_pengguna VARCHAR(255) DEFAULT 'User',
        email VARCHAR(255) UNIQUE NOT NULL,
        kata_sandi VARCHAR(255) NOT NULL
      )
    `);

    // Injeksi data dummy jika tabel kosong
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM produk');
    if (rows[0].count === 0) {
      await pool.query(`
        INSERT INTO produk (nama, harga, diskon, merk, gambar, rating) VALUES
        ('Hoodie Bold Burger', '$900.00', '-20%', 'H&M', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500', 4.3),
        ('Statue Print Hoodie', '$90.00', '', 'Adidas', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=500', 4.8),
        ('Casual Mandarin Collar Shirt', '$900.00', '-20%', 'H&M', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=500', 4.3),
        ('Classic Denim Jacket', '$120.00', '-15%', 'Zara', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=500', 4.5),
        ('Oversized Street Tee', '$45.00', '-10%', 'Puma', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500', 4.1),
        ('Premium Polo Shirt', '$75.00', '', 'Lacoste', 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=500', 4.7)
      `);
      console.log('Dummy data produk berhasil ditambahkan ke database.');
    }
  } catch (error) {
    console.error('Gagal terhubung ke MySQL:', error.message);
  }
}

initDB();

// ========== ENDPOINTS ==========

// --- Produk ---
app.get('/produk', async (req, res) => {
  try {
    const [produk_db] = await pool.query('SELECT id_produk AS id, nama_produk AS nama, harga, url_gambar AS gambar, kategori AS merk, "4.5" AS rating, "-10%" AS diskon FROM produk');
    res.json({ produk: produk_db });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/produk/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_produk AS id, nama_produk AS nama, harga, url_gambar AS gambar, kategori AS merk, "4.5" AS rating, "-10%" AS diskon FROM produk WHERE id_produk = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json({ produk: rows[0] });
    } else {
      res.status(404).json({ pesan: 'Produk tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Analisis ---
app.post('/unggah_outfit', upload.single('gambar'), (req, res) => {
  res.json({ 
    pesan: "Outfit berhasil diunggah", 
    file: req.file, 
    url_gambar: "https://images.unsplash.com/photo-1617331713098-944747cbf2fb?auto=format&fit=crop&q=80&w=500" 
  });
});

app.post('/analisis_outfit', async (req, res) => {
  try {
    const [produk_db] = await pool.query('SELECT id_produk AS id, nama_produk AS nama, harga, url_gambar AS gambar, kategori AS merk, "4.5" AS rating, "-10%" AS diskon FROM produk LIMIT 3');
    res.json({
      pesan: "Analisis selesai",
      kategori_terdeteksi: ["Hoodie", "Celana Jeans", "Sneakers"],
      warna_dominan: ["Abu-abu", "Biru"],
      gaya: "Streetwear",
      rekomendasi_produk: produk_db
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Tersimpan / Keranjang ---
app.post('/simpan_outfit', async (req, res) => {
  const { id_pengguna, id_produk, ukuran, warna } = req.body;
  if (!id_pengguna) return res.status(401).json({ pesan: "Harap login terlebih dahulu" });

  try {
    const [existing] = await pool.query('SELECT * FROM tersimpan WHERE id_pengguna = ? AND id_produk = ? AND (ukuran = ? OR ukuran IS NULL) AND (warna = ? OR warna IS NULL)', [id_pengguna, id_produk, ukuran, warna]);
    if (existing.length > 0) {
      return res.json({ pesan: "Produk sudah ada di keranjang dengan varian ini", sudah_ada: true });
    }
    await pool.query('INSERT INTO tersimpan (id_pengguna, id_produk, ukuran, warna) VALUES (?, ?, ?, ?)', [id_pengguna, id_produk, ukuran, warna]);
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM tersimpan WHERE id_pengguna = ?', [id_pengguna]);
    res.json({ pesan: "Berhasil ditambahkan ke keranjang!", total_tersimpan: rows[0].count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tersimpan/:id_pengguna', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.id, t.id_produk, t.ukuran, t.warna, t.waktu_simpan, p.nama_produk AS nama, p.harga, "-10%" AS diskon, p.kategori AS merk, p.url_gambar AS gambar, "4.5" AS rating
      FROM tersimpan t
      JOIN produk p ON t.id_produk = p.id_produk
      WHERE t.id_pengguna = ?
      ORDER BY t.waktu_simpan DESC
    `, [req.params.id_pengguna]);
    res.json({ tersimpan: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/tersimpan/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tersimpan WHERE id = ?', [req.params.id]);
    res.json({ pesan: "Berhasil dihapus dari keranjang" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Favorit ---
app.post('/favorit', async (req, res) => {
  const { id_pengguna, id_produk } = req.body;
  if (!id_pengguna) return res.status(401).json({ pesan: "Harap login terlebih dahulu" });

  try {
    const [existing] = await pool.query('SELECT * FROM favorit WHERE id_pengguna = ? AND id_produk = ?', [id_pengguna, id_produk]);
    if (existing.length > 0) {
      await pool.query('DELETE FROM favorit WHERE id_pengguna = ? AND id_produk = ?', [id_pengguna, id_produk]);
      return res.json({ pesan: "Dihapus dari favorit", is_favorit: false });
    } else {
      await pool.query('INSERT INTO favorit (id_pengguna, id_produk) VALUES (?, ?)', [id_pengguna, id_produk]);
      return res.json({ pesan: "Ditambahkan ke favorit", is_favorit: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/favorit/:id_pengguna', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT f.id, f.id_produk, f.waktu_simpan, p.nama_produk AS nama, p.harga, "-10%" AS diskon, p.kategori AS merk, p.url_gambar AS gambar, "4.5" AS rating
      FROM favorit f
      JOIN produk p ON f.id_produk = p.id_produk
      WHERE f.id_pengguna = ?
      ORDER BY f.waktu_simpan DESC
    `, [req.params.id_pengguna]);
    res.json({ favorit: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Autentikasi ---
app.post('/daftar', async (req, res) => {
  const { email, password } = req.body;
  try {
    await pool.query('INSERT INTO pengguna (email, kata_sandi) VALUES (?, ?)', [email, password]);
    const [pengguna] = await pool.query('SELECT id_pengguna, nama_pengguna, email FROM pengguna WHERE email = ?', [email]);
    console.log("PENDAFTARAN_BERHASIL:", email);
    res.json({ pesan: "Pendaftaran berhasil", pengguna: pengguna[0] });
  } catch (error) {
    console.error("PENDAFTARAN_ERROR:", error.message);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ pesan: "Email sudah terdaftar" });
    }
    res.status(500).json({ pesan: error.message });
  }
});

app.post('/masuk', async (req, res) => {
  const { email, password } = req.body;
  console.log("PERCOBAAN_MASUK:", email);
  try {
    const [pengguna] = await pool.query('SELECT id_pengguna, nama_pengguna, email FROM pengguna WHERE email = ? AND kata_sandi = ?', [email, password]);
    if (pengguna.length > 0) {
      console.log("MASUK_BERHASIL:", email);
      res.json({ pesan: "Masuk berhasil", pengguna: pengguna[0] });
    } else {
      console.log("MASUK_GAGAL: Email/Sandi salah", email);
      res.status(401).json({ pesan: "Email atau kata sandi salah" });
    }
  } catch (error) {
    console.error("MASUK_DB_ERROR:", error.message);
    res.status(500).json({ pesan: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});
