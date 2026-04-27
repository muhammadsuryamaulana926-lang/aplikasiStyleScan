const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'aplikasistylescan'
};

async function updateDB() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Update Kaos Hitam
    await connection.query("UPDATE produk SET url_gambar = 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800' WHERE id_produk = 1");
    // Update Celana Jeans
    await connection.query("UPDATE produk SET url_gambar = 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800' WHERE id_produk = 2");
    // Update Sneakers
    await connection.query("UPDATE produk SET url_gambar = 'https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&q=80&w=800' WHERE id_produk = 3");
    
    console.log("Database images updated successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateDB();
