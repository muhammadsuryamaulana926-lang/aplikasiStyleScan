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
    // Koneksi tanpa nama database terlebih dahulu untuk memastikan pembuatan db jika belum ada
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    await connection.end();

    // Buat Pool Koneksi ke Database target
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
        gambar VARCHAR(255),
        rating DECIMAL(3, 1)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tersimpan (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_produk INT,
        waktu_simpan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_produk) REFERENCES produk(id)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS pengguna (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        kode_pos VARCHAR(50)
      )
    `);

    // Injeksi data dummy untuk percobaan jika tabel kosong
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM produk');
    if (rows[0].count === 0) {
      await pool.query(`
        INSERT INTO produk (nama, harga, diskon, merk, gambar, rating) VALUES
        ('Hoodie Bold Burger', '$900.00', '-20%', 'H&M', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500', 4.3),
        ('Statue Print Hoodie', '$90.00', '', 'Adidas', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=500', 4.8),
        ('Casual Mandarin Collar Shirt', '$900.00', '-20%', 'H&M', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=500', 4.3)
      `);
      console.log('Dummy data produk berhasil ditambahkan ke database.');
    }
  } catch (error) {
    console.error('Gagal terhubung ke MySQL:', error.message);
  }
}

// Inisialisasi Database
initDB();

// Endpoints
app.post('/unggah_outfit', upload.single('gambar'), (req, res) => {
  res.json({ 
    pesan: "Outfit berhasil diunggah", 
    file: req.file, 
    url_gambar: "https://images.unsplash.com/photo-1617331713098-944747cbf2fb?auto=format&fit=crop&q=80&w=500" 
  });
});

app.post('/analisis_outfit', async (req, res) => {
  const { url_gambar } = req.body;
  try {
    const [produk_db] = await pool.query('SELECT * FROM produk LIMIT 3');
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

app.get('/produk', async (req, res) => {
  try {
    const [produk_db] = await pool.query('SELECT * FROM produk');
    res.json({ produk: produk_db });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/simpan_outfit', async (req, res) => {
  const { produk } = req.body;
  try {
    await pool.query('INSERT INTO tersimpan (id_produk) VALUES (?)', [produk.id]);
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM tersimpan');
    res.json({ pesan: "Outfit berhasil disimpan", total_tersimpan: rows[0].count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/daftar', async (req, res) => {
  const { email, password, kode_pos } = req.body;
  try {
    await pool.query('INSERT INTO pengguna (email, password, kode_pos) VALUES (?, ?, ?)', [email, password, kode_pos]);
    res.json({ pesan: "Pendaftaran berhasil" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/masuk', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [pengguna] = await pool.query('SELECT * FROM pengguna WHERE email = ? AND password = ?', [email, password]);
    if (pengguna.length > 0) {
      res.json({ pesan: "Masuk berhasil", pengguna: pengguna[0] });
    } else {
      res.status(401).json({ pesan: "Email atau kata sandi salah" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});
